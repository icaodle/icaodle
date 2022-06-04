class LSM{
    constructor(){

    }

    updateStats(last_row, correct) {
        this.checkStorage();
      
        if (app.correct) {
          let wins = JSON.parse(window.localStorage.getItem("Wins"));
          wins += 1;
          window.localStorage.setItem("Wins", JSON.stringify(wins));
      
          let streak = JSON.parse(window.localStorage.getItem("Streak"));
          streak += 1;
          window.localStorage.setItem("Streak", JSON.stringify(streak));
      
          if (streak > parseInt(window.localStorage.getItem("High_Streak"))) {
            window.localStorage.setItem("High_Streak", JSON.stringify(streak));
          }
      
          let arrayGuess = JSON.parse(window.localStorage.getItem("Lengths"));
          arrayGuess.push(last_row);
          window.localStorage.setItem("Lengths", JSON.stringify(arrayGuess));
        } else {
          window.localStorage.setItem("Streak", "0");
        }
        let games = JSON.parse(window.localStorage.getItem("Games"));
        games += 1;
        window.localStorage.setItem("Games", JSON.stringify(games));
    }

    //Makes sure everything that should be in local storage is there.

    checkStorage() {
        if (!window.localStorage.getItem("Lengths")) {
        window.localStorage.setItem("Lengths", "[]");
        }
        if (!window.localStorage.getItem("Wins")) {
        window.localStorage.setItem("Wins", "0");
        }
        if (!window.localStorage.getItem("Games")) {
        window.localStorage.setItem("Games", "0");
        }
        if (!window.localStorage.getItem("Streak")) {
        window.localStorage.setItem("Streak", "0");
        }
        if (!window.localStorage.getItem("High_Streak")) {
        window.localStorage.setItem("High_Streak", "0");
        }
        if (!window.localStorage.getItem("isDev")) {
        window.localStorage.setItem("isDev", "false");
        }
        if (!window.localStorage.getItem("darkMode")) {
        window.localStorage.setItem("darkMode", "false");
        }
        if (!window.localStorage.getItem("altColor")) {
        window.localStorage.setItem("altColor", "false");
        }
        if (!window.localStorage.getItem("updateGraph")) {
        window.localStorage.setItem("updateGraph", "true");
        }
        if (!window.localStorage.getItem("Hints_Used")) {
        window.localStorage.setItem("Hints_Used", "0");
        }
        if (!window.localStorage.getItem("onlyInternationalCodes")) {
        window.localStorage.setItem("onlyInternationalCodes", "false");
        }
    }

}