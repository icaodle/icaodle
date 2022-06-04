class EndScreen{
    constructor(){
        
    }

    endScreenButton(){
      app.localStorageManager.checkStorage();
      app.endScreen.endScreen();
  }

    endScreen() {
        let popUp = document.createElement("div");
        let overlay = document.createElement("div");
        popUp.className = "pop_up";
        popUp.id = "pop_up_id";
        popUp.style.visibility = "hidden";
        overlay.className = "overlay";
        overlay.id = "overlay_id";
        document.body.append(overlay);
        document.body.append(popUp);
        popUp.style.left = document.body.clientWidth / 2 - popUp.clientWidth / 2 + "px";
        popUp.style.top = window.outerHeight + "px";
      
        let exitDiv = document.createElement("div");
        exitDiv.className = "exit_div";
        popUp.append(exitDiv);
      
        let exitFiller = document.createElement("div");
        exitFiller.className = "exit_filler";
        popUp.firstChild.append(exitFiller);
      
        let exitButton = document.createElement("i");
        exitButton.className = "fa-solid fa-xmark fa-xl";
        exitButton.id = "exit_button";
        popUp.firstChild.append(exitButton);
      
        let exitEndScreenButton = document.getElementById("exit_button");
        exitEndScreenButton.onclick = this.exitEndScreen.bind(this);
        overlay.onclick = this.exitEndScreen.bind(this);
      
        let spacer0 = document.createElement("div");
        spacer0.className = "spacer";
        popUp.append(spacer0);
      
        if (finished == true) {
          let airportTitle = document.createElement("a");
          airportTitle.className = "pop_up_grand_title";
          if (app.airportHandler.airportLink != "" && app.airportHandler.airportHomeLink != "") {
            airportTitle.href = app.airportHandler.airportLink;
            airportTitle.target = "_blank";
          } else if (app.airportHandler.airportLink == "" && app.airportHandler.airportHomeLink != "") {
            airportTitle.href = app.airportHandler.airportHomeLink;
            airportTitle.target = "_blank";
          } else if (app.airportHandler.airportLink != "" && app.airportHandler.airportHomeLink == "") {
            airportTitle.href = app.airportHandler.airportLink;
            airportTitle.target = "_blank";
          }
          airportTitle.textContent = app.airportHandler.airportName + " (" + app.airportHandler.airportCode + ")";
          popUp.append(airportTitle);
      
          let airportContainer = document.createElement("div");
          airportContainer.className = "airport_container_finished";
          popUp.append(airportContainer);
      
          let airportContainerLeft = document.createElement("div");
          airportContainerLeft.className = "airport_subcontainer";
          airportContainer.appendChild(airportContainerLeft);
      
          let airportContainerMid = document.createElement("div");
          airportContainerMid.className = "airport_subcontainer";
          airportContainer.appendChild(airportContainerMid);
      
          let airportContainerRight = document.createElement("div");
          airportContainerRight.className = "airport_subcontainer";
          airportContainer.appendChild(airportContainerRight);
      
          let airportElevationContainer = document.createElement("div");
          airportElevationContainer.className = "airport_details";
          if (app.airportHandler.airportElevation == "" || airportElevation == null) {
            airportElevationContainer.textContent = "[Missing]";
          } else {
            airportElevationContainer.textContent = app.airportHandler.airportElevation + "ft";
          }
          airportContainerLeft.appendChild(airportElevationContainer);
      
          let airportCityContainer = document.createElement("div");
          airportCityContainer.className = "airport_details";
          if (app.airportHandler.airportCity == "" || app.airportHandler.airportCity == null) {
            airportCityContainer.textContent = "[Missing]";
          } else {
            airportCityContainer.textContent = app.airportHandler.airportCity;
          }
          airportContainerMid.appendChild(airportCityContainer);
      
          let airportCountryContainer = document.createElement("div");
          airportCountryContainer.className = "airport_details";
          if (app.airportHandler.airportCountry == "" || app.airportHandler.airportCountry == null) {
            airportCountryContainer.textContent = "[Missing]";
          } else {
            airportCountryContainer.textContent = app.airportHandler.airportCountry;
          }
          airportContainerRight.appendChild(airportCountryContainer);
      
          let elevationContainer = document.createElement("div");
          elevationContainer.className = "details";
          elevationContainer.textContent = "Elevation";
          airportContainerLeft.appendChild(elevationContainer);
      
          let cityContainer = document.createElement("div");
          cityContainer.className = "details";
          cityContainer.textContent = "Municipality";
          airportContainerMid.appendChild(cityContainer);
      
          let countryContainer = document.createElement("div");
          countryContainer.className = "details";
          countryContainer.textContent = "Country";
          airportContainerRight.appendChild(countryContainer);
        } else {
          let airportTitle = document.createElement("div");
          airportTitle.className = "pop_up_title";
          airportTitle.textContent = "icaodle (ICAO)";
          popUp.append(airportTitle);
      
          let airportContainer = document.createElement("div");
          airportContainer.className = "airport_container_unfinished";
          airportContainer.textContent =
            "Content Hidden Until Current Game is Finished";
          popUp.append(airportContainer);
        }
      
        let spacer1 = document.createElement("div");
        spacer1.className = "spacer";
        popUp.append(spacer1);
      
        let statsTitle = document.createElement("div");
        statsTitle.className = "pop_up_title";
        statsTitle.textContent = "STATISTICS";
        popUp.append(statsTitle);
      
        let statsContainer = document.createElement("div");
        statsContainer.className = "stats_container";
        popUp.append(statsContainer);
      
        let statsContainerLeft = document.createElement("div");
        statsContainerLeft.className = "stats_subcontainer";
        statsContainer.appendChild(statsContainerLeft);
      
        let statsContainerInnerLeft = document.createElement("div");
        statsContainerInnerLeft.className = "stats_subcontainer";
        statsContainer.appendChild(statsContainerInnerLeft);
      
        let statsContainerInnerRight = document.createElement("div");
        statsContainerInnerRight.className = "stats_subcontainer";
        statsContainer.appendChild(statsContainerInnerRight);
      
        let statsContainerRight = document.createElement("div");
        statsContainerRight.className = "stats_subcontainer";
        statsContainer.appendChild(statsContainerRight);
      
        let statsContainerFarRight = document.createElement("div");
        statsContainerFarRight.className = "stats_subcontainer";
        statsContainer.appendChild(statsContainerFarRight);
      
        let leftStatsField = document.createElement("div");
        leftStatsField.className = "stats_field";
        leftStatsField.textContent = window.localStorage.getItem("Games");
        statsContainerLeft.appendChild(leftStatsField);
      
        let innerLeftStatsField = document.createElement("div");
        innerLeftStatsField.className = "stats_field";
        let win_percent = Math.round((parseInt(window.localStorage.getItem("Wins")) / parseInt(window.localStorage.getItem("Games"))) * 100).toString();
        if (win_percent == "NaN") {
          win_percent = "N/A";
        }
        innerLeftStatsField.textContent = win_percent;
        statsContainerInnerLeft.appendChild(innerLeftStatsField);
      
        let innerRightStatsField = document.createElement("div");
        innerRightStatsField.className = "stats_field";
        innerRightStatsField.textContent = window.localStorage.getItem("Streak");
        statsContainerInnerRight.appendChild(innerRightStatsField);
      
        let rightStatsField = document.createElement("div");
        rightStatsField.className = "stats_field";
        rightStatsField.textContent = window.localStorage.getItem("High_Streak");
        statsContainerRight.appendChild(rightStatsField);
      
        let farRightStatsField = document.createElement("div");
        farRightStatsField.className = "stats_field";
        farRightStatsField.textContent = window.localStorage.getItem("Hints_Used");
        statsContainerFarRight.appendChild(farRightStatsField);
      
        let leftStatsDescr = document.createElement("div");
        leftStatsDescr.className = "stats_descr";
        leftStatsDescr.textContent = "Played";
        statsContainerLeft.appendChild(leftStatsDescr);
      
        let innerLeftStatsDescr = document.createElement("div");
        innerLeftStatsDescr.className = "stats_descr";
        innerLeftStatsDescr.textContent = "Win %";
        statsContainerInnerLeft.appendChild(innerLeftStatsDescr);
      
        let innerRightStatsDescr = document.createElement("div");
        innerRightStatsDescr.className = "stats_descr";
        innerRightStatsDescr.textContent = "Streak";
        statsContainerInnerRight.appendChild(innerRightStatsDescr);
      
        let rightStatsDescr = document.createElement("div");
        rightStatsDescr.className = "stats_descr";
        rightStatsDescr.textContent = "Max Streak";
        statsContainerRight.appendChild(rightStatsDescr);
      
        let farRightStatsDescr = document.createElement("div");
        farRightStatsDescr.className = "stats_descr";
        farRightStatsDescr.textContent = "Hints";
        statsContainerFarRight.appendChild(farRightStatsDescr);
      
        let spacer2 = document.createElement("div");
        spacer2.className = "spacer";
        popUp.append(spacer2);
      
        let guessTitle = document.createElement("div");
        guessTitle.className = "pop_up_title";
        guessTitle.textContent = "GUESS DISTRIBUTION";
        popUp.append(guessTitle);
      
        let guessContainer = document.createElement("div");
        guessContainer.id = "guess_container";
        popUp.append(guessContainer);
      
        this.barGraphCreate();
        app.toggleElement(popUp, document.body.clientHeight / 2 - popUp.clientHeight / 2);
        isEndScreenOpen = true;
      }
      
      exitEndScreen() {
        let popUpContainer = document.getElementById("pop_up_id");
        let overlay = document.getElementById("overlay_id");
        popUpContainer.style.visibility = "visible";
        app.toggleElement(popUpContainer);
        window.setTimeout(function () {
          popUpContainer.remove();
          overlay.remove();
          app.isEndScreenOpen = false;
        }, 500);
      }
  
      barGraphCreate() {
        let array = window.localStorage.getItem("Lengths");
        let container = document.getElementById("guess_container");
        let counts = [0, 0, 0, 0, 0, 0];
        for (let i = 0; i < array.length; i++) {
          counts[array[i] - 1] += 1;
        }
        let most_common = Math.max(...counts);
        for (let i = 0; i < 6; i++) {
          let barContainer = document.createElement("div");
          barContainer.className = "bar_graph_bar_container";
          container.append(barContainer);
          let barNumber = document.createElement("div");
          barNumber.className = "bar_graph_bar_number";
          barNumber.textContent = i + 1;
          barContainer.append(barNumber);
          let bar = document.createElement("div");
          bar.className = "bar_graph_bar";
          if (i + 1 == app.target_row && app.correct) {
            bar.style.backgroundColor = "var(--green)";
          }
          bar.id = "bar" + (i + 1).toString();
          bar.textContent = counts[i];
          barContainer.append(bar);
          let segment = (container.clientWidth * 0.9) / most_common;
          bar.style.width = counts[i] * segment + "px";
          if (JSON.parse(window.localStorage.getItem("updateGraph"))) {
            bar.style.transition = "width 1s ease-out";
          } else {
            bar.style.transition = "";
          }
        }
        window.localStorage.setItem("updateGraph", "false");
      }
}