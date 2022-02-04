var init = (function () {
  var elementsTagName = "body",
    mainElement = $(elementsTagName),
    centerInfoElement = $(".center-info"),
    copiedInfoElement = $(".copied-info"),
    color = "",
    speed = 1000,
    s = speed / 5;
  (mode = "random"),
    (round = Math.round),
    (random = Math.random),
    (counter = 0),
    (isHiddenMode = false),
    (isPauseMode = true),
    (changeColorTimeout = null);
  var modes = ["random", "bw", "police"];
  var keyCodes = {
    hiddenMode: "Escape", // ESC
    pauseMode: " ", // Space
    copyColor: "Enter", // Enter
    speedUp1: "NumpadAdd", // +
    speedUp2: "ArrowUp", // ↑
    speedDown1: "NumpadSubtract", // -
    speedDown2: "ArrowDown", // ↓
    previousMode: "ArrowLeft", // ←
    nextMode: "ArrowRight", // →
  };

  // START HIDDEN MODE
  var hiddenMode = function () {
    $(document).on("keydown", function (e) {
      if (e.key == keyCodes.hiddenMode) {
        if (isHiddenMode) {
          $("*").not("style, script, .copied-info, title").show();
          isHiddenMode = false;
        } else {
          $("*").not("html, body").hide();
          isHiddenMode = true;
        }
      }
    });
  };
  // END HIDDEN MODE

  // START PAUSE MODE
  var pauseMode = function () {
    $(document).on("keydown", function (e) {
      if (e.key == keyCodes.pauseMode) {
        $(centerInfoElement).text("");
        if (isPauseMode) {
          changeColorTimeout = setTimeout(changeColor, round(s));
          isPauseMode = false;
        } else {
          clearTimeout(changeColorTimeout);
          isPauseMode = true;
        }
      }
    });
  };
  // END PAUSE MODE

  // START CHANGE COLOR
  var initChangeColor = function () {
    if (!isPauseMode) {
      changeColor();
      $(centerInfoElement).text("");
    } else {
      modeRandom();
      counter++;
    }
  };

  var changeColor = function () {
    s = speed / 5;
    changeColorInterval();
    changeColorTimeout = setTimeout(changeColor, round(s));
  };

  var changeColorInterval = function () {
    if (mode == "bw") modeBlackWhite();
    else if (mode == "random") modeRandom();
    else if (mode == "police") modePolice();

    counter++;
  };
  // END CHANGE COLOR

  // START CHANGE SPEED
  var changeSpeed = function () {
    $(document).on("keydown", function (e) {
      $(".speed").text(parseFloat((1 / round(s)) * 1000).toFixed(2));
      s = speed / 5;
      if (e.key == keyCodes.speedUp1 || e.key == keyCodes.speedUp2) {
        if (speed > 50) {
          speed -= 50;
        }
      }
      if (e.key == keyCodes.speedDown1 || e.key == keyCodes.speedDown2) {
        speed += 50;
      }
    });
  };
  // END CHANGE SPEED

  // START CHANGE MODES
  var changeMode = function () {
    $(".mode").on("click", function (event) {
      var selected_mode = $(event.target).data("mode");
      mode = selected_mode;
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
    });
  };
  // END CHANGE MODES

  // START CHANGE MODE WITH KEYS
  var changeModeWithKeys = function () {
    $(document).on("keydown", function (e) {
      if (e.key == keyCodes.previousMode) {
        // previousMode
        var mode_index = modes.indexOf(mode);
        next_mode_index = (mode_index - 1 + modes.length) % modes.length;
        mode = modes[next_mode_index];

        var mode_element = $(".modes").find("[data-mode='" + mode + "']");
        $(mode_element).addClass("active");
        $(mode_element).siblings().removeClass("active");
      }
      if (e.key == keyCodes.nextMode) {
        // nextMode
        var mode_index = modes.indexOf(mode);
        next_mode_index = (mode_index + 1 + modes.length) % modes.length;
        mode = modes[next_mode_index];

        var mode_element = $(".modes").find("[data-mode='" + mode + "']");
        $(mode_element).addClass("active");
        $(mode_element).siblings().removeClass("active");
      }
    });
  };
  // END CHANGE MODE WITH KEYS

  // START MODES
  var modeRandom = function () {
    var r = round(random() * 255),
      g = round(random() * 255),
      b = round(random() * 255),
      a = random().toFixed(1);
    color = r + "," + g + "," + b + "," + a;
    mainElement.css("background-color", "rgba(" + color + ")");
  };
  var modeBlackWhite = function () {
    color = counter % 2 ? "0,0,0,1" : "255,255,255,1";
    mainElement.css("background-color", "rgba(" + color + ")");
  };
  var modePolice = function () {
    switch (counter % 2) {
      case 0:
        color = "rgba(255,0,0,1)";
        break;
      case 1:
        color = "rgba(0,0,255,1)";
        break;
    }
    mainElement.css("background-color", color);
  };
  // END MODES

  // START COPY COLOR
  var copyColor = function () {
    $(document).on("keydown", function (e) {
      if (e.key == keyCodes.copyColor) {
        // Enter
        copyToClipboard(elementsTagName);
        $(copiedInfoElement)
          .html("Copied to Clipboard.<br />rgba(" + color + ")")
          .show()
          .fadeTo(1000, 1000)
          .fadeOut(200);
      }
    });
  };

  var copyToClipboard = function (elementsTagName) {
    var aux = document.createElement("input");
    aux.setAttribute(
      "value",
      document.getElementsByTagName(elementsTagName)[0].style.backgroundColor
    );
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  };
  // END COPY COLOR

  // START MOBILE TEXT
  var mobileText = function () {
    $(".center-info").html("Tap the Screen");
  };
  // END MOBILE TEXT

  // START RANGE SLIDER
  var rangeSlider = function () {
    var element = $("#range_slider");

    element.rangeslider({
      polyfill: false,
      onInit: function () {
        mobileChangeSpeed(this.value);
      },
      onSlide: function () {
        mobileChangeSpeed(this.value);
      },
    });
  };
  // END RANGE SLIDER

  // START PAUSE MODE
  var mobilePauseMode = function () {
    $(document).on("click", function (e) {
      if (
        !$(e.target).hasClass("mode") &&
        !$(e.target).hasClass("rangeslider") &&
        !$(e.target).hasClass("rangeslider__fill") &&
        !$(e.target).hasClass("rangeslider__handle")
      ) {
        $(centerInfoElement).text("");
        if (isPauseMode) {
          changeColorTimeout = setTimeout(changeColor, round(s));
          isPauseMode = false;
        } else {
          clearTimeout(changeColorTimeout);
          isPauseMode = true;
        }
      }
    });
  };
  // END PAUSE MODE

  // START MOBILE CHANGE SPEED
  var mobileChangeSpeed = function (range_speed) {
    if (range_speed > 4) {
      $(".speed").text(parseFloat(round(range_speed) / 10).toFixed(2));
      //$(".speed").text(parseFloat(1/round(range_speed)*250).toFixed(2));
      speed = (1 / range_speed) * 50000;
    }
  };
  // END MOBILE CHANGE SPEED

  return {
    //main function to initiate the module
    web: function () {
      initChangeColor();
      pauseMode();
      hiddenMode();
      changeSpeed();
      changeMode();
      changeModeWithKeys();
      copyColor();
    },
    mobile: function () {
      rangeSlider();
      initChangeColor();
      mobilePauseMode();
      mobileChangeSpeed();
      changeMode();
      mobileText();
    },
  };
})();

jQuery(function () {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    init.mobile();
  } else {
    init.web();
  }
});
