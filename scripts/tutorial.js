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
        toggleElement(document.getElementById("tutorial_container"));
    }

    menuIcon(){
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