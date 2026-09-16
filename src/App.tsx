import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { hubs, worries, situations, tools, talk, t, type Path, type Lang } from "./data";

type View = "home" | "understand" | "topic" | "navigate" | "engage";
const HELP = "#E8735A";
const NAVY = "#1F3A44";
const GOLD = "#F2C744";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [path, setPath] = useState<Path>("parent");
  const [lang, setLang] = useState<Lang>("en");
  const [age, setAge] = useState("13-17");
  const [helpOpen, setHelpOpen] = useState(false);
  const [sit, setSit] = useState("pressure");
  const [tool, setTool] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);
  const [events, setEvents] = useState(0);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const s = t[lang];
  const track = () => setEvents((n) => n + 1);

  const go = (v: View) => { setView(v); track(); window.scrollTo({ top: 0 }); };
  const openHelp = (k?: string) => { if (k) setSit(k); setHelpOpen(true); track(); };
  const openTool = (i: number) => { setTool(i); track(); };
  const pickWorry = (w: (typeof worries)[number]) => {
    if (w.help) return openHelp(w.help);
    if (w.tool !== undefined) return openTool(w.tool);
    go("topic");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? worries.filter((w) => w[lang].toLowerCase().includes(q)) : worries;
  }, [query, lang]);

  const active = (v: View) => view === v || (v === "understand" && view === "topic");
  const current = situations.find((q) => q.k === sit)!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-[#1F3A44] text-center text-[11px] font-bold tracking-[.2em] uppercase py-1.5" style={{ color: GOLD }}>
        Digital safety through the lens of family wellness
      </div>
      <header className="sticky top-0 z-10 bg-[#F4EFE3]/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex items-center justify-between py-3 gap-3">
            <button onClick={() => go("home")} className="flex items-center gap-3 text-left">
              <span className="h-11 w-11 rounded-full grid place-items-center" style={{ background: "#DCE7E2", color: NAVY }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22v-6"/><path d="M8 22h8"/><path d="M12 16c-3.6 0-6-2-6-5 0-1.6.8-3 2-3.8C8.2 5 9.9 3 12 3s3.8 2 4 4.2c1.2.8 2 2.2 2 3.8 0 3-2.4 5-6 5z"/></svg>
              </span>
              <span className="leading-tight">
                <span className="display block text-xl" style={{ fontWeight: 700 }}>Evolving Lives</span>
                <span className="block text-[9px] font-bold tracking-[.18em] uppercase text-muted-foreground">Digital Safety &amp; Family Wellness</span>
              </span>
            </button>
            <nav className="hidden sm:flex gap-7">
              {(["understand", "navigate", "engage"] as View[]).map((v) => (
                <button key={v} onClick={() => go(v)}
                  className={`text-[15px] font-medium border-b-2 pb-0.5 transition-colors ${active(v) ? "border-[#E8735A]" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                  {s[v]}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Seg value={path} onChange={(v) => { setPath(v); track(); }} items={[["parent", s.parent], ["youth", s.youth]]} />
              <Seg value={lang} onChange={(v) => { setLang(v); track(); }} items={[["en", "EN"], ["es", "ES"]]} />
            </div>
          </div>
          <nav className="flex sm:hidden gap-6 -mb-px">
            {(["understand", "navigate", "engage"] as View[]).map((v) => (
              <button key={v} onClick={() => go(v)}
                className={`py-2 text-[15px] font-medium border-b-2 transition-colors ${active(v) ? "border-[#E8735A] text-foreground" : "border-transparent text-muted-foreground"}`}>
                {s[v]}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-16">
        {view === "home" && (
          <>
            <section className="navy text-[#F4EFE3] w-screen relative left-1/2 -translate-x-1/2 px-5">
              <div className="mx-auto max-w-5xl py-16 sm:py-24 grid gap-10 md:grid-cols-[1.1fr_1fr] items-center">
                <div>
                  <p className="eyebrow">{lang === "es" ? "Bienestar familiar, hecho práctico" : "Family wellness, made practical"}</p>
                  <h1 className="display mt-6 text-5xl sm:text-6xl md:text-7xl">
                    {lang === "es" ? "¿Qué te" : "What's on"}<br />
                    <em style={{ color: GOLD }}>{lang === "es" ? "preocupa?" : "your mind?"}</em>
                  </h1>
                  <p className="mt-6 text-lg max-w-[42ch] text-[#F4EFE3]/85">{s.lede}</p>
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={s.placeholder}
                    className="mt-8 w-full bg-[#F4EFE3] text-foreground rounded-full px-6 py-4 text-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F2C744]/60" />
                </div>
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl" style={{ background: HELP }} />
                  <div className="relative rounded-2xl border-4 border-[#F4EFE3] bg-[#2A4A55] aspect-[4/3] grid place-items-center text-center px-8">
                    <div>
                      <p className="eyebrow justify-center">Understand · Navigate · Engage</p>
                      <p className="display text-[#F4EFE3] text-3xl mt-4">Learn it. Act on it.<br /><em style={{ color: GOLD }}>Talk to someone.</em></p>
                      <p className="mt-4 text-sm text-[#F4EFE3]/70">Photo of South Florida families goes here</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mx-auto max-w-5xl pt-14">
              <p className="eyebrow dark">{s.suggestions}</p>
              <ul className="mt-6 divide-y divide-border border-t border-b border-border max-w-3xl">
                {filtered.map((w) => (
                  <li key={w.en}>
                    <button onClick={() => pickWorry(w)} className="w-full flex items-center justify-between gap-4 py-4 text-left group">
                      <span className="display text-xl group-hover:underline underline-offset-4 decoration-[#E8735A] decoration-2" style={{ fontWeight: 700 }}>{w[lang]}</span>
                      <span className="text-[11px] font-bold tracking-[.15em] uppercase whitespace-nowrap" style={{ color: w.help ? HELP : undefined }}>
                        {w.help ? s.help : w.tool !== undefined ? s.navigate : s.understand}
                      </span>
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="py-4 text-muted-foreground">
                    <button onClick={() => go("understand")} className="underline underline-offset-4">Nothing matched. Browse all nine topics.</button>
                  </li>
                )}
              </ul>
            </section>
          </>
        )}

        {view === "understand" && (
          <section className="pt-14 max-w-3xl">
            <p className="eyebrow dark">{s.understand}</p><h2 className="display mt-4 text-4xl sm:text-5xl">{lang === "es" ? <>Aprende lo que <em style={{ color: HELP }}>importa.</em></> : <>Learn what <em style={{ color: HELP }}>matters.</em></>}</h2>
            <p className="mt-2 text-muted-foreground max-w-[56ch]">{s.uk}</p>
            <ul className="mt-8 divide-y divide-border border-t border-b border-border">
              {hubs.map((h) => (
                <li key={h.n}>
                  <button onClick={() => go("topic")} className="w-full py-4 text-left group">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="display text-xl group-hover:underline underline-offset-4 decoration-[#E8735A] decoration-2" style={{ fontWeight: 700 }}>{h.n}</span>
                      <span className="text-[11px] font-bold tracking-[.15em] uppercase text-muted-foreground whitespace-nowrap">{h.full ? s.full : s.quick}</span>
                    </div>
                    <span className="block mt-0.5 text-muted-foreground">{path === "parent" ? h.p : h.y}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {view === "topic" && (
          <article className="pt-14 max-w-3xl">
            <button onClick={() => go("understand")} className="inline-flex items-center gap-2 rounded-full border-2 border-[#1F3A44] px-4 py-2 text-sm font-bold hover:bg-[#1F3A44] hover:text-[#F4EFE3] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              {s.back}
            </button>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <span>Sleep, Attention &amp; Compulsive Use</span>
              <span>·</span>
              <label className="flex items-center gap-1">{s.ages}
                <select value={age} onChange={(e) => setAge(e.target.value)} className="bg-transparent border-0 underline underline-offset-4 text-foreground">
                  <option>0-5</option><option>6-9</option><option>10-12</option><option>13-17</option>
                </select>
              </label>
            </div>
            <h2 className="display mt-3 text-4xl sm:text-5xl max-w-[18ch]">Why is it so hard to <em style={{ color: HELP }}>put down?</em></h2>

            <div className="mt-10 space-y-10 max-w-[64ch] text-[17px] leading-relaxed">
              <Q h="What's happening?">
                <p>Many apps are built to remove natural stopping points. Infinite scroll, autoplay, notifications, streaks, follower counts, and short video all keep the next thing arriving before you decide whether you want it.</p>
                <p>That is design, not weakness. A teen who struggles to stop is responding to a product that was tested to be hard to stop.</p>
              </Q>
              <Q h="Why does it matter?">
                <p>General social media use is linked to only small average differences in mood. Compulsive use is a different story: it is more consistently tied to poorer sleep and mental health, and lost sleep affects attention, mood, and school the next day.</p>
                <p>Heavy use can also be a signal rather than the cause. Anxiety, loneliness, or avoiding something hard can all push a young person toward the phone.</p>
              </Q>
              <Q h="What can I do today?">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Turn off autoplay and non-essential notifications together, on their phone and on yours.</li>
                  <li>Agree on one device-free window that protects sleep. Chargers outside bedrooms is the simplest version.</li>
                  <li>Ask what the phone is doing for them before asking them to stop.</li>
                </ol>
              </Q>
              <Q h="What should I watch for?">
                <dl className="space-y-4">
                  <Sig k="Normal high engagement">Very into it, but still sleeping, attending school, keeping friendships, and able to stop when needed.</Sig>
                  <Sig k="Crowding out healthy things">Use is replacing sleep, exercise, homework, hobbies, or family time.</Sig>
                  <Sig k="Problematic or compulsive use">Repeatedly cannot stop, keeps going despite clear consequences, or becomes very distressed when access is limited.</Sig>
                  <Sig k="May reflect another concern">Heavy use alongside withdrawal, sadness, bullying, or sudden mood changes. A reason to get support, not to punish.</Sig>
                </dl>
              </Q>
              <Q h="Where can I get help?">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Pediatrician or family doctor, especially if sleep has changed.</li>
                  <li>School counselor if school is being affected.</li>
                  <li>A licensed professional through the Q&amp;A or a referral partner. <button onClick={() => go("engage")} className="underline underline-offset-4 decoration-[#E8735A] decoration-2">{s.ask}</button></li>
                </ul>
              </Q>
              <Q h="How do I talk about it?">
                <p className="italic">{talk[path]}</p>
              </Q>
            </div>
            <p className="mt-12 pt-4 border-t border-border text-sm text-muted-foreground">Reviewed by a licensed clinician · Sources: AAP, APA, Digital Wellness Lab · Updated September 2026 · No sponsor involvement in this content.</p>
            <button onClick={() => go("understand")} className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#1F3A44] px-4 py-2 text-sm font-bold hover:bg-[#1F3A44] hover:text-[#F4EFE3] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              {s.back}
            </button>
          </article>
        )}

        {view === "navigate" && (
          <section className="pt-14 max-w-3xl">
            <p className="eyebrow dark">{s.navigate}</p><h2 className="display mt-4 text-4xl sm:text-5xl">{lang === "es" ? <>Decide qué <em style={{ color: HELP }}>hacer.</em></> : <>Decide what <em style={{ color: HELP }}>to do.</em></>}</h2>
            <p className="mt-2 text-muted-foreground max-w-[56ch]">{s.nk}</p>
            <ul className="mt-8 divide-y divide-border border-t border-b border-border">
              {tools.map((tl, i) => (
                <li key={tl.n}>
                  <button onClick={() => openTool(i)} className="w-full py-4 text-left group flex items-baseline justify-between gap-4">
                    <span>
                      <span className="display text-xl group-hover:underline underline-offset-4 decoration-[#E8735A] decoration-2" style={{ fontWeight: 700 }}>{tl.n}</span>
                      <span className="block mt-0.5 text-muted-foreground">{tl.d}</span>
                    </span>
                    <span className="text-[11px] font-bold tracking-[.15em] uppercase text-muted-foreground whitespace-nowrap">{tl.body ? s.print : s.quick}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => openHelp()} className="mt-10 text-left">
              <span className="display block text-xl" style={{ fontWeight: 700 }}>{s.helpTitle}</span>
              <span className="text-muted-foreground">Step-by-step guidance for the four situations families call about most.</span>
            </button>
          </section>
        )}

        {view === "engage" && (
          <section className="pt-14 max-w-3xl">
            <p className="eyebrow dark">{s.engage}</p><h2 className="display mt-4 text-4xl sm:text-5xl">{lang === "es" ? <>Habla con <em style={{ color: HELP }}>alguien.</em></> : <>Talk to <em style={{ color: HELP }}>someone.</em></>}</h2>
            <p className="mt-2 text-muted-foreground max-w-[56ch]">{s.ek}</p>
            <ul className="mt-8 divide-y divide-border border-t border-b border-border">
              <Row a="Q&A" b="Ask a licensed professional" c="Questions are answered in plain language and published without identifying details." />
              <Row a="Workshops" b="Parent and youth sessions" c="In person and online, in English and Spanish, across South Florida." />
              <Row a="Schools" b="PTA and school presentations" c="Extends what Florida schools already teach into the home." />
              <Row a="Referrals" b="Trusted local and national partners" c="Clear pathways to clinicians, community organizations, and reporting agencies." />
            </ul>
            <div className="mt-10 max-w-[56ch]">
              <label htmlFor="q" className="block font-bold">{s.ask}</label>
              <Textarea id="q" className="mt-2 bg-white min-h-28 text-base" placeholder="Describe what you are seeing, in your own words. No names needed." />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <select className="bg-white border border-border rounded-md px-3 py-2 text-sm"><option>{s.parent}</option><option>{s.youth}</option><option>Educator</option></select>
                <select className="bg-white border border-border rounded-md px-3 py-2 text-sm"><option>{s.ages} 0-5</option><option>{s.ages} 6-9</option><option>{s.ages} 10-12</option><option>{s.ages} 13-17</option></select>
                <button onClick={() => { setSent(true); track(); }} className="cta rounded-full px-5 py-2.5">{s.send}</button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.askHint}</p>
              {sent && <p className="mt-3 text-sm font-bold">{s.sent}</p>}
            </div>
          </section>
        )}
      </main>

      <footer className="mx-auto max-w-5xl px-5 pb-28 text-xs text-muted-foreground">
        Version 1 prototype · {events} interactions logged this session (prototype only, nothing leaves the page)
      </footer>

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
        className={`fixed bottom-5 left-5 z-20 h-12 w-12 rounded-full grid place-items-center border-2 border-[#F4EFE3] shadow-lg shadow-black/20 transition-all duration-200 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
        style={{ background: NAVY, color: GOLD, boxShadow: "0 0 0 2px #1F3A44, 0 10px 15px -3px rgba(0,0,0,.2)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
      </button>

      <button onClick={() => openHelp()}
        className="cta fixed bottom-5 right-5 z-20 rounded-full px-6 py-3.5 shadow-lg shadow-black/20">
        {s.help}
      </button>

      <Sheet open={helpOpen} onOpenChange={setHelpOpen}>
        <SheetContent side="bottom" className="max-h-[92vh] overflow-y-auto rounded-t-2xl sm:max-w-3xl sm:mx-auto bg-background">
          <SheetHeader className="text-left">
            <SheetTitle className="display text-3xl">{s.helpTitle}</SheetTitle>
          </SheetHeader>
          <div className="mt-3 rounded-xl p-4 text-[#F4EFE3]" style={{ background: NAVY }}>
            <p className="display text-lg" style={{ color: GOLD, fontWeight: 700 }}>{s.calm1}</p>
            <p className="text-sm text-[#F4EFE3]/80">{s.calm2}</p>
          </div>
          <p className="mt-6 font-bold">{s.what}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {situations.map((x) => (
              <button key={x.k} onClick={() => { setSit(x.k); track(); }} aria-pressed={sit === x.k}
                className={`rounded-full border px-3 py-1.5 text-sm ${sit === x.k ? "bg-foreground text-white border-foreground" : "bg-white border-border"}`}>
                {x.label}
              </button>
            ))}
          </div>
          <ol className="mt-6 divide-y divide-border border-t border-b border-border">
            {current.steps.map(([b, p], i) => (
              <li key={b} className="grid grid-cols-[28px_1fr] gap-3 py-3">
                <span style={{ background: HELP, color: NAVY }} className="h-7 w-7 rounded-full text-sm font-bold grid place-items-center">{i + 1}</span>
                <div><p className="font-bold">{b}</p><p className="text-sm text-muted-foreground">{p}</p></div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[11px] font-bold tracking-[.18em] uppercase" style={{ color: HELP }}>{s.where}</p>
          <ul className="mt-1 list-disc pl-5 space-y-1">{current.route.map((r) => <li key={r}>{r}</li>)}</ul>
          <p className="mt-6 text-sm text-muted-foreground">{s.emerg}</p>
        </SheetContent>
      </Sheet>

      <Dialog open={tool !== null} onOpenChange={(o) => !o && setTool(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-background">
          {tool !== null && (
            <>
              <DialogHeader><DialogTitle className="display text-3xl">{tools[tool].n}</DialogTitle></DialogHeader>
              {tools[tool].body ? (
                <div className="space-y-6">
                  {tools[tool].body!.map((b) => (
                    <div key={b.h}>
                      <p className="font-bold">{b.h}</p>
                      {b.p && <p className="mt-1 text-muted-foreground">{b.p}</p>}
                      {b.items && <ul className="mt-2 list-disc pl-5 space-y-1.5">{b.items.map((i) => <li key={i}>{i}</li>)}</ul>}
                      {b.lines && Array.from({ length: b.lines }).map((_, i) => <div key={i} className="mt-3 h-7 border-b border-foreground" />)}
                    </div>
                  ))}
                  <button onClick={() => window.print()} className="cta rounded-full px-5 py-2.5">{s.print}</button>
                </div>
              ) : (
                <p className="text-muted-foreground">{s.stub}</p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Seg<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: [T, string][] }) {
  return (
    <div className="inline-flex rounded-full border border-border bg-white p-0.5 text-sm">
      {items.map(([v, l]) => (
        <button key={v} onClick={() => onChange(v)} aria-pressed={value === v}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${value === v ? "bg-[#1F3A44] text-[#F4EFE3]" : "text-muted-foreground hover:text-foreground"}`}>
          {l}
        </button>
      ))}
    </div>
  );
}
function Q({ h, children }: { h: string; children: ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[180px_1fr] gap-2 sm:gap-8">
      <h3 className="text-[11px] font-bold tracking-[.18em] uppercase sm:pt-2" style={{ color: HELP }}>{h}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function Sig({ k, children }: { k: string; children: ReactNode }) {
  return (<div><dt className="font-bold">{k}</dt><dd className="text-muted-foreground">{children}</dd></div>);
}
function Row({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <li className="py-4 grid sm:grid-cols-[110px_1fr] gap-1 sm:gap-6">
      <span className="text-[11px] font-bold tracking-[.18em] uppercase pt-1" style={{ color: HELP }}>{a}</span>
      <span><span className="display text-xl" style={{ fontWeight: 700 }}>{b}</span><span className="block text-muted-foreground">{c}</span></span>
    </li>
  );
}
