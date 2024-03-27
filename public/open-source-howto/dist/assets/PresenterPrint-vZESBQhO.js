import{d,u as _,a as u,c as m,b as p,r as h,e as s,f as t,t as a,g as r,F as f,h as g,n as v,i as x,o as n,j as b,k as y,l as N,m as k,_ as w}from"./index-QfQ8_b_x.js";import{N as P}from"./NoteDisplay-77vvL007.js";const V={class:"m-4"},j={class:"mb-10"},L={class:"text-4xl font-bold mt-2"},S={class:"opacity-50"},T={class:"text-lg"},B={class:"font-bold flex gap-2"},D={class:"opacity-50"},H=t("div",{class:"flex-auto"},null,-1),z={key:0,class:"border-gray-400/50 mb-8"},C=d({__name:"PresenterPrint",setup(F){_(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),u({title:`Notes - ${m.title}`});const i=p(()=>h.map(o=>{var l;return(l=o.meta)==null?void 0:l.slide}).filter(o=>o!==void 0&&o.noteHTML!==""));return(o,l)=>(n(),s("div",{id:"page-root",style:v(r(x))},[t("div",V,[t("div",j,[t("h1",L,a(r(m).title),1),t("div",S,a(new Date().toLocaleString()),1)]),(n(!0),s(f,null,g(i.value,(e,c)=>(n(),s("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",T,[t("div",B,[t("div",D,a(e==null?void 0:e.no)+"/"+a(r(b)),1),y(" "+a(e==null?void 0:e.title)+" ",1),H])]),N(P,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<i.value.length-1?(n(),s("hr",z)):k("v-if",!0)]))),128))])],4))}}),E=w(C,[["__file","/home/jdeniau/code/julien.deniau.me/public/open-source-howto/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{E as default};
