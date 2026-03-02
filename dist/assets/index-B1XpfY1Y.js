(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&u(s)}).observe(document,{childList:!0,subtree:!0});function a(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function u(o){if(o.ep)return;o.ep=!0;const e=a(o);fetch(o.href,e)}})();const k=[{name:"Greenery Variant A",category:"Town Essentials",green:4,blue:0,red:0},{name:"Greenery Variant B",category:"Town Essentials",green:3,blue:1,red:0},{name:"The Globe",category:"Town Essentials",green:0,blue:12,red:0},{name:"Heroic Horse",category:"Town Essentials",green:3,blue:0,red:9},{name:"Tree of Life",category:"Valhalla",green:9,blue:0,red:3},{name:"Freya's Fortune",category:"Valhalla",green:0,blue:0,red:12},{name:"Golden Freya",category:"Valhalla",green:7,blue:7,red:7},{name:"Tree of Knowledge",category:"Valhalla",green:0,blue:22,red:0},{name:"Park",category:"Central Park",green:4,blue:0,red:0},{name:"Forest",category:"Central Park",green:6,blue:0,red:0},{name:"Observatory",category:"Central Park",green:3,blue:9,red:0},{name:"The Deer",category:"Reindeer Fest",green:11,blue:0,red:11},{name:"Elf House",category:"Reindeer Fest",green:0,blue:2,red:2},{name:"Snowflake",category:"Reindeer Fest",green:0,blue:4,red:0},{name:"Cozy Cabin",category:"Reindeer Fest",green:0,blue:0,red:12},{name:"Rocks",category:"Nature Reserve",green:2,blue:2,red:0},{name:"Ridge",category:"Nature Reserve",green:3,blue:0,red:3},{name:"Lake",category:"Nature Reserve",green:2,blue:2,red:0},{name:"Meadow",category:"Nature Reserve",green:3,blue:0,red:3},{name:"Marble Column",category:"Trophies of Culture",green:0,blue:2,red:2},{name:"Bronze Statue",category:"Trophies of Culture",green:2,blue:0,red:2},{name:"Silver Statue",category:"Trophies of Culture",green:0,blue:6,red:6},{name:"Gold Statue",category:"Trophies of Culture",green:7,blue:7,red:7},{name:"Fountain",category:"Trophies of Culture",green:2,blue:2,red:0},{name:"Theatre",category:"Oracle",green:10,blue:1,red:1},{name:"Golden Theatre",category:"Oracle",green:7,blue:7,red:7},{name:"Wizard's Staff",category:"Mercury",green:0,blue:15,red:7},{name:"Gorgon",category:"Medusa",green:6,blue:0,red:6},{name:"Golden Gorgon",category:"Medusa",green:7,blue:7,red:7},{name:"Temple",category:"Highard",green:0,blue:11,red:11},{name:"Golden Temple",category:"Highard",green:11,blue:11,red:0},{name:"Eiffel Tower",category:"Omega",green:100,blue:100,red:100}];function B(l,d,a){const u=[l,d,a],o=u.reduce((r,t)=>r+t,0);if(o===0)return 0;const e=Math.max(...u),s=Math.min(...u);return 1-(e-s)/o}function L(l,d,a){const u=Math.min(l,1500)+Math.min(d,1500)+Math.min(a,1500),o=B(l,d,a);return u+u*o}function I(l,d){const a={};l.forEach(e=>{a[e]={green:0,blue:0,red:0,decorations:[]}});const u=k.map(e=>({...e,quantity:d[e.name]||0})),o=[...l];if(o.includes("evergarden")){const e=o.indexOf("evergarden");o.splice(e,1),o.unshift("evergarden")}return o.forEach(e=>{const s=a[e],c=e.toLowerCase()==="evergarden";u.sort((r,t)=>t.green+t.blue+t.red-(r.green+r.blue+r.red)),u.forEach(r=>{if(!(c&&!["Valhalla","Trophies of Culture"].includes(r.category)))for(;r.quantity>0&&s.green+r.green<=1500&&s.blue+r.blue<=1500&&s.red+r.red<=1500;){s.green+=r.green,s.blue+=r.blue,s.red+=r.red;const t=s.decorations.find(i=>i.name===r.name);t?t.quantity++:s.decorations.push({name:r.name,quantity:1}),r.quantity--}})}),l.forEach(e=>{const s=a[e],c=e.toLowerCase()==="evergarden",r=k.filter(t=>c?["Valhalla","Trophies of Culture"].includes(t.category):!0).map(t=>{const i=s.decorations.find(n=>n.name===t.name);return{name:t.name,quantity:i?i.quantity:0}});s.decorations=r}),a}function F(l,d){const a={},u={...d};if(l.forEach(e=>{a[e]={decorations:[],green:0,blue:0,red:0}}),l.includes("evergarden")){const e=a.evergarden,s=k.filter(c=>["Valhalla","Trophies of Culture"].includes(c.category));for(;;){let c=null;const r=L(e.green,e.blue,e.red);for(const t of s)if(u[t.name]>0){const i=e.green+t.green,n=e.blue+t.blue,m=e.red+t.red,y=L(i,n,m)-r;(!c||y>c.scoreIncrease)&&(c={decoration:t,scoreIncrease:y})}if(c&&c.scoreIncrease>0){const{decoration:t}=c;e.green+=t.green,e.blue+=t.blue,e.red+=t.red;const i=e.decorations.find(n=>n.name===t.name);i?i.quantity++:e.decorations.push({name:t.name,quantity:1}),u[t.name]--}else break}}const o=l.filter(e=>e!=="evergarden");if(o.length>0)for(;;){let e=null;const s=k.filter(c=>u[c.name]>0);if(s.length===0)break;for(const c of o){const r=a[c],t=L(r.green,r.blue,r.red);for(const i of s){const n=r.green+i.green,m=r.blue+i.blue,p=r.red+i.red,g=L(n,m,p)-t;(!e||g>e.scoreIncrease)&&(e={town:c,decoration:i,scoreIncrease:g})}}if(e&&e.scoreIncrease>0){const{town:c,decoration:r}=e,t=a[c];t.green+=r.green,t.blue+=r.blue,t.red+=r.red;const i=t.decorations.find(n=>n.name===r.name);i?i.quantity++:t.decorations.push({name:r.name,quantity:1}),u[r.name]--}else break}return l.forEach(e=>{const s=a[e],c=e.toLowerCase()==="evergarden",r=k.filter(t=>c?["Valhalla","Trophies of Culture"].includes(t.category):!0).map(t=>{const i=s.decorations.find(n=>n.name===t.name);return{name:t.name,quantity:i?i.quantity:0}});s.decorations=r}),a}function D(l){return l.replace(/[^a-zA-Z0-9-_]/g,"-")}function G(l,d){const a={towns:l,decorationQuantities:d};document.cookie=`userData=${encodeURIComponent(JSON.stringify(a))}; path=/; max-age=31536000;`}function V(){const d=document.cookie.split("; ").find(a=>a.startsWith("userData="));return d?JSON.parse(decodeURIComponent(d.split("=")[1])):null}function P(l,d,a){const u=["Decoration Name","Category","Green","Blue","Red","Unused",...Object.keys(d)],o=Object.entries(l).map(([t,i])=>{const n=k.find(S=>S.name===t),m=(n==null?void 0:n.category)||"",p=(n==null?void 0:n.green)||0,y=(n==null?void 0:n.blue)||0,g=(n==null?void 0:n.red)||0,v=Object.keys(d).map(S=>{var b;const R=(((b=d[S])==null?void 0:b.decorations)||[]).find(h=>h.name===t);return R?R.quantity:0}),C=i-v.reduce((S,w)=>S+w,0);return[t,m,p,y,g,C,...v]}),e=[u.join(","),...o.map(t=>t.join(","))].join(`
`),s=new Blob([e],{type:"text/csv"}),c=URL.createObjectURL(s),r=document.createElement("a");r.href=c,r.download=a,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(c)}function Q(l,d){const a=new FileReader;a.onload=u=>{var o,e;try{const s=(o=u.target)==null?void 0:o.result;if(l.type==="text/csv"){const c=s.split(/\r?\n/).filter(Boolean),r=((e=c.shift())==null?void 0:e.split(","))||[],t=c.map(i=>{const n=i.split(",");return r.reduce((m,p,y)=>(m[p.toLowerCase().replace(/ /g,"_")]=n[y],m),{})});t.forEach(i=>{const n=i.decoration_name,m=document.querySelector(`#decoration-${D(n)}`);if(m){let p=0;Object.entries(i).forEach(([y,g])=>{!["decoration_name","category","green","blue","red"].includes(y)&&!isNaN(Number(g))&&(p+=Number(g))}),m.value=p.toString()}}),d(t)}}catch(s){alert("Failed to import data: "+s)}},a.readAsText(l)}function U(){const l=Array.from(document.querySelectorAll(".decoration-input-group input")).reduce((u,o)=>(u[o.name]=parseInt(o.value,10)||0,u),{}),d=document.querySelector("#results"),a={};if(d&&d.querySelectorAll(".town-result").forEach(o=>{var c,r;const e=((r=(c=o.querySelector("h3"))==null?void 0:c.textContent)==null?void 0:r.replace("Results for ",""))||"",s=Array.from(o.querySelectorAll(".decoration-item")).map(t=>{const i=t.querySelector(".item-name"),n=t.querySelector(".item-qty");return i&&n?{name:i.textContent,quantity:parseInt(n.textContent||"0",10)}:null}).filter(Boolean);a[e]={decorations:s}}),Object.keys(a).length===0){const u=I(Array.from(document.querySelectorAll(".town-checkbox:checked")).map(o=>o.value),l);Object.entries(u).forEach(([o,e])=>{a[o]={decorations:e.decorations||[]}})}return{decorationQuantities:l,results:a}}function _(){var t,i;const l=document.querySelector("#app");l.innerHTML=`
    <header>
      <img id="header" src="hq_logo.webp" alt="Home Quest Logo">
      <h1>Decoration Optimizer</h1>
      <p style="color: var(--text-muted); font-size: 1.1rem; margin-top: 0.5rem;">Maximize your Town Hearts with ease</p>
    </header>

    <form id="decoration-form">
      <section class="card-section" id="towns-container">
        <h2><span style="color: var(--accent-primary);">1.</span> Select Unlocked Towns</h2>
        <div class="town-checkbox-wrapper" style="margin-bottom: 1rem; background: rgba(99, 102, 241, 0.1); border-color: rgba(99, 102, 241, 0.2);">
          <input type="checkbox" id="select-all-towns">
          <label for="select-all-towns">Select All / None</label>
        </div>
        <div id="towns-inputs">
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="town1" id="town-town1"><label for="town-town1">Town 1</label></div>
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="town2" id="town-town2"><label for="town-town2">Town 2</label></div>
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="town3" id="town-town3"><label for="town-town3">Town 3</label></div>
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="town4" id="town-town4"><label for="town-town4">Town 4</label></div>
          
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="evergarden" id="town-evergarden"><label for="town-evergarden">Evergarden</label></div>
          
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="northern1" id="town-northern1"><label for="town-northern1">Northern 1</label></div>
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="northern2" id="town-northern2"><label for="town-northern2">Northern 2</label></div>
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="northern3" id="town-northern3"><label for="town-northern3">Northern 3</label></div>
          
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="southern1" id="town-southern1"><label for="town-southern1">Southern 1</label></div>
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="southern2" id="town-southern2"><label for="town-southern2">Southern 2</label></div>
          <div class="town-checkbox-wrapper"><input type="checkbox" class="town-checkbox" value="southern3" id="town-southern3"><label for="town-southern3">Southern 3</label></div>
        </div>
      </section>

      <section class="card-section" id="optimization-method-container">
        <h2><span style="color: var(--accent-primary);">2.</span> Strategy</h2>
        <div style="display: flex; gap: 2rem; margin-top: 1rem;">
          <label class="town-checkbox-wrapper" style="flex: 1;">
            <input type="radio" name="optimization-method" value="maximum" checked>
            <div>
              <div style="font-weight: 700;">Maximum</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Highest possible score</div>
            </div>
          </label>
          <label class="town-checkbox-wrapper" style="flex: 1;">
            <input type="radio" name="optimization-method" value="balanced">
            <div>
              <div style="font-weight: 700;">Balanced</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Even distribution</div>
            </div>
          </label>
        </div>
      </section>

      <section class="card-section" id="decorations-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h2 style="margin: 0;"><span style="color: var(--accent-primary);">3.</span> Quantities</h2>
          <button type="button" class="btn btn-danger" id="reset-values-top">Reset All</button>
        </div>
        <div id="decoration-inputs">
          <!-- Inputs will be dynamically added here -->
        </div>
      </section>

      <div style="text-align: center; margin-bottom: 3rem;">
        <button type="submit" class="btn btn-primary" style="padding: 1.2rem 3rem; font-size: 1.2rem; border-radius: 20px;">
          🚀 Run Optimizer
        </button>
      </div>
    </form>

    <div id="results"></div>

    <section class="card-section" style="text-align: center;">
      <h2 style="margin-bottom: 1.5rem;">Data Management</h2>
      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <button id="export-csv" class="btn btn-secondary">📥 Export CSV</button>
        <button id="import-csv" class="btn btn-secondary">📤 Import CSV</button>
      </div>
      <input type="file" id="import-file" style="display:none" />
    </section>
  `;const d=document.querySelector("#select-all-towns"),a=document.querySelectorAll(".town-checkbox");d.addEventListener("change",()=>{a.forEach(n=>{n.checked=d.checked})}),a.forEach(n=>{n.name=`town-${D(n.value)}`});const u=document.querySelector("#decoration-form"),o=document.querySelector("#reset-values-top");function e(){confirm("Are you sure you want to reset all quantities to zero?")&&document.querySelectorAll(".decoration-input-group input").forEach(n=>{n.value="0"})}o.addEventListener("click",e),u.addEventListener("submit",n=>{var R;n.preventDefault();const m=Array.from(a).filter(b=>b.checked).map(b=>b.value),p=Array.from(document.querySelectorAll(".decoration-input-group input")).reduce((b,h)=>(b[h.name]=parseInt(h.value,10)||0,b),{});G(m,p);const y=((R=document.querySelector("input[name='optimization-method']:checked"))==null?void 0:R.value)||"maximum";let g;y==="balanced"?g=F(m,p):g=I(m,p);const v=document.querySelector("#results");v.innerHTML='<h2 style="text-align: center; margin-bottom: 2rem;">Optimized Layout</h2>';const C={town1:"Town 1",town2:"Town 2",town3:"Town 3",town4:"Town 4",northern1:"Northern 1",northern2:"Northern 2",northern3:"Northern 3",evergarden:"Evergarden",southern1:"Southern 1",southern2:"Southern 2",southern3:"Southern 3"};m.forEach(b=>{const h=g[b];if(!h||h.green===0&&h.blue===0&&h.red===0&&(!h.decorations||h.decorations.length===0))return;const f=document.createElement("div");f.className="card-section town-result";const T=document.createElement("h3");T.textContent=`Results for ${C[b]||b}`,f.appendChild(T);const O=Math.min(h.green,1500)+Math.min(h.blue,1500)+Math.min(h.red,1500),z=B(h.green,h.blue,h.red),H=O*z,A=O+H;f.innerHTML+=`
        <div class="overall-score-card">
          <div style="margin-bottom: 1rem;">
             <span class="score-badge green-badge">Green Hearts: ${h.green}</span>
             <span class="score-badge blue-badge">Blue Hearts: ${h.blue}</span>
             <span class="score-badge red-badge">Red Hearts: ${h.red}</span>
          </div>
          <div style="font-size: 1.1rem;">
            <div>Base Score: <span style="font-weight: 700;">${O.toFixed(0)}</span></div>
            <div>Variety Bonus: <span style="font-weight: 700; color: var(--accent-primary);">+${(z*100).toFixed(1)}%</span> (+${H.toFixed(0)} pts)</div>
            <div style="font-size: 1.5rem; margin-top: 0.5rem;">Overall Score: <span style="color: var(--accent-primary); font-weight: 800;">${A.toFixed(0)}</span></div>
          </div>
        </div>
      `;const N=document.createElement("div");N.className="decoration-list";const M={};h.decorations.forEach(E=>{M[E.name]=(M[E.name]||0)+E.quantity}),Object.entries(M).sort(([E],[q])=>Object.keys(p).indexOf(E)-Object.keys(p).indexOf(q)).forEach(([E,q])=>{const x=k.find(j=>j.name===E),$=document.createElement("div");$.className="decoration-item",$.innerHTML=`
            <div>
              <span class="item-name" style="font-weight: 600;">${E}</span>
              <div style="font-size: 0.75rem; color: var(--text-muted);">
                <span style="color: var(--accent-green);">G:${((x==null?void 0:x.green)||0)*q}</span>
                <span style="color: var(--accent-blue);">B:${((x==null?void 0:x.blue)||0)*q}</span>
                <span style="color: var(--accent-red);">R:${((x==null?void 0:x.red)||0)*q}</span>
              </div>
            </div>
            <div style="background: var(--bg-card); padding: 0.2rem 0.6rem; border-radius: 8px; font-weight: 700;">
              x<span class="item-qty">${q}</span>
            </div>
          `,N.appendChild($)}),f.appendChild(N),v.appendChild(f)});const S=k.map(b=>{const h=Object.values(g).flatMap(f=>f.decorations.filter(T=>T.name===b.name)).reduce((f,T)=>f+T.quantity,0);return{...b,unused:(p[b.name]||0)-h}}).filter(b=>b.unused>0),w=document.createElement("div");if(w.className="card-section unused-decorations",w.style.opacity="0.7",w.innerHTML='<h3 style="margin-bottom: 1.5rem; color: var(--text-muted);">Remaining Decorations</h3>',S.length>0){const b=document.createElement("div");b.className="decoration-list",S.forEach(h=>{const f=document.createElement("div");f.className="decoration-item",f.innerHTML=`<span class="item-name">${h.name}</span> <span style="font-weight: 700;">x${h.unused}</span>`,b.appendChild(f)}),w.appendChild(b)}else w.innerHTML+='<p style="color: var(--text-muted); font-style: italic;">None — all decorations have been placed.</p>';v.appendChild(w),v.scrollIntoView({behavior:"smooth"})});const s=document.querySelector("#decoration-inputs");let c="";k.forEach(({name:n,category:m,green:p,blue:y,red:g})=>{if(m!==c){c=m;const C=document.createElement("h3");C.className="category-title",C.textContent=m,s.appendChild(C)}const v=document.createElement("div");v.className="decoration-input-group",v.innerHTML=`
      <label for="decoration-${D(n)}">${n}</label>
      <div style="display: flex; gap: 0.5rem; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">
        <span style="color: var(--accent-green);">G:${p}</span>
        <span style="color: var(--accent-blue);">B:${y}</span>
        <span style="color: var(--accent-red);">R:${g}</span>
      </div>
      <input type="number" id="decoration-${D(n)}" name="${n}" min="0" value="0">
    `,s.appendChild(v)});const r=V();if(r){const{towns:n,decorationQuantities:m}=r;a.forEach(p=>p.checked=n.includes(p.value)),Object.entries(m).forEach(([p,y])=>{const g=document.querySelector(`#decoration-${D(p)}`);g&&(g.value=y.toString())})}(t=document.getElementById("export-csv"))==null||t.addEventListener("click",()=>{const{decorationQuantities:n,results:m}=U();P(n,m,"HomeQuest-Decor-Export.csv")}),(i=document.getElementById("import-csv"))==null||i.addEventListener("click",()=>{const n=document.getElementById("import-file");n.accept=".csv",n.onchange=()=>{var p;const m=(p=n.files)==null?void 0:p[0];m&&Q(m,()=>{})},n.click()})}_();
