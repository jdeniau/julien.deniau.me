import{d as u,u as p,a as h,c as d,b as f,t as g,e as v,r as b,_ as x,f as r,g as e,h as a,F as y,i as N,n as k,o as i,j as P,k as V,l as w}from"./index-dHJe6FXn.js";import{N as S}from"./NoteDisplay-DEP6N-w7.js";const j=u({__name:"PresenterPrint",setup(m,{expose:n}){n(),p(`
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
`),h({title:`Notes - ${d.title}`});const t={slidesWithNote:f(()=>b.map(s=>{var l;return(l=s.meta)==null?void 0:l.slide}).filter(s=>s!==void 0&&s.noteHTML!=="")),get configs(){return d},get themeVars(){return g},get total(){return v},NoteDisplay:S};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}}),D={class:"m-4"},L={class:"mb-10"},T={class:"text-4xl font-bold mt-2"},W={class:"opacity-50"},B={class:"text-lg"},H={class:"font-bold flex gap-2"},z={class:"opacity-50"},C={key:0,class:"border-gray-400/50 mb-8"};function F(m,n,_,t,s,l){return i(),r("div",{id:"page-root",style:k(t.themeVars)},[e("div",D,[e("div",L,[e("h1",T,a(t.configs.title),1),e("div",W,a(new Date().toLocaleString()),1)]),(i(!0),r(y,null,N(t.slidesWithNote,(o,c)=>(i(),r("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[e("div",null,[e("h2",B,[e("div",H,[e("div",z,a(o==null?void 0:o.no)+"/"+a(t.total),1),P(" "+a(o==null?void 0:o.title)+" ",1),n[0]||(n[0]=e("div",{class:"flex-auto"},null,-1))])]),V(t.NoteDisplay,{"note-html":o.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<t.slidesWithNote.length-1?(i(),r("hr",C)):w("v-if",!0)]))),128))])],4)}const E=x(j,[["render",F],["__file","/home/jdeniau/code/julien.deniau.me/public/open-source-howto/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{E as default};
