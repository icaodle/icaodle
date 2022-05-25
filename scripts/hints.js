class Hints{
    constructor(){
        
    }

    hintIcon(){
        if (!hintOpen) {
            openHintMenu();
        } else if (hintOpen) {
            closeHintMenu();
        }
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
}