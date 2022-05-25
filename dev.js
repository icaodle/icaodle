class Dev{
    constructor(){
        
    }
    
    // Does super top secret dev stuff (answer key).
    superTopSecretMethod() {
        if (
          typeof document.getElementById("secret_code") == "undefined" ||
          document.getElementById("secret_code") == null
        ) {
          let error = document.createElement("div");
          error.id = "error_msg";
          error.textContent = airportCode;
          error.style.top =
            document.getElementById("main_container").offsetTop * 1.25 + "px";
          ``;
          error.style.opacity = 1;
          document.body.append(error);
          error.style.left =
            (document.body.clientWidth + 15) / 2 - Math.round(63 / 2) + "px";
          error.style.transition = "opacity 1s 1s";
          error.style.opacity = 0;
          window.setTimeout(function () {
            error.remove();
          }, 2000);
        }
      }

    clearStats() {
        let isDev;
        let darkMode;
        let colors;
        if (JSON.parse(window.localStorage.getItem("isDev"))) {
          isDev = true;
        }
        if (window.localStorage.getItem("darkMode") == "true") {
          darkMode = true;
        }
        if (JSON.parse(window.localStorage.getItem("altColor"))) {
          colors = true;
        }
        window.localStorage.clear();
        if (isDev) {
          window.localStorage.setItem("isDev", "true");
        }
        if (darkMode) {
          window.localStorage.setItem("darkMode", "true");
        }
        if (colors) {
          window.localStorage.setItem("altColor", "true");
        }
      }
      
    makeDev() {
        window.localStorage.setItem("isDev", "true");
      }
      
    demote() {
        window.localStorage.setItem("isDev", "false");
      }
}