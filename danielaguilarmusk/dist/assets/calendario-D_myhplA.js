import"./index-BYiGy0QT.js";import{g as i}from"./index-ChjVQtCc.js";import{q as c,o as l,c as m,a as p,d as h}from"./firebase-wPzszKGM.js";import"./lucide-Ddjmf5Sb.js";document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("shows-container"),o=document.getElementById("shows-loader");if(!t||!o)return;const a=c(m(h,"shows"),l("order","asc"));p(a,n=>{const s=n.docs.map(e=>({id:e.id,...e.data()}));if(o.classList.add("hidden"),t.classList.remove("hidden"),t.innerHTML="",s.length===0){t.innerHTML='<div class="text-center py-12 text-white/30 font-mono text-sm border border-dashed border-white/10 rounded-xl">No hay fechas programadas actualmente.</div>';return}s.forEach(e=>{const r=e.time?`<span class="font-mono text-xs bg-brand-accent/10 border border-brand-accent/30 text-brand-accent px-3 py-1 rounded-full whitespace-nowrap">${e.time}</span>`:"",d=`
                <div class="show-row opacity-0 translate-y-5 group flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div class="flex gap-8 items-center mb-6 md:mb-0">
                        <span class="font-mono text-brand-accent text-2xl font-bold w-24">
                            ${e.date}
                        </span>
                        <div>
                            <div class="flex items-center gap-3 mb-1">
                                <h3 class="font-headings text-2xl text-white group-hover:text-brand-accent transition-colors">${e.city}</h3>
                                ${r}
                            </div>
                            <p class="font-sans text-white/50">${e.venue}</p>
                        </div>
                    </div>
                </div>
            `;t.insertAdjacentHTML("beforeend",d)}),i.to(".show-row",{y:0,opacity:1,stagger:.1,duration:.8,ease:"power3.out",clearProps:"all"})})});
