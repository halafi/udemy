export default function({ dispatch }) {
  return next => action => {
    if (!action.payload || !action.payload.then) {
        return next(action); // next middleware
    }
    // promise
    action.payload.then((response) => {
        const newAction = { ...action, payload: response.data };
        console.log(newAction);
        dispatch(newAction); // go through all middlewares
    });

    console.log(action);
  };
}
