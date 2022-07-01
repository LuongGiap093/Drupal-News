!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())}));

/*!
 * jQuery UI Mouse 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","../ie","../version","../widget"],e):e(jQuery)}((function(e){"use strict";var t=!1;return e(document).on("mouseup",(function(){t=!1})),e.widget("ui.mouse",{version:"1.13.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.on("mousedown."+this.widgetName,(function(e){return t._mouseDown(e)})).on("click."+this.widgetName,(function(i){if(!0===e.data(i.target,t.widgetName+".preventClickEvent"))return e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1})),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,o=1===i.which,n=!("string"!=typeof this.options.cancel||!i.target.nodeName)&&e(i.target).closest(this.options.cancel).length;return!(o&&!n&&this._mouseCapture(i))||(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout((function(){s.mouseDelayMet=!0}),this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=!1!==this._mouseStart(i),!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0))}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||document.documentMode<9)&&!t.button)return this._mouseUp(t);if(!t.which)if(t.originalEvent.altKey||t.originalEvent.ctrlKey||t.originalEvent.metaKey||t.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=!1!==this._mouseStart(this._mouseDownEvent,t),this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(i){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,i.target===this._mouseDownEvent.target&&e.data(i.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(i)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,t=!1,i.preventDefault()},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}));

/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./mouse","../keycode","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.slider",a.ui.mouse,{version:"1.12.1",widgetEventPrefix:"slide",options:{animate:!1,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all","ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content"),this._refresh(),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var b,c,d=this.options,e=this.element.find(".ui-slider-handle"),f="<span tabindex='0'></span>",g=[];for(c=d.values&&d.values.length||1,e.length>c&&(e.slice(c).remove(),e=e.slice(0,c)),b=e.length;b<c;b++)g.push(f);this.handles=e.add(a(g.join("")).appendTo(this.element)),this._addClass(this.handles,"ui-slider-handle","ui-state-default"),this.handle=this.handles.eq(0),this.handles.each(function(b){a(this).data("ui-slider-handle-index",b).attr("tabIndex",0)})},_createRange:function(){var b=this.options;b.range?(b.range===!0&&(b.values?b.values.length&&2!==b.values.length?b.values=[b.values[0],b.values[0]]:a.isArray(b.values)&&(b.values=b.values.slice(0)):b.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?(this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max"),this.range.css({left:"",bottom:""})):(this.range=a("<div>").appendTo(this.element),this._addClass(this.range,"ui-slider-range")),"min"!==b.range&&"max"!==b.range||this._addClass(this.range,"ui-slider-range-"+b.range)):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this._mouseDestroy()},_mouseCapture:function(b){var c,d,e,f,g,h,i,j,k=this,l=this.options;return!l.disabled&&(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),c={x:b.pageX,y:b.pageY},d=this._normValueFromMouse(c),e=this._valueMax()-this._valueMin()+1,this.handles.each(function(b){var c=Math.abs(d-k.values(b));(e>c||e===c&&(b===k._lastChangedValue||k.values(b)===l.min))&&(e=c,f=a(this),g=b)}),h=this._start(b,g),h!==!1&&(this._mouseSliding=!0,this._handleIndex=g,this._addClass(f,null,"ui-state-active"),f.trigger("focus"),i=f.offset(),j=!a(b.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=j?{left:0,top:0}:{left:b.pageX-i.left-f.width()/2,top:b.pageY-i.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,g,d),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);return this._slide(a,this._handleIndex,c),!1},_mouseStop:function(a){return this._removeClass(this.handles,null,"ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;return"horizontal"===this.orientation?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),d<0&&(d=0),"vertical"===this.orientation&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e,this._trimAlignValue(f)},_uiHash:function(a,b,c){var d={handle:this.handles[a],handleIndex:a,value:void 0!==b?b:this.value()};return this._hasMultipleValues()&&(d.value=void 0!==b?b:this.values(a),d.values=c||this.values()),d},_hasMultipleValues:function(){return this.options.values&&this.options.values.length},_start:function(a,b){return this._trigger("start",a,this._uiHash(b))},_slide:function(a,b,c){var d,e,f=this.value(),g=this.values();this._hasMultipleValues()&&(e=this.values(b?0:1),f=this.values(b),2===this.options.values.length&&this.options.range===!0&&(c=0===b?Math.min(e,c):Math.max(e,c)),g[b]=c),c!==f&&(d=this._trigger("slide",a,this._uiHash(b,c,g)),d!==!1&&(this._hasMultipleValues()?this.values(b,c):this.value(c)))},_stop:function(a,b){this._trigger("stop",a,this._uiHash(b))},_change:function(a,b){this._keySliding||this._mouseSliding||(this._lastChangedValue=b,this._trigger("change",a,this._uiHash(b)))},value:function(a){return arguments.length?(this.options.value=this._trimAlignValue(a),this._refreshValue(),void this._change(null,0)):this._value()},values:function(b,c){var d,e,f;if(arguments.length>1)return this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),void this._change(null,b);if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this._hasMultipleValues()?this._values(b):this.value();for(d=this.options.values,e=arguments[0],f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()},_setOption:function(b,c){var d,e=0;switch("range"===b&&this.options.range===!0&&("min"===c?(this.options.value=this._values(0),this.options.values=null):"max"===c&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),a.isArray(this.options.values)&&(e=this.options.values.length),this._super(b,c),b){case"orientation":this._detectOrientation(),this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation),this._refreshValue(),this.options.range&&this._refreshRange(c),this.handles.css("horizontal"===c?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),d=e-1;d>=0;d--)this._change(null,d);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_setOptionDisabled:function(a){this._super(a),this._toggleClass(null,"ui-state-disabled",!!a)},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c,d;if(arguments.length)return b=this.options.values[a],b=this._trimAlignValue(b);if(this._hasMultipleValues()){for(c=this.options.values.slice(),d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c}return[]},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;return 2*Math.abs(c)>=b&&(d+=c>0?b:-b),parseFloat(d.toFixed(5))},_calculateNewMax:function(){var a=this.options.max,b=this._valueMin(),c=this.options.step,d=Math.round((a-b)/c)*c;a=d+b,a>this.options.max&&(a-=c),this.max=parseFloat(a.toFixed(this._precision()))},_precision:function(){var a=this._precisionOf(this.options.step);return null!==this.options.min&&(a=Math.max(a,this._precisionOf(this.options.min))),a},_precisionOf:function(a){var b=a.toString(),c=b.indexOf(".");return c===-1?0:b.length-c-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshRange:function(a){"vertical"===a&&this.range.css({width:"",left:""}),"horizontal"===a&&this.range.css({height:"",bottom:""})},_refreshValue:function(){var b,c,d,e,f,g=this.options.range,h=this.options,i=this,j=!this._animateOff&&h.animate,k={};this._hasMultipleValues()?this.handles.each(function(d){c=(i.values(d)-i._valueMin())/(i._valueMax()-i._valueMin())*100,k["horizontal"===i.orientation?"left":"bottom"]=c+"%",a(this).stop(1,1)[j?"animate":"css"](k,h.animate),i.options.range===!0&&("horizontal"===i.orientation?(0===d&&i.range.stop(1,1)[j?"animate":"css"]({left:c+"%"},h.animate),1===d&&i.range[j?"animate":"css"]({width:c-b+"%"},{queue:!1,duration:h.animate})):(0===d&&i.range.stop(1,1)[j?"animate":"css"]({bottom:c+"%"},h.animate),1===d&&i.range[j?"animate":"css"]({height:c-b+"%"},{queue:!1,duration:h.animate}))),b=c}):(d=this.value(),e=this._valueMin(),f=this._valueMax(),c=f!==e?(d-e)/(f-e)*100:0,k["horizontal"===this.orientation?"left":"bottom"]=c+"%",this.handle.stop(1,1)[j?"animate":"css"](k,h.animate),"min"===g&&"horizontal"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({width:c+"%"},h.animate),"max"===g&&"horizontal"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({width:100-c+"%"},h.animate),"min"===g&&"vertical"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({height:c+"%"},h.animate),"max"===g&&"vertical"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({height:100-c+"%"},h.animate))},_handleEvents:{keydown:function(b){var c,d,e,f,g=a(b.target).data("ui-slider-handle-index");switch(b.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(b.preventDefault(),!this._keySliding&&(this._keySliding=!0,this._addClass(a(b.target),null,"ui-state-active"),c=this._start(b,g),c===!1))return}switch(f=this.options.step,d=e=this._hasMultipleValues()?this.values(g):this.value(),b.keyCode){case a.ui.keyCode.HOME:e=this._valueMin();break;case a.ui.keyCode.END:e=this._valueMax();break;case a.ui.keyCode.PAGE_UP:e=this._trimAlignValue(d+(this._valueMax()-this._valueMin())/this.numPages);break;case a.ui.keyCode.PAGE_DOWN:e=this._trimAlignValue(d-(this._valueMax()-this._valueMin())/this.numPages);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(d===this._valueMax())return;e=this._trimAlignValue(d+f);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(d===this._valueMin())return;e=this._trimAlignValue(d-f)}this._slide(b,g,e)},keyup:function(b){var c=a(b.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(b,c),this._change(b,c),this._removeClass(a(b.target),null,"ui-state-active"))}}})});;
/**
 * @file
 * Pagerer slider pager scripts.
 */

(function ($) {

  'use strict';

  Drupal.behaviors.pagererSlider = {

    attach: function (context, settings) {

      /**
       * Constants.
       */
      var PAGERER_LEFT = -1;
      var PAGERER_RIGHT = 1;

      /**
       * Pagerer slider jQuery UI slider event binding.
       */
      $('.pagerer-slider', context).once('pagerer').each(function (index) {
        Drupal.pagerer.state.isRelocating = false;
        this.pagererState = Drupal.pagerer.evalState(this);

        // Create slider.
        var sliderBar = $(this);
        sliderBar.slider({
          min: 0,
          max: this.pagererState.total - 1,
          step: 1,
          value: this.pagererState.current,
          range: 'min',
          animate: true
        });

        // Set slider handle dimensions and text.
        var sliderHandle = sliderBar.find('.ui-slider-handle');
        sliderHandle
          .css('width', (String(Drupal.pagerer.indexToTag(this.pagererState.total - 1, this.pagererState, 'page')).length + 2) + 'em')
          .css('height', Math.max(sliderHandle.height(), 16) + 'px')
          .css('line-height', Math.max(sliderHandle.height(), 16) + 'px')
          .css('margin-left', -sliderHandle.width() / 2)
          .text(Drupal.pagerer.indexToTag(this.pagererState.current, this.pagererState, 'page'))
          .on('blur', function (event) {
            Drupal.pagerer.reset();
            var sliderBar = $(this).parent().get(0);
            if (!sliderBar.pagererState.spinning) {
              sliderBar.pagererState.spinning = true;
              $(sliderBar).slider('option', 'value', sliderBar.pagererState.current);
              $(this).text(Drupal.pagerer.indexToTag(sliderBar.pagererState.current, sliderBar.pagererState, 'page'));
              sliderBar.pagererState.spinning = false;
            }
          });

        // Set slider bar dimensions.
        if (this.pagererState.sliderWidth) {
          sliderBar.css('width', (this.pagererState.sliderWidth + 'em'));
        }
        sliderBar
          .css('margin-left', sliderHandle.width() / 2)
          .css('margin-right', sliderHandle.width() / 2);

        var pixelsPerStep = sliderBar.width() / this.pagererState.total;
        // If autodetection of navigation action, determine whether to
        // use tickmark or timeout.
        if (this.pagererState.action === 'auto') {
          if (pixelsPerStep > 3) {
            this.pagererState.action = 'timeout';
          }
          else {
            this.pagererState.action = 'tickmark';
          }
        }
        // If autodetection of navigation icons, determine whether to
        // hide icons.
        if (this.pagererState.icons === 'auto' && pixelsPerStep > 3) {
          $(this).parents('.pager').find('.pagerer-slider-control-icon').parent().hide();
        }
        // Add information to user to click on the tickmark to start page
        // relocation.
        if (this.pagererState.action === 'tickmark') {
          var title = $(this).attr('title');
          $(this).attr('title', title + ' ' + this.pagererState.tickmarkTitle);
        }
      })
        .on('slide', function (event, ui) {
          Drupal.pagerer.reset();
          $(this).find('.ui-slider-handle').text(Drupal.pagerer.indexToTag(ui.value, this.pagererState, 'page'));
        })
        .on('slidechange', function (event, ui) {

          var sliderBar = this;
          var sliderHandle = $(this).find('.ui-slider-handle');
          var sliderHandleIcon;

          // Set handle text to widget value.
          sliderHandle.text(Drupal.pagerer.indexToTag(ui.value, this.pagererState, 'page'));

          // If currently sliding the handle via navigation icons,
          // do nothing.
          if (this.pagererState.spinning) {
            return false;
          }

          // If selected same page as current, do nothing.
          if (ui.value === this.pagererState.current) {
            return false;
          }

          // Relocate immediately to target page if no
          // tickmark/timeout confirmation required.
          if (this.pagererState.action === 'timeout' && this.pagererState.timeout === 0) {
            sliderHandle.append('<div class="pagerer-slider-handle-icon"/>');
            sliderHandleIcon = sliderHandle.find('.pagerer-slider-handle-icon');
            Drupal.pagerer.relocate(this, ui.value);
            return false;
          }

          // Otherwise, add a tickmark or clock icon to the handle text,
          // to be clicked to activate page relocation.
          sliderHandle.text(Drupal.pagerer.indexToTag(ui.value, this.pagererState, 'page') + ' ');
          if (this.pagererState.action === 'timeout') {
            sliderHandle.append('<div class="pagerer-slider-handle-icon throbber"/>');
          }
          else {
            sliderHandle.append('<div class="pagerer-slider-handle-icon ui-icon ui-icon-check"/>');
          }

          // Bind page relocation to mouse clicking on the icon.
          sliderHandleIcon = sliderHandle.find('.pagerer-slider-handle-icon');
          sliderHandleIcon.on('mousedown', function (event) {
            Drupal.pagerer.reset();
            // Remove icon.
            $(sliderBar).find('.pagerer-slider-handle-icon').remove();
            // Relocate.
            Drupal.pagerer.relocate(sliderBar, ui.value);
            return false;
          });

          // Bind page relocation to timeout of timeout.
          if (this.pagererState.action === 'timeout') {
            Drupal.pagerer.reset();
            Drupal.pagerer.state.timeoutAction = setTimeout(function () {
              // Remove icon.
              $(sliderBar).find('.pagerer-slider-handle-icon').removeClass('ui-icon').removeClass('throbber');
              // Relocate.
              Drupal.pagerer.relocate(sliderBar, ui.value);
              return false;
            }, this.pagererState.timeout);
          }

        });

      /**
        * Pagerer slider control icons event binding.
        *
        * The navigation icons serve as an helper for the slider positioning,
        * to fine-tune the selection. Once mouse is pressed on an icon, the
        * slider handle is moved +/- one value. If mouse is kept pressed, the
        * slider handle will move continuosly. When mouse is released or moved
        * away from the icon, sliding will stop and the handle status will be
        * processed through slider 'slidechange' event triggered by the
        * sliderOffsetValue() function.
        */
      $('.pagerer-slider-control-icon', context)
        .on('mousedown', function (event) {
          Drupal.pagerer.reset();
          var slider = $(this).parents('.pager').find('.pagerer-slider').get(0);
          slider.pagererState.spinning = true;
          var offset = $(this).hasClass('ui-icon-circle-minus') ? PAGERER_LEFT : PAGERER_RIGHT;
          sliderOffsetValue(slider, offset);
          Drupal.pagerer.state.intervalAction = setInterval(function () {
            Drupal.pagerer.state.intervalCount++;
            if (Drupal.pagerer.state.intervalCount > 10) {
              sliderOffsetValue(slider, offset);
            }
          }, 50);
        })
        .on('mouseup mouseleave', function () {
          var slider = $(this).parents('.pager').find('.pagerer-slider').get(0);
          if (slider.pagererState.spinning) {
            Drupal.pagerer.state.intervalCount = 0;
            clearInterval(Drupal.pagerer.state.intervalAction);
            slider.pagererState.spinning = false;
            sliderOffsetValue(slider, 0);
            $(slider).find('.ui-slider-handle').focus();
          }
        });

      /**
       * Update value based on an offset.
       *
       * @param {HTMLElement} element
       *   Slider element.
       * @param {number} offset
       *   Offset from current value.
       */
      function sliderOffsetValue(element, offset) {
        var newValue = $(element).slider('option', 'value') + offset;
        var maxValue = $(element).slider('option', 'max');
        if (newValue >= 0 && newValue <= maxValue) {
          $(element).slider('option', 'value', newValue);
        }
      }
    },

    detach: function (context, settings) {
      $('.pagerer-slider', context).each(function (index) {
        Drupal.pagerer.detachState(this);
      });
    }
  };
})(jQuery);
;
