class App {
  constructor() {
    this.icaodleVersion = "v1.2.0";

    this.target = "letter_box_0_0";
    this.target_row = 0;
    this.finished = false;
    this.correct = false;
    this.isEndScreenOpen = false;
    this.hintOpen = false;
    this.correctCount = 0;
    this.apiIsCalled = false;
    this.guessedCodes = [];
    this.usedCodes = [];
    this.hasOpenedElev = false;
    this.hasOpenedCountry = false;
    this.hasOpenedCity = false;
    this.intlCodes = false;
    this.menuOpen = false;

    this.countryCursor = false;
    this.cityCursor = false;

    this.airportName = "Placeholder Airport";
    this.airportCity = "-----";
    this.airportState = "";
    this.airportCountry = "-----";
    this.airportElevation = "-----";
    this.airportLink = "";
    this.airportHomeLink = "";
    this.animatingBox = false;
    this.animatingMenu = false;
    this.durationModif = 0.25;

    this.localStorageManager = new LSM()
    this.settings = new Settings()
    this.tutorial = new Tutorial()
    this.hints = new Hints()
    this.endScreen = new EndScreen()
    this.keyboard = new Keyboard()
    this.airportHandler = new AirportHandler()
    this.feedbackHandler = new FeedbackHandler()
    this.game = new Game()
  }

  //Onclicks for things that don't get created in JS
  addClicks() {
    document.getElementById("menu_icon").onclick = this.tutorial.menuIcon.bind(this.tutorial)

    document.getElementById("hint_icon").onclick = this.hints.hintIcon.bind(this.hints)

    document.getElementById("settings_icon").onclick = this.settings.settingsIcon.bind(this.settings)

    document.getElementById("new_airport_icon").onclick = function () { app.game.reset() }

    document.getElementById("stats_icon").onclick = this.endScreen.endScreen.bind(this.endScreen)
  }

  toggleElement(element, top = 0) {
    if (element.open && !this.animatingMenu) {
      this.animatingMenu = true;
      this.menuOpen = false;
      element.open = false
      element.style.transition = "opacity 0.4s 0.1s, top 0.5s";
      element.style.top = window.outerHeight + "px";
      element.style.opacity = 0;
      window.setTimeout(function () {
        element.style.visibility = "hidden";
        app.animatingMenu = false;
      }, 500);
    } else if (!element.open && !this.animatingMenu) {
      this.menuOpen = true;
      this.animatingMenu = true;
      element.open = true
      element.style.top = window.outerHeight + "px";
      element.style.opacity = 0;
      element.style.transition = "opacity 0.4s 0.1s, top 0.5s";
      element.style.visibility = "visible";
      element.style.top = top + "px";
      element.style.opacity = 1;
      window.setTimeout(function () {
        app.animatingMenu = false;
      }, 500);
    }
  }

  turnGreen(box, guess, transition) {
    box.style.backgroundColor = "var(--green)";
    box.style.borderColor = "var(--green)";
    box.style.color = "white";
    document.getElementById(guess).style.transition = transition
    document.getElementById(guess).style.backgroundColor = "var(--green)"
    document.getElementById(guess).style.borderColor = "var(--green)"
    document.getElementById(guess).style.color = "white"
  }


  turnYellow(box, guess, transition) {
    box.style.backgroundColor = "var(--yellow)";
    box.style.borderColor = "var(--yellow)";
    box.style.color = "white";
    if (document.getElementById(guess).style.backgroundColor != "var(--green)") {
      document.getElementById(guess).style.transition = transition
      document.getElementById(guess).style.backgroundColor = "var(--yellow)"
      document.getElementById(guess).style.borderColor = "var(--yellow)"
      document.getElementById(guess).style.color = "white"
    }
  }

  turnGrey(box, guess, transition) {
    box.style.backgroundColor = "var(--darkgrey)";
    box.style.borderColor = "var(--darkgrey)";
    box.style.color = "white";
    let key = document.getElementById(guess)
    if (key.style.backgroundColor != "var(--green)" || key.style.backgroundColor == "var(--yellow)") {
      document.getElementById(guess).style.transition = transition
      key.style.backgroundColor = "var(--darkgrey)"
      key.style.borderColor = "var(--darkgrey)"
      document.getElementById(guess).style.color = "white"
    }
  }

  moveDel() {
    let del_btn = document.getElementById("clear_row_button");
    let top = parseInt(del_btn.style.top);
    let box;
    if (this.target_row != 6) {
      box = document.getElementById(this.target);
    } else {
      box = document.getElementById("letter_box_5_0");
    }
    top += box.parentElement.parentElement.clientHeight / box.parentElement.parentElement.children.length;
    del_btn.style.transition = "top 0.1s linear";
    del_btn.style.top = top + "px";
  }

  keyDown(event) {
    let keyCode = event.code;
    let key;
    if (
      keyCode != "Enter" &&
      keyCode != "Backspace" &&
      keyCode != "Backquote" &&
      keyCode != "Equal"
    ) {
      let keyArray = keyCode.split("Key");
      key = keyArray[1];
    } else if (
      keyCode == "Backquote" &&
      JSON.parse(window.localStorage.getItem("isDev"))
    ) {
      dev.superTopSecretMethod();
    } else {
      key = keyCode;
    }
    this.game.renderLetter(key);
  }

  createKeyboard() {
    for (let i = 0; i < 3; i++) {
      let container = document.getElementById("keyboard_container");
      let row = document.createElement("div");
      row.id = "keyboard_row" + container.length;
      row.className = "keyboard_row";
      let keys;
      if (i == 0) {
        keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
      } else if (i == 1) {
        keys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
      } else if (i == 2) {
        keys = ["DELETE", "Z", "X", "C", "V", "B", "N", "M", "ENTER"];
      }
      for (let r = 0; r < keys.length; r++) {
        let key = document.createElement("div");
        key.id = keys[r];
        key.textContent = keys[r];
        if (key.textContent == "ENTER" || key.textContent == "DELETE") {
          key.className = "enter_delete_key";
        } else {
          key.className = "key";
        }
        key.onclick = this.keyboard.key.bind(this.keyboard);
        row.append(key);
      }
      container.append(row);
    }
  }

  resize() {
    //Changes all the sizes/positions to be acurate with the new window
    let box;
    if (this.target_row != 6) {
      box = document.getElementById(this.target);
    } else {
      box = document.getElementById("letter_box_5_3");
    }
    let line = document.getElementById("bottom_header_line");

    //Message for not a real code
    let codeMsg = document.getElementById("error_msg");
    if (codeMsg != null || codeMsg != undefined) {
      codeMsg.style.left = document.body.clientWidth / 2 - error.clientWidth / 2 + "px";
      codeMsg.style.top = line.offsetHeight * 1.1 + "px";
    }

    //Stats/End Screen
    let popUp = document.getElementById("pop_up_id");
    if (popUp != null || popUp != undefined) {
      popUp.style.left = document.body.clientWidth / 2 - popUp.clientWidth / 2 + "px";
      popUp.style.top = document.body.clientHeight / 2 - popUp.clientHeight / 2 + "px";
    }

    let tutorialPopUp = document.getElementById("tutorial_pop_up_id");
    if (tutorialPopUp != null || tutorialPopUp != undefined) {
      tutorialPopUp.style.left =
        document.body.clientWidth / 2 - tutorialPopUp.clientWidth / 2 + "px";
      tutorialPopUp.style.top =
        document.body.clientHeight / 2 - tutorialPopUp.clientHeight / 2 + "px";
    }

    //Hints Menu icons

    let elevationIcon = document.getElementById("elev_icon");
    if (elevationIcon != null || elevationIcon != undefined) {
      let width = ((elevationIcon.parentElement.clientWidth - elevationIcon.clientWidth) / elevationIcon.parentElement.clientWidth) * 50;
      elevationIcon.style.left = width + "%";
    }

    let countryIcon = document.getElementById("country_icon");
    if (countryIcon != null || countryIcon != undefined) {
      let width = ((countryIcon.parentElement.clientWidth - countryIcon.clientWidth) / countryIcon.parentElement.clientWidth) * 50;
      countryIcon.style.left = width + "%";
    }

    let cityIcon = document.getElementById("city_icon");
    if (cityIcon != null || cityIcon != undefined) {
      let width = ((cityIcon.parentElement.clientWidth - cityIcon.clientWidth) / cityIcon.parentElement.clientWidth) * 50;
      cityIcon.style.left = width + "%";
    }

    //Keybaord
    let keyboard = document.getElementById("keyboard_container");
    for (let i = 0; i < keyboard.children.length; i++) {
      let row = keyboard.children[i];
      for (let x = 0; x < row.children.length; x++) {
        let key = row.children[x];
        key.style.height = "84.4%";
        key.style.fontSize = key.clientHeight / 3.6 + "px";
        key.style.paddingLeft = key.clientHeight - parseInt(Math.sqrt(key.style.fontSize)) + "px";
        key.style.paddingRight = key.style.paddingLeft;
        key.style.paddingTop = parseInt(key.style.paddingLeft) / 5 + "px";
        key.style.paddingBottom = key.style.paddingTop;
      }
    }

    let main_container = document.getElementById("main_container");
    main_container.style.paddingTop = document.body.clientHeight / 20 + "px";

    //Boxes
    let row_container = document.getElementById("letter_box_container");
    for (let i = 0; i < row_container.children.length; i++) {
      let row = row_container.children[i];
      row.style.height =
        document.getElementById("keyboard_container").offsetTop / 9 + "px";
      if (row.clientHeight < 23.6966824) {
        row.style.height = "23.6966824px";
      } else {
        if (row.clientHeight > 88.8625592415) {
          row.style.height = "88.8625592415px";
        }
        if (
          keyboard.offsetTop <
          row_container.offsetTop + row_container.clientHeight
        ) {
          keyboard.style.visibility = "hidden";
        } else {
          keyboard.style.visibility = "visible";
        }
      }
      for (let r = 0; r < row.children.length; r++) {
        row.children[r].style.height = "84.4%";
        if (row.children[r].clientHeight < 20) {
          row.children[r].style.height = "20px";
        } else if (row.children[r].clientHeight > 75) {
          row.children[r].style.height = "75px";
        }
        row.children[r].style.width = row.children[r].clientHeight + "px";
        row.children[r].style.margin = row.children[r].clientWidth * 0.083 + "px";
        row.children[r].style.fontSize =
          row.children[r].clientHeight / 1.5 + "px";
        row.children[r].style.lineHeight = row.children[r].clientHeight + "px";
      }
    }

    //Settings Menu
    let menu = document.getElementById("settings_unflex");
    menu.style.left = document.body.clientWidth / 2 - menu.clientWidth / 2 + "px";
    if (
      document.getElementById("settings_footer").offsetTop <
      document.getElementById("last_line").offsetTop
    ) {
      document.getElementById("settings_footer").style.visibility = "hidden";
    }

    //Tutorial
    let tutorial = document.getElementById("tutorial_unflex");
    tutorial.style.left =
      document.body.clientWidth / 2 - tutorial.clientWidth / 2 + "px";

    //Clear Row button
    let del = document.getElementById("clear_row_button");
    let left =
      box.parentElement.lastChild.getBoundingClientRect().left +
      box.parentElement.lastChild.clientWidth * 1.33;
    let top =
      box.parentElement.getBoundingClientRect().top +
      box.parentElement.clientHeight / 2;
    del.style.top = top + "px";
    del.style.left = left + "px";
    let scale = box.clientHeight / 55;
    if (scale <= 1.5) {
      del.style.transform = "scale(" + scale + ")";
    } else {
      del.style.transform = "scale(1.5)";
    }
  }

  load() {
    this.settings.createSettingsMenu();
    this.tutorial.createTutorialPage();
    for (let i = 0; i < 6; i++) {
      this.game.createRow();
    }
    this.game.createRowDeletion();
    this.createKeyboard();
    this.resize();
    this.settings.setViewMode();
    this.localStorageManager.checkStorage();
    this.addClicks();
    this.tutorial.tutorialPopup();
    this.airportHandler.callAPI();
  }
}