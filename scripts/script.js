let dev = new Dev()
let app = new App()
app.localStorageManager.checkStorage();

window.onload = app.load

window.onresize = function () {
  resize();
};

document.addEventListener("keydown", keyDown);