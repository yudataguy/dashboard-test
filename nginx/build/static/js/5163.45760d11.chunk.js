"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[5163],{5163:(e,s,t)=>{t.r(s),t.d(s,{default:()=>l});var o=t(2791),c=t(2937),r=t(184);const l=()=>{const[e,s]=(0,o.useState)(null),[t,l]=(0,o.useState)(0),[a,n]=(0,o.useState)(1);return(0,o.useEffect)((()=>{(async()=>{try{const e=await fetch("".concat("/api","/test_query_history?page=").concat(a),{method:"GET",headers:{"Content-Type":"application/json; charset=utf-8"}});if(!e.ok)throw new Error("HTTP error! status: ".concat(e.status));const t=await e.json(),o=JSON.parse(decodeURIComponent(escape(t.result)));l(t.total),console.log(o),s(o)}catch(e){console.log(e)}})()}),[a]),(0,r.jsxs)(c.rb,{children:[(0,r.jsx)("h1",{children:"Query Test History"}),(0,r.jsx)(c.b7,{xs:12,children:(0,r.jsxs)(c.xH,{className:"mb-4",children:[(0,r.jsx)(c.bn,{children:(0,r.jsx)("strong",{children:"History"})}),(0,r.jsx)(c.sl,{children:(0,r.jsx)(c.Sx,{columns:[{key:"query",label:"Query",_props:{scope:"col"}},{key:"column",label:"Column",_props:{scope:"col"}},{key:"value",label:"Content",_props:{scope:"col"}},{key:"full_value",label:"Full Content",_props:{scope:"col"}},{key:"score",label:"Score",_props:{scope:"col"}}],items:e,hover:!0,striped:!0,bordered:!0,size:"sm"})}),(0,r.jsxs)("div",{className:"mb-3 button-group spaced-buttons flex justify-between",children:[(0,r.jsx)(c.u5,{component:"input",type:"button",color:"primary",value:"PREVIOUS",className:"mr-4",style:{marginRight:"12px"},onClick:()=>n(1===a?1:a-1),disabled:1===a}),(0,r.jsx)(c.u5,{component:"input",type:"button",color:"primary",value:"NEXT",className:"mr-4",onClick:()=>n(a===t?t:a+1),disabled:a===t})]})]})})]})}}}]);
//# sourceMappingURL=5163.45760d11.chunk.js.map