class Game{
  constructor(){

  }

  reset(instant = false) {
    if (!app.animatingBox && !app.animatingMenu) {
      let box_cont = document.getElementById("letter_box_container");
      app.animatingBox = true;
      for (let i = 0; i < box_cont.children.length; i++) {
        let row = box_cont.children[i];
        for (let h = 0; h < row.children.length; h++) {
          let box = row.children[h];
          if (instant) {
            box.style.transition = "";
            app.animatingBox = false;
          }
          box.style.transform = "rotate3d(1,0,0,0deg)";
          if (!instant) {
            window.setTimeout(function () {
              box.textContent = "";
              if (h == 3) {
                app.animatingBox = false;
              }
            }, 900 + h * 200);
          } else {
            box.textContent = "";
          }
          box.style.backgroundColor = "var(--white)";
          box.style.borderColor = "var(--defaultborder)";
        }
      }
      app.target_row = 0;
      app.target = "letter_box_0_0";
      let box = document.getElementById(app.target);
      let del_row = document.getElementById("clear_row_button");
      let top = box.parentElement.getBoundingClientRect().top + box.parentElement.clientHeight / 2;
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
      app.guessedCodes = [];
      app.usedCodes.push(app.airportHandler.airportCode);
      if (app.intlCodes) {
        app.airportHandler.airportArray = app.airportHandler.intlCodesArray;
      } else if (app.allCodes) {
        app.airportHandler.airportArray = app.airportHandler.allCodesArray;
      }
      let airportCode = airportArray[Math.floor(Math.random() * airportArray.length)];
      while (app.usedCodes.includes(airportCode)) {
        airportCode = airportArray[Math.floor(Math.random() * airportArray.length)];
      }
      app.airportHandler.airportCode = airportCode
      app.airportHandler.answer = airportCode.split("");
      if (app.hintOpen) {
        app.hints.closeHintMenu();
      }
      app.hasOpenedElev = false;
      app.hasOpenedCountry = false;
      app.hasOpenedCity = false;
      app.finished = false;
      app.correct = false;
      app.airportHandler.endpoint = "https://airportdb.io/api/v1/airport/" + app.airportHandler.airportCode + "?apiToken=" + app.airportHandler.token;
      app.airportHandler.callAPI();
  }
}

  renderLetter(key) {
    if (!app.finished && !app.isEndScreenOpen && !app.animatingBox && !app.menuOpen) {
      let box = document.getElementById(app.target);
      let qwerty = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];
      if (qwerty.includes(key)) {
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
        app.target = "letter_box_"+app.target_row+"_"+new_id
        }
      } else if (key == "DELETE" || key == "Backspace") {
        let new_id = parseInt(target.substring(13))
        if (new_id != 3){
        new_id -= 1
        if (new_id<0){
            new_id = 0
        }
        app.target = "letter_box_"+app.target_row+"_"+new_id
        }else if (new_id == 3 && !qwerty.includes(box.textContent)){
          new_id -= 1
          target = "letter_box_"+target_row+"_"+new_id
        }
        box = document.getElementById(target);
        box.textContent = "";
        box.style.backgroundColor = "var(--white)";
        box.style.borderColor = "var(--defaultborder)";
        box.style.color = "var(--black)";
      } else if (key == "ENTER" || key == "Enter") {
        app.feedback(box);
      }
    }
  }

  createRow() {
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

  createRowDeletion() {
    let box = document.getElementById(target);
    let del = document.createElement("i");
    del.className = "fa-solid fa-delete-left fa-xl";
    del.id = "clear_row_button";
    del.onclick = this.deleteRow
    document.body.append(del);
    let top = box.parentElement.offsetHeight + box.parentElement.clientHeight / 2 + del.clientWidth * (3 / 4);
    let left = box.parentElement.lastChild.getBoundingClientRect().left + box.parentElement.lastChild.clientWidth * 1.33;
    del.style.top = top + "px";
    del.style.left = left + "px";
  }

  deleteRow() {
    if (!app.finished) {
      let box = document.getElementById(app.target);
      for (let i = 0; i < box.parentElement.children.length; i++) {
        box.parentElement.children[i].textContent = "";
        box.parentElement.children[i].style.backgroundColor = "var(--white)";
        box.parentElement.children[i].style.borderColor = "var(--lightgrey)";
        box.parentElement.children[i].style.color = "black";
      }
      app.target = "letter_box_" + app.target_row + "_0";
    }
  }
}