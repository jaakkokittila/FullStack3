(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},20:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),u=n(14),i=n(2),l=(n(20),function(e){return r.a.createElement("div",null,r.a.createElement("p",null,e.name," : ",e.number))}),m=function(e){return r.a.createElement("div",null,"filter shown by ",r.a.createElement("input",{value:e.search,onChange:e.onChange}))},f=function(e){return r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange}),"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=n(3),d=n.n(s),b="http://localhost:3001/api/persons",h=function(){return d.a.get(b)},p=function(e){return d.a.post(b,e)},v=function(e){return d.a.put("".concat(b,"/").concat(e.id),e)},E=function(e){return d.a.delete("".concat(b,"/").concat(e))};function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var O=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),s=Object(i.a)(c,2),d=s[0],b=s[1],O=Object(a.useState)(""),y=Object(i.a)(O,2),j=y[0],w=y[1],C=Object(a.useState)(""),P=Object(i.a)(C,2),S=P[0],k=P[1],N=Object(a.useState)(null),D=Object(i.a)(N,2),L=D[0],T=D[1];Object(a.useEffect)((function(){h().then((function(e){console.log(e.data),o(e.data)}))}),[]);var Y=n.filter((function(e){return S.toLowerCase()===String(e.name).substring(0,S.length).toLowerCase()})),H=Y.map((function(e){return r.a.createElement("div",null," ",r.a.createElement(l,{key:e.name,name:e.name,number:e.number})," ",r.a.createElement("button",{onClick:function(){return function(e){var t=n.filter((function(t){return t.id!==e}));window.confirm("Haluatko poistaa yhteystiedon?")&&E(e).then((function(e){o(t),T(r.a.createElement("div",{id:"notification"},"Yhteystieto poistettu!")),setTimeout((function(){T(null)}),5e3)})).catch((function(e){T(r.a.createElement("div",{id:"error"},"Yhteystieto on jo poistettu serverilt\xe4!"))}))}(e.id)}},"Delete"))}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement("div",null,L),r.a.createElement(m,{value:S,onChange:function(e){k(e.target.value)}}),r.a.createElement(f,{newName:d,newNumber:j,handleNameChange:function(e){b(e.target.value)},handleNumberChange:function(e){w(e.target.value)},addPerson:function(e){e.preventDefault();var t={name:d,number:j};if(!0===n.map((function(e){return e.name.toLowerCase()})).includes(d.toLowerCase())){if(window.confirm("".concat(d," l\xf6ytyy jo luettelosta! Haluatko vaihtaa sen numeron?"))){var a=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n.find((function(e){return e.name.toLowerCase()===t.name.toLowerCase()})),{number:j});v(a).then((function(e){T(r.a.createElement("div",{id:"notification"},"Yhteystiedon ".concat(d," numero muutettu!"))),setTimeout((function(){T(null)}),5e3)})).catch((function(e){T(r.a.createElement("div",{id:"error"},e.toString())),setTimeout((function(){T(null)}),5e3)}))}}else p(t).then((function(e){o(n.concat(t)),b(""),w(""),T(r.a.createElement("div",{id:"notification"},"".concat(d," lis\xe4tty!"))),setTimeout((function(){T(null)}),5e3)})).catch((function(e){T(r.a.createElement("div",{id:"error"},e.toString())),setTimeout((function(){T(null)}),5e3)}))}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("div",null,H))};c.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.432116f5.chunk.js.map