class Tutorial{
    constructor(){
        
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
        app.toggleElement(document.getElementById("tutorial_container"));
    }

    menuIcon(){
        app.toggleElement(document.getElementById("tutorial_container"));
        window.setTimeout(function () {
          document.getElementById("tutorial_box_0_0").style.transition = "transform 1s ease-in-out";
          document.getElementById("tutorial_box_0_0").style.transform = "rotate3d(1,0,0,360deg)";
          document.getElementById("tutorial_box_1_1").style.transition = "transform 1s ease-in-out";
          document.getElementById("tutorial_box_1_1").style.transform = "rotate3d(1,0,0,360deg)";
          document.getElementById("tutorial_box_2_3").style.transition = "transform 1s ease-in-out";
          document.getElementById("tutorial_box_2_3").style.transform = "rotate3d(1,0,0,360deg)";
        }, 350);
    }

  createTutorialPage() {
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
  
    exitButton.onclick = this.tutorialExitBtn.bind(this)
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
      for (let rows = 0; rows < 4; rows++) {
        let elem = document.createElement("div");
        elem.id = "tutorial_box_"+i+"_" + rows;
        elem.className = "tutorial_box";
        if (rows !== currentBox[i]){
          elem.classList.add("tutorial_box_blank")
        }
        elem.textContent = rowCode[rows];
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
  
tutorialPopup() {
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
}