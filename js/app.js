var init = function () {

    var elementsTagName="body", mainElement=$(elementsTagName), centerInfoElement=$(".center-info"), infoElement=$(".general-info"), copiedInfoElement = $('.copied-info'), color="", speed=1000, s=speed/5; mode="random", round=Math.round, random=Math.random, counter=0, isHiddenMode=false, isPauseMode=true, changeColorTimeout=null;
    var modes = ["random", "bw", "police"];
    var keyCodes = {
        hiddenMode: 27,     // ESC
        pauseMode: 32,      // Space
        copyColor: 13,      // Enter
        speedUp1: 107,      // +
        speedUp2: 38,       // ↑
        speedDown1: 109,    // -
        speedDown2: 40,     // ↓
        previousMode: 37,   // ←
        nextMode: 39,       // →
    }

    // START HIDDEN MODE
    var hiddenMode = function() {
        $(document).keydown(function(e) {
            if (e.keyCode == keyCodes.hiddenMode) {
                if(isHiddenMode) {
                    $("*").not("style, script, .copied-info, title").show();
                    isHiddenMode = false;
                }
                else{
                    $("*").not("html, body").hide();
                    isHiddenMode = true;
                }
            }
        });
    }
    // END HIDDEN MODE

    // START PAUSE MODE
    var pauseMode = function() {
        $(document).keydown(function(e) {
            if (e.keyCode == keyCodes.pauseMode) {
                $(centerInfoElement).text("");
                if(isPauseMode) {
                    changeColorTimeout = setTimeout(changeColor, round(s));
                    isPauseMode = false;
                }
                else{
                    clearTimeout(changeColorTimeout);
                    isPauseMode = true;
                }
            }
        });
    }
    // END PAUSE MODE

    // START CHANGE COLOR
    var initChangeColor = function() {
        if(!isPauseMode) {
            changeColor();
            $(centerInfoElement).text("");
        } else {
            modeRandom();
            counter++;
        }
    }

    var changeColor = function() {
        s=speed/5;
        changeColorInterval();
        changeColorTimeout = setTimeout(changeColor, round(s));
    }

    var changeColorInterval = function() {
            if(mode == "bw")
                modeBlackWhite();
            else if(mode == "random")
                modeRandom();
            else if(mode == "police")
                modePolice();

            counter++;
    }
    // END CHANGE COLOR

    // START CHANGE SPEED
    var changeSpeed = function() {
        $(document).keydown(function(e) {
            $(".speed").text(parseFloat(1/round(s)*1000).toFixed(2));
            s=speed/5;
            if (e.keyCode == keyCodes.speedUp1 || e.keyCode == keyCodes.speedUp2) {
                if(speed > 50) {
                    speed-=50;
                }
            }
            if (e.keyCode == keyCodes.speedDown1 || e.keyCode == keyCodes.speedDown2) {
                speed+=50;
            }
        });
    }
    // END CHANGE SPEED

    // START CHANGE MODES
    var changeMode = function() {
        $(".mode").click(function(event) {
            var selected_mode = $(event.target).data("mode");
            mode = selected_mode;
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
        });
    }
    // END CHANGE MODES

    // START CHANGE MODE WITH KEYS
    var changeModeWithKeys = function() {
        $(document).keydown(function(e) {
            if (e.keyCode == keyCodes.previousMode) { // previousMode
                var mode_index = modes.indexOf(mode);
                next_mode_index = (mode_index - 1 + modes.length) % modes.length;
                mode=modes[next_mode_index];

                var mode_element = $(".modes").find("[data-mode='" + mode + "']");
                $(mode_element).addClass("active");
                $(mode_element).siblings().removeClass("active");
            }
            if (e.keyCode == keyCodes.nextMode) { // nextMode
                var mode_index = modes.indexOf(mode);
                next_mode_index = (mode_index + 1 + modes.length) % modes.length;
                mode=modes[next_mode_index];

                var mode_element = $(".modes").find("[data-mode='" + mode + "']");
                $(mode_element).addClass("active");
                $(mode_element).siblings().removeClass("active");
            }
        });
    }
    // END CHANGE MODE WITH KEYS

    // START MODES
    var modeRandom = function() {
        var r=round(random()*255), g=round(random()*255), b=round(random()*255), a=random().toFixed(1);
        color = r+","+g+","+b+","+a;
        mainElement.css("background-color","rgba("+color+")");
    }
    var modeBlackWhite = function() {
        color = counter%2 ? "0,0,0,1" : "255,255,255,1";
        mainElement.css("background-color","rgba("+color+")");
    }
    var modePolice = function() {
        switch(counter%2) {
            case 0:
                color = "rgba(255,0,0,1)";
                break;
            case 1:
                color = "rgba(0,0,255,1)";
                break;
        }
        mainElement.css("background-color",color);
    }
    // END MODES

    // START COPY COLOR
    var copyColor = function(){
        $(document).keydown(function(e) {
            if (e.keyCode == keyCodes.copyColor) { // Enter
                copyToClipboard(elementsTagName);
                $(copiedInfoElement).html("Copied to Clipboard.<br />rgba("+color+")").show().fadeTo(1000, 1000).fadeOut(200);
            }
        });
    }

    var copyToClipboard = function(elementsTagName) {
        var aux = document.createElement("input");
        aux.setAttribute("value", document.getElementsByTagName(elementsTagName)[0].style.backgroundColor);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
    }
    // END COPY COLOR

    return {
        //main function to initiate the module
        init: function () {
            initChangeColor();
            pauseMode();
            hiddenMode();
            changeSpeed();
            changeMode();
            changeModeWithKeys();
            copyColor();
        }
    };

}();

jQuery(document).ready(function() {
    init.init();
});