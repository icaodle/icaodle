class Hints{
    constructor(){
        
    }

    openHintMenu() {
        let hintDropdown = document.createElement("div");
        hintDropdown.className = "hint_dropdown";
        hintDropdown.id = "hint_dropdown_id";
        document.body.append(hintDropdown);
        hintDropdown.style.height = "160px";
        let elevationIcon = document.createElement("i");
        elevationIcon.className = "fa-solid fa-mountain";
        elevationIcon.id = "elevation_icon";
        elevationIcon.classList.add("dropdownButton");
        elevationIcon.style.top = "35%";
        elevationIcon.style.cursor = "pointer";
        hintDropdown.appendChild(elevationIcon);
        let offset =
          ((elevationIcon.parentElement.clientWidth - elevationIcon.clientWidth) /
            elevationIcon.parentElement.clientWidth) *
          50;
        elevationIcon.style.left = offset + "%";
    
        let elevationDropdown = document.createElement("div");
        elevationDropdown.id = "elevation_dropdown";
        elevationDropdown.textContent = airportElevation + "ft";
        elevationDropdown.style.visibility = "hidden";
        elevationIcon.append(elevationDropdown);
    
        let elevationHider = document.createElement("div");
        elevationHider.id = "elevation_hint_hider";
        if (!hasOpenedElev) {
          elevationHider.style.visibility = "hidden";
          elevationDropdown.style.visibility = "hidden";
        } else if (hasOpenedElev) {
          elevationHider.style.visibility = "visible";
          elevationDropdown.style.visibility = "visible";
        }
        hintDropdown.append(elevationHider);
    
        elevationIcon.onclick = app.hints.elevIcon
    
        let countryIcon = document.createElement("i");
        countryIcon.className = "fa-solid fa-earth-europe";
        countryIcon.classList.add("dropdownButton");
        countryIcon.id = "country_icon";
        countryIcon.style.top = "60%";
        if (countryCursor == true) {
          countryIcon.style.cursor = "pointer";
        }
        if (hasOpenedElev) {
          countryIcon.style.color = "var(--black)";
        } else {
          countryIcon.style.color = "var(--lightgrey)";
        }
        hintDropdown.appendChild(countryIcon);
        width =
          ((countryIcon.parentElement.clientWidth - countryIcon.clientWidth) /
            countryIcon.parentElement.clientWidth) *
          50;
        countryIcon.style.left = width + "%";
    
        let countryDropdown = document.createElement("div");
        countryDropdown.id = "country_dropdown";
        countryDropdown.textContent = airportCountry;
        countryDropdown.style.visibility = "hidden";
        countryIcon.append(countryDropdown);
    
        let countryHider = document.createElement("div");
        countryHider.id = "country_hint_hider";
        countryHider.style.visibility = "hidden";
        hintDropdown.append(countryHider);
    
        if (!hasOpenedCountry) {
          countryHider.style.visibility = "hidden";
          countryDropdown.style.visibility = "hidden";
        } else if (hasOpenedCountry) {
          countryHider.style.visibility = "visible";
          countryDropdown.style.visibility = "visible";
        }
    
        countryIcon.onclick = app.hints.countryIcon
    
        let cityIcon = document.createElement("i");
        cityIcon.className = "fa-solid fa-city";
        cityIcon.id = "city_icon";
        cityIcon.classList.add("dropdownButton");
        cityIcon.style.top = "85%";
        if (cityCursor == true) {
          cityIcon.style.cursor = "pointer";
        }
        hintDropdown.appendChild(cityIcon);
        width =
          ((cityIcon.parentElement.clientWidth - cityIcon.clientWidth) /
            cityIcon.parentElement.clientWidth) *
          50;
        cityIcon.style.left = width + "%";
    
        let cityDropdown = document.createElement("div");
        cityDropdown.id = "city_dropdown";
        cityDropdown.textContent = airportCity;
        cityDropdown.style.visibility = "hidden";
        cityIcon.append(cityDropdown);
    
        let cityHider = document.createElement("div");
        cityHider.id = "city_hint_hider";
        cityHider.style.visibility = "hidden";
        hintDropdown.append(cityHider);
    
        if (hasOpenedCountry) {
          cityIcon.style.color = "var(--black)";
        } else {
          cityIcon.style.color = "var(--lightgrey)";
        }
    
        if (!hasOpenedCity) {
          cityHider.style.visibility = "hidden";
          cityDropdown.style.visibility = "hidden";
        } else if (hasOpenedCity) {
          cityHider.style.visibility = "visible";
          cityDropdown.style.visibility = "visible";
        }
    
        hintOpen = true;
    
        cityIcon.onclick = app.hints.cityIcon
    }
      
    closeHintMenu() {
        let hintDropdown = document.getElementById("hint_dropdown_id");
        hintDropdown.remove();
        hintOpen = false;
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