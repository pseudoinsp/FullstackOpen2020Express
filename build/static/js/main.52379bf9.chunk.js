(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),l=(t(19),t(2)),o=function(e){var n=e.filterValue,t=e.changeHandler;return r.a.createElement("div",null,r.a.createElement("p",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t})," "))},i=function(e){var n=e.name,t=e.nameChangeHandler,a=e.number,u=e.numberChangeHandler,c=e.submitHandler;return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.persons,t=e.nameFilter,a=e.deleteButtonHandler;return r.a.createElement(r.a.Fragment,null,n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number," ",r.a.createElement("button",{id:e.id,onClick:a},"delete"))})))},m=function(e){var n=e.message,t={color:e.color,background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return null===n?null:r.a.createElement("div",{style:t},n)},f=t(3),s=t.n(f),b=function(){return s.a.get("/api/notes").then((function(e){return e.data}))},h=function(e){return s.a.post("/api/notes",e).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat("/api/notes","/").concat(e),n).then((function(e){return e.data}))},g=function(e){return s.a.delete("".concat("/api/notes","/").concat(e)).then((function(e){return e.data}))},E=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),f=Object(l.a)(c,2),s=f[0],E=f[1],v=Object(a.useState)(""),j=Object(l.a)(v,2),w=j[0],O=j[1],S=Object(a.useState)(""),C=Object(l.a)(S,2),H=C[0],k=C[1],y=Object(a.useState)(null),B=Object(l.a)(y,2),F=B[0],D=B[1],J=Object(a.useState)("green"),L=Object(l.a)(J,2),N=L[0],P=L[1],V=function(e,n){P(n),D(e),setTimeout((function(){D(null)}),5e3)};return Object(a.useEffect)((function(){b().then((function(e){return u(e)}))}),[s,H]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(m,{message:F,color:N}),r.a.createElement("div",null,r.a.createElement(o,{filterValue:H,changeHandler:function(e){return k(e.target.value)}})),r.a.createElement("h2",null,"Add a new"),r.a.createElement(i,{name:s,nameChangeHandler:function(e){return E(e.target.value)},number:w,numberChangeHandler:function(e){return O(e.target.value)},submitHandler:function(e){e.preventDefault();var n={name:s,number:w};if(t.map((function(e){return e.name})).includes(s)){var a=t.find((function(e){return e.name===s}));if(!window.confirm("".concat(a.name," is already added to the phonebook, replace the old number with a new one?")))return;p(a.id,n).then((function(e){V("Successfully updated ".concat(e.name),"green"),u(t.map((function(n){return n.id!==e.id?n:e})))})).catch((function(e){return V("unsuccessful update: ".concat(e),"red")}))}else h(n).then((function(e){console.log(e),V("Person successfully added","green"),u(t.map((function(n){return n.id!==e.id?n:e})))})).catch((function(e){return V("unsuccessful add: ".concat(e),"red")}));E(""),O("")}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{persons:t,nameFilter:H,deleteButtonHandler:function(e){var n=Number(e.target.id);window.confirm("Delete ".concat(t.find((function(e){return e.id===n})).name,"?"))&&g(n).then((function(){V("Successful remove","green"),u(t.filter((function(e){return e.id!==n})))})).catch((function(e){return V("unsuccessful delete: ".concat(e),"red")}))}}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.52379bf9.chunk.js.map