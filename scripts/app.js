class App{
    constructor(){
        this.icaodleVersion = "v1.0.0";

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
        this.allCodes = false;
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
    }
}