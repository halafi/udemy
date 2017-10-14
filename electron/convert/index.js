const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const _ = require("lodash");

const { app, BrowserWindow, ipcMain, shell } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on("videos:added", (event, videos) => {
  const promises = videos.map(video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        video.duration = metadata.format.duration;
        video.format = "avi"; // default target format
        resolve(video);
      });
    });
  });
  Promise.all(promises).then(metadata => {
    mainWindow.webContents.send("metadata:complete", metadata);
  });
});

ipcMain.on("conversion:start", (event, videos) => {
  _.each(videos, video => {
    const outputDirectory = video.path.split(video.name)[0];
    const outputName = video.name.split(".")[0];
    const outputPath = `${outputDirectory}${outputName}.${video.format}`;

    ffmpeg(video.path)
      .output(outputPath)
      .on("progress", (event) => mainWindow.webContents.send('conversion:progress', { video, timemark: event.timemark })) //console.log(event.percent))
      .on("end", () => mainWindow.webContents.send('conversion:end', { video, outputPath }))
      .run();
  });
    mainWindow.webContents.send("conversion:complete");
});

ipcMain.on("folder:open", (event, outputPath) => {
    shell.showItemInFolder(outputPath);
});
