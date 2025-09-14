import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, Database, Workflow, Bot, Globe, Layout, Server, Settings2, Building2,
  Sparkles, Star, ShieldCheck, Layers, ChevronRight, MonitorSmartphone, ShoppingCart
} from "lucide-react";

// 🌟 Rediseño — Servicios con filtro + modal de detalle a pantalla grande con DEMO (visual o vídeo)
// Secciones: Servicios (con filtro), Packs por categoría, Quién soy, Contacto

export default function ServicesSite() {
  const [page, setPage] = useState("services");       // services | packs | about | contact
  const [filter, setFilter] = useState("all");        // all | de | auto | web | biz
  const [selectedService, setSelectedService] = useState("");
  const [detail, setDetail] = useState(null);          // objeto servicio para modal
  const [demoTab, setDemoTab] = useState("visual");   // visual | video

  const categories = [
    { key: "all", label: "Todos" },
    { key: "de",  label: "Data Engineering" },
    { key: "auto",label: "Automatización" },
    { key: "web", label: "Diseño Web" },
    { key: "biz", label: "Estructura de empresa" },
  ];
  const catLabel = (k) => categories.find(c=>c.key===k)?.label || "";

  const allServices = [
    // Data Engineering
    { cat: "de", icon: Database, title: "Pipelines de datos", price: "desde 500€", desc: "ETL/ELT con Python/PySpark/CP4D, validaciones y documentación.", longDesc: "Ingesta desde 1–3 fuentes, limpieza y normalización, carga a destino (Sheet/DB/BI) y verificación de calidad.", demo: {type:"bars", data:[30,55,42,68,90], labels:["F1","F2","F3","Norm","BI"], videoUrl:""} },
    { cat: "de", icon: Layers,   title: "Capa analítica (BI)", price: "desde 900€", desc: "Modelo dimensional con KPIs listos para dashboards.", longDesc: "Diseño de hechos/dimensiones, definiciones de KPIs, documentación y ejemplo de dashboard.", demo: {type:"bars", data:[12,18,22,28,35], labels:["D1","D2","D3","D4","D5"], videoUrl:"https://www.youtube.com/embed/VIDEO_ID"} },

    // Automatización
    { cat: "auto", icon: Workflow, title: "Integraciones con n8n", price: "desde 200€", desc: "Conecta pagos, CRM y avisos sin código complejo.", longDesc: "Flujos entre pagos (Bizum/Stripe), Google Sheets, CRM y notificaciones (Telegram/WhatsApp) con logs y manejo de errores.", demo: {type:"flow", steps:["Pago","Sheets","Aviso"], videoUrl:""}},
    { cat: "auto", icon: Bot,      title: "Bot de reservas (WA/TG)", price: "desde 250€", desc: "FAQ + disponibilidad + reserva en agenda.", longDesc: "Bot que responde preguntas frecuentes y crea citas en Calendar/Fresha con confirmación automática.", demo: {type:"flow", steps:["Cliente","Bot","Agenda"], videoUrl:"https://player.vimeo.com/video/123456789"}},
    { cat: "auto", icon: Server,   title: "Reportes 08:00", price: "desde 150€", desc: "KPIs diarios en Sheet + alerta Telegram/WhatsApp.", longDesc: "Actualización diaria del dashboard y envío de resumen con ventas, tickets y top productos a las 08:00.", demo: {type:"bars", data:[120,180,90,220,150,210,175], labels:["L","M","X","J","V","S","D"], videoUrl:""}},

    // Diseño Web
    { cat: "web", icon: Globe, title: "Landing de captación", price: "desde 300€", desc: "SEO básico + formulario + deploy en Netlify.", longDesc: "Landing responsive con formulario, tracking UTM y guía de publicación.", demo: {type:"bars", data:[10,25,40,55,70], labels:["D1","D2","D3","D4","D5"], videoUrl:""}},
    { cat: "web", icon: MonitorSmartphone, title: "Web corporativa (3–5 secciones)", price: "desde 700€", desc: "Página moderna responsive con blog básico.", longDesc: "Arquitectura de la información, diseño limpio, SEO inicial y blog básico opcional.", demo: {type:"bars", data:[1,2,3,4,5], labels:["IA","UX","SEO","CMS","DEP"], videoUrl:"https://www.youtube.com/embed/VIDEO_ID"}},
    { cat: "web", icon: ShoppingCart, title: "Tienda online básica", price: "desde 400€", desc: "Catálogo mínimo, pagos y guía de envíos.", longDesc: "E‑commerce MVP con 10 productos, checkout integrado y pasos de envío.", demo: {type:"flow", steps:["Catálogo","Checkout","Pedido"], videoUrl:""}},

    // Estructura de empresa
    { cat: "biz", icon: Layout, title: "Mini‑CRM (Notion/Sheets)", price: "desde 120€", desc: "Leads, tareas y presupuestos con recordatorios.", longDesc: "CRM ligero con vistas, filtros y automatizaciones básicas para seguimiento.", demo: {type:"flow", steps:["Lead","Seguimiento","Cierre"], videoUrl:""}},
    { cat: "biz", icon: Settings2, title: "Operativa base", price: "desde 300€", desc: "Checklists + procesos esenciales + KPIs simples.", longDesc: "Definición de procesos clave, plantillas de documentos y KPIs operativos simples.", demo: {type:"bars", data:[60,70,80,90], labels:["Proc","Docs","KPIs","OKR"], videoUrl:""}},
  ];

  const packs = {
    de: [
      { name: "DE Starter", setup: "600€", monthly: "80€/mes", features: ["ETL 1 fuente", "Destino Sheet/DB", "Validación básica"] },
      { name: "DE Pro", setup: "1.200€", monthly: "140€/mes", features: ["2–3 fuentes", "Normalización", "Alertas"], featured: true },
      { name: "DE Enterprise", setup: "A medida", monthly: "A medida", features: ["Multi‑fuente + API", "Orquestación", "Observabilidad"] },
    ],
    auto: [
      { name: "Auto Starter", setup: "350€", monthly: "40€/mes", features: ["1 flujo n8n", "Avisos TG/WA", "Guía de uso"] },
      { name: "Auto Pro", setup: "700€", monthly: "90€/mes", features: ["2–3 flujos", "Logs/errores", "Soporte 2 semanas"], featured: true },
      { name: "Auto Business", setup: "A medida", monthly: "A medida", features: ["Integraciones API", "SLA soporte", "Monitorización"] },
    ],
    web: [
      { name: "Web One‑Page", setup: "300€", monthly: "Opcional", features: ["Landing", "Form + tracking", "Deploy Netlify"] },
      { name: "Web Pro", setup: "900€", monthly: "30€/mes", features: ["Web 3–5 secciones", "Blog básico", "SEO inicial"], featured: true },
      { name: "E‑commerce Básico", setup: "700€", monthly: "A medida", features: ["Catálogo mínimo", "Checkout", "Guía envíos"] },
    ],
    biz: [
      { name: "Empresa Base", setup: "300€", monthly: "Opcional", features: ["Mini‑CRM", "Plantillas presupuesto", "Checklist operativa"] },
      { name: "Empresa Pro", setup: "600€", monthly: "60€/mes", features: ["CRM + finanzas", "Recordatorios", "Dashboard básico"], featured: true },
      { name: "Empresa Ops+", setup: "A medida", monthly: "A medida", features: ["Workflows multi‑equipo", "Calendario", "KPIs operativos"] },
    ],
  };

  const filtered = filter === "all" ? allServices : allServices.filter(s => s.cat === filter);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-3 flex items-center justify-between">
          <a className="font-semibold tracking-tight" href="#" onClick={()=>setPage("services")}>TuNombre · Servicios</a>
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={()=>setPage("services")} className={`rounded-xl px-3 py-1 ${page==='services'?'bg-neutral-100':''}`}>Servicios</button>
            <button onClick={()=>setPage("packs")} className={`rounded-xl px-3 py-1 ${page==='packs'?'bg-neutral-100':''}`}>Packs</button>
            <button onClick={()=>setPage("about")} className={`rounded-xl px-3 py-1 ${page==='about'?'bg-neutral-100':''}`}>Quién soy</button>
            <button onClick={()=>setPage("contact")} className={`rounded-xl bg-neutral-900 px-3 py-1 font-medium text-white`}>Contacto</button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(135,212,119,0.35),transparent_60%),radial-gradient(60%_50%_at_80%_10%,rgba(83,30,127,0.30),transparent_55%)]"/>
        <div className="mx-auto max-w-7xl px-5 py-14 md:py-20">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-neutral-700">
              <Sparkles className="h-4 w-4 text-[#531e7f]"/> Paquetes claros · Demos reales · Pop‑up de detalles
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">
              Servicios y packs para <span className="bg-gradient-to-r from-[#531e7f] to-[#87d477] bg-clip-text text-transparent">ahorrar tiempo</span> y escalar
            </h1>
            <p className="mt-3 max-w-2xl text-neutral-700">Filtra por categoría, abre el detalle de cada servicio y revisa la demo visual o en vídeo.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-700">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Precios visibles</span>
              <span className="inline-flex items-center gap-2"><Star className="h-4 w-4"/> Plazos definidos</span>
              <span className="inline-flex items-center gap-2"><Layers className="h-4 w-4"/> Entregables incluidos</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES TAB */}
      {page === 'services' && (
        <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
          {/* Filtro por categoría */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c)=> (
              <button key={c.key} onClick={()=>setFilter(c.key)} className={`rounded-2xl border px-4 py-2 text-sm ${filter===c.key? 'bg-neutral-900 text-white border-neutral-900' : 'hover:bg-neutral-50'}`}>
                {c.label}
              </button>
            ))}
          </div>

          {/* Grid de servicios */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i)=> (
              <motion.div key={`${s.title}-${i}`} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.35, delay:0.05*i}} className="rounded-2xl border bg-white p-5 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-neutral-700"/>
                    <h3 className="text-lg font-medium">{s.title}</h3>
                  </div>
                  <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-white">{catLabel(s.cat)}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-700">{s.desc}</p>
                <div className="mt-2 text-sm font-medium">{s.price}</div>
                {/* Demo mini */}
                <div className="mt-4 rounded-xl border p-4">
                  <div className="mb-2 text-xs text-neutral-500">Demo</div>
                  <Demo viz={s.demo}/>
                </div>
                <div className="mt-5 flex gap-2">
                  <a href="#contact" onClick={()=>setSelectedService(`${catLabel(s.cat)} · ${s.title}`)} className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50">
                    Pedir este servicio
                  </a>
                  <button onClick={()=>{ setDetail(s); setDemoTab(s.demo?.videoUrl? 'video' : 'visual'); }} className="inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:opacity-90">
                    Ver detalle
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* PACKS BY CATEGORY */}
      {page === 'packs' && (
        <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
          {["de","auto","web","biz"].map((key)=> (
            <div key={key} className="mt-12 first:mt-0">
              <div className="flex items-center gap-2">
                {key === 'de' && <Server className="h-5 w-5"/>}
                {key === 'auto' && <Settings2 className="h-5 w-5"/>}
                {key === 'web' && <Globe className="h-5 w-5"/>}
                {key === 'biz' && <Building2 className="h-5 w-5"/>}
                <h2 className="text-2xl md:text-3xl font-semibold">Packs — {categories.find(c=>c.key===key)?.label}</h2>
              </div>
              <p className="mt-2 text-neutral-700">Selecciona un pack para empezar rápido. Todo escalable a medida.</p>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {packs[key].map((p, i)=> (
                  <div key={i} className={`rounded-2xl border p-5 ${p.featured ? 'border-[#531e7f] ring-2 ring-[#531e7f] ring-offset-2 ring-offset-white' : ''}`}>
                    {p.featured && <div className="mb-2 inline-flex items-center rounded-full bg-[#531e7f] px-2 py-0.5 text-xs text-white">Destacado</div>}
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-lg font-medium">{p.name}</h4>
                      <span className="text-sm text-neutral-700">Setup: {p.setup}</span>
                    </div>
                    <div className="mt-1 text-sm text-neutral-700">Mensual: {p.monthly}</div>
                    <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                      {p.features.map((f,idx)=>(
                        <li key={idx} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#87d477]"/> {f}</li>
                      ))}
                    </ul>
                    <a href="#contact" onClick={()=>setSelectedService(`Pack ${categories.find(c=>c.key===key)?.label} · ${p.name}`)} className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90">Seleccionar pack</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ABOUT */}
      {page === 'about' && (
        <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div className="md:col-span-1 rounded-2xl border bg-white p-6">
              <h2 className="text-2xl font-semibold">Quién soy</h2>
              <p className="mt-3 text-neutral-700">Data Engineer y consultor de automatización. Diseño pipelines, integro sistemas con n8n y creo dashboards y herramientas simples que ahorran tiempo real a negocios.</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li><Check className="inline h-4 w-4 text-[#531e7f]"/> ETL (Python, PySpark, CP4D)</li>
                <li><Check className="inline h-4 w-4 text-[#531e7f]"/> n8n, APIs, Telegram/WhatsApp</li>
                <li><Check className="inline h-4 w-4 text-[#531e7f]"/> React, Sheets/Notion</li>
              </ul>
            </div>
            <div className="md:col-span-2 rounded-2xl border bg-white p-6">
              <h3 className="text-lg font-medium">Cómo trabajo</h3>
              <ol className="mt-3 space-y-3 text-neutral-700">
                <li><strong>1) Descubrimiento.</strong> Llamada gratis para entender objetivos.</li>
                <li><strong>2) Propuesta.</strong> Alcance, plazos y presupuesto cerrados.</li>
                <li><strong>3) Entrega.</strong> Implementación + guía de uso.</li>
                <li><strong>4) Soporte.</strong> Opcional por horas o bolsa mensual.</li>
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {(page === 'contact' || true) && (
        <section id="contact" className="mx-auto max-w-2xl px-5 pb-20">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Pide tu propuesta</h2>
            <p className="mt-2 text-neutral-700">Respondo en 24–48h laborables.</p>
            <form className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm">Nombre</label>
                <input className="w-full rounded-xl border px-3 py-2 outline-none focus:border-neutral-500" placeholder="Tu nombre"/>
              </div>
              <div className="grid gap-2">
                <label className="text-sm">Email</label>
                <input className="w-full rounded-xl border px-3 py-2 outline-none focus:border-neutral-500" placeholder="tu@email.com"/>
              </div>
              <div className="grid gap-2">
                <label className="text-sm">Servicio o pack</label>
                <input value={selectedService} onChange={(e)=>setSelectedService(e.target.value)} className="w-full rounded-xl border px-3 py-2 outline-none focus:border-neutral-500" placeholder="Ej: Pack Web Pro"/>
              </div>
              <div className="grid gap-2">
                <label className="text-sm">Mensaje</label>
                <textarea className="min-h-28 w-full rounded-xl border px-3 py-2 outline-none focus:border-neutral-500" placeholder="Cuéntame brevemente tu caso"/>
              </div>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-5 py-3 font-medium text-white hover:opacity-90">
                Enviar solicitud <ArrowRight className="h-4 w-4"/>
              </button>
              <p className="text-xs text-neutral-500">*Demo: conecta tu endpoint (Netlify Forms, n8n, Formspree, etc.).</p>
            </form>
          </div>
        </section>
      )}

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 text-sm text-neutral-600">
          © {new Date().getFullYear()} — Servicios de Data Engineering, Automatización y Diseño Web.
        </div>
      </footer>

      {/* MODAL DETALLE — pantalla grande con demo (visual o vídeo) */}
      {detail && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center" onClick={()=>setDetail(null)}>
          <div className="w-full max-w-5xl h-[80vh] overflow-hidden rounded-2xl border bg-white" onClick={(e)=>e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-3">
              <div>
                <div className="text-xs text-neutral-500">{catLabel(detail.cat)}</div>
                <h3 className="text-xl font-semibold">{detail.title}</h3>
              </div>
              <button onClick={()=>setDetail(null)} className="rounded-xl border px-3 py-1 text-sm hover:bg-neutral-50">Cerrar</button>
            </div>
            {/* Body */}
            <div className="grid h-[calc(80vh-56px)] grid-rows-1 md:grid-cols-2">
              {/* Descripción detallada */}
              <div className="overflow-auto p-5">
                <h4 className="text-sm font-medium text-neutral-600">Descripción detallada</h4>
                <p className="mt-2 text-neutral-800">{detail.longDesc || detail.desc}</p>
                <div className="mt-4 text-sm text-neutral-700">
                  <div className="font-medium">Incluye:</div>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#531e7f]"/> Alcance definido y entregables claros</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#531e7f]"/> Puesta en marcha y guía de uso</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#531e7f]"/> Opcional: soporte mensual</li>
                  </ul>
                </div>
                <div className="mt-6 rounded-xl border bg-neutral-50 p-4">
                  <div className="text-sm text-neutral-600">Precio estimado</div>
                  <div className="mt-1 text-2xl font-semibold">{detail.price}</div>
                </div>
                <div className="mt-6 flex gap-2">
                  <a href="#contact" onClick={()=>{ setSelectedService(`${catLabel(detail.cat)} · ${detail.title}`); setDetail(null); }} className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90">Pedir este servicio</a>
                  <button onClick={()=>setDetail(null)} className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50">Cerrar</button>
                </div>
              </div>
              {/* Demo window */}
              <div className="border-l p-5">
                <div className="flex items-center gap-2 text-sm">
                  <button onClick={()=>setDemoTab('visual')} className={`rounded-xl border px-3 py-1 ${demoTab==='visual' ? 'border-[#531e7f] bg-neutral-50' : 'hover:bg-neutral-50'}`}>Visual</button>
                  <button onClick={()=>setDemoTab('video')} className={`rounded-xl border px-3 py-1 ${demoTab==='video' ? 'border-[#531e7f] bg-neutral-50' : 'hover:bg-neutral-50'}`}>Vídeo</button>
                </div>
                <div className="mt-3 h-[calc(100%-40px)] rounded-xl border p-4">
                  {demoTab === 'visual' && <DemoLarge viz={detail.demo} />}
                  {demoTab === 'video' && <VideoEmbed url={detail.demo?.videoUrl} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Demo({ viz }) {
  if (!viz) return null;
  if (viz.type === 'bars') {
    const max = Math.max(...viz.data, 1);
    return (
      <div className="flex items-end gap-2 h-32 w-full">
        {viz.data.map((v, i)=> (
          <div key={i} className="flex-1 rounded-t bg-neutral-800" style={{ height: `${(v/max)*100}%` }} title={`${viz.labels?.[i]||''}: ${v}`}/>
        ))}
      </div>
    );
  }
  if (viz.type === 'flow') {
    return (
      <div className="flex items-center justify-between gap-2">
        {viz.steps.map((s,i)=> (
          <div key={i} className="flex items-center gap-2">
            <div className="rounded-xl border bg-white px-3 py-2 text-sm">{s}</div>
            {i < viz.steps.length-1 && <span>→</span>}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function DemoLarge({ viz }) {
  if (!viz) return null;
  if (viz.type === 'bars') {
    const max = Math.max(...viz.data, 1);
    return (
      <div className="flex items-end gap-3 h-full min-h-[220px]">
        {viz.data.map((v, i)=> (
          <div key={i} className="flex-1 rounded-t bg-neutral-700" style={{ height: `${(v/max)*100}%` }} title={`${viz.labels?.[i]||''}: ${v}`}/>
        ))}
      </div>
    );
  }
  if (viz.type === 'flow') {
    return (
      <div className="flex h-full items-center justify-center gap-3">
        {viz.steps.map((s,i)=> (
          <div key={i} className="flex items-center gap-3 text-sm">
            <div className="rounded-xl border bg-white px-4 py-2">{s}</div>
            {i < viz.steps.length-1 && <span className="text-neutral-500">→</span>}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function VideoEmbed({ url }) {
  if (!url) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center text-sm text-neutral-500">
        Inserta la URL del vídeo (YouTube/Vimeo) en <code>demo.videoUrl</code> del servicio.
      </div>
    );
  }
  const isYT = url.includes('youtube') || url.includes('youtu.be');
  const isVimeo = url.includes('vimeo');
  return (
    <div className="relative h-full">
      {isYT || isVimeo ? (
        <iframe
          src={url}
          title="Demo video"
          className="absolute inset-0 h-full w-full rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <video controls className="absolute inset-0 h-full w-full rounded-lg">
          <source src={url} />
          Tu navegador no soporta el vídeo HTML5.
        </video>
      )}
    </div>
  );
}
