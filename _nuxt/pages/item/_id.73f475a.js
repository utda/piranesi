(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{435:function(t,e,r){"use strict";r(22),r(23),r(6),r(54),r(27),r(33),r(34);var o=r(21),n=r(30),l=r(29),c=r(26),_=r(20),v=r(13),m=r(55);function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,o=Object(_.a)(t);if(e){var n=Object(_.a)(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return Object(c.a)(this,r)}}var f=function(t,e,r,desc){var o,n=arguments.length,l=n<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(v.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(l=(n<3?o(l):n>3?o(e,r,l):o(e,r))||l);return n>3&&l&&Object.defineProperty(e,r,l),l},h=function(t){Object(l.a)(r,t);var e=d(r);function r(){var t;return Object(o.a)(this,r),(t=e.apply(this,arguments)).baseUrl="https://piranesi.dl.itc.u-tokyo.ac.jp",t}return Object(n.a)(r,[{key:"copyLink",value:function(){var t=this.url;document.addEventListener("copy",(function e(r){r.clipboardData.setData("text/plain",t),r.preventDefault(),document.removeEventListener("copy",e)})),document.execCommand("copy")}},{key:"twitterUrl",get:function(){return"https://twitter.com/intent/tweet?url="+encodeURIComponent(this.url)+"&text="+this.title}},{key:"facebookUrl",get:function(){return"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(this.url)}},{key:"pocketUrl",get:function(){return"http://getpocket.com/edit?url="+encodeURIComponent(this.url)}},{key:"googleUrl",get:function(){return"https://www.google.co.jp/searchbyimage?image_url="+encodeURIComponent(this.image)}},{key:"iiifUrl",get:function(){return"http://pocket.cultural.jp/"+(this.$route.name.includes("___en")?"en/":"")+"?url="+encodeURIComponent(this.manifest)+"&related="+this.url}}]),r}(m.Vue);f([Object(m.Prop)({required:!0})],h.prototype,"url",void 0),f([Object(m.Prop)({required:!0})],h.prototype,"title",void 0),f([Object(m.Prop)()],h.prototype,"image",void 0),f([Object(m.Prop)()],h.prototype,"manifest",void 0);var y=h=f([m.Component],h),$=r(49),C=r(82),k=r.n(C),V=r(175),w=r(424),j=r(418),x=r(161),P=r(472),component=Object($.a)(y,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{attrs:{flat:""}},[r("v-card-actions",[r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:""},on:{click:function(e){return t.copyLink()}}},o),[r("v-icon",[t._v("mdi-link")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Copy this link."))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.twitterUrl}},o),[r("v-icon",[t._v("mdi-twitter")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Twitter"))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.facebookUrl}},o),[r("v-icon",[t._v("mdi-facebook")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Facebook"))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.pocketUrl}},o),[r("img",{staticStyle:{"font-size":"24px"},attrs:{src:t.baseUrl+"/img/pocket.svg"}})])]}}])},[t._v(" "),r("span",[t._v(t._s("Pocket"))])]),t._v(" "),t.image?r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.googleUrl}},o),[r("v-icon",[t._v("mdi-google")])],1)]}}],null,!1,1839878146)},[t._v(" "),r("span",[t._v(t._s(t.$t("google_image_search")))])]):t._e(),t._v(" "),""!=t.manifest?r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.iiifUrl}},o),[r("v-icon",[t._v("mdi-star")])],1)]}}],null,!1,838617113)},[t._v(" "),r("span",[t._v(t._s("IIIF pocket"))])]):t._e()],1)],1)}),[],!1,null,null,null);e.a=component.exports;k()(component,{VBtn:V.a,VCard:w.a,VCardActions:j.a,VIcon:x.a,VTooltip:P.a})},467:function(t,e,r){var content=r(554);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(16).default)("00512319",content,!0,{sourceMap:!1})},553:function(t,e,r){"use strict";var o=r(467);r.n(o).a},554:function(t,e,r){(e=r(15)(!1)).push([t.i,".v-expansion-panel-content__wrap{padding:0}",""]),t.exports=e},606:function(t,e,r){"use strict";r.r(e);r(22),r(23),r(6),r(54),r(173),r(41);var o=r(14),n=r(21),l=r(30),c=r(29),_=r(26),v=r(20),m=r(13),d=r(55),f=r(421),h=r(435);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,o=Object(v.a)(t);if(e){var n=Object(v.a)(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return Object(_.a)(this,r)}}var $=function(t,e,r,desc){var o,n=arguments.length,l=n<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(l=(n<3?o(l):n>3?o(e,r,l):o(e,r))||l);return n>3&&l&&Object.defineProperty(e,r,l),l},C=function(t){Object(c.a)(v,t);var e,r,_=y(v);function v(){var t;return Object(n.a)(this,v),(t=_.apply(this,arguments)).data={},t.manifest="",t.fileNo="",t.photoFlg=!1,t.baseUrl="https://piranesi.dl.itc.u-tokyo.ac.jp",t.url="",t.title="",t}return Object(l.a)(v,[{key:"head",value:function(){return{title:this.title}}},{key:"fetch",value:(r=Object(o.a)(regeneratorRuntime.mark((function t(e){var r,o,n,l,c,_;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.store,null!=(o=r.state).index){t.next=8;break}return t.next=5,e.app.$searchUtils.createIndexFromIIIFCollection("https://piranesi.dl.itc.u-tokyo.ac.jp/data/print/iiif/top.json");case 5:n=t.sent,r.commit("setIndex",n.index),r.commit("setData",n.data);case 8:l=e.query,c=e.app.$searchUtils.createQuery(l,o),r.commit("setQuery",c),_=e.app.$searchUtils.search(r.state.index,r.state.data,r.state.query),e.store.commit("setResult",_);case 13:case"end":return t.stop()}}),t)}))),function(t){return r.apply(this,arguments)})},{key:"created",value:function(){var t=this.$route.params.id;this.fileNo=t;var e=this.$store.state.index.file_no[t][0],r=this.$store.state.data[e];this.data=r._source,this.manifest=r._id,this.title=r._source.title&&r._source.title.length>0?r._source.title[0]:"",this.url="https://piranesi.dl.itc.u-tokyo.ac.jp/item/"+t,this.checkPhoto()}},{key:"checkPhoto",value:(e=Object(o.a)(regeneratorRuntime.mark((function t(){var e,r,o,n,i,l,c,_,v,m,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$searchUtils.createIndexFromIIIFCollection("https://piranesi.dl.itc.u-tokyo.ac.jp/data/photo/iiif/top.json");case 2:for(e=t.sent,r=[],o=["file_n1","file_n2","file_n3"],n=e.index,i=0;i<o.length;i++)if(n[l=o[i]][this.fileNo])for(c=n[l][this.fileNo],_=0;_<c.length;_++)r.push(c[_]);for(v=e.data,m=[],d=0;d<r.length;d++)m.push(v[r[d]]);m.length>0&&(this.photoFlg=!0);case 11:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"dwnJson",value:function(){var t=this.fileNo+".json",data=JSON.stringify(this.data,null,"\t"),link=document.createElement("a");link.href="data:text/json;charset=utf-8,"+encodeURIComponent(data),link.download=t,link.click()}},{key:"mapFlag",get:function(){if(this.data.map_no&&this.data.map_no.length>0){var t="https://piranesi.dl.itc.u-tokyo.ac.jp/img/p_maps/img/"+this.data.map_no[0]+".jpg",e=new XMLHttpRequest;return e.open("HEAD",t,!1),e.send(),404!==e.status}}}]),v}(d.Vue),k=C=$([Object(d.Component)({components:{ShareButtons:h.a,sheet:f.a}})],C),V=(r(553),r(49)),w=r(82),j=r.n(w),x=r(175),P=r(424),A=r(418),I=r(433),R=r(414),O=r(376),U=r(507),L=r(508),E=r(509),F=r(510),H=r(161),S=r(138),D=r(105),J=r(77),T=r(90),M=r(434),z=r(47),component=Object(V.a)(k,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-container",[r("sheet",{attrs:{id:t.$route.params.id}}),t._v(" "),""!=t.manifest?r("iframe",{staticClass:"mb-5",attrs:{src:t.baseUrl+"/mirador/?manifest="+encodeURIComponent(t.manifest),width:"100%",height:"600",allowfullscreen:"",frameborder:"0"}}):t._e(),t._v(" "),r("v-row",[r("v-col",{attrs:{cols:"12",sm:"8"}},[r("v-card",{staticClass:"mb-10"},[r("v-card-title",{staticClass:"grey lighten-2"},[t._v(t._s(t.$t("basic_information")))]),t._v(" "),r("div",{staticClass:"pa-5"},[r("v-row",{staticClass:"pb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("kamei_no")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t.$utils.formatArrayValue(t.data.constellation)?[t._v("\n                  "+t._s(t.$utils.formatArrayValue(t.data.Kamei_no)+"."+t.$utils.formatArrayValue(t.data.constellation).replace(".",""))+" ")]:[t._v("\n                  "+t._s(t.$utils.formatArrayValue(t.data.Kamei_no))+"\n                ")]],2),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("image_no")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t._v(t._s(t.$utils.formatArrayValue(t.data.image_ID))+"\n              ")])],1),t._v(" "),r("v-row",{staticClass:"pb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s("en"===t.$i18n.locale?"Vol. ":"巻"))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t._v(t._s(t.$utils.formatArrayValue(t.data.volume)))]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s("en"===t.$i18n.locale?"Page. ":"葉"))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t._v(t._s(t.$utils.formatArrayValue(t.data.plate)+t.$utils.formatArrayValue(t.data.constellation))+"\n              ")])],1),t._v(" "),t.data.opera?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("opera")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("nuxt-link",{attrs:{to:t.localePath({name:"search",query:{"fc-opera":t.data.opera}})}},[t._v(t._s(t.$utils.formatArrayValue(t.data.opera))+"\n                ")])],1)],1):t._e(),t._v(" "),r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("series")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("nuxt-link",{attrs:{to:t.localePath({name:"search",query:{"fc-series":t.data.series}})}},[t._v("\n                  "+t._s(t.$utils.formatArrayValue(t.data.series))+"\n                ")]),t._v(" "),"ja"===t.$i18n.locale?[r("br"),t._v(" "),r("nuxt-link",{attrs:{to:t.localePath({name:"search",query:{"fc-series_JP":t.data.series_JP}})}},[t._v("\n                    "+t._s(t.$utils.formatArrayValue(t.data.series_JP))+"\n                  ")])]:t._e()],2)],1),t._v(" "),r("v-row",{staticClass:"pb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("work")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[t._v("\n                "+t._s(t.$utils.formatArrayValue(t.data.title))+"\n                "),"ja"===t.$i18n.locale?[r("br"),t._v("\n                  "+t._s(t.$utils.formatArrayValue(t.data.title_JP))+"\n                ")]:t._e()],2)],1),t._v(" "),t.data.author?r("v-row",{staticClass:"pb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("author")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("nuxt-link",{attrs:{to:t.localePath({name:"search",query:{"fc-author":t.data.author}})}},[t._v(t._s(t.$utils.formatArrayValue(t.data.author))+"\n                ")])],1)],1):t._e(),t._v(" "),"ja"===t.$i18n.locale&&t.data.author_JP?r("v-row",{staticClass:"pb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("author_JP")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("nuxt-link",{attrs:{to:t.localePath({name:"search",query:{"fc-author_JP":t.data.author_JP}})}},[t._v(t._s(t.$utils.formatArrayValue(t.data.author_JP)))])],1)],1):t._e(),t._v(" "),r("v-row",{staticClass:"pb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("plate_size")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t._v(t._s(t.$utils.formatArrayValue(t.data.plate_size))+" mm\n              ")]),t._v(" "),t.data.image_size?[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("image_size")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t._v(t._s(t.$utils.formatArrayValue(t.data.image_size))+" mm\n                ")])]:t._e()],2)],1)],1)],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[r("v-card",{staticClass:"mb-10"},[r("v-card-title",{staticClass:"grey lighten-2"},[t._v(t._s(t.$t("related_information")))]),t._v(" "),t.photoFlg?[r("v-list-item",{attrs:{to:t.localePath({name:"photo-id",query:{file_no:t.$utils.formatArrayValue(t.data.file_no)}})}},[r("v-list-item-icon",[r("v-icon",[t._v("mdi-image")])],1),t._v(" "),r("v-list-item-content",[t._v("\n                "+t._s(t.$t("present_photos"))+"\n              ")])],1),t._v(" "),r("v-divider")]:t._e(),t._v(" "),t.data.Edificio_IL?r("v-list-item",{attrs:{to:t.localePath({name:"compare",query:{Edificio_IL:t.$utils.formatArrayValue(t.data.Edificio_IL)}})}},[r("v-list-item-icon",[r("v-icon",[t._v("mdi-image")])],1),t._v(" "),r("v-list-item-content",[t._v("\n              "+t._s(t.$t("prints_and_photos"))+"\n            ")])],1):t._e(),t._v(" "),r("v-divider"),t._v(" "),t.localePath({name:"inscription-"+t.data.file_no}).includes("inscription")?r("v-list-item",{attrs:{to:t.localePath({name:"inscription-"+t.data.file_no})}},[r("v-list-item-icon",[r("v-icon",[t._v("mdi-flag")])],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",[t._v(t._s(t.$t("latin_inscriptions")))])],1)],1):t._e()],2),t._v(" "),r("v-sheet",{staticClass:"grey lighten-3 py-5 px-3 py-3 text-center",staticStyle:{"background-color":"#f9f6f0"}},[t.manifest?r("v-btn",{staticClass:"mr-2",attrs:{icon:""}},[r("a",{attrs:{href:t.manifest}},[r("v-img",{attrs:{contain:"",height:"24px",src:t.baseUrl+"/img/iiif-logo.svg"}})],1)]):t._e(),t._v(" "),t.data?r("v-btn",{staticClass:"mr-2",attrs:{icon:""}},[r("a",[r("v-img",{attrs:{contain:"",width:"24px",src:t.baseUrl+"/img/json-logo.svg"},on:{click:function(e){return t.dwnJson()}}})],1)]):t._e()],1),t._v(" "),r("v-sheet",{staticClass:"grey lighten-3 py-5 px-3 py-3 mt-4",staticStyle:{"background-color":"#f9f6f0"}},[r("ShareButtons",{attrs:{url:t.url,title:t.data.title,manifest:t.manifest}})],1)],1)],1),t._v(" "),r("v-expansion-panels",{staticClass:"pb-5 mb-10",attrs:{value:0}},[r("v-expansion-panel",[r("v-expansion-panel-header",{staticClass:"grey lighten-2"},[t._v("\n          "+t._s(t.$t("detailed_information"))+"\n        ")]),t._v(" "),r("v-expansion-panel-content",[r("div",{staticClass:"pa-5"},[r("v-sheet",{staticClass:"pa-2 mb-5",attrs:{color:"grey lighten-3"}},[r("span",[t._v(" "+t._s(t.$t("subject"))+", "+t._s(t.$t("other")))])]),t._v(" "),r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[t.data.subject?r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("subject")))])]):t._e(),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("nuxt-link",{attrs:{to:t.localePath({name:"search",query:{"fc-subject":t.data.subject}})}},[t._v("\n                  "+t._s(t.$utils.formatArrayValue(t.data.subject))+"\n                ")])],1)],1),t._v(" "),t.data.subcategoria?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("subcategoria")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("nuxt-link",{attrs:{to:t.localePath({name:"search",query:{"fc-subcategoria":t.data.subcategoria}})}},[t._v("\n                  "+t._s(t.$utils.formatArrayValue(t.data.subcategoria))+"\n                ")])],1)],1):t._e(),t._v(" "),t.data.Edificio_IL?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("Edificio")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("nuxt-link",{attrs:{to:t.localePath({name:"search",query:{"fc-Edificio_IL":t.data.Edificio_IL}})}},[t._v("\n                  "+t._s(t.$utils.formatArrayValue(t.data.Edificio_IL))+"\n                ")])],1)],1):t._e(),t._v(" "),t.data.conservazione?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("conservazione")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[t._v("\n                "+t._s(t.$utils.formatArrayValue(t.data.conservazione))+"\n              ")])],1):t._e(),t._v(" "),r("v-sheet",{staticClass:"pa-2 mb-5",attrs:{color:"grey lighten-3"}},[r("span",[t._v(" "+t._s(t.$t("catalogues_no")))])]),t._v(" "),r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v("F. Didot")])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t._v("\n                "+t._s(t.$utils.formatArrayValue(t.data.FD_no))+"\n              ")]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("Calcografia")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t._v("\n                "+t._s(t.$utils.formatArrayValue(t.data.Calco_no))+"\n                "+t._s(t.$utils.formatArrayValue(t.data.Calco_tav_no))+"\n              ")]),t._v(" "),t.data.WE_no?[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("J. W. Ely")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t._v("\n                  "+t._s(t.$utils.formatArrayValue(t.data.WE_no))+"\n                ")])]:t._e(),t._v(" "),t.data.Taschen_no?[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v("Taschen")])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}},[t._v(t._s(t.$utils.formatArrayValue(t.data.Taschen_no)))])]:t._e()],2),t._v(" "),t.data.HF_no?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v("H. Focillon")])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[t._v("\n                "+t._s(t.$utils.formatArrayValue(t.data.HF_no))),r("br"),r("small",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.data.HF_desc))}})])],1):t._e(),t._v(" "),"ja"===t.$i18n.locale&&t.data.HF_desc_tr?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("small",[r("b",[t._v("H. Focillon 訳")])])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("small",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.data.HF_desc_tr))}})])],1):t._e(),t._v(" "),r("v-sheet",{staticClass:"pa-2 mb-5",attrs:{color:"grey lighten-3"}},[r("span",[t._v(" "+t._s(t.$t("Exhibition catalogues no")))])]),t._v(" "),t.data.Kanagawa_no?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("kanagawa")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[t._v(t._s(t.$utils.formatArrayValue(t.data.Kanagawa_no)))]),t._v(" "),t.data.Machida_no?[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("machida")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[t._v(t._s(t.$utils.formatArrayValue(t.data.Machida_no)))])]:t._e()],2):t._e(),t._v(" "),r("v-divider",{staticClass:"my-10"}),t._v(" "),r("v-sheet",{staticClass:"pa-2 mb-5",attrs:{color:"grey lighten-3"}},[r("span",[t._v(" "+t._s(t.$t("incriptions_on_the_print")))])]),t._v(" "),t.data.inscription1?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("Inscription 1")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("span",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.data.inscription1))}})])],1):t._e(),t._v(" "),t.data.sign_ecc?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v(t._s(t.$t("signatute")))])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("span",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.data.sign_ecc))}})])],1):t._e(),t._v(" "),"ja"===t.$i18n.locale?[t.data.inscription1_tr?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v("記載文１訳")])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("span",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.data.inscription1_tr))}})])],1):t._e(),t._v(" "),t.data.sign_ecc_tr?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v("署名訳")])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("span",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.data.sign_ecc_tr))}})])],1):t._e(),t._v(" "),t.data.tr_comment1?r("v-row",{staticClass:"mb-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"2"}},[r("b",[t._v("訳者註１")])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"10"}},[r("span",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.data.tr_comment1))}})])],1):t._e()]:t._e()],2)])],1)],1),t._v(" "),t.mapFlag?r("v-expansion-panels",{staticClass:"pb-5 mb-10"},[r("v-expansion-panel",[r("v-expansion-panel-header",{staticClass:"grey lighten-2"},[t._v("\n          "+t._s(t.$t("rome_map"))+"\n        ")]),t._v(" "),r("v-expansion-panel-content",[r("div",{staticClass:"pa-5"},[r("v-img",{attrs:{src:"https://nakamura196.github.io/piranesi/p_maps/"+t.$utils.formatArrayValue(t.data.map_no)+".jpg",height:"600px",contain:""}}),t._v(" "),r("p",{staticClass:"mt-5"},[r("router-link",{attrs:{to:t.localePath({name:"mapsearch"})}},[t._v(t._s(t.$t("Show all places.")))])],1)],1)])],1)],1):t._e(),t._v(" "),r("sheet",{attrs:{id:t.$route.params.id}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;j()(component,{VBtn:x.a,VCard:P.a,VCardTitle:A.c,VCol:I.a,VContainer:R.a,VDivider:O.a,VExpansionPanel:U.a,VExpansionPanelContent:L.a,VExpansionPanelHeader:E.a,VExpansionPanels:F.a,VIcon:H.a,VImg:S.a,VListItem:D.a,VListItemContent:J.a,VListItemIcon:T.a,VListItemTitle:J.c,VRow:M.a,VSheet:z.a})}}]);