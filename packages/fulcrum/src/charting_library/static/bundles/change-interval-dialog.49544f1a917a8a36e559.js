(window.webpackJsonp=window.webpackJsonp||[]).push([["change-interval-dialog"],{MuC6:function(t,e,i){"use strict";function n(t){this._options=t||{},this._setInput(),this._caption=$('<i class="interval-caption">').html("&nbsp;"),this._helpTooltipTrigger=$('<i class="help-tooltip-trigger apply-common-tooltip common-tooltip-below">').text("?").attr("title",o()?c:u),this._dialogTitle=$.t("Change Interval")}function o(){return h.enabled("seconds_resolution")}var s=i("PT1i").linking,r=i("h24c").parseIntervalValue,a=i("h24c").intervalIsSupported,p=i("h24c").sanitizeIntervalValue,h=i("Kxc7"),l=i("pPtI"),d=i("GAqT").TVOldDialogs,u=$.t("Type the interval number for minute charts (i.e. 5 if it is going to be a five minute chart). Or number plus letter for H (Hourly), D (Daily), W (Weekly), M (Monthly) intervals (i.e. D or 2H)"),c=$.t("Type the interval number for minute charts (i.e. 5 if it's going to be a five minute chart). Or number plus letter for other intervals: S for 1 second chart (15S for 15 second chart, etc.), H (Hourly), D (Daily), W (Weekly), M (Monthly) intervals (i.e. D or 2H)"),_=[1,5,15,30];n.prototype._setInput=function(){this._input=$('<input type="text" class="change-interval-input" autocomplete="off" maxlength="5">'),this._input.on("keypress",this._handleInput.bind(this)).on("input",function(){this._validate(),this._updateCaption()}.bind(this)).on("blur",function(){setTimeout(this._submit.bind(this),0)}.bind(this))},n.prototype._validate=function(){var t,e=this._input.val();this._parsed=r(e),this._valid=!this._parsed.error,this._supported=!this._parsed.error&&a(e),t=this._parsed.unit,this._supported&&("R"===t&&this._parsed.qty>l.getMaxResolutionValue("R")?this._supported=!1:null===t||"H"===t?this._parsed.qty*("H"===t?60:1)>1440&&(this._supported=!1):"S"!==t||_.includes(this._parsed.qty)||(this._supported=!1))},n.prototype._updateCaption=function(){var t,e,i;this._valid&&this._supported?(e=this._parsed.qty||1,i=this._parsed.unit||"",t=l.getTranslatedResolutionModel(e+i).hint,this._input.add(this._caption).removeClass("error")):(t=this._parsed.error?"&nbsp;":$.t("Not applicable"),this._input.add(this._caption).addClass("error")),this._caption.html(t)},n.prototype._handleInput=function(t){var e,i,n;13!==t.which?t.ctrlKey||t.metaKey||!t.charCode||!t.which||t.which<=32||(e=String.fromCharCode(t.charCode),i=/[\dhdwms]/i,n=/[\dhdwm]/i,(o()?i.test(e):n.test(e))||t.preventDefault()):this._submit()},n.prototype._submit=function(){var t,e;d.isOpen(this._dialogTitle)&&(this._valid&&this._supported&&(t=p(this._input.val()),e=s.interval.value(),t&&e!==t&&"function"==typeof this._options.callback&&this._options.callback(t)),d.destroy(this._dialogTitle))},n.prototype._setInitialValue=function(t){var e,i;e="",i=!1,(t=t||this._options.initialValue)&&","!==t?e=p(t)||"":(e=t=s.interval.value(),i=!0),this._input.val(e),i&&this._input.select()},n.prototype.isValid=function(){return Boolean(this._valid)},n.prototype.show=function(t){var e=d.createDialog(this._dialogTitle,{hideCloseCross:!0,addClass:"change-interval-dialog",
ownerDocument:this._options.ownerDocument}),i=e.find("._tv-dialog-content");return e.css("min-width",0),i.css("min-width",0).mousedown(function(t){this._input.is(t.target)||t.preventDefault()}.bind(this)).append(this._input.add(this._caption).add(this._helpTooltipTrigger)),d.applyHandlers(e),d.positionDialog(e),this._setInitialValue(t),this._validate(),this._updateCaption(),e},t.exports.ChangeIntervalDialog=n},jAh7:function(t,e,i){"use strict";function n(t){var e,i,n;return void 0===t&&(t=document),null!==(e=t.getElementById("overlap-manager-root"))?Object(o.ensureDefined)(a.get(e)):(i=new r(t),n=function(t){var e=t.createElement("div");return e.style.position="absolute",e.style.zIndex=150..toString(),e.style.top="0px",e.style.left="0px",e.id="overlap-manager-root",e}(t),a.set(n,i),i.setContainer(n),t.body.appendChild(n),i)}var o,s,r,a;i.r(e),i.d(e,"OverlapManager",function(){return r}),i.d(e,"getRootOverlapManager",function(){return n}),o=i("Eyy1"),s=function(){function t(){this._storage=[]}return t.prototype.add=function(t){this._storage.push(t)},t.prototype.remove=function(t){this._storage=this._storage.filter(function(e){return t!==e})},t.prototype.has=function(t){return this._storage.includes(t)},t.prototype.getItems=function(){return this._storage},t}(),r=function(){function t(t){void 0===t&&(t=document),this._storage=new s,this._windows=new Map,this._index=0,this._document=t,this._container=t.createDocumentFragment()}return t.prototype.setContainer=function(t){var e=this._container,i=null===t?this._document.createDocumentFragment():t;!function(t,e){Array.from(t.childNodes).forEach(function(t){t.nodeType===Node.ELEMENT_NODE&&e.appendChild(t)})}(e,i),this._container=i},t.prototype.registerWindow=function(t){this._storage.has(t)||this._storage.add(t)},t.prototype.ensureWindow=function(t,e){var i,n;return void 0===e&&(e={position:"fixed"}),void 0!==(i=this._windows.get(t))?i:(this.registerWindow(t),(n=this._document.createElement("div")).style.position=e.position,n.style.zIndex=this._index.toString(),n.dataset.id=t,this._container.appendChild(n),this._windows.set(t,n),++this._index,n)},t.prototype.unregisterWindow=function(t){this._storage.remove(t);var e=this._windows.get(t);void 0!==e&&(null!==e.parentElement&&e.parentElement.removeChild(e),this._windows.delete(t))},t.prototype.getZindex=function(t){var e=this.ensureWindow(t);return parseInt(e.style.zIndex||"0")},t.prototype.moveToTop=function(t){this.getZindex(t)!==this._index&&(this.ensureWindow(t).style.zIndex=(++this._index).toString())},t.prototype.removeWindow=function(t){this.unregisterWindow(t)},t}(),a=new WeakMap}}]);