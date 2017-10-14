electron
==

 * put electron specific configuration and logic (OS logic) to electron
   APP
 * keep web app as generic as possible (make reuse on plain web
   possible)
 * access to commonJS (require) module system in browser code (including build in modules like fs, crypto etc.)
 * when using react + redux + electorn, communication with electron
   should be put in action creators
