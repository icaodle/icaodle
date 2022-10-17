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
      let offset = ((elevationIcon.parentElement.clientWidth - elevationIcon.clientWidth) / elevationIcon.parentElement.clientWidth) * 50;
      elevationIcon.style.left = offset + "%";
  
      let elevationDropdown = document.createElement("div");
      elevationDropdown.id = "elevation_dropdown";
      elevationDropdown.textContent = app.airportHandler.airportElevation + "ft";
      elevationDropdown.style.visibility = "hidden";
      elevationIcon.append(elevationDropdown);
  
      let elevationHider = document.createElement("div");
      elevationHider.id = "elevation_hint_hider";
      if (!app.hasOpenedElev) {
        elevationHider.style.visibility = "hidden";
        elevationDropdown.style.visibility = "hidden";
      } else if (app.hasOpenedElev) {
        elevationHider.style.visibility = "visible";
        elevationDropdown.style.visibility = "visible";
      }
      hintDropdown.append(elevationHider);
  
      elevationIcon.onclick = this.elevIcon.bind(this)
  
      let countryIcon = document.createElement("i");
      countryIcon.className = "fa-solid fa-earth-europe";
      countryIcon.classList.add("dropdownButton");
      countryIcon.id = "country_icon";
      countryIcon.style.top = "60%";
      if (app.countryCursor == true) {
        countryIcon.style.cursor = "pointer";
      }
      if (app.hasOpenedElev) {
        countryIcon.style.color = "var(--black)";
      } else {
        countryIcon.style.color = "var(--lightgrey)";
      }
      hintDropdown.appendChild(countryIcon);
      let width = ((countryIcon.parentElement.clientWidth - countryIcon.clientWidth) / countryIcon.parentElement.clientWidth) * 50;
      countryIcon.style.left = width + "%";
  
      let countryDropdown = document.createElement("div");
      countryDropdown.id = "country_dropdown";
      countryDropdown.textContent = app.airportHandler.airportCountry;
      countryDropdown.style.visibility = "hidden";
      countryIcon.append(countryDropdown);
  
      let countryHider = document.createElement("div");
      countryHider.id = "country_hint_hider";
      countryHider.style.visibility = "hidden";
      hintDropdown.append(countryHider);
  
      if (!app.hasOpenedCountry) {
        countryHider.style.visibility = "hidden";
        countryDropdown.style.visibility = "hidden";
      } else if (app.hasOpenedCountry) {
        countryHider.style.visibility = "visible";
        countryDropdown.style.visibility = "visible";
      }
  
      countryIcon.onclick = this.countryIcon.bind(this)
  
      let cityIcon = document.createElement("i");
      cityIcon.className = "fa-solid fa-city";
      cityIcon.id = "city_icon";
      cityIcon.classList.add("dropdownButton");
      cityIcon.style.top = "85%";
      if (app.cityCursor == true) {
        cityIcon.style.cursor = "pointer";
      }
      hintDropdown.appendChild(cityIcon);
      width = ((cityIcon.parentElement.clientWidth - cityIcon.clientWidth) / cityIcon.parentElement.clientWidth) * 50;
      cityIcon.style.left = width + "%";
  
      let cityDropdown = document.createElement("div");
      cityDropdown.id = "city_dropdown";
      cityDropdown.textContent = app.airportHandler.airportCity;
      cityDropdown.style.visibility = "hidden";
      cityIcon.append(cityDropdown);
  
      let cityHider = document.createElement("div");
      cityHider.id = "city_hint_hider";
      cityHider.style.visibility = "hidden";
      hintDropdown.append(cityHider);
  
      if (app.hasOpenedCountry) {
        cityIcon.style.color = "var(--black)";
      } else {
        cityIcon.style.color = "var(--lightgrey)";
      }
  
      if (!app.hasOpenedCity) {
        cityHider.style.visibility = "hidden";
        cityDropdown.style.visibility = "hidden";
      } else if (app.hasOpenedCity) {
        cityHider.style.visibility = "visible";
        cityDropdown.style.visibility = "visible";
      }
  
      app.hintOpen = true;
  
      cityIcon.onclick = this.cityIcon.bind(this)
    }
      
    closeHintMenu() {
      let hintDropdown = document.getElementById("hint_dropdown_id");
      hintDropdown.remove();
      app.hintOpen = false;
    }

    hintIcon(){
        if (!app.hintOpen) {
            this.openHintMenu();
        } else if (app.hintOpen) {
            this.closeHintMenu();
        }
    }

    elevIcon(){
      let elevationDropdown = document.getElementById("elevation_dropdown")
      let elevationHider = document.getElementById("elevation_hint_hider")
        if (elevationDropdown.style.visibility == "hidden") {
    
            app.hasOpenedElev = true;
            let hints = JSON.parse(window.localStorage.getItem("Hints_Used"));
            if (!app.finished){
              hints += 1;
            }
            window.localStorage.setItem("Hints_Used", hints.toString());
            document.getElementById("country_icon").style.color = "var(--black)";
            document.getElementById("country_icon").style.cursor = "pointer";
            app.countryCursor = true;
            elevationDropdown.style.visibility = "visible";
            elevationHider.style.visibility = "visible";
          }
    }

    countryIcon(){
      let countryDropdown = document.getElementById("country_dropdown")
      let countryHider = document.getElementById("country_hint_hider")
        if (countryDropdown.style.visibility == "hidden" && app.hasOpenedElev) {
            app.hasOpenedCountry = true;
            let hints = JSON.parse(window.localStorage.getItem("Hints_Used"));
            if (!app.finished){
              hints += 1;
            }
            window.localStorage.setItem("Hints_Used", hints.toString());
            document.getElementById("city_icon").style.color = "var(--black)";
            document.getElementById("city_icon").style.cursor = "pointer";
            app.cityCursor = true;
            countryDropdown.style.visibility = "visible";
            countryHider.style.visibility = "visible";
          }
    }

    cityIcon(){
      let cityDropdown = document.getElementById("city_dropdown")
      let cityHider = document.getElementById("city_hint_hider")
        if (cityDropdown.style.visibility == "hidden" && app.hasOpenedElev && app.hasOpenedCountry) {
            app.hasOpenedCity = true;
            let hints = JSON.parse(window.localStorage.getItem("Hints_Used"));
            if (!app.finished){
              hints += 1;
            }
            window.localStorage.setItem("Hints_Used", hints.toString());
            cityDropdown.style.visibility = "visible";
            cityHider.style.visibility = "visible";
        }
    }
}