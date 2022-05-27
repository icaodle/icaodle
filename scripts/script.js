let dev = new Dev()
let app = new App()

window.onload = function () {
  createSettingsMenu();
  createTutorialPage();
  loadWindow();
  setViewMode();
  app.localStorageManager.checkStorage();
  addClicks();
  tutorialPopup();
  callAPI();
};

app.localStorageManager.checkStorage();

window.onresize = function () {
  //Otherwise, elements will be in the wrong position when you change window size.
  resize();
};

//For typing
document.addEventListener("keydown", keyDown);
//Stats and such
let endScreenButton = document.getElementById("stats_icon");
endScreenButton.onclick = app.endScreen.endScreenButton

//The actual array to source codes from.

let airportArray;
if (JSON.parse(window.localStorage.getItem("onlyInternationalCodes"))) {
  airportArray = intlCodesArray;
} else {
  airportArray = allCodesArray;
}
//Choses the airport, and stores it in two ways, an array and a string
let airportCode = airportArray[Math.floor(Math.random() * airportArray.length)];
let answer = airportCode.split("");

//API for getting info about the airports for the endscreen
let token =
  "f303fdff7879008e26b9115eed617e61e6c07010dbbfbc994e7b02ebc930ae33e234113a928761faee0ced9bee9957e2";
let endpoint =
  "https://airportdb.io/api/v1/airport/" + airportCode + "?apiToken=" + token;

function loadWindow() {
  //Creates the rows and keyboard
  for (i = 0; i < 6; i++) {
    createRow();
  }
  createRowDeletion();
  createKeyboard();
  resize();
}

function resize() {
  //Changes all the sizes/positions to be acurate with the new window
  let box;
  if (target_row != 6) {
    box = document.getElementById(target);
  } else {
    box = document.getElementById("letter_box_5_3");
  }
  let line = document.getElementById("bottom_header_line");

  //Message for not a real code
  let codeMsg = document.getElementById("error_msg");
  if (codeMsg != null || codeMsg != undefined) {
    codeMsg.style.left =
      document.body.clientWidth / 2 - error.clientWidth / 2 + "px";
    codeMsg.style.top = line.offsetHeight * 1.1 + "px";
  }

  //Stats/End Screen
  let popUp = document.getElementById("pop_up_id");
  if (popUp != null || popUp != undefined) {
    popUp.style.left =
      document.body.clientWidth / 2 - popUp.clientWidth / 2 + "px";
    popUp.style.top =
      document.body.clientHeight / 2 - popUp.clientHeight / 2 + "px";
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
    let width =
      ((elevationIcon.parentElement.clientWidth - elevationIcon.clientWidth) /
        elevationIcon.parentElement.clientWidth) *
      50;
    elevationIcon.style.left = width + "%";
  }

  let countryIcon = document.getElementById("country_icon");
  if (countryIcon != null || countryIcon != undefined) {
    let width =
      ((countryIcon.parentElement.clientWidth - countryIcon.clientWidth) /
        countryIcon.parentElement.clientWidth) *
      50;
    countryIcon.style.left = width + "%";
  }

  let cityIcon = document.getElementById("city_icon");
  if (cityIcon != null || cityIcon != undefined) {
    let width =
      ((cityIcon.parentElement.clientWidth - cityIcon.clientWidth) /
        cityIcon.parentElement.clientWidth) *
      50;
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
      key.style.paddingLeft =
        key.clientHeight - parseInt(Math.sqrt(key.style.fontSize)) + "px";
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
    document.getElementById("last_line_aka_franks_special").offsetTop
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

//Creates each row, and the boxes in it

function createRow() {
  let container = document.getElementById("letter_box_container");
  let children = container.children;
  let row = document.createElement("div");
  row.id = "letter_row" + children.length;
  row.className = "row";
  for (r = 0; r < 4; r++) {
    let elem = document.createElement("div");
    elem.id = "letter_box" + "_" + children.length + "_" + r;
    elem.className = "box";
    row.append(elem);
  }
  container.append(row);
}

//Adds the button following the rows to allow deletion of the content of all the boxes there

function createRowDeletion() {
  let box = document.getElementById(target);
  let del = document.createElement("i");
  del.className = "fa-solid fa-delete-left fa-xl";
  del.id = "clear_row_button";
  del.onclick = deleteRow
  document.body.append(del);
  let top =
    box.parentElement.offsetHeight +
    box.parentElement.clientHeight / 2 +
    del.clientWidth * (3 / 4);
  let left =
    box.parentElement.lastChild.getBoundingClientRect().left +
    box.parentElement.lastChild.clientWidth * 1.33;
  del.style.top = top + "px";
  del.style.left = left + "px";
}

//Used by the row deletion button

function deleteRow() {
  if (!finished) {
    let box = document.getElementById(target);
    for (let i = 0; i < box.parentElement.children.length; i++) {
      box.parentElement.children[i].textContent = "";
      box.parentElement.children[i].style.backgroundColor = "var(--white)";
      box.parentElement.children[i].style.borderColor = "var(--lightgrey)";
      box.parentElement.children[i].style.color = "black";
    }
    target = "letter_box_" + target_row + "_0";
  }
}

//The keyboard at the bottom of the screen

function createKeyboard() {
  for (i = 0; i < 3; i++) {
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
      key.onclick,key.ontouch = app.keyboard.key;
      row.append(key);
    }
    container.append(row);
  }
}

//For converting key inputs to something readable by our renderLetter function.

function keyDown(event) {
  let keyCode = event.code;
  let key;
  if (
    keyCode != "Enter" &&
    keyCode != "Backspace" &&
    keyCode != "Backquote" &&
    keyCode != "Equal" &&
    keyCode != "Backslash" &&
    keyCode != "BracketRight"
  ) {
    let keyArray = keyCode.split("Key");
    key = keyArray[1];
  } else if (
    keyCode == "Backquote" &&
    JSON.parse(window.localStorage.getItem("isDev"))
  ) {
    dev.superTopSecretMethod();
  } else if (
    keyCode == "Backslash" &&
    JSON.parse(window.localStorage.getItem("isDev"))
  ) {
    toggleColorblind();
  } else if (
    keyCode == "BracketRight" &&
    JSON.parse(window.localStorage.getItem("isDev"))
  ) {
    toggleDarkmode();
  } else {
    key = keyCode;
  }
  renderLetter(key);
}

//Big function, anything typing and box related pretty much

function renderLetter(key) {
	if (!finished && !isEndScreenOpen && !animatingBox && !menuOpen) {
		let box = document.getElementById(target);
		let qwerty = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];
		if (qwerty.includes(key) == true) {
			if (box.textContent == ""){
			box.textContent = key;
			box.style.backgroundColor = "var(--white)";
			box.style.transition = ""
			box.style.borderColor = "var(--filledborder)";
			box.style.color = "var(--black)";
			let new_id = parseInt(target.substring(13))
			new_id += 1
			if (new_id>=box.parentElement.children.length){
				new_id = box.parentElement.children.length-1
			}
			target = "letter_box_"+target_row+"_"+new_id
			}
		} else if (key == "DELETE" || key == "Backspace") {
			let new_id = parseInt(target.substring(13))
			if (new_id != 3){
			new_id -= 1
			if (new_id<0){
				new_id = 0
			}
			target = "letter_box_"+target_row+"_"+new_id
			}else if (new_id == 3 && qwerty.includes(box.textContent) == false){
			new_id -= 1
			target = "letter_box_"+target_row+"_"+new_id
			}
			box = document.getElementById(target);
			box.textContent = "";
			box.style.backgroundColor = "var(--white)";
			box.style.borderColor = "var(--defaultborder)";
			box.style.color = "var(--black)";
		} else if (key == "ENTER" || key == "Enter") {
			feedback(box);
		}
	}
}


function feedback(box) {
	if (box == box.parentElement.lastChild && box.textContent != ""){ 
		let guess = ""
		for (let i = 0; i<box.parentElement.children.length;i++){ 
			guess += box.parentElement.children[i].textContent
		}
		if (airportArray.includes(guess) && guessedCodes.includes(guess) != true){
			let fluidAnswer = [];
			guessedCodes.push(guess)
			for (i=0; i < answer.length; i++) {
			fluidAnswer.push(answer[i]); 
			}
			correctCount = 0;
			for (let i = 0; i<box.parentElement.children.length;i++) {
        box.parentElement.children[i].style.transition = "transform " + (i*durationModif+1) + "s ease-in-out, background-color 0.2s " + (i*durationModif+0.8) + "s, border-color 0.2s " + (i*durationModif+0.8) + "s, color 0.2s " + (i*durationModif+0.8) + "s"
        box.parentElement.children[i].style.transform = "rotate3d(1,0,0,"+ (Math.round((i+3)*360))+"deg)"
        if (!animatingBox){
          animatingBox = true
          window.setTimeout(function(){animatingBox = false},(3000*durationModif+1000))
        }
        let guess = box.parentElement.children[i].textContent;
        let transition = "background-color 0.2s " + (3*durationModif+1.1) + "s, border-color 0.2s "+(3*durationModif+1.1)+"s, color 0.2s "+(3*durationModif+1.1)+"s"
        if (guess == fluidAnswer[i]) {
          turnGreen(box.parentElement.children[i], guess, transition);
          fluidAnswer[i] = "";
          correctCount += 1;
        } else if (guess != fluidAnswer[i] && fluidAnswer.includes(guess) == true) {
          let location = fluidAnswer.indexOf(guess); 
          if (box.parentElement.children[location].textContent != fluidAnswer[location]){
            turnYellow(box.parentElement.children[i], guess, transition);
            fluidAnswer[location] = "";
          } else {
            box.parentElement.children[i].style.backgroundColor = "var(--darkgrey)";
            box.parentElement.children[i].style.borderColor = "var(--darkgrey)";
            box.parentElement.children[i].style.color = "white";
          }
        } else if (fluidAnswer.includes(guess) == false) {
          turnGrey(box.parentElement.children[i], guess, transition);
        }
			}
			target_row += 1
			if (target_row == box.parentElement.parentElement.children.length || correctCount == 4) { 
			finished = true;
			}
			if (target_row == 6 && correctCount != 4) {
			correct = false;
			} else if (correctCount == 4) {
			correct = true;
			window.localStorage.setItem("updateGraph", "true")
			}
			if (target_row < box.parentElement.parentElement.children.length && correct == false){
			window.setTimeout(moveDel, (3000*durationModif+1000))
			}
			target = "letter_box_"+target_row+"_"+0
			if (finished == true) { 
			app.localStorageManager.updateStats(target_row,correct)
			timer = window.setTimeout(app.endScreen.endScreen, 3000*durationModif+1100)
			}
		} else {
			throwError(guess);
		}
	}
}

function throwError(guess) {
	if (typeof(document.getElementById("error_msg")) == 'undefined' || document.getElementById("error_msg") == null) {
		let error = document.createElement("div")
		error.id = "error_msg"
		if (guessedCodes.includes(guess)){
			error.textContent = "Code Already Guessed"
		}else {
			if (airportArray == intlCodesArray && allCodesArray.includes(guess)){
			error.textContent = "Only intl. codes allowed. See settings to change."
			}else {
			error.textContent = "Invalid/Missing ICAO Code"
			}
		}
		error.style.top = (document.getElementById("main_container").offsetTop *1.25) + "px";
		document.body.append(error)
		error.style.left = (((document.body.clientWidth + 15) / 2) - (error.clientWidth / 2)) + "px"; 
		error.style.transition = "opacity 1s 1s"
		error.style.opacity = 0
		window.setTimeout(function(){
			error.remove()
		},2000)
	}
}

function turnGreen(box, guess, transition) {
	box.style.backgroundColor = "var(--green)";
	box.style.borderColor = "var(--green)";
	box.style.color = "white";
	document.getElementById(guess).style.transition = transition
	document.getElementById(guess).style.backgroundColor = "var(--green)"
	document.getElementById(guess).style.borderColor = "var(--green)"
	document.getElementById(guess).style.color = "white"
}


function turnYellow(box, guess, transition) {
	box.style.backgroundColor = "var(--yellow)"; 
	box.style.borderColor = "var(--yellow)";
	box.style.color = "white";
	if (document.getElementById(guess).style.backgroundColor != "var(--green)"){
		document.getElementById(guess).style.transition = transition
		document.getElementById(guess).style.backgroundColor = "var(--yellow)"
		document.getElementById(guess).style.borderColor = "var(--yellow)"
		document.getElementById(guess).style.color = "white"
	}
}

function turnGrey(box, guess, transition) {
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

//When you move to the next row, the delete row button needs to move as well

function moveDel() {
  let del_btn = document.getElementById("clear_row_button");
  let top = parseInt(del_btn.style.top);
  let box;
  if (target_row != 6) {
    box = document.getElementById(target);
  } else {
    box = document.getElementById("letter_box_5_0");
  }
  top +=
    box.parentElement.parentElement.clientHeight /
    box.parentElement.parentElement.children.length;
  del_btn.style.transition = "top 0.1s linear";
  del_btn.style.top = top + "px";
}

function callAPI() {
  var request = new XMLHttpRequest();
  request.open("GET", endpoint);
  request.send();
  request.onload = () => {
    let data = JSON.parse(request.response); //VAKP missing Municipality
    airportName = data.name;
    airportCity = data.municipality;
    airportState = data.region.name;
    airportCountry = data.country.name;
    airportElevation = data.elevation_ft;
    airportLink = data.wikipedia_link;
    airportHomeLink = data.home_link;
  };
  apiIsCalled = true;
}

// Creates the hint menu and all subsequent "pop-outs."

function openHintMenu() {
  let hintDropdown = document.createElement("div");
  hintDropdown.className = "hint_dropdown";
  hintDropdown.id = "hint_dropdown_id";
  document.body.append(hintDropdown);
  hintDropdown.style.height = "160px";
  window.setTimeout(function () {
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
  }, 001);
}

// Closes/hides the hint menu.

function closeHintMenu() {
  let hintDropdown = document.getElementById("hint_dropdown_id");
  hintDropdown.remove();
  hintOpen = false;
}

// Toggles high contrast mode across whole site.

function toggleColorblind() {
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

// Toggles dark mode across whole site.

function toggleDarkmode() {
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

// Sets view mode (dark mode / high contrast mode) based on local storage.

function setViewMode() {
  let body = document.body;
  if (window.localStorage.getItem("altColor") == "true") {
    body.classList.toggle("colorblind");
  }
  if (window.localStorage.getItem("darkMode") == "true") {
    body.classList.toggle("darkmode");
  }
}

// Creates settings menu content.

function createSettingsMenu() {
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

  exitButton.onclick = app.settings.settingsExitBtn

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

  slider1Input.onclick = app.settings.slider1Input

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

  slider2Input.onclick = toggleDarkmode

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

  slider3Input.onclick = toggleColorblind()

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
  line4.id = "last_line_aka_franks_special";
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
  version.textContent = icaodleVersion;
  settingsFooter.append(version);
}

// Creates tutorial content.

function createTutorialPage() {
  let body = document.body;
  let tutorialContainer = document.createElement("div");
  tutorialContainer.id = "tutorial_container";
  tutorialContainer.style.visibility = "hidden";
  tutorialContainer.style.top = window.outerWidth + "px";
  tutorialContainer.style.opacity = 0;
  body.append(tutorialContainer);

  let tutorialUnflex = document.createElement("div");
  tutorialUnflex.id = "tutorial_unflex";
  tutorialContainer.append(tutorialUnflex);

  let tutorialSub = document.createElement("div");
  tutorialSub.id = "tutorial_container_sub";
  tutorialUnflex.append(tutorialSub);

  let tutorialRow = document.createElement("div");
  tutorialRow.className = "menu_row";
  tutorialSub.append(tutorialRow);

  let titleDiv = document.createElement("div");
  titleDiv.className = "menu_title";
  titleDiv.textContent = "HOW TO PLAY";
  titleDiv.align = "center";
  titleDiv.width = "100%";
  tutorialRow.append(titleDiv);

  let exitButton = document.createElement("i");
  exitButton.className = "fa-solid fa-xmark fa-xl";
  exitButton.id = "tutorial_exit_button";
  exitButton.right = "0px";
  tutorialUnflex.append(exitButton);

  exitButton.onclick = app.tutorial.tutorialExitBtn
  let tutorialSpacer = document.createElement("div");
  tutorialSpacer.className = "menu_spacer";
  tutorialSub.append(tutorialSpacer);

  let par1 = document.createElement("p");
  par1.textContent = "Guess the icaodle in six tries.";
  tutorialSub.append(par1);

  let par2 = document.createElement("p");
  par2.textContent =
    "Each guess must be a valid four-letter ICAO code. Hit the enter button to submit.";
  tutorialSub.append(par2);

  let par2point5 = document.createElement("p");
  par2point5.textContent =
    "If you wish to change your guess before submitting, click the delete icon next to the active row to clear the row's content or simply delete each space one-by-one as normal.";
  tutorialSub.append(par2point5);

  let par3 = document.createElement("p");
  par3.textContent =
    "After each guess, the color of the tiles will change to show how close your guess was to the word.";
  tutorialSub.append(par3);

  let line1 = document.createElement("div");
  line1.className = "menu_line";
  tutorialSub.append(line1);

  let example = document.createElement("p");
  example.style.fontWeight = "500";
  example.textContent = "Examples";
  example.style.marginTop = "10px";
  tutorialSub.append(example);
  let rowCodes = [["K", "S", "F", "O"],["L", "T", "B", "S"],["V", "Q", "P", "R"]]
  let currentBox = [0,1,3]
  let explanations = ["The letter K is in the code and in the correct spot.","The letter T is in the code but in the wrong spot.","The letter R is not in the code in any spot."]
  for (let i = 0; i<3; i++){
    let row = document.createElement("div");
    row.id = "row_" + i;
    row.className = "tutorial_box_row";
    let rowCode = rowCodes[i];
    for (r = 0; r < 4; r++) {
      let elem = document.createElement("div");
      elem.id = "tutorial_box_"+i+"_" + r;
      elem.className = "tutorial_box";
      if (r !== currentBox[i]){
        elem.classList.add("tutorial_box_blank")
      }
      elem.textContent = rowCode[r];
      row.append(elem);
    }
    tutorialSub.append(row);
  
    let explain = document.createElement("p");
    explain.textContent = explanations[i];
    tutorialSub.append(explain);
  }

  let line2 = document.createElement("div");
  line2.className = "menu_line";
  tutorialSub.append(line2);

  let tutorialSpacer2 = document.createElement("div");
  tutorialSpacer2.className = "menu_spacer_2";
  tutorialSub.append(tutorialSpacer2);

  let par3point5 = document.createElement("p");
  par3point5.textContent =
    "If you need, click the lightbulb in the menu bar for hints!";
  tutorialSub.append(par3point5);

  let par4 = document.createElement("p");
  par4.textContent =
    "Load a new ICAO code by either clicking on the plus icon in our menu bar or refreshing the site in your browser.";
  tutorialSub.append(par4);
}

//Pops the tutorial up on the first load of the page

function tutorialPopup() {
  if (window.localStorage.getItem("Games") == "0") {
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
}

//Function used to slide an element off the bottom of the screen, or pull it up from the bottom.

function toggleElement(element, top = 0) {
  if (element.style.visibility == "visible" && !animatingMenu) {
    animatingMenu = true;
    menuOpen = false;
    element.style.transition = "opacity 0.4s 0.1s, top 0.5s";
    element.style.top = window.outerHeight + "px";
    element.style.opacity = 0;
    window.setTimeout(function () {
      element.style.visibility = "hidden";
      animatingMenu = false;
    }, 500);
  } else if (element.style.visibility == "hidden" && !animatingMenu) {
    menuOpen = true;
    animatingMenu = true;
    element.style.top = window.outerHeight + "px";
    element.style.opacity = 0;
    element.style.transition = "opacity 0.4s 0.1s, top 0.5s";
    element.style.visibility = "visible";
    element.style.top = top + "px";
    element.style.opacity = 1;
    window.setTimeout(function () {
      animatingMenu = false;
    }, 500);
  }
}

//Onclick functions for things that don't get created in JS

function addClicks() {
  document.getElementById("menu_icon").onclick = app.tutorial.menuIcon

  document.getElementById("hint_icon").onclick = app.hints.hintIcon

  document.getElementById("settings_icon").onclick = app.settings.settingsIcon

  document.getElementById("new_airport_icon").onclick = reset
}

function reset(instant = false) {
  if (!animatingBox && !animatingMenu) {
    let box_cont = document.getElementById("letter_box_container");
    animatingBox = true;
    for (let i = 0; i < box_cont.children.length; i++) {
      let row = box_cont.children[i];
      for (let h = 0; h < row.children.length; h++) {
        let box = row.children[h];
        if (instant) {
          box.style.transition = "";
          animatingBox = false;
        }
        box.style.transform = "rotate3d(1,0,0,0deg)";
        if (!instant) {
          window.setTimeout(function () {
            box.textContent = "";
            if (h == 3) {
              animatingBox = false;
            }
          }, 900 + h * 200);
        } else {
          box.textContent = "";
        }
        box.style.backgroundColor = "var(--white)";
        box.style.borderColor = "var(--defaultborder)";
      }
    }
    target_row = 0;
    target = "letter_box_0_0";
    let box = document.getElementById(target);
    let del_row = document.getElementById("clear_row_button");
    let top =
      box.parentElement.getBoundingClientRect().top +
      box.parentElement.clientHeight / 2;
    del_row.style.top = top + "px";

    let keyboard = document.getElementById("keyboard_container");
    for (let i = 0; i < keyboard.children.length; i++) {
      let row = keyboard.children[i];
      for (let h = 0; h < row.children.length; h++) {
        let key = row.children[h];
        key.style.transition = "";
        key.style.backgroundColor = "var(--lightgrey)";
        key.style.borderColor = "var(--lightgrey)";
        key.style.color = "black";
      }
    }
    guessedCodes = [];
    usedCodes.push(airportCode);
    if (intlCodes) {
      airportArray = intlCodesArray;
    } else if (allCodes) {
      airportArray = allCodesArray;
    }
    airportCode = airportArray[Math.floor(Math.random() * airportArray.length)];
    while (usedCodes.includes(airportCode)) {
      airportCode =
        airportArray[Math.floor(Math.random() * airportArray.length)];
    }
    answer = airportCode.split("");
    if (hintOpen) {
      closeHintMenu();
    }
    hasOpenedElev = false;
    hasOpenedCountry = false;
    hasOpenedCity = false;
    finished = false;
    correct = false;
    endpoint =
      "https://airportdb.io/api/v1/airport/" +
      airportCode +
      "?apiToken=" +
      token;
    callAPI();
  }
}
