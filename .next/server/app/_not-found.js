(()=>{var e={};e.id=165,e.ids=[165],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3719:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>x,tree:()=>l});var n=r(482),s=r(9108),o=r(2563),i=r.n(o),a=r(8300),d={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>a[e]);r.d(t,d);let l=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,6661)),"C:\\Users\\sushko14\\Projects\\nextclientmonitoring\\src\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"]}],c=[],u="/_not-found",p={require:r,loadChunk:()=>Promise.resolve()},x=new n.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/_not-found",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},3587:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,6840,23)),Promise.resolve().then(r.t.bind(r,8771,23)),Promise.resolve().then(r.t.bind(r,3225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,3982,23))},7924:(e,t,r)=>{Promise.resolve().then(r.bind(r,1059))},3824:()=>{},1059:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(5344),s=r(8986);r(3824);var o=r(448),i=r(7864);let a=(0,o.xC)({reducer:{devices:i.Z}});var d=r(6013);function l({children:e}){return n.jsx(d.zt,{store:a,children:e})}function c({children:e}){return n.jsx("html",{lang:"en",children:n.jsx("body",{className:s.className,children:n.jsx(l,{store:a,children:e})})})}},7864:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o,e:()=>s});let n=(0,r(448).oM)({name:"devices",initialState:[],reducers:{addOrUpdateDevice(e,t){let r=t.payload,n=e.findIndex(e=>e.id===r.id);return -1!==n?(console.log("update device"),console.log(r.id),e.map((e,t)=>t===n?r:e)):(console.log("add device"),[...e,r])}}}),{addOrUpdateDevice:s}=n.actions,o=n.reducer},6661:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>o,__esModule:()=>s,default:()=>i});let n=(0,r(6843).createProxy)(String.raw`C:\Users\sushko14\Projects\nextclientmonitoring\src\app\layout.js`),{__esModule:s,$$typeof:o}=n,i=n.default}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[638,312],()=>r(3719));module.exports=n})();