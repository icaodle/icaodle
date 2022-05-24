class Clicks {
    constructor(){

    }

    endScreenButton(){
        checkStorage();
        endScreen();
    }

    key(){
        renderLetter(event.target.id);
    }

    elevIcon(){
        if (elevationDropdown.style.visibility == "hidden") {
    
            hasOpenedElev = true;
            let hints = JSON.parse(window.localStorage.getItem("Hints_Used"));
            hints += 1;
            window.localStorage.setItem("Hints_Used", hints.toString());
            document.getElementById("country_icon").style.color = "var(--black)";
            document.getElementById("country_icon").style.cursor = "pointer";
            countryCursor = true;
            elevationDropdown.style.visibility = "visible";
            elevationHider.style.visibility = "visible";
          }
    }

    countryIcon(){
        if (countryDropdown.style.visibility == "hidden" && hasOpenedElev) {
            hasOpenedCountry = true;
            let hints = JSON.parse(window.localStorage.getItem("Hints_Used"));
            hints += 1;
            window.localStorage.setItem("Hints_Used", hints.toString());
            document.getElementById("city_icon").style.color = "var(--black)";
            document.getElementById("city_icon").style.cursor = "pointer";
            cityCursor = true;
            countryDropdown.style.visibility = "visible";
            countryHider.style.visibility = "visible";
          }
    }

    cityIcon(){
        if (
            cityDropdown.style.visibility == "hidden" &&
            hasOpenedElev &&
            hasOpenedCountry
        ) {
            hasOpenedCity = true;
            let hints = JSON.parse(window.localStorage.getItem("Hints_Used"));
            hints += 1;
            window.localStorage.setItem("Hints_Used", hints.toString());
            cityDropdown.style.visibility = "visible";
            cityHider.style.visibility = "visible";
        }
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

    tutorialExitBtn(){
        document.getElementById("tutorial_box_0_0").style.transition = "";
        document.getElementById("tutorial_box_0_0").style.transform =
        "rotate3d(1,0,0,0deg)";
        document.getElementById("tutorial_box_1_1").style.transition = "";
        document.getElementById("tutorial_box_1_1").style.transform =
        "rotate3d(1,0,0,0deg)";
        document.getElementById("tutorial_box_2_3").style.transition = "";
        document.getElementById("tutorial_box_2_3").style.transform =
        "rotate3d(1,0,0,0deg)";
        toggleElement(document.getElementById("tutorial_container"));
    }

    menuIcon(){
        toggleElement(document.getElementById("tutorial_container"));
        window.setTimeout(function () {
        document.getElementById("tutorial_box_0_0").style.transition =
            "transform 1s ease-in-out";
        document.getElementById("tutorial_box_0_0").style.transform =
            "rotate3d(1,0,0,360deg)";
        document.getElementById("tutorial_box_1_1").style.transition =
            "transform 1s ease-in-out";
        document.getElementById("tutorial_box_1_1").style.transform =
            "rotate3d(1,0,0,360deg)";
        document.getElementById("tutorial_box_2_3").style.transition =
            "transform 1s ease-in-out";
        document.getElementById("tutorial_box_2_3").style.transform =
            "rotate3d(1,0,0,360deg)";
        }, 350);
    }

    hintIcon(){
        if (!hintOpen) {
            openHintMenu();
        } else if (hintOpen) {
            closeHintMenu();
        }
    }

    settingsIcon(){
        toggleElement(document.getElementById("settings_container"));
    }

    
}