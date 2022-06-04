class FeedbackHandler{
    constructor(){

    }

    feedback(box) {
        if (box == box.parentElement.lastChild && box.textContent != ""){ 
            let guess = ""
            for (let i = 0; i<box.parentElement.children.length;i++){ 
                guess += box.parentElement.children[i].textContent
            }
            if (app.airportHandler.airportArray.includes(guess) && guessedCodes.includes(guess) != true){
                let fluidAnswer = [];
                guessedCodes.push(guess)
                for (i=0; i < app.airportHandler.answer.length; i++) {
                fluidAnswer.push(answer[i]); 
                }
                app.correctCount = 0;
                for (let i = 0; i<box.parentElement.children.length;i++) {
            box.parentElement.children[i].style.transition = "transform " + (i*app.durationModif+1) + "s ease-in-out, background-color 0.2s " + (i*app.durationModif+0.8) + "s, border-color 0.2s " + (i*app.durationModif+0.8) + "s, color 0.2s " + (i*app.durationModif+0.8) + "s"
            box.parentElement.children[i].style.transform = "rotate3d(1,0,0,"+ (Math.round((i+3)*360))+"deg)"
            if (!app.animatingBox){
              app.animatingBox = true
              window.setTimeout(function(){app.animatingBox = false},(3000*app.durationModif+1000))
            }
            let guess = box.parentElement.children[i].textContent;
            let transition = "background-color 0.2s " + (3*app.durationModif+1.1) + "s, border-color 0.2s "+(3*app.durationModif+1.1)+"s, color 0.2s "+(3*app.durationModif+1.1)+"s"
            if (guess == fluidAnswer[i]) {
              app.turnGreen(box.parentElement.children[i], guess, transition);
              fluidAnswer[i] = "";
              app.correctCount += 1;
            } else if (guess != fluidAnswer[i] && fluidAnswer.includes(guess) == true) {
              let location = fluidAnswer.indexOf(guess); 
              if (box.parentElement.children[location].textContent != fluidAnswer[location]){
                app.turnYellow(box.parentElement.children[i], guess, transition);
                fluidAnswer[location] = "";
              } else {
                box.parentElement.children[i].style.backgroundColor = "var(--darkgrey)";
                box.parentElement.children[i].style.borderColor = "var(--darkgrey)";
                box.parentElement.children[i].style.color = "white";
              }
            } else if (fluidAnswer.includes(guess) == false) {
              app.turnGrey(box.parentElement.children[i], guess, transition);
            }
                }
                app.target_row += 1
                if (app.target_row == box.parentElement.parentElement.children.length || app.correctCount == 4) { 
                app.finished = true;
                }
                if (app.target_row == 6 && app.correctCount != 4) {
                app.correct = false;
                } else if (app.correctCount == 4) {
                app.correct = true;
                window.localStorage.setItem("updateGraph", "true")
                }
                if (app.target_row < box.parentElement.parentElement.children.length && !app.correct){
                window.setTimeout(game.moveDel, (3000*app.durationModif+1000))
                }
                app.target = "letter_box_"+app.target_row+"_"+0
                if (app.finished == true) { 
                  app.localStorageManager.updateStats(app.target_row,app.correct)
                  window.setTimeout(app.endScreen.endScreen, 3000*app.durationModif+1100)
                }
            } else {
                this.throwError(guess);
            }
        }
    }
    
    throwError(guess) {
        if (typeof(document.getElementById("error_msg")) == 'undefined' || document.getElementById("error_msg") == null) {
            let error = document.createElement("div")
            error.id = "error_msg"
            if (guessedCodes.includes(guess)){
                error.textContent = "Code Already Guessed"
            }else {
                if (app.airportHandler.airportArray == app.airportHandler.intlCodesArray && app.airportHandler.allCodesArray.includes(guess)){
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
}