(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{418:function(t,e,r){"use strict";r.d(e,"a",(function(){return c})),r.d(e,"b",(function(){return d})),r.d(e,"c",(function(){return v}));var o=r(424),n=r(0),c=Object(n.j)("v-card__actions"),l=Object(n.j)("v-card__subtitle"),d=Object(n.j)("v-card__text"),v=Object(n.j)("v-card__title");o.a},424:function(t,e,r){"use strict";r(12),r(10),r(8),r(6),r(11);var o=r(2),n=(r(19),r(425),r(172)),c=r(174),l=r(78),d=r(7);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(d.a)(c.a,l.a,n.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return h(h({"v-card":!0},l.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},n.a.options.computed.classes.call(this))},styles:function(){var style=h({},n.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=c.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),r=e.tag,data=e.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(r,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},425:function(t,e,r){var content=r(426);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(16).default)("e23b7040",content,!0,{sourceMap:!1})},426:function(t,e,r){(e=r(15)(!1)).push([t.i,'.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card .v-card__subtitle,.theme--light.v-card>.v-card__text{color:rgba(0,0,0,.6)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card .v-card__subtitle,.theme--dark.v-card>.v-card__text{color:hsla(0,0%,100%,.7)}.v-sheet.v-card{border-radius:4px}.v-sheet.v-card:not(.v-sheet--outlined){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-sheet.v-card.v-sheet--shaped{border-radius:24px 4px}.v-card{border-width:thin;display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;word-wrap:break-word;position:relative;white-space:normal}.v-card>.v-card__progress+:not(.v-btn):not(.v-chip),.v-card>:first-child:not(.v-btn):not(.v-chip){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{top:0;left:0;right:0;overflow:hidden}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)!important}.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}.v-card--hover:focus,.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--link,.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}.v-card--disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-card--disabled>:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--raised{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}',""]),t.exports=e},431:function(t,e,r){var content=r(432);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(16).default)("dc0628f2",content,!0,{sourceMap:!1})},432:function(t,e,r){(e=r(15)(!1)).push([t.i,".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:1;pointer-events:none}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{transition-duration:.15s}.v-tooltip__content[class*=leave-active]{transition-duration:75ms}",""]),t.exports=e},435:function(t,e,r){"use strict";r(22),r(23),r(6),r(54),r(27),r(33),r(34);var o=r(21),n=r(30),c=r(29),l=r(26),d=r(20),v=r(13),h=r(55);function f(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,o=Object(d.a)(t);if(e){var n=Object(d.a)(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return Object(l.a)(this,r)}}var _=function(t,e,r,desc){var o,n=arguments.length,c=n<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(v.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(n<3?o(c):n>3?o(e,r,c):o(e,r))||c);return n>3&&c&&Object.defineProperty(e,r,c),c},m=function(t){Object(c.a)(r,t);var e=f(r);function r(){var t;return Object(o.a)(this,r),(t=e.apply(this,arguments)).baseUrl="https://piranesi.dl.itc.u-tokyo.ac.jp",t}return Object(n.a)(r,[{key:"copyLink",value:function(){var t=this.url;document.addEventListener("copy",(function e(r){r.clipboardData.setData("text/plain",t),r.preventDefault(),document.removeEventListener("copy",e)})),document.execCommand("copy")}},{key:"twitterUrl",get:function(){return"https://twitter.com/intent/tweet?url="+encodeURIComponent(this.url)+"&text="+this.title}},{key:"facebookUrl",get:function(){return"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(this.url)}},{key:"pocketUrl",get:function(){return"http://getpocket.com/edit?url="+encodeURIComponent(this.url)}},{key:"googleUrl",get:function(){return"https://www.google.co.jp/searchbyimage?image_url="+encodeURIComponent(this.image)}},{key:"iiifUrl",get:function(){return"http://pocket.cultural.jp/"+(this.$route.name.includes("___en")?"en/":"")+"?url="+encodeURIComponent(this.manifest)+"&related="+this.url}}]),r}(h.Vue);_([Object(h.Prop)({required:!0})],m.prototype,"url",void 0),_([Object(h.Prop)({required:!0})],m.prototype,"title",void 0),_([Object(h.Prop)()],m.prototype,"image",void 0),_([Object(h.Prop)()],m.prototype,"manifest",void 0);var y=m=_([h.Component],m),x=r(49),k=r(82),j=r.n(k),w=r(175),O=r(424),C=r(418),$=r(161),P=r(472),component=Object(x.a)(y,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{attrs:{flat:""}},[r("v-card-actions",[r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:""},on:{click:function(e){return t.copyLink()}}},o),[r("v-icon",[t._v("mdi-link")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Copy this link."))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.twitterUrl}},o),[r("v-icon",[t._v("mdi-twitter")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Twitter"))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.facebookUrl}},o),[r("v-icon",[t._v("mdi-facebook")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Facebook"))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.pocketUrl}},o),[r("img",{staticStyle:{"font-size":"24px"},attrs:{src:t.baseUrl+"/img/pocket.svg"}})])]}}])},[t._v(" "),r("span",[t._v(t._s("Pocket"))])]),t._v(" "),t.image?r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.googleUrl}},o),[r("v-icon",[t._v("mdi-google")])],1)]}}],null,!1,1839878146)},[t._v(" "),r("span",[t._v(t._s(t.$t("google_image_search")))])]):t._e(),t._v(" "),""!=t.manifest?r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.iiifUrl}},o),[r("v-icon",[t._v("mdi-star")])],1)]}}],null,!1,838617113)},[t._v(" "),r("span",[t._v(t._s("IIIF pocket"))])]):t._e()],1)],1)}),[],!1,null,null,null);e.a=component.exports;j()(component,{VBtn:w.a,VCard:O.a,VCardActions:C.a,VIcon:$.a,VTooltip:P.a})},472:function(t,e,r){"use strict";var o=r(2),n=(r(19),r(431),r(93)),c=r(24),l=r(114),d=r(112),v=r(177),h=r(141),f=r(42),_=r(0),m=r(9),y=r(7);e.a=Object(y.a)(c.a,l.a,d.a,v.a,h.a,f.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String,zIndex:{default:null}},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,r=!(this.bottom||this.left||this.top||this.right),o=!1!==this.attach?e.offsetLeft:e.left,n=0;return this.top||this.bottom||r?n=o+e.width/2-content.width/2:(this.left||this.right)&&(n=o+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(n-=parseInt(this.nudgeLeft)),this.nudgeRight&&(n+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(n,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,r=!1!==this.attach?e.offsetTop:e.top,o=0;return this.top||this.bottom?o=r+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=r+e.height/2-content.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(o+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(_.h)(this.maxWidth),minWidth:Object(_.h)(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(_.u)(this,"activator",!0)&&Object(m.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=n.a.options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===_.y.esc&&(t.getActivator(e),t.runDelay("close"))},e},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(o.a)(t,this.contentClass,!0),Object(o.a)(t,"menuable__content__active",this.isActive),Object(o.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},607:function(t,e,r){"use strict";r.r(e);r(22),r(23),r(6),r(54),r(173),r(41);var o=r(14),n=r(21),c=r(30),l=r(29),d=r(26),v=r(20),h=r(13),f=r(55),_=r(421),m=r(435);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,o=Object(v.a)(t);if(e){var n=Object(v.a)(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return Object(d.a)(this,r)}}var x=function(t,e,r,desc){var o,n=arguments.length,c=n<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(n<3?o(c):n>3?o(e,r,c):o(e,r))||c);return n>3&&c&&Object.defineProperty(e,r,c),c},k=function(t){Object(l.a)(d,t);var e,r=y(d);function d(){var t;return Object(n.a)(this,d),(t=r.apply(this,arguments)).baseUrl="https://piranesi.dl.itc.u-tokyo.ac.jp",t.arr=[],t.index=0,t.fileNo="",t.data={},t}return Object(c.a)(d,[{key:"head",value:function(){return{title:this.title}}},{key:"fetch",value:(e=Object(o.a)(regeneratorRuntime.mark((function t(e){var r,o,n,c,l,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.store,null!=(o=r.state).index4Photo){t.next=8;break}return t.next=5,e.app.$searchUtils.createIndexFromIIIFCollection("https://piranesi.dl.itc.u-tokyo.ac.jp/data/photo/iiif/top.json");case 5:n=t.sent,r.commit("setIndex4Photo",n.index),r.commit("setData4Photo",n.data);case 8:c=e.query,l=e.app.$searchUtils.createQuery(c,o),r.commit("setQuery",l),d=e.app.$searchUtils.search(r.state.index4Photo,r.state.data4Photo,r.state.query),e.store.commit("setResult",d);case 13:case"end":return t.stop()}}),t)}))),function(t){return e.apply(this,arguments)})},{key:"mounted",value:function(){var t=this.$store.state,e=this.$route.params.id?this.$route.params.id:"",r=this.$route.query.file_no;null!=r&&(this.fileNo=r);var o=[],n=t.data4Photo,c=[],l=t.index4Photo;if(null!=r)for(var d=["file_n1","file_n2","file_n3"],i=0;i<d.length;i++){var v=d[i];if(l[v][r])for(var h=l[v][r],f=0;f<h.length;f++)o.push(h[f])}else if(l.photo_no[e]){for(var _=l.photo_no[e],m=0;m<_.length;m++)o.push(_[m]);var y=n[o[0]];this.data=y,this.fileNo=this.$utils.formatArrayValue(y._source.file_n1)}for(var x=0;x<o.length;x++)c.push(n[o[x]]);this.arr=c}},{key:"dwnJson",value:function(){var t=this.currentId+".json",data=JSON.stringify(this.data,null,"\t"),link=document.createElement("a");link.href="data:text/json;charset=utf-8,"+encodeURIComponent(data),link.download=t,link.click()}},{key:"goTop",value:function(){window.scrollTo(0,0)}},{key:"obj",get:function(){var data=this.arr[this.index];return null==data?data:data=data._source}},{key:"manifest",get:function(){return this.arr[this.index]._id}},{key:"currentId",get:function(){return 0===this.arr.length?"":this.$utils.formatArrayValue(this.arr[this.index]._source.photo_no)}},{key:"url",get:function(){return 0===this.arr.length?"":"https://piranesi.dl.itc.u-tokyo.ac.jp/photo/"+this.currentId}},{key:"title",get:function(){return 0===this.arr.length?"":this.$utils.formatArrayValue(this.arr[this.index]._source._title)}},{key:"uv",get:function(){return this.baseUrl+"/mirador/?manifest="+encodeURIComponent(this.manifest)}}]),d}(f.Vue),j=k=x([Object(f.Component)({components:{ShareButtons:m.a,sheet:_.a}})],k),w=r(49),O=r(82),C=r.n(O),$=r(175),P=r(424),R=r(418),I=r(433),V=r(414),A=r(161),S=r(138),U=r(377),D=r(434),T=r(47),component=Object(w.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return null!=t.obj?r("div",[r("v-container",[r("sheet",{attrs:{id:t.fileNo}}),t._v(" "),r("h3",[t._v(t._s(t.$utils.formatArrayValue(t.obj.Edificio_i))+"\n      "),r("i",[t._v(t._s(t.$utils.formatArrayValue(t.obj.Edificio_l)))])]),t._v(" "),r("h2",{staticClass:"my-5"},[t._v(t._s(t.$utils.formatArrayValue(t.obj.Didascalia))+"\n    ")]),t._v(" "),r("iframe",{key:"jotform-iframe-"+t.uv,staticClass:"mb-5",attrs:{src:t.uv,width:"100%",height:"600px",allowfullscreen:"",frameborder:"0"}}),t._v(" "),r("v-sheet",{staticClass:"grey lighten-3 py-5 px-3 py-3 text-center mb-5",staticStyle:{"background-color":"#f9f6f0"}},[r("v-btn",{staticClass:"mr-2",attrs:{icon:""}},[r("a",{attrs:{href:t.manifest}},[r("v-img",{attrs:{contain:"",height:"24px",src:t.baseUrl+"/img/iiif-logo.svg"}})],1)]),t._v(" "),t.data?r("v-btn",{staticClass:"mr-2",attrs:{icon:""}},[r("a",[r("v-img",{attrs:{contain:"",width:"24px",src:t.baseUrl+"/img/json-logo.svg"},on:{click:function(e){return t.dwnJson()}}})],1)]):t._e(),t._v(" "),r("v-btn",{attrs:{icon:""}},[r("v-menu",{attrs:{top:"","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-icon",t._g({},o),[t._v("mdi-share-variant")])]}}],null,!1,2616211124)},[t._v(" "),r("ShareButtons",{attrs:{url:t.url,title:t.title,manifest:t.manifest}})],1)],1)],1),t._v(" "),r("div",{staticClass:"text-right"},[r("p",[r("small",[r("b",[t._v(t._s(t.$t("Photo by")))]),t._v("\n          "+t._s(t.$utils.formatArrayValue(t.obj.photographer))+",\n          "+t._s(t.$utils.formatArrayValue(t.obj.photo_date))+".")])]),t._v(" "),r("p",[r("small",[r("b",[t._v(t._s(t.$t("Description by")))]),t._v(" Natsumi ARAKI.")])])]),t._v(" "),r("v-row",{staticClass:"mb-5"},[r("v-col",{staticClass:"py-0",attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("Parte dell'oggetto")))])]),t._v(" "),r("v-col",{staticClass:"py-0",attrs:{cols:"12",sm:"10"}},[t._v(t._s(t.$utils.formatArrayValue(t.obj["Parte dell'oggetto"])))])],1),t._v(" "),r("v-row",{staticClass:"mb-5"},[r("v-col",{staticClass:"py-0",attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("Cronologia")))])]),t._v(" "),r("v-col",{staticClass:"py-0",attrs:{cols:"12",sm:"10"}},[t._v(t._s(t.$utils.formatArrayValue(t.obj.Cronologia)))])],1),t._v(" "),r("v-row",{staticClass:"mb-5"},[r("v-col",{staticClass:"py-0",attrs:{cols:"12",sm:"2"}},[r("small",[r("b",[t._v(t._s(t.$t("Localizzazione moderna")))])])]),t._v(" "),r("v-col",{staticClass:"py-0",attrs:{cols:"12",sm:"10"}},[t._v(t._s(t.$utils.formatArrayValue(t.obj["Localizzazione moderna"])))])],1),t._v(" "),t.arr.length>1?r("v-card",{staticClass:"mt-10"},[r("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[t._v(t._s(t.$t("Photos")))]),t._v(" "),r("div",{staticClass:"pa-5"},[r("v-row",[t._l(t.arr,(function(e,o){return[o!=t.index?r("v-col",{key:o,attrs:{cols:"6",sm:"4"}},[r("v-card",{staticClass:"mb-5",on:{click:function(e){t.index=o,t.goTop()}}},[r("v-img",{staticClass:"mt-2",staticStyle:{"background-color":"lightgray"},attrs:{contain:!0,height:"200px",src:"https://piranesi.dl.itc.u-tokyo.ac.jp/data/photo/m/"+t.$utils.formatArrayValue(e._source.photo_no)+".jpg"}}),t._v(" "),r("v-card-text",[r("p",[t._v("\n                    "+t._s(t.$utils.formatArrayValue(e._source.Didascalia))+"\n                  ")])])],1)],1):t._e()]}))],2)],1)],1):t._e(),t._v(" "),r("sheet",{staticClass:"my-10",attrs:{id:t.fileNo}})],1)],1):t._e()}),[],!1,null,null,null);e.default=component.exports;C()(component,{VBtn:$.a,VCard:P.a,VCardText:R.b,VCardTitle:R.c,VCol:I.a,VContainer:V.a,VIcon:A.a,VImg:S.a,VMenu:U.a,VRow:D.a,VSheet:T.a})}}]);