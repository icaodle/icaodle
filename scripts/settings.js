class Settings{
  constructor(){
  }

  createSettingsMenu() {
    let body = document.body;
    let settingsContainer = document.createElement("div");
    settingsContainer.id = "settings_container";
    settingsContainer.style.visibility = "hidden";
    settingsContainer.style.top = window.outerWidth + "px";
    settingsContainer.style.opacity = 0;
    body.append(settingsContainer);
  
    let settingsUnflex = document.createElement("div");
    settingsUnflex.id = "settings_unflex";
    settingsContainer.append(settingsUnflex);
  
    let settingsSub = document.createElement("div");
    settingsSub.id = "settings_container_sub";
    settingsUnflex.append(settingsSub);
  
    let settingsRow = document.createElement("div");
    settingsRow.className = "menu_row";
    settingsSub.append(settingsRow);
  
    let titleDiv = document.createElement("div");
    titleDiv.className = "menu_title";
    titleDiv.textContent = "SETTINGS";
    titleDiv.align = "center";
    titleDiv.width = "100%";
    settingsRow.append(titleDiv);
  
    let exitButton = document.createElement("i");
    exitButton.className = "fa-solid fa-xmark fa-xl";
    exitButton.id = "settings_exit_button";
    exitButton.right = "0px";
    settingsUnflex.append(exitButton);
  
    exitButton.onclick = this.settingsExitBtn
  
    let settingsSpacer = document.createElement("div");
    settingsSpacer.className = "menu_spacer";
    settingsSub.append(settingsSpacer);
  
    let settingsRow1 = document.createElement("div");
    settingsRow1.className = "menu_row";
    settingsSub.append(settingsRow1);
  
    let settingsRow1Left = document.createElement("div");
    settingsRow1Left.className = "settings_row_left";
    settingsRow1.append(settingsRow1Left);
  
    let settingsRow1Right = document.createElement("div");
    settingsRow1Right.className = "settings_row_right";
    settingsRow1.append(settingsRow1Right);
  
    let slider1 = document.createElement("label");
    slider1.className = "switch";
    settingsRow1Right.append(slider1);
  
    let slider1Input = document.createElement("input");
    slider1Input.type = "checkbox";
    slider1Input.checked = JSON.parse(
      window.localStorage.getItem("onlyInternationalCodes")
    );
    slider1.append(slider1Input);
  
    let slider1Span = document.createElement("span");
    slider1Span.className = "slider round";
    slider1.append(slider1Span);
  
    slider1Input.onclick = this.slider1Input
  
    let settingsRow1LeftRow1 = document.createElement("div");
    settingsRow1LeftRow1.className = "settings_row_left_one";
    settingsRow1LeftRow1.textContent = "International Mode";
    settingsRow1Left.append(settingsRow1LeftRow1);
  
    let settingsRow1LeftRow2 = document.createElement("div");
    settingsRow1LeftRow2.className = "settings_row_left_two";
    settingsRow1LeftRow2.textContent =
      "Limit airports to international airports.";
    settingsRow1Left.append(settingsRow1LeftRow2);
  
    let line1 = document.createElement("div");
    line1.className = "menu_line";
    settingsSub.append(line1);
  
    let settingsRow2 = document.createElement("div");
    settingsRow2.className = "menu_row";
    settingsSub.append(settingsRow2);
  
    let settingsRow2Left = document.createElement("div");
    settingsRow2Left.className = "settings_row_left";
    settingsRow2.append(settingsRow2Left);
  
    let settingsRow2Right = document.createElement("div");
    settingsRow2Right.className = "settings_row_right";
    settingsRow2.append(settingsRow2Right);
  
    let slider2 = document.createElement("label");
    slider2.className = "switch";
    settingsRow2Right.append(slider2);
  
    let slider2Input = document.createElement("input");
    slider2Input.type = "checkbox";
    slider2Input.checked = JSON.parse(window.localStorage.getItem("darkMode"));
    slider2.append(slider2Input);
  
    let slider2Span = document.createElement("span");
    slider2Span.className = "slider round";
    slider2.append(slider2Span);
  
    slider2Input.onclick = this.toggleDarkmode
  
    let settingsRow2LeftRow1 = document.createElement("div");
    settingsRow2LeftRow1.className = "settings_row_left_one";
    settingsRow2LeftRow1.textContent = "Dark Mode";
    settingsRow2Left.append(settingsRow2LeftRow1);
  
    let settingsRow2LeftRow2 = document.createElement("div");
    settingsRow2LeftRow2.className = "settings_row_left_two";
    settingsRow2LeftRow2.textContent = "For night owls.";
    settingsRow2Left.append(settingsRow2LeftRow2);
  
    let line2 = document.createElement("div");
    line2.className = "menu_line";
    settingsSub.append(line2);
  
    let settingsRow3 = document.createElement("div");
    settingsRow3.className = "menu_row";
    settingsSub.append(settingsRow3);
  
    let settingsRow3Left = document.createElement("div");
    settingsRow3Left.className = "settings_row_left";
    settingsRow3.append(settingsRow3Left);
  
    let settingsRow3Right = document.createElement("div");
    settingsRow3Right.className = "settings_row_right";
    settingsRow3.append(settingsRow3Right);
  
    let slider3 = document.createElement("label");
    slider3.className = "switch";
    settingsRow3Right.append(slider3);
  
    let slider3Input = document.createElement("input");
    slider3Input.type = "checkbox";
    slider3Input.checked = JSON.parse(window.localStorage.getItem("altColor"));
    slider3.append(slider3Input);
  
    let slider3Span = document.createElement("span");
    slider3Span.className = "slider round";
    slider3.append(slider3Span);
  
    slider3Input.onclick = this.toggleColorblind
  
    let settingsRow3LeftRow1 = document.createElement("div");
    settingsRow3LeftRow1.className = "settings_row_left_one";
    settingsRow3LeftRow1.textContent = "High Contrast Mode";
    settingsRow3Left.append(settingsRow3LeftRow1);
  
    let settingsRow3LeftRow2 = document.createElement("div");
    settingsRow3LeftRow2.className = "settings_row_left_two";
    settingsRow3LeftRow2.textContent = "For improved color vision.";
    settingsRow3Left.append(settingsRow3LeftRow2);
  
    let line3 = document.createElement("div");
    line3.className = "menu_line";
    settingsSub.append(line3);
  
    let settingsRow4 = document.createElement("div");
    settingsRow4.className = "menu_row";
    settingsSub.append(settingsRow4);
  
    let settingsRow4Left = document.createElement("div");
    settingsRow4Left.className = "settings_row_left";
    settingsRow4.append(settingsRow4Left);
  
    let settingsRow4Right = document.createElement("a");
    settingsRow4Right.className = "settings_row_right_text";
    settingsRow4Right.textContent = "GitHub";
    settingsRow4Right.href = "https://github.com/icaodle/main";
    settingsRow4Right.target = "_blank";
    settingsRow4.append(settingsRow4Right);
  
    let settingsRow4LeftRow1 = document.createElement("div");
    settingsRow4LeftRow1.className = "settings_row_left_one";
    settingsRow4LeftRow1.textContent = "Feedback";
    settingsRow4Left.append(settingsRow4LeftRow1);
  
    let line4 = document.createElement("div");
    line4.className = "menu_line";
    line4.id = "last_line";
    settingsSub.append(line4);
  
    let settingsFooter = document.createElement("div");
    settingsFooter.id = "settings_footer";
    settingsSub.append(settingsFooter);
  
    let credits = document.createElement("div");
    credits.id = "credits";
    credits.textContent = "icaodle developed by Frank Faulkner and Luca Caviness";
    settingsFooter.append(credits);
  
    let version = document.createElement("div");
    version.id = "version";
    version.textContent = app.icaodleVersion;
    settingsFooter.append(version);
}

  settingsExitBtn(){
    app.toggleElement(document.getElementById("settings_container"));
  }

  slider1Input(){
    if (localStorage.getItem("onlyInternationalCodes") == "false") {
      window.localStorage.setItem("onlyInternationalCodes", "true");
      intlCodes = true;
      if (target_row == 0) {
        app.reset(true);
      }
    } else {
      window.localStorage.setItem("onlyInternationalCodes", "false");
      allCodes = true;
      if (target_row == 0) {
        app.reset(true);
      }
    }
  }

  settingsIcon(){
    app.toggleElement(document.getElementById("settings_container"));
  }
  
  toggleColorblind() {
    let body = document.body;
    let keyboard = document.getElementById("keyboard_container");
    for (let i = 0; i < keyboard.children.length; i++) {
      for (let j = 0; j < keyboard.children[i].children.length; j++) {
        keyboard.children[i].children[j].style.transition = "";
      }
    }
    let container = document.getElementById("letter_box_container");
    for (let i = 0; i < container.children.length; i++) {
      for (let j = 0; j < container.children[i].children.length; j++) {
        container.children[i].children[j].style.transition = "";
      }
    }
    body.classList.toggle("colorblind");
    if (JSON.parse(window.localStorage.getItem("altColor"))) {
      window.localStorage.setItem("altColor", "false");
    } else if (!JSON.parse(window.localStorage.getItem("altColor"))) {
      window.localStorage.setItem("altColor", "true");
    }
  }

  toggleDarkmode() {
    let body = document.body;
    let keyboard = document.getElementById("keyboard_container");
    for (let i = 0; i < keyboard.children.length; i++) {
      for (let j = 0; j < keyboard.children[i].children.length; j++) {
        keyboard.children[i].children[j].style.transition = "";
      }
    }
    let container = document.getElementById("letter_box_container");
    for (let i = 0; i < container.children.length; i++) {
      for (let j = 0; j < container.children[i].children.length; j++) {
        container.children[i].children[j].style.transition = "";
      }
    }
    body.classList.toggle("darkmode");
    if (window.localStorage.getItem("darkMode") == "true") {
      window.localStorage.setItem("darkMode", "false");
    } else if (window.localStorage.getItem("darkMode") == "false") {
      window.localStorage.setItem("darkMode", "true");
    }
  }

  setViewMode() {
    let body = document.body;
    if (window.localStorage.getItem("altColor") == "true") {
      body.classList.toggle("colorblind");
    }
    if (window.localStorage.getItem("darkMode") == "true") {
      body.classList.toggle("darkmode");
    }
  }
}