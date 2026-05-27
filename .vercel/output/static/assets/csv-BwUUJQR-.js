import{b as l}from"./utils-rNmJmQHy.js";const s=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]],b=l("file-down",s);function h(n,e){if(e.length===0){const a=new Blob([""],{type:"text/csv"});i(a,n);return}const o=Object.keys(e[0]),t=a=>{if(a==null)return"";const r=String(a).replace(/"/g,'""');return/[",\n]/.test(r)?`"${r}"`:r},d=[o.join(","),...e.map(a=>o.map(r=>t(a[r])).join(","))],c=new Blob([d.join(`
`)],{type:"text/csv;charset=utf-8"});i(c,n)}function i(n,e){const o=URL.createObjectURL(n),t=document.createElement("a");t.href=o,t.download=e,document.body.appendChild(t),t.click(),t.remove(),URL.revokeObjectURL(o)}function f(n,e){const o=window.open("","_blank");if(!o)return;const t=e.length?Object.keys(e[0]):[];o.document.write(`<!doctype html><html><head><title>${n}</title>
    <style>
      body{font-family:Inter,system-ui,sans-serif;padding:32px;color:#111}
      h1{font-family:'Playfair Display',serif;color:#8a6a1f;border-bottom:2px solid #c9a24a;padding-bottom:8px}
      table{width:100%;border-collapse:collapse;margin-top:16px;font-size:12px}
      th,td{border-bottom:1px solid #e5e5e5;padding:8px;text-align:left}
      th{background:#f7f3e8;color:#5a4413;text-transform:uppercase;letter-spacing:.05em;font-size:10px}
    </style></head><body>
    <h1>${n}</h1>
    <table><thead><tr>${t.map(d=>`<th>${d}</th>`).join("")}</tr></thead>
    <tbody>${e.map(d=>`<tr>${t.map(c=>`<td>${d[c]??""}</td>`).join("")}</tr>`).join("")}</tbody></table>
    <script>window.onload=()=>window.print()<\/script>
    </body></html>`),o.document.close()}export{b as F,h as d,f as e};
