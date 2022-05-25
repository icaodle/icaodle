class Settings{
    constructor(){
      
    }

    settingsExitBtn(){
        toggleElement(document.getElementById("settings_container"));
    }

    slider1Input(){
        if (localStorage.getItem("onlyInternationalCodes") == "false") {
            window.localStorage.setItem("onlyInternationalCodes", "true");
            intlCodes = true;
            if (target_row == 0) {
              reset(true);
            }
          } else {
            window.localStorage.setItem("onlyInternationalCodes", "false");
            allCodes = true;
            if (target_row == 0) {
              reset(true);
            }
        }
    }

    settingsIcon(){
        toggleElement(document.getElementById("settings_container"));
    }

}