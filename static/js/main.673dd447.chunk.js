(this["webpackJsonpreact-card-game"]=this["webpackJsonpreact-card-game"]||[]).push([[0],{16:function(e){e.exports=JSON.parse('{"domain":"dev-vim643-g.auth0.com","clientId":"6LDbS7cZwSlsJr3d24cstXGTMwhBaP1T"}')},26:function(e,t,a){e.exports=a(42)},31:function(e,t,a){},36:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(21),i=a.n(c);a(31),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=a(5),o=a.n(l),u=a(11),s=a(4),m=a(14),f=a(22),d=a.n(f),p=function(){return window.history.replaceState({},document.title,window.location.pathname)},h=r.a.createContext(),b=function(){return Object(n.useContext)(h)},w=function(e){var t=e.children,a=e.onRedirectCallback,c=void 0===a?p:a,i=Object(m.a)(e,["children","onRedirectCallback"]),l=Object(n.useState)(),f=Object(s.a)(l,2),b=f[0],w=f[1],g=Object(n.useState)(),v=Object(s.a)(g,2),E=v[0],k=v[1],O=Object(n.useState)(),y=Object(s.a)(O,2),N=y[0],j=y[1],x=Object(n.useState)(!0),S=Object(s.a)(x,2),C=S[0],T=S[1],W=Object(n.useState)(!1),P=Object(s.a)(W,2),R=P[0],I=P[1];Object(n.useEffect)((function(){(function(){var e=Object(u.a)(o.a.mark((function e(){var t,a,n,r,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d()(i);case 2:if(t=e.sent,j(t),!window.location.search.includes("code=")||!window.location.search.includes("state=")){e.next=10;break}return e.next=7,t.handleRedirectCallback();case 7:a=e.sent,n=a.appState,c(n);case 10:return e.next=12,t.isAuthenticated();case 12:if(r=e.sent,w(r),!r){e.next=19;break}return e.next=17,t.getUser();case 17:l=e.sent,k(l);case 19:T(!1);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var A=function(){var e=Object(u.a)(o.a.mark((function e(){var t,a,n=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},I(!0),e.prev=2,e.next=5,N.loginWithPopup(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),console.error(e.t0);case 10:return e.prev=10,I(!1),e.finish(10);case 13:return e.next=15,N.getUser();case 15:a=e.sent,k(a),w(!0);case 18:case"end":return e.stop()}}),e,null,[[2,7,10,13]])})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return T(!0),e.next=3,N.handleRedirectCallback();case 3:return e.next=5,N.getUser();case 5:t=e.sent,T(!1),w(!0),k(t);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(h.Provider,{value:{isAuthenticated:b,user:E,loading:C,popupOpen:R,loginWithPopup:A,handleRedirectCallback:U,getIdTokenClaims:function(){return N.getIdTokenClaims.apply(N,arguments)},loginWithRedirect:function(){return N.loginWithRedirect.apply(N,arguments)},getTokenSilently:function(){return N.getTokenSilently.apply(N,arguments)},getTokenWithPopup:function(){return N.getTokenWithPopup.apply(N,arguments)},logout:function(){return N.logout.apply(N,arguments)}}},t)},g=a(16),v=a(2),E=Object(v.a)(),k=a(7),O=(a(36),a(9)),y=a.n(O),N=a(23),j=function(e,t){Object(N.a)(Object.assign({},{origin:{y:.7}},t,{particleCount:Math.floor(800*e)}))},x=function(){j(.25,{spread:26,startVelocity:55}),j(.2,{spread:60}),j(.35,{spread:100,decay:.91}),j(.1,{spread:120,startVelocity:25,decay:.92}),j(.1,{spread:120,startVelocity:45})},S=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],C=["C","S","H","D"].map((function(e){return S.map((function(t){return t+e}))})).flat(),T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=C.filter((function(t){return!e.includes(t)}));if(0===t.length)throw Error("No cards left, all cards were excluded. Exclusions: [".concat(e,"]"));return t[y.a.random(t.length-1)]},W=function(e){for(var t=[],a=0;a<e;a++)t.push({id:a,value:a%2===0?T(t.map((function(){return t.value}))):t[a-1].value,flipped:!1,matched:!1});return t},P=function(e){return y.a.shuffle(e)},R=Object(n.lazy)((function(){return a.e(2).then(a.bind(null,103))})),I=function(e){var t=Object(n.useState)(P(W(e.deckSize))),a=Object(s.a)(t,2),c=a[0],i=a[1],l=Object(n.useState)("Play the Game!"),o=Object(s.a)(l,2),u=o[0],m=o[1],f=Object(n.useState)(!1),d=Object(s.a)(f,2),p=d[0],h=d[1],w=b().loading,g=function(e){return e.filter((function(e){return e.flipped&&!e.matched})).length},v=function(e){var t=c.slice(),a=t[e];!a.flipped&&!a.matched&&g(t)<2&&(a.flipped=!0,i(t))},E=function(){var e=c.slice().map((function(e){return e.flipped=!1,e.matched=!1,e}));i(e)},k=function(){!p&&function(e){return function(e){return e.filter((function(e){return e.matched}))}(e).length===2*Math.floor(e.length/2)}(c)&&y.a.delay((function(){h(!0),m("You Win!"),x()}),1e3)};return Object(n.useEffect)((function(){!function(){if(function(e){var t=function(e){return e.filter((function(e){return e.flipped&&!e.matched}))}(e);if(t.length>1)return t.every((function(e){return e.value===t[0].value}))}(c)){var e=c.slice();e.forEach((function(e){e.matched=e.flipped})),i(e)}else g(c)>1&&y.a.delay((function(){var e=c.slice();e.forEach((function(e){return e.flipped=e.matched})),i(e)}),1e3)}()})),Object(n.useEffect)((function(){k()})),w?r.a.createElement("div",null,"Loading..."):r.a.createElement("div",{className:"w3-center"},r.a.createElement("h1",null,u),r.a.createElement("button",{onClick:function(){E(),y.a.delay((function(){i(P(W(e.deckSize))),h(!1),m("Play the Game!")}),1e3)}},"Start Over?"),r.a.createElement("button",{onClick:function(){i(P(c))}},"Shuffle"),r.a.createElement("button",{onClick:E},"Unflip"),r.a.createElement("div",{className:"container"},r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null,"Loading...")},c.map((function(e,t){return r.a.createElement(R,{key:e.id,index:t,value:e.value,flipped:e.flipped,onClicked:v})})))))};I.defaultProps={deckSize:9};var A=I,U=function(e){var t=e.component,a=e.path,c=Object(m.a)(e,["component","path"]),i=b(),l=i.loading,s=i.isAuthenticated,f=i.loginWithRedirect;Object(n.useEffect)((function(){l||s||function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f({appState:{targetUrl:window.location.pathname}});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[l,s,f,a]);return r.a.createElement(k.a,Object.assign({path:a,render:function(e){return!0===s?r.a.createElement(t,e):null}},c))},z=function(e){return r.a.createElement("div",{className:"w3-bar w3-top w3-black w3-large",style:{zIndex:"4"}},r.a.createElement("button",{className:"w3-bar-item w3-button w3-hover-none w3-hover-text-light-grey",onClick:e.menuClickHandler},r.a.createElement("i",{className:"fa fa-bars"})," \xa0Menu"),r.a.createElement("a",{className:"w3-bar-item w3-right w3-button",href:"https://github.com/Ooblioob/card-game-react"},r.a.createElement("i",{className:"fa fa-github"})),r.a.createElement("a",{className:"w3-bar-item w3-right w3-button",href:"https://github.com/Ooblioob/card-game-react/README.md"},r.a.createElement("i",{className:"fa fa-book"})," Docs"))},L=function(e){var t=b(),a=t.loading,n=t.user;return a||!n?null:r.a.createElement("div",{className:"w3-container w3-row"},r.a.createElement("div",{className:"w3-col s4"},r.a.createElement("img",{src:n.picture,className:"w3-circle w3-margin-right",style:{width:"46px"},alt:"User Profile"})),r.a.createElement("div",{className:"w3-col s8 w3-bar"},r.a.createElement("span",null,"Welcome, ",r.a.createElement("strong",null,n.nickname))))},M=function(e){var t=b(),a=t.isAuthenticated,n=t.loginWithRedirect,c=t.logout;return a?r.a.createElement("button",{className:"w3-bar-item w3-button w3-padding",onClick:function(){return c()}},r.a.createElement("i",{className:"fa fa-sign-out fa-fw"}),"\xa0 Log Out"):r.a.createElement("button",{className:"w3-bar-item w3-button w3-padding",onClick:function(){return n({})}},r.a.createElement("i",{className:"fa fa-sign-in fa-fw"}),"\xa0 Log In")},D=a(8),J=function(e){return b().loading?null:r.a.createElement("nav",{className:"w3-sidebar w3-white w3-animate-left",style:{zIndex:3,width:"300px",display:e.visible?"block":"none"},id:"mySidebar"},r.a.createElement("br",null),r.a.createElement(L,null),r.a.createElement("hr",null),r.a.createElement("div",{className:"w3-container"},r.a.createElement("h5",null,"Dashboard")),r.a.createElement("div",{className:"w3-bar-block"},r.a.createElement(D.a,{exact:!0,to:"/react-card-game",activeClassName:"w3-blue",className:"w3-bar-item w3-button w3-padding"},r.a.createElement("i",{className:"fa fa-home fa-fw"})," Home"),r.a.createElement(D.a,{to:"/react-card-game/instructions",activeClassName:"w3-blue",className:"w3-bar-item w3-button w3-padding"},r.a.createElement("i",{className:"fa fa-book fa-fw"}),"\xa0 Instructions"),r.a.createElement(D.a,{to:"/react-card-game/achievements",activeClassName:"w3-blue",className:"w3-bar-item w3-button w3-padding"},r.a.createElement("i",{className:"fa fa-trophy fa-fw"}),"\xa0 Achievements"),r.a.createElement(D.a,{to:"/react-card-game/settings",activeClassName:"w3-blue",className:"w3-bar-item w3-button w3-padding"},r.a.createElement("i",{className:"fa fa-cog fa-fw"}),"\xa0 Settings"),r.a.createElement(M,null)))};J.defaultProps={visible:!1};var H=J,B=function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,"This is the Achievements page...more to come soon!"))},G=function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,"This is the settings page...more to come soon!"))},V=function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,"This is the Instructions page...more to come soon!"))};var _=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],c=t[1];return r.a.createElement(k.b,{history:E},r.a.createElement(z,{menuClickHandler:function(){c(!a)}}),r.a.createElement(H,{visible:a}),r.a.createElement("div",{id:"main",className:"w3-main w3-display-container",style:{marginTop:"43px",marginLeft:a?"25%":"0%"}},r.a.createElement(k.c,null,r.a.createElement(k.a,{path:"/react-card-game",exact:!0,component:A}),r.a.createElement(U,{path:"/react-card-game/achievements",component:B}),r.a.createElement(k.a,{path:"/react-card-game/settings",component:G}),r.a.createElement(k.a,{path:"/react-card-game/instructions",component:V}))))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,{domain:g.domain,client_id:g.clientId,redirect_uri:window.location.origin,onRedirectCallback:function(e){E.push(e&&e.targetUrl?e.targetUrl:window.location.pathname)}},r.a.createElement(_,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[26,1,3]]]);
//# sourceMappingURL=main.673dd447.chunk.js.map