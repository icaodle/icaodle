let dev = new Dev()
let app = new App()
app.localStorageManager.checkStorage();

window.onload = app.load.bind(app)

window.onresize = function () {
  app.resize();
};

document.addEventListener("keydown", app.keyDown.bind(app));