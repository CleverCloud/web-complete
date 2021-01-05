var __awaiter=this&&this.__awaiter||function(t,e,i,n){function s(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,a){function r(t){try{u(n.next(t))}catch(t){a(t)}}function o(t){try{u(n["throw"](t))}catch(t){a(t)}}function u(t){t.done?i(t.value):s(t.value).then(r,o)}u((n=n.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var i={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,s,a,r;return r={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(r[Symbol.iterator]=function(){return this}),r;function o(t){return function(e){return u([t,e])}}function u(r){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,s&&(a=r[0]&2?s["return"]:r[0]?s["throw"]||((a=s["return"])&&a.call(s),0):s.next)&&!(a=a.call(s,r[1])).done)return a;if(s=0,a)r=[r[0]&2,a.value];switch(r[0]){case 0:case 1:a=r;break;case 4:i.label++;return{value:r[1],done:false};case 5:i.label++;s=r[1];r=[0];continue;case 7:r=i.ops.pop();i.trys.pop();continue;default:if(!(a=i.trys,a=a.length>0&&a[a.length-1])&&(r[0]===6||r[0]===2)){i=0;continue}if(r[0]===3&&(!a||r[1]>a[0]&&r[1]<a[3])){i.label=r[1];break}if(r[0]===6&&i.label<a[1]){i.label=a[1];a=r;break}if(a&&i.label<a[2]){i.label=a[2];i.ops.push(r);break}if(a[2])i.ops.pop();i.trys.pop();continue}r=e.call(t,i)}catch(t){r=[6,t];s=0}finally{n=a=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:true}}};System.register(["./p-add1e17d.system.js"],(function(t){"use strict";var e,i,n;return{setters:[function(t){e=t.r;i=t.c;n=t.h}],execute:function(){var s=t("web_complete",function(){function t(t){e(this,t);this.selected=i(this,"selected",7);this.unselected=i(this,"unselected",7);this.activeIndex=-1;this.data=[];this.active=false;this.text="";this.value="";this.placeholder="";this.clearOnUnselectedClosing=true;this.disabled=false;this.minInput=0;this.maxSuggestions=5;this.emptySuggestionTime=-1;this.required=false;this.inputId="";this.cssClasses={wrapper:"",input:"",suggestions:"suggestions",suggestion:"suggestion",active:"active"}}t.prototype.getValue=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,this.value]}))}))};t.prototype.getText=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,this.text]}))}))};t.prototype.clear=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.handleClose();return[2]}))}))};t.prototype.handleKeyDown=function(t){if(["ArrowDown","ArrowUp","Down","Up"].indexOf(t.key)>=0){t.preventDefault();this.handleActivation(t.key=="ArrowDown"||t.key=="Down")}else if(t.key=="Enter"||t.key=="Tab"){t.preventDefault();this.handleSelection(this.activeIndex)}else if(t.key=="Escape"){this.handleClose()}};t.prototype.handleKeyUp=function(t,e){if(["ArrowDown","ArrowUp","Enter","Tab","Escape"].indexOf(t)<0){this.clearSelection(true);this.prepareSuggestions(e)}this.active=true;this.text=e};t.prototype.handleFocus=function(t){var e=this;t.preventDefault();this.active=true;if(this.emptySuggestionTime>=0){this.prepareSuggestions(this.text).then((function(){e.handleActivation(false)}))}};t.prototype.handleBlur=function(t){var e=this;t.preventDefault();setTimeout((function(){if(e.active){if(e.value){e.clearData()}else{e.handleClose()}}}),250)};t.prototype.handleClose=function(){this.clearSelection();this.clearData()};t.prototype.handleActivation=function(t){if(t===void 0){t=true}if(this.data.length>0){if(t&&this.activeIndex+1<this.data.length){this.activeIndex+=1}else if(t){this.activeIndex=0}else if(!t&&this.activeIndex>0){this.activeIndex-=1}else if(!t){this.activeIndex=this.data.length-1}}};t.prototype.handleSelection=function(t){if(t>=0&&t<this.data.length){this.text=this.data[t].text;this.value=this.data[t].value;this.selected.emit(this.data[t]);this.clearData()}else if(!this.clearOnUnselectedClosing){this.handleClose()}};t.prototype.clearData=function(){this.data=[];this.activeIndex=-1;this.active=false};t.prototype.clearSelection=function(t){if(t===void 0){t=false}if(this.value!=""){this.unselected.emit({text:this.text,value:this.value});if(this.clearOnUnselectedClosing){this.value=""}}if(!t&&this.clearOnUnselectedClosing){this.text=""}};t.prototype.prepareSuggestions=function(t){return __awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(i){switch(i.label){case 0:if(!(this.suggestionGenerator&&t.length>=this.minInput))return[3,2];return[4,this.suggestionGenerator(t)];case 1:e=i.sent();e.splice(this.maxSuggestions);this.data=e;return[3,3];case 2:this.data=[];i.label=3;case 3:return[2]}}))}))};t.prototype.render=function(){var t=this;return n("div",{class:this.cssClasses.wrapper},n("input",{class:this.cssClasses.input,onKeyDown:function(e){return t.handleKeyDown(e)},onKeyUp:function(e){return t.handleKeyUp(e.key,e.target["value"])},onBlur:function(e){t.handleBlur(e)},onFocus:function(e){t.handleFocus(e)},type:"text",inputMode:this.inputmode,id:this.inputId,required:this.required,autocomplete:"off",disabled:this.disabled,placeholder:this.placeholder,value:this.text}),this.data&&this.data.length>0?n("div",{class:this.cssClasses.suggestions},this.data.map((function(e,i){return n("button",{onClick:function(){return t.handleSelection(i)},type:"button",class:t.cssClasses.suggestion+(t.activeIndex==i?" "+t.cssClasses.active:""),"data-value":e.value},e.suggestion?e.suggestion:e.text)}))):"")};return t}())}}}));