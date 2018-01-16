
/*! rangeslider.js - v2.3.0 | (c) 2016 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";function b(){var a=document.createElement("input");return a.setAttribute("type","range"),"text"!==a.type}function c(a,b){var c=Array.prototype.slice.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)}function d(a,b){return b=b||100,function(){if(!a.debouncing){var c=Array.prototype.slice.apply(arguments);a.lastReturnVal=a.apply(window,c),a.debouncing=!0}return clearTimeout(a.debounceTimeout),a.debounceTimeout=setTimeout(function(){a.debouncing=!1},b),a.lastReturnVal}}function e(a){return a&&(0===a.offsetWidth||0===a.offsetHeight||a.open===!1)}function f(a){for(var b=[],c=a.parentNode;e(c);)b.push(c),c=c.parentNode;return b}function g(a,b){function c(a){"undefined"!=typeof a.open&&(a.open=!a.open)}var d=f(a),e=d.length,g=[],h=a[b];if(e){for(var i=0;i<e;i++)g[i]=d[i].style.cssText,d[i].style.setProperty?d[i].style.setProperty("display","block","important"):d[i].style.cssText+=";display: block !important",d[i].style.height="0",d[i].style.overflow="hidden",d[i].style.visibility="hidden",c(d[i]);h=a[b];for(var j=0;j<e;j++)d[j].style.cssText=g[j],c(d[j])}return h}function h(a,b){var c=parseFloat(a);return Number.isNaN(c)?b:c}function i(a){return a.charAt(0).toUpperCase()+a.substr(1)}function j(b,e){if(this.$window=a(window),this.$document=a(document),this.$element=a(b),this.options=a.extend({},n,e),this.polyfill=this.options.polyfill,this.orientation=this.$element[0].getAttribute("data-orientation")||this.options.orientation,this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideEnd=this.options.onSlideEnd,this.DIMENSION=o.orientation[this.orientation].dimension,this.DIRECTION=o.orientation[this.orientation].direction,this.DIRECTION_STYLE=o.orientation[this.orientation].directionStyle,this.COORDINATE=o.orientation[this.orientation].coordinate,this.polyfill&&m)return!1;this.identifier="js-"+k+"-"+l++,this.startEvent=this.options.startEvent.join("."+this.identifier+" ")+"."+this.identifier,this.moveEvent=this.options.moveEvent.join("."+this.identifier+" ")+"."+this.identifier,this.endEvent=this.options.endEvent.join("."+this.identifier+" ")+"."+this.identifier,this.toFixed=(this.step+"").replace(".","").length-1,this.$fill=a('<div class="'+this.options.fillClass+'" />'),this.$handle=a('<div class="'+this.options.handleClass+'" />'),this.$range=a('<div class="'+this.options.rangeClass+" "+this.options[this.orientation+"Class"]+'" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$handle),this.$element.css({position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this.handleDown=a.proxy(this.handleDown,this),this.handleMove=a.proxy(this.handleMove,this),this.handleEnd=a.proxy(this.handleEnd,this),this.init();var f=this;this.$window.on("resize."+this.identifier,d(function(){c(function(){f.update(!1,!1)},300)},20)),this.$document.on(this.startEvent,"#"+this.identifier+":not(."+this.options.disabledClass+")",this.handleDown),this.$element.on("change."+this.identifier,function(a,b){if(!b||b.origin!==f.identifier){var c=a.target.value,d=f.getPositionFromValue(c);f.setPosition(d)}})}Number.isNaN=Number.isNaN||function(a){return"number"==typeof a&&a!==a};var k="rangeslider",l=0,m=b(),n={polyfill:!0,orientation:"horizontal",rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",activeClass:"rangeslider--active",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"]},o={orientation:{horizontal:{dimension:"width",direction:"left",directionStyle:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",directionStyle:"bottom",coordinate:"y"}}};return j.prototype.init=function(){this.update(!0,!1),this.onInit&&"function"==typeof this.onInit&&this.onInit()},j.prototype.update=function(a,b){a=a||!1,a&&(this.min=h(this.$element[0].getAttribute("min"),0),this.max=h(this.$element[0].getAttribute("max"),100),this.value=h(this.$element[0].value,Math.round(this.min+(this.max-this.min)/2)),this.step=h(this.$element[0].getAttribute("step"),1)),this.handleDimension=g(this.$handle[0],"offset"+i(this.DIMENSION)),this.rangeDimension=g(this.$range[0],"offset"+i(this.DIMENSION)),this.maxHandlePos=this.rangeDimension-this.handleDimension,this.grabPos=this.handleDimension/2,this.position=this.getPositionFromValue(this.value),this.$element[0].disabled?this.$range.addClass(this.options.disabledClass):this.$range.removeClass(this.options.disabledClass),this.setPosition(this.position,b)},j.prototype.handleDown=function(a){if(a.preventDefault(),this.$document.on(this.moveEvent,this.handleMove),this.$document.on(this.endEvent,this.handleEnd),this.$range.addClass(this.options.activeClass),!((" "+a.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.options.handleClass)>-1)){var b=this.getRelativePosition(a),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=this.getPositionFromNode(this.$handle[0])-c,e="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(e),b>=d&&b<d+this.handleDimension&&(this.grabPos=b-d)}},j.prototype.handleMove=function(a){a.preventDefault();var b=this.getRelativePosition(a),c="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(c)},j.prototype.handleEnd=function(a){a.preventDefault(),this.$document.off(this.moveEvent,this.handleMove),this.$document.off(this.endEvent,this.handleEnd),this.$range.removeClass(this.options.activeClass),this.$element.trigger("change",{origin:this.identifier}),this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.position,this.value)},j.prototype.cap=function(a,b,c){return a<b?b:a>c?c:a},j.prototype.setPosition=function(a,b){var c,d;void 0===b&&(b=!0),c=this.getValueFromPosition(this.cap(a,0,this.maxHandlePos)),d=this.getPositionFromValue(c),this.$fill[0].style[this.DIMENSION]=d+this.grabPos+"px",this.$handle[0].style[this.DIRECTION_STYLE]=d+"px",this.setValue(c),this.position=d,this.value=c,b&&this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(d,c)},j.prototype.getPositionFromNode=function(a){for(var b=0;null!==a;)b+=a.offsetLeft,a=a.offsetParent;return b},j.prototype.getRelativePosition=function(a){var b=i(this.COORDINATE),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=0;return"undefined"!=typeof a.originalEvent["client"+b]?d=a.originalEvent["client"+b]:a.originalEvent.touches&&a.originalEvent.touches[0]&&"undefined"!=typeof a.originalEvent.touches[0]["client"+b]?d=a.originalEvent.touches[0]["client"+b]:a.currentPoint&&"undefined"!=typeof a.currentPoint[this.COORDINATE]&&(d=a.currentPoint[this.COORDINATE]),d-c},j.prototype.getPositionFromValue=function(a){var b,c;return b=(a-this.min)/(this.max-this.min),c=Number.isNaN(b)?0:b*this.maxHandlePos},j.prototype.getValueFromPosition=function(a){var b,c;return b=a/(this.maxHandlePos||1),c=this.step*Math.round(b*(this.max-this.min)/this.step)+this.min,Number(c.toFixed(this.toFixed))},j.prototype.setValue=function(a){a===this.value&&""!==this.$element[0].value||this.$element.val(a).trigger("input",{origin:this.identifier})},j.prototype.destroy=function(){this.$document.off("."+this.identifier),this.$window.off("."+this.identifier),this.$element.off("."+this.identifier).removeAttr("style").removeData("plugin_"+k),this.$range&&this.$range.length&&this.$range[0].parentNode.removeChild(this.$range[0])},a.fn[k]=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),e=d.data("plugin_"+k);e||d.data("plugin_"+k,e=new j(this,b)),"string"==typeof b&&e[b].apply(e,c)})},"rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"});


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
	
	
	
	
	
	// START MOBILE TEXT
	var mobileText = function(){
		$(".center-info").html("Tap the Screen");
	}
	// END MOBILE TEXT
	
	// START RANGE SLIDER
	var rangeSlider = function(){
		var element = $('#range_slider');
		var $output = $('output');

		element.rangeslider({
			polyfill: false,
			onInit: function() {
				mobileChangeSpeed(this.value);
			},
			onSlide: function() {
				mobileChangeSpeed(this.value);
			}
		});
	}
	// END RANGE SLIDER
	
    // START PAUSE MODE
    var mobilePauseMode = function() {
        $(document).on("click",function(e) {
		   if(!$(e.target).hasClass('mode') && !$(e.target).hasClass('rangeslider') && !$(e.target).hasClass('rangeslider__fill') && !$(e.target).hasClass('rangeslider__handle')) {
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
	
    // START MOBILE CHANGE SPEED
    var mobileChangeSpeed = function(range_speed) {
		if(range_speed > 4){
			$(".speed").text(parseFloat(round(range_speed)/10).toFixed(2));
			//$(".speed").text(parseFloat(1/round(range_speed)*250).toFixed(2));
			speed=1/range_speed*50000;
		}
    }
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
        }
    };

}();



jQuery(document).ready(function() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		init.mobile();
	} else {
		init.web();
	}
});
