(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{566:function(e,t,r){"use strict";r.r(t);r(22),r(23),r(6),r(54);var l=r(21),o=r(30),n=r(29),c=r(26),h=r(20),d=r(13),f=r(55),v=(r(19),r(40),r(8),r(11),r(63)),_=r.n(v),m=r(421),y=r(427);function U(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,l=Object(h.a)(e);if(t){var o=Object(h.a)(this).constructor;r=Reflect.construct(l,arguments,o)}else r=l.apply(this,arguments);return Object(c.a)(this,r)}}var j=function(e,t,r,desc){var l,o=arguments.length,n=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(l=e[i])&&(n=(o<3?l(n):o>3?l(t,r,n):l(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n},A=function(e){Object(n.a)(r,e);var t=U(r);function r(){var e;return Object(l.a)(this,r),(e=t.apply(this,arguments)).baseUrl="https://piranesi.dl.itc.u-tokyo.ac.jp",e.dataRemains={},e.dataArea={},e.markers=[],e}return Object(o.a)(r,[{key:"head",value:function(){return{titleTemplate:null}}},{key:"mounted",value:function(){var e=this,t=this;_.a.get(this.baseUrl+"/json/city_index.json").then((function(r){for(var data=r.data[0]["http://purl.org/dc/terms/hasPart"],l=data[0]["http://purl.org/dc/terms/hasPart"],o={},i=0;i<l.length;i++){var n=l[i];o[n["@id"]]={label:n["http://www.w3.org/2000/01/rdf-schema#label"]}}t.dataRemains=o;for(var c=data[1]["http://purl.org/dc/terms/hasPart"],h={},d=0;d<c.length;d++){var f=c[d];h[f["@id"]]={label:f["http://www.w3.org/2000/01/rdf-schema#label"],name:f["http://example.org/slug"]}}t.dataArea=h,e.getMarkers()})).catch((function(e){console.log({error:e})}))}},{key:"getMarkers",value:function(){var e=this,filter="",t=Object.keys(this.dataRemains),r=Object.keys(this.dataArea);t=t.concat(r);for(var i=0;i<t.length;i++)filter+="\n        ?s = <"+t[i]+">\n      ",i!==t.length-1&&(filter+="||");var l="https://dbpedia.org/sparql/?query=";l=l+encodeURIComponent("\n      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n      SELECT * WHERE {\n        \n        ?s rdfs:label ?label . \n        filter ( "+filter+' ) . \n        filter (lang(?label) = "en") . \n        ?s foaf:isPrimaryTopicOf ?url . \n        optional { ?s rdfs:comment ?comment . filter (lang(?comment) = "en") }\n\n        optional { ?s rdfs:label ?label_ja . filter (lang(?label_ja) = "ja") }\n        optional { ?s rdfs:comment ?comment_ja . filter (lang(?comment_ja) = "ja") }\n        \n        optional { ?s georss:point ?p }\n        optional { ?s dbo:thumbnail ?thumbnail } \n      }\n    ')+"&output=json",l=this.baseUrl+"/json/city_index_result.json";var o=this;_.a.get(l).then((function(t){for(var r=t.data.results.bindings,l=[],n=0;n<r.length;n++){var c=r[n],s=c.s.value,map={};if(map=o.dataRemains[s]?o.dataRemains[s]:o.dataArea[s],c.p){var p=c.p.value.split(" "),marker={latlng:[Number(p[0]),Number(p[1])],content:{label:"ja"===o.$i18n.locale&&c.label_ja?c.label_ja.value:c.label?c.label.value:"",thumbnail:c.thumbnail?c.thumbnail.value:"",description:"ja"===o.$i18n.locale&&c.comment_ja?c.comment_ja.value:c.comment?c.comment.value:"",url:c.url.value},path:{name:"search",query:{"q-Edificio_IL":map.label,"q-Edificio_all":map.label,"q-title":map.label,advancedOr:!0}}};l.push(marker)}c.label_ja&&(map.label_ja=c.label_ja.value),map.url=c.url.value}e.markers=l})).catch((function(e){console.error(e)}))}}]),r}(f.Vue),C=A=j([Object(f.Component)({components:{sheet:m.a,pMap:y.a}})],A),O=r(49),P=r(82),R=r.n(P),k=r(175),S=r(424),V=r(418),w=r(433),M=r(161),z=r(434),$=r(47),component=Object(O.a)(C,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",{staticClass:"mb-10"},[r("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[r("span",{staticClass:"mr-5"},[e._v(e._s(e.$t("Index of cities")))]),e._v(" "),r("small",[e._v(e._s(" ("+e.$t("move_to_search")+")"))])]),e._v(" "),r("div",{staticClass:"pa-5"},[r("v-sheet",{staticClass:"pa-2 mb-5",attrs:{color:"grey lighten-3"}},[r("span",[e._v("\n        "+e._s(e.$t("According to the site of architecures, remains excavated.")))])]),e._v(" "),r("v-row",e._l(e.dataRemains,(function(t,l){return r("v-col",{key:l,attrs:{cols:"12",sm:"3"}},[r("router-link",{attrs:{to:e.localePath({name:"search",query:{"q-Edificio_IL":t.label,"q-Edificio_all":t.label,"q-title":t.label,advancedOr:!0}})}},[e._v(e._s(t.label)+"\n          "),t.label_ja?r("small",[e._v("("+e._s(t.label_ja)+")")]):e._e()]),e._v(" "),t.url?r("v-btn",{attrs:{icon:"",href:t.url,target:"_blank"}},[r("v-icon",[e._v("mdi-wikipedia")])],1):e._e()],1)})),1),e._v(" "),r("v-sheet",{staticClass:"pa-2 my-5",attrs:{color:"grey lighten-3"}},[r("span",[e._v(" "+e._s(e.$t("Maps of areas")))])]),e._v(" "),r("v-row",e._l(e.dataArea,(function(t,l){return r("v-col",{key:l,attrs:{cols:"12",sm:"4"}},[r("router-link",{attrs:{to:e.localePath({name:t.name})}},[r("span",[e._v("\n            "+e._s(t.label)+"\n            "),t.label_ja?r("small",[e._v("("+e._s(t.label_ja)+")")]):e._e()])]),e._v(" "),t.url?r("v-btn",{attrs:{icon:"",href:t.url,target:"_blank"}},[r("v-icon",[e._v("mdi-wikipedia")])],1):e._e()],1)})),1)],1),e._v(" "),e.markers.length>0?r("div",{staticClass:"mt-5",staticStyle:{height:"50vh"}},[r("p-map",{attrs:{markers:e.markers,zoom:5,center:[41.9027,12.4963]}})],1):e._e()],1)}),[],!1,null,null,null),x=component.exports;R()(component,{VBtn:k.a,VCard:S.a,VCardTitle:V.c,VCol:w.a,VIcon:M.a,VRow:z.a,VSheet:$.a});function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,l=Object(h.a)(e);if(t){var o=Object(h.a)(this).constructor;r=Reflect.construct(l,arguments,o)}else r=l.apply(this,arguments);return Object(c.a)(this,r)}}var E=function(e,t,r,desc){var l,o=arguments.length,n=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(l=e[i])&&(n=(o<3?l(n):o>3?l(t,r,n):l(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n},L=function(e){Object(n.a)(r,e);var t=T(r);function r(){var e;return Object(l.a)(this,r),(e=t.apply(this,arguments)).baseUrl="https://piranesi.dl.itc.u-tokyo.ac.jp",e.result={},e}return Object(o.a)(r,[{key:"created",value:function(){this.init()}},{key:"init",value:function(){var e=this;_.a.get(this.baseUrl+"/json/edificio.json").then((function(t){var r=t.data;e.result=r,console.log({result:r})}))}}]),r}(f.Vue),D=L=E([Object(f.Component)({components:{sheet:m.a,pMap:y.a}})],L),B=r(162),I=r(105),F=r(77),G=r(164),N=Object(O.a)(D,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",{staticClass:"pb-5 mb-10"},[r("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[r("span",{staticClass:"mr-5"},[e._v(e._s(e.$t("Index of all places"))+" "+e._s(e.$t("[ A to Z ]")))]),r("small",[e._v(e._s(" ("+e.$t("move_to_comp")+")"))])]),e._v(" "),r("div",{staticClass:"pa-5"},[r("ul",[r("li",[e._v(e._s(e.$t("[ ]= the no. on the Roman map.")))]),e._v(" "),r("li",[e._v(e._s(e.$t("' '= the Latin name of the site.")))])]),e._v(" "),r("v-list",[r("v-list-item-group",e._l(e.result,(function(t,l){return r("v-list-item",{key:l},[r("v-list-item-content",[r("router-link",{attrs:{to:e.localePath({name:"compare",query:{Edificio_IL:l}})}},[e._v(e._s(l))])],1)],1)})),1)],1)],1)],1)}),[],!1,null,null,null),J=N.exports;function H(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,l=Object(h.a)(e);if(t){var o=Object(h.a)(this).constructor;r=Reflect.construct(l,arguments,o)}else r=l.apply(this,arguments);return Object(c.a)(this,r)}}R()(N,{VCard:S.a,VCardTitle:V.c,VList:B.a,VListItem:I.a,VListItemContent:F.a,VListItemGroup:G.a});var Q=function(e,t,r,desc){var l,o=arguments.length,n=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(l=e[i])&&(n=(o<3?l(n):o>3?l(t,r,n):l(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n},W=function(e){Object(n.a)(r,e);var t=H(r);function r(){var e;return Object(l.a)(this,r),(e=t.apply(this,arguments)).baseUrl="https://piranesi.dl.itc.u-tokyo.ac.jp",e.title="",e}return Object(o.a)(r,[{key:"head",value:function(){return{title:this.$t("rome_map")}}},{key:"getUrl",value:function(e){return this.baseUrl+("ja"===this.$i18n.locale?"":"/en")+"/compare?map_no="+e}},{key:"getAreaUrl",value:function(e){return this.baseUrl+("ja"===this.$i18n.locale?"":"/en")+"/compare?map_area="+e}},{key:"getOtherUrl",value:function(e){return this.baseUrl+("ja"===this.$i18n.locale?"":"/en")+"/p_maps/"+e}}]),r}(f.Vue),X=W=Q([Object(f.Component)({components:{cityindex:x,indexOfAllPlaces:J}})],W),Z=r(414),K=Object(O.a)(X,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-container",[r("h2",{staticClass:"my-5"},[e._v(e._s(e.$t("rome_map")))]),e._v(" "),r("p",[e._v("\n      Prints of views, ruins, and architectures by Giovanni Battista Piranesi\n      and Francesco Piranesi can be searched.\n    ")]),e._v(" "),r("v-card",{staticClass:"mt-10"},[r("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[r("span",{staticClass:"mr-5"},[e._v(e._s(e.$t("rome_map")))]),r("small",[e._v(e._s(" ("+e.$t("move_to_comp")+")"))])]),e._v(" "),r("div",{staticClass:"pa-5"},[r("p",[e._v("\n          "+e._s(e.$t("Select the number on the map."))+"\n        ")]),e._v(" "),r("div",{staticClass:"text-center"},[r("img",{attrs:{src:e.baseUrl+"/img/p_maps/roma_mapping.jpg",alt:"RomaMap",width:"660",border:"0",usemap:"#RomaMap"}})]),e._v(" "),r("map",{attrs:{id:"RomaMap",name:"RomaMap"}},[r("area",{attrs:{shape:"rect",coords:"430,470,460,489",href:e.getUrl(68),alt:"Arco di Druso"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"408,137,433,153",href:e.getUrl(56),alt:"Terme di Diocleziano"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"520,245,546,259",href:e.getUrl(61),alt:"Ninfeo degli Orti Liciniani"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"186,422,217,442",href:e.getUrl(72),alt:"Portico di M. Emilio Lepido"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"541,262,552,262,559,268,556,280,534,277",href:e.getUrl(65),alt:"Speranza Vecchia"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"538,290,544,285,551,288,562,290,571,302,546,302",href:e.getUrl(63),alt:"Arco di Nerone"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"157,15,252,15,252,1,269,1,273,34,157,34",href:e.getOtherUrl("via#cassia")}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"221,346,258,366",href:e.getUrl(113),alt:"Porto di Ripa Grande"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"515,61,659,61,659,92,622,102,606,81,515,81",href:e.getOtherUrl("via#tibr")}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"7,317,41,337",href:e.getUrl(133),alt:"Villa Doria Pamphili "}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"457,492,457,522,475,521,475,512,591,512,591,492",href:e.getOtherUrl("via#appia")}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"282,260,302,259,306,262,297,274,283,273",href:e.getUrl(21),alt:"Monte Capitolino"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"231,383,256,410",href:e.getUrl(71),alt:"Parte sud della scarpata dell'Aventino"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"438,230,451,213,465,213,464,229,447,235",href:e.getUrl(58),alt:"Arco di Gallieno"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"210,100,235,100,232,125,228,120,211,119",href:e.getUrl(129),alt:"Porto di Ripetta"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"231,51,263,69",href:e.getUrl(117),alt:"Piazza del Popolo "}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"481,343,470,335,447,339,448,356,473,354",href:e.getUrl(106),alt:"Battistero Lateranense"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"562,306,573,314,573,328,548,328,552,313",href:e.getUrl(64),alt:"Anfiteatro Castrense"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"408,357,439,375",href:e.getUrl(107),alt:"Chiesa di S. Stefano Rotondo "}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"289,212,292,223,318,219,318,207,302,207",href:e.getUrl(126),alt:"Palazzo Mancini-Salviati"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"148,158,175,174",href:e.getUrl(47),alt:"Ponte S. Angelo"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"425,13,460,29",href:e.getUrl(136),alt:"Villa Albani"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"424,1,424,39,302,39,302,22,405,22,405,1",href:e.getOtherUrl("via#salaria")}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"406,350,395,341,395,329,416,329",href:e.getUrl(66),alt:"Arco di Dolabella e Silano"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"608,130,631,153",href:e.getUrl(109),alt:"Basilica di S. Lorenzo fuori le Mura"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"7,306,7,314,36,314,67,332,110,329,138,336,137,323,107,319,70,324,42,311",href:e.getAreaUrl("a"),alt:"Acqua Traiana"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"485,111,518,128",href:e.getUrl(57),alt:"Castro pretorio"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"333,298,347,298,352,320,384,335,405,351,469,320,504,320,538,293,544,301,510,326,474,326,416,354,399,356,387,343,353,331,345,323,344,312,333,314",href:e.getAreaUrl("f"),alt:"Acqua Claudia"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"419,195,443,195,443,202,430,215,419,214",href:e.getUrl(108),alt:"Basilica di S. Maria Maggiore "}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"306,330,319,353",href:e.getUrl(7),alt:"Circo Massimo"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"445,161,434,161,434,145,444,145,510,202,521,203,563,255,571,263,583,263,583,276,574,276,520,210,513,210,449,155",href:e.getAreaUrl("c")}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"306,172,332,192",href:e.getUrl(121),alt:"Piazza del Quirinale"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"571,303,575,314,576,323,593,317,586,304",href:e.getUrl(116),alt:"Basilica di S. Croce in Gerusalemme"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"400,71,425,91",href:e.getUrl(54),alt:"Palazzo e Bagni di Sallustio"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"300,273,314,257,359,280,345,295",href:e.getOtherUrl("fr"),alt:"Foro Romano"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"511,0,540,29",href:e.getUrl(105),alt:"Mausoleo di Costanza"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"428,445,456,463",href:e.getUrl(67),alt:"Sepolcro degli Scipioni"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"379,307,399,323",href:e.getUrl(4),alt:"Tempio di Claudio"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"619,442,658,459",href:e.getUrl(96),alt:"Sepolcro di Alessandro Severo"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"481,340,513,354",href:e.getUrl(114),alt:"S. Giovanni in Laterano"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"14,439,171,454",href:e.getAreaUrl("h"),alt:"Mura Aureliane"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"141,301,172,315",href:e.getUrl(132),alt:"Castello dell'Acqua Paola"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"433,215,448,200,448,173,461,170,514,215,509,219,459,181,455,206,440,222",href:e.getAreaUrl("e"),alt:"Aniene Vecchio"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"461,475,461,487,492,466,492,452,479,452",href:e.getAreaUrl("g"),alt:"Acqua Antoniniana"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"114,165,143,185",href:e.getUrl(45),alt:"Ponte Trionfale"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"333,190,333,197,365,201,363,186,344,185",href:e.getUrl(122),alt:"Palazzo della Consulta "}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"363,405,391,423",href:e.getUrl(69),alt:"Terme di Caracalla"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"46,139,71,162",href:e.getUrl(134),alt:"Basilica di S. Pietro"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"291,233,301,233,306,243,306,255,288,255",href:e.getUrl(22),alt:"Sepolcro di C. Poblicio Bibulo"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"382,121,419,136",href:e.getUrl(124),alt:"Castello dell'Acqua Felice "}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"273,182,242,191,248,209,278,200,288,232,280,247,281,257,267,269,268,278,263,279,251,271,229,277,206,270,180,242,194,176,257,140",href:e.getOtherUrl("cm"),alt:"Campo Marzo"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"351,428,351,442,413,492,424,492,424,482,366,435,366,428",href:e.getAreaUrl("g"),alt:"Acqua Antoniniana"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"308,228,334,215,353,240,326,252",href:e.getOtherUrl("fi"),alt:"Fori Imperiali"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"410,48,429,70",href:e.getUrl(55),alt:"Mura Aureliane tratto presso Porta Salaria"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"255,494,285,523",href:e.getUrl(110),alt:"Basilica di S. Paolo fuori le Mura"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"394,252,418,273",href:e.getUrl(3),alt:"Terme di Traiano"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"264,432,286,457",href:e.getUrl(70),alt:"Piramide di C. Cestio"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"469,332,479,339,507,339,506,327,476,327",href:e.getUrl(115),alt:"Piazza S. Giovanni in Laterano"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"465,255,465,246,473,240,483,240,493,234,495,229,516,217,524,217,524,228,516,230,515,224,488,245,477,247,477,255",href:e.getAreaUrl("d"),alt:"Acqua Giulia"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"459,240,470,226,494,227,484,236,472,238,466,244",href:e.getUrl(59),alt:"Ninfeo di Alessandro Severo"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"319,320,331,347",href:e.getUrl(6),alt:"Domus Augustana"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"620,494,648,523",href:e.getUrl(95),alt:"Villa dei Sette Bassi "}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"369,283,390,299",href:e.getUrl(2),alt:"Anfiteatro Flavio (Colosseo)"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"132,138,160,156",href:e.getUrl(46),alt:"Mausoleo di Adriano (Castel sant'Angelo)"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"282,194,302,190,302,204,285,210",href:e.getUrl(125),alt:"Palazzo Odescalchi "}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"351,293,368,310",href:e.getUrl(1),alt:"Arco di Costantino"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"525,204,552,196,555,219,536,219",href:e.getUrl(60),alt:"Porta Tiburtina"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"620,346,660,362",href:e.getUrl(97),alt:"Mausoleo di S. Elena"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"237,122,236,116,239,102,254,102,254,121",href:e.getUrl(48),alt:"Mausoleo di Augusto"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"240,301,253,281,263,285,270,283,292,293,278,318",href:e.getOtherUrl("fb"),alt:"Foro Boario ecc."}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"349,138,387,156",href:e.getUrl(123),alt:"Palazzo Barberini "}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"553,286,562,274,583,281,579,288",href:e.getUrl(62),alt:"Porta Maggiore"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"73,140,97,163",href:e.getUrl(135),alt:"Piazza di Pietro"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"269,96,286,95,295,115,280,114,271,107",href:e.getUrl(119),alt:"Piazza di Spagna "}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"292,81,292,98,312,100,306,87",href:e.getUrl(118),alt:"Villa Medici "}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"318,96,304,74,324,74",href:e.getUrl(53),alt:"Muro Torto"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"314,195,319,206,332,212,340,205,326,196",href:e.getUrl(52),alt:"Tempio di Serapis"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"273,11,284,12,293,64,295,77,286,77",href:e.getAreaUrl("b"),alt:"Acqua Vergine"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"296,104,314,133,315,145,306,159,303,151,308,139,298,117",href:e.getAreaUrl("b"),alt:"Acqua Vergine"}}),e._v(" "),r("area",{attrs:{shape:"rect",coords:"279,156,303,178",href:e.getUrl(127),alt:"Fontana di Trevi"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"289,180,299,182,278,192,256,203,248,194",href:e.getAreaUrl("b"),alt:"Acqua Vergine"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"334,318,341,317,345,333,339,337,334,331",href:e.getUrl(5),alt:"Stadio"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"633,285,643,286,640,303,614,306,583,290,587,281,614,299,631,294",href:e.getAreaUrl("e"),alt:"Aniene Vecchio"}}),e._v(" "),r("area",{attrs:{shape:"poly",coords:"628,335,627,342,644,341,649,326,598,302,576,291,579,297,632,330",href:e.getAreaUrl("f"),alt:"Acqua Claudia"}})])])],1),e._v(" "),r("cityindex",{staticClass:"mt-10"}),e._v(" "),r("indexOfAllPlaces",{staticClass:"mt-10"})],1)],1)}),[],!1,null,null,null);t.default=K.exports;R()(K,{VCard:S.a,VCardTitle:V.c,VContainer:Z.a})}}]);