"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[4230],{4230:(e,s,r)=>{r.r(s),r.d(s,{default:()=>o});var t=r(2791),l=r(2937),n=r(184);const o=()=>{const[e,s]=(0,t.useState)(null),[r,o]=(0,t.useState)(""),[c,a]=(0,t.useState)(""),[i,u]=(0,t.useState)(!1);return(0,n.jsxs)(l.rb,{children:[(0,n.jsx)("h1",{children:"Retrieval Playground"}),(0,n.jsx)(l.b7,{xs:12,children:(0,n.jsx)(l.xH,{className:"mb-4",children:(0,n.jsx)(l.sl,{children:(0,n.jsxs)(l.lx,{children:[(0,n.jsx)("div",{className:"mb-3",children:(0,n.jsx)(l.PB,{id:"Query",label:"Query",rows:3,text:"Input Query for Testing",onChange:e=>o(e.target.value)})}),i?(0,n.jsxs)(l.u5,{disabled:!0,children:[(0,n.jsx)(l.LQ,{component:"span",size:"sm","aria-hidden":"true"})," Loading..."]}):(0,n.jsx)("div",{className:"mb-3 button-group spaced-buttons flex justify-between",children:(0,n.jsx)(l.u5,{component:"input",type:"button",color:"primary",value:"Submit",className:"mr-4",onClick:async()=>{u(!0);try{const e=await fetch("".concat("/api","/test_query"),{method:"POST",body:JSON.stringify({query:r}),headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error("HTTP error! status: ".concat(e.status));const t=await e.json(),l=t.result.list,n=t.result.query;s(l),a(n),o("")}catch(e){console.error("Fetch Error:",e)}u(!1)},style:{marginRight:"12px"}})})]})})})}),(0,n.jsx)(l.b7,{xs:12,children:(0,n.jsxs)(l.xH,{className:"mb-4",children:[(0,n.jsxs)(l.bn,{children:[(0,n.jsx)("strong",{children:"Query:"})," ",c&&JSON.stringify(c)]}),(0,n.jsx)(l.sl,{children:(0,n.jsx)(l.Sx,{columns:[{key:"column",label:"Column",_props:{scope:"col"}},{key:"value",label:"Content",_props:{scope:"col"}},{key:"full_value",label:"Full Content",_props:{scope:"col"}},{key:"score",label:"Score",_props:{scope:"col"}}],items:e,hover:!0,striped:!0,bordered:!0,size:"sm"})})]})})]})}}}]);
//# sourceMappingURL=4230.0f7b4719.chunk.js.map