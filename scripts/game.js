class Game{
    constructor(){

    }

    reset(instant = false) {
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

    renderLetter(key) {
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

  deleteRow() {
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
}