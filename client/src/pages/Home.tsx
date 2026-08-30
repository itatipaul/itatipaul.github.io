/*
 * Quiet Command Center / Home page
 * Swiss-influenced enterprise case study: paper-white surfaces, ink navy,
 * signal blue actions, monospace evidence labels, and asymmetric rail-led flow.
 */
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Bug,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Database,
  Filter,
  ListFilter,
  FileText,
  Minus,
  Plus,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Radar,
  Search,
  ShieldCheck,
  TerminalSquare,
  X,
} from "lucide-react";
import catalogue from "@/repositoryContent.json";

const tracks = [
  {
    number: "01",
    name: "Offensive Security",
    shortName: "Offensive",
    icon: Bug,
    description: "Web, service, and application-level attack surfaces documented from first probe to solution path.",
    examples: "ORMT · rEquestria · WebBasics",
    path: "/tree/main/1.%20Offensive%20Security",
    tone: "blue",
  },
  {
    number: "02",
    name: "Cryptography",
    shortName: "Crypto",
    icon: LockKeyhole,
    description: "Encoding layers, flawed constructions, elliptic-curve puzzles, and RSA-focused reasoning.",
    examples: "Layers of Encoding · Goldilocs · RSA",
    path: "/tree/main/2.%20Cryptography",
    tone: "navy",
  },
  {
    number: "03",
    name: "OSINT",
    shortName: "OSINT",
    icon: Search,
    description: "Open-source investigation work across targets, lore, travellers, and contextual clues.",
    examples: "Target · Travellers · Lore of the World",
    path: "/tree/main/3.%20OSINT",
    tone: "gold",
  },
  {
    number: "04",
    name: "Forensics",
    shortName: "Forensics",
    icon: Radar,
    description: "Signals, telemetry, volatile incidents, and disk-based evidence organised as inspectable artefacts.",
    examples: "SPAN sniff · Telemetry · Diskbasics",
    path: "/tree/main/4.%20Forensics",
    tone: "blue",
  },
  {
    number: "05",
    name: "Malware Analysis",
    shortName: "Malware",
    icon: ShieldCheck,
    description: "Reverse-engineering and behaviour-oriented challenge material, including payload and executable analysis.",
    examples: "Flappy · Shifted Payload · Reversing",
    path: "/tree/main/5.%20Malware%20Analysis",
    tone: "navy",
  },
] as const;

const evidence = [
  {
    number: "A1",
    label: "OFFENSIVE SECURITY / ORMT",
    title: "Reading the application boundary",
    summary: "A focused set of challenge folders, exploit scripts, timing tests, and write-ups around ORM injection paths.",
    path: "/tree/main/1.%20Offensive%20Security/8.%20ORMT",
    icon: Network,
    tone: "blue",
  },
  {
    number: "A2",
    label: "CRYPTOGRAPHY / SANITY CHECK",
    title: "Separating signal from encoding",
    summary: "A compact crypto track spanning layered encodings, custom encryption, and an explicit solver artifact.",
    path: "/tree/main/2.%20Cryptography/1.%20Crypto%20Sanity%20Check",
    icon: LockKeyhole,
    tone: "navy",
  },
  {
    number: "A3",
    label: "OSINT / TARGET",
    title: "Turning public traces into a lead",
    summary: "Challenge notes are paired with Markdown and PDF write-up formats, making the investigation easy to inspect.",
    path: "/tree/main/3.%20OSINT/1.%20Target",
    icon: Search,
    tone: "gold",
  },
  {
    number: "A4",
    label: "FORENSICS / TELEMETRY",
    title: "Keeping the artefacts close",
    summary: "Forensics is represented as a dedicated challenge family with evidence-oriented folders ready for deeper review.",
    path: "/tree/main/4.%20Forensics/4.%20Telemetry",
    icon: Activity,
    tone: "blue",
  },
  {
    number: "A5",
    label: "MALWARE ANALYSIS / REVERSING",
    title: "Following behaviour through the binary",
    summary: "The archive includes a malware-analysis track with reversing, payload, and real-world themed challenge folders.",
    path: "/tree/main/5.%20Malware%20Analysis/6.Reversing",
    icon: Braces,
    tone: "navy",
  },
] as const;

function githubRawUrl(path: string) {
  return `https://raw.githubusercontent.com/itatipaul/SK-CERT-CYBERGAME-2026/main/${path.split("/").map(encodeURIComponent).join("/")}`;
}

function scrollToSection(id: string, setMobileOpen?: (open: boolean) => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  setMobileOpen?.(false);
}


export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState("all");
  const [showAllEvidence, setShowAllEvidence] = useState(false);
  const [catalogueQuery, setCatalogueQuery] = useState("");
  const [catalogueFamily, setCatalogueFamily] = useState("all");
  const [catalogueStatus, setCatalogueStatus] = useState("all");
  const [selectedChallenge, setSelectedChallenge] = useState<(typeof catalogue.challenges)[number] | null>(null);
  const [copiedFlag, setCopiedFlag] = useState<string | null>(null);
  const [textSize, setTextSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [highContrast, setHighContrast] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);
  const [imageZoom, setImageZoom] = useState(1);

  useEffect(() => {
    if (!selectedChallenge && !selectedImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedImage) setSelectedImage(null);
        else setSelectedChallenge(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedChallenge, selectedImage]);

  const filteredEvidence = useMemo(() => {
    if (activeTrack === "all") return evidence;
    const selected = tracks.find((track) => track.number === activeTrack);
    if (!selected) return evidence;
    return evidence.filter((item) => item.label.toLowerCase().startsWith(selected.shortName.toLowerCase()) || item.label.toLowerCase().startsWith(selected.name.split(" ")[0].toLowerCase()));
  }, [activeTrack]);

  const visibleEvidence = showAllEvidence ? filteredEvidence : filteredEvidence.slice(0, 3);
  const filteredChallenges = useMemo(() => {
    const query = catalogueQuery.trim().toLowerCase();
    return catalogue.challenges.filter((challenge) => {
      const matchesQuery = !query || `${challenge.title} ${challenge.family} ${challenge.path}`.toLowerCase().includes(query);
      const matchesFamily = catalogueFamily === "all" || challenge.family === catalogueFamily;
      const matchesStatus = catalogueStatus === "all" || (catalogueStatus === "documented" ? challenge.writeupAvailable : !challenge.writeupAvailable);
      return matchesQuery && matchesFamily && matchesStatus;
    });
  }, [catalogueFamily, catalogueQuery, catalogueStatus]);

  return (
    <div className="site-shell">
      <header className="mobile-header">
        <a className="brand" href="#top" onClick={() => scrollToSection("top")} aria-label="SK-CERT CyberGame showcase home">
          <span className="brand-mark brand-mark-small"><img src="/manus-storage/sk-cybergame-mark_93b44f18.png" alt="" /></span>
          <span className="brand-wordmark">SK / CYBERGAME</span>
        </a>
        <button className="mobile-menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <button onClick={() => scrollToSection("overview", setMobileOpen)}>Overview <ChevronRight size={16} /></button>
            <button onClick={() => scrollToSection("tracks", setMobileOpen)}>Challenge families <ChevronRight size={16} /></button>
            <button onClick={() => scrollToSection("catalogue", setMobileOpen)}>Challenge catalogue <ChevronRight size={16} /></button>
            <button onClick={() => scrollToSection("evidence", setMobileOpen)}>Selected work <ChevronRight size={16} /></button>
            <button onClick={() => scrollToSection("catalogue", setMobileOpen)}>Browse challenge archive <ArrowUpRight size={16} /></button>
          </nav>
        )}
      </header>

      <div className="layout-grid" id="top">
        <aside className="project-rail">
          <a className="brand" href="#top" onClick={() => scrollToSection("top")} aria-label="Back to the top of the showcase">
            <span className="brand-mark"><img src="/manus-storage/sk-cybergame-mark_93b44f18.png" alt="" /></span>
            <span className="brand-wordmark">SK / CYBERGAME</span>
          </a>
          <div className="rail-rule" />
          <p className="rail-kicker">PROJECT SHOWCASE</p>
          <h2 className="rail-title">SK-CERT<br />CyberGame<br /><span>2026</span></h2>
          <p className="rail-summary">A documented field guide to challenge analysis, solution notes, and supporting artefacts.</p>
          <nav className="section-index" aria-label="Section index">
            <span className="section-index-label">INDEX</span>
            <button onClick={() => scrollToSection("overview")}><span>01</span> Overview</button>
            <button onClick={() => scrollToSection("tracks")}><span>02</span> Challenge families</button>
            <button onClick={() => scrollToSection("method")}><span>03</span> Working method</button>
            <button onClick={() => scrollToSection("catalogue")}><span>04</span> Challenge catalogue</button>
            <button onClick={() => scrollToSection("evidence")}><span>05</span> Selected work</button>
          </nav>
          <div className="rail-bottom">
            <div className="rail-status"><span className="status-dot" /> PUBLIC REPOSITORY</div>
            <button className="rail-repo-link" onClick={() => scrollToSection("catalogue")}>Browse full archive <ArrowUpRight size={14} /></button>
          </div>
        </aside>

        <main className="main-content">
          <section className="hero-section" id="overview">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> TECHNICAL PROJECT / 2026</p>
              <h1>A working record of<br /><em>cybersecurity</em> problem solving.</h1>
              <p className="hero-lede">This is the public case study for a challenge archive built around SK-CERT CyberGame 2026: five technical domains, documented solution paths, and the artefacts behind the reasoning.</p>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => scrollToSection("catalogue")}>Browse all challenges <ArrowUpRight size={16} /></button>
                <button className="text-button" onClick={() => scrollToSection("evidence")}>Read the selected work <ArrowDownRight size={16} /></button>
              </div>
              <div className="hero-meta">
                <span><span className="meta-key">AUTHOR</span> itatipaul</span>
                <span><span className="meta-key">FORMAT</span> write-ups + artefacts</span>
                <span><span className="meta-key">LANGUAGE</span> Python</span>
              </div>
            </div>
            <div className="hero-visual" aria-label="Abstract security diagram">
              <img src="/manus-storage/sk-cybergame-hero_f7a79962.png" alt="Abstract geometric security diagram with connected evidence markers" />
              <div className="hero-visual-caption"><span>FIG. 00</span><span>Challenge archive / overview</span></div>
            </div>
          </section>

          <section className="facts-strip" aria-label="Repository facts">
            <div className="fact-card fact-card-primary"><span className="fact-number">05</span><span className="fact-label">challenge<br />families</span></div>
            <div className="fact-card"><span className="fact-number">105</span><span className="fact-label">repository<br />commits</span></div>
            <div className="fact-card"><span className="fact-number fact-word">PY</span><span className="fact-label">primary<br />language</span></div>
            <div className="fact-note"><CircleDot size={14} /> Source note: figures reflect the public GitHub repository at review time.</div>
          </section>

          <section className="section-block tracks-section" id="tracks">
            <div className="section-heading-row">
              <div>
                <p className="section-label"><span>02</span> SCOPE OF WORK</p>
                <h2>Five ways into the same question:<br /><em>what does the evidence say?</em></h2>
              </div>
              <p className="section-intro">The repository is organised by challenge family, which makes the breadth of the work legible without flattening the differences between web exploitation, investigation, cryptography, forensics, and malware analysis.</p>
            </div>
            <div className="tracks-layout">
              <div className="map-panel" aria-label="Schematic challenge map with five connected category nodes">
                <div className="challenge-diagram" aria-hidden="true">
                  <span className="diagram-line diagram-line-a" />
                  <span className="diagram-line diagram-line-b" />
                  <span className="diagram-line diagram-line-c" />
                  <span className="diagram-line diagram-line-d" />
                  <span className="diagram-node diagram-node-core"><ShieldCheck size={18} /></span>
                  <span className="diagram-node diagram-node-1"><Bug size={14} /></span>
                  <span className="diagram-node diagram-node-2"><LockKeyhole size={14} /></span>
                  <span className="diagram-node diagram-node-3"><Search size={14} /></span>
                  <span className="diagram-node diagram-node-4"><Radar size={14} /></span>
                  <span className="diagram-node diagram-node-5"><Braces size={14} /></span>
                  <span className="diagram-label diagram-label-a">attack surface</span>
                  <span className="diagram-label diagram-label-b">public trace</span>
                  <span className="diagram-label diagram-label-c">artefact</span>
                </div>
                <div className="map-panel-overlay"><span>CHALLENGE MAP</span><span>SK-CERT / 2026</span></div>
              </div>
              <div className="track-list">
                {tracks.map((track) => {
                  const Icon = track.icon;
                  const isActive = activeTrack === track.number;
                  return (
                    <button key={track.number} className={`track-item ${isActive ? "is-active" : ""}`} onClick={() => setActiveTrack(isActive ? "all" : track.number)} aria-pressed={isActive}>
                      <span className={`track-icon track-icon-${track.tone}`}><Icon size={17} strokeWidth={1.8} /></span>
                      <span className="track-main"><span className="track-name"><span className="track-number">{track.number}</span>{track.name}</span><span className="track-description">{track.description}</span><span className="track-examples">{track.examples}</span></span>
                      <ChevronRight className="track-arrow" size={17} />
                    </button>
                  );
                })}
                <div className="track-filter-note"><span className="filter-pip" /> {activeTrack === "all" ? "Showing all selected records" : `Filtered to family ${activeTrack}`}</div>
              </div>
            </div>
          </section>

          <section className="section-block method-section" id="method">
            <div className="method-intro">
              <p className="section-label"><span>03</span> WORKING METHOD</p>
              <h2>From first clue<br /><em>to reproducible note.</em></h2>
              <p>The archive format makes the work inspectable. Challenge descriptions sit beside write-ups, scripts, images, and other supporting files—so the final answer is only one part of the record.</p>
            </div>
            <div className="method-steps">
              <div className="method-step"><span className="step-number">01</span><span className="step-icon"><BookOpen size={18} /></span><h3>Orient</h3><p>Start with the challenge boundary, constraints, and expected flag format.</p></div>
              <div className="method-step"><span className="step-number">02</span><span className="step-icon"><Search size={18} /></span><h3>Inspect</h3><p>Trace the surface: code, traffic, artefacts, encodings, or public clues.</p></div>
              <div className="method-step"><span className="step-number">03</span><span className="step-icon"><TerminalSquare size={18} /></span><h3>Validate</h3><p>Use scripts and targeted tests to challenge the first plausible hypothesis.</p></div>
              <div className="method-step"><span className="step-number">04</span><span className="step-icon"><FileText size={18} /></span><h3>Document</h3><p>Keep the reasoning with the supporting artefacts so another reader can follow it.</p></div>
            </div>
          </section>

          <section className="section-block catalogue-section" id="catalogue">
            <div className="catalogue-heading">
              <p className="section-label"><span>04</span> COMPLETE CHALLENGE CATALOGUE</p>
              <div className="catalogue-title-row">
                <div>
                  <h2>Every challenge,<br /><em>one inspectable archive.</em></h2>
                  <p className="catalogue-lede">A repository-level index of the challenge records represented in the public tree. Search by title, narrow by family, and open each source folder in its original context.</p>
                </div>
                <div className="catalogue-summary-note"><span className="summary-marker" /><span>82 records<br />across 05 families</span></div>
              </div>
            </div>
            <div className="catalogue-stats">
              <div className="catalogue-stat"><span className="catalogue-stat-number">{catalogue.total}</span><span>challenge<br />records</span></div>
              <div className="catalogue-stat"><span className="catalogue-stat-number catalogue-stat-blue">{catalogue.documented}</span><span>with a detected<br />write-up artifact</span></div>
              <div className="catalogue-stat"><span className="catalogue-stat-number catalogue-stat-muted">{catalogue.total - catalogue.documented}</span><span>challenge records<br />without a write-up</span></div>
            </div>
            <div className="catalogue-toolbar">
              <label className="catalogue-search"><Search size={16} /><span className="sr-only">Search challenges</span><input value={catalogueQuery} onChange={(event) => setCatalogueQuery(event.target.value)} placeholder="Search challenge title or path" /></label>
              <div className="filter-selects">
                <label className="filter-control"><Filter size={14} /><span className="sr-only">Filter by family</span><select value={catalogueFamily} onChange={(event) => setCatalogueFamily(event.target.value)}><option value="all">All families</option>{Object.keys(catalogue.summary).map((family) => <option key={family} value={family}>{family}</option>)}</select></label>
                <label className="filter-control"><ListFilter size={14} /><span className="sr-only">Filter by write-up status</span><select value={catalogueStatus} onChange={(event) => setCatalogueStatus(event.target.value)}><option value="all">All statuses</option><option value="documented">Write-up available</option><option value="pending">No write-up detected</option></select></label>
              </div>
            </div>
            <div className="catalogue-result-line"><span>{filteredChallenges.length} of {catalogue.total} records shown</span><span>{catalogueQuery || catalogueFamily !== "all" || catalogueStatus !== "all" ? "Filters active" : "Repository index / main branch"}</span></div>
            <div className="challenge-grid">
              {filteredChallenges.map((challenge, index) => (
                <article className="challenge-card" key={challenge.path}>
                  <button className="inspect-challenge" onClick={() => { setCopiedFlag(null); setSelectedChallenge(challenge); }}>Inspect record <ArrowUpRight size={13} /></button>
                  <div className="challenge-card-top"><span className="challenge-sequence">{String(index + 1).padStart(2, "0")}</span><span className={`status-pill ${challenge.writeupAvailable ? "is-documented" : "is-pending"}`}>{challenge.writeupAvailable ? <Check size={11} /> : <CircleDot size={11} />}{challenge.writeupAvailable ? "documented" : "no write-up"}</span></div>
                  <p className="challenge-family">{challenge.family}</p>
                  <h3>{challenge.title}</h3>
                  <p className="challenge-path">{challenge.path}</p>
                  <div className="challenge-card-footer"><span className="artifact-note"><Code2 size={13} /> {challenge.artifactCount} artefacts</span><button className="challenge-link" onClick={() => setSelectedChallenge(challenge)}>Open full record <ArrowUpRight size={13} /></button></div>
                </article>
              ))}
              {filteredChallenges.length === 0 && <div className="catalogue-empty"><Database size={22} /><h3>No matching records</h3><p>Try a different title, family, or write-up status.</p><button onClick={() => { setCatalogueQuery(""); setCatalogueFamily("all"); setCatalogueStatus("all"); }}>Reset filters</button></div>}
            </div>
          </section>

          {selectedChallenge && (
            <div className="challenge-modal-backdrop" role="presentation" onClick={() => setSelectedChallenge(null)}>
              <section className={`challenge-modal reader-size-${textSize} ${highContrast ? "reader-high-contrast" : ""}`} role="dialog" aria-modal="true" aria-labelledby="challenge-modal-title" onClick={(event) => event.stopPropagation()}>
                <div className="challenge-modal-header"><span className="section-label"><span>RECORD</span> {selectedChallenge.family.toUpperCase()}</span><button className="modal-close" onClick={() => setSelectedChallenge(null)} aria-label="Close challenge record"><X size={19} /></button></div>
                <div className="reader-toolbar" aria-label="Reading controls"><div className="reader-control-group"><span>TEXT SIZE</span><button onClick={() => setTextSize("sm")} className={textSize === "sm" ? "is-active" : ""} aria-label="Small text">A−</button><button onClick={() => setTextSize("md")} className={textSize === "md" ? "is-active" : ""} aria-label="Medium text">A</button><button onClick={() => setTextSize("lg")} className={textSize === "lg" ? "is-active" : ""} aria-label="Large text">A+</button><button onClick={() => setTextSize("xl")} className={textSize === "xl" ? "is-active" : ""} aria-label="Extra large text">A++</button></div><button className={`contrast-toggle ${highContrast ? "is-active" : ""}`} onClick={() => setHighContrast((value) => !value)} aria-pressed={highContrast}><span className="contrast-icon" /> {highContrast ? "Standard contrast" : "High contrast"}</button></div>
                <div className="challenge-modal-grid">
                  <div>
                    <p className="modal-path">{selectedChallenge.path}</p>
                    <h2 id="challenge-modal-title">{selectedChallenge.title}</h2>
                    <p className="modal-description">{selectedChallenge.brief || "The repository contains a challenge record for this entry, but no readable challenge statement was extracted."}</p>
                    <div className="workflow-trail">
                      <div className="workflow-node is-present"><span>01</span><strong>Challenge brief</strong><small>Original challenge file present</small></div>
                      <div className={`workflow-node ${selectedChallenge.workflowStages.writeup ? "is-present" : "is-missing"}`}><span>02</span><strong>Solution workflow</strong><small>{selectedChallenge.workflowStages.writeup ? "Write-up artifact available" : "No write-up detected"}</small></div>
                      <div className={`workflow-node ${selectedChallenge.workflowStages.supportingTooling ? "is-present" : "is-missing"}`}><span>03</span><strong>Supporting tooling</strong><small>{selectedChallenge.workflowStages.supportingTooling ? "Script or archive included" : "No script/archive detected"}</small></div>
                      <div className={`workflow-node ${selectedChallenge.workflowStages.visualEvidence ? "is-present" : "is-missing"}`}><span>04</span><strong>Visual evidence</strong><small>{selectedChallenge.imagePaths.length ? `${selectedChallenge.imagePaths.length} image${selectedChallenge.imagePaths.length === 1 ? "" : "s"} in source folder` : "No screenshot detected"}</small></div>
                    </div>
                    <div className="flag-panel"><div className="flag-panel-heading"><span className="flag-panel-kicker"><LockKeyhole size={14} /> FLAG / RESULT</span><span className={`flag-panel-status ${selectedChallenge.flagAvailable ? "is-found" : "is-missing"}`}>{selectedChallenge.flagAvailable ? "DOCUMENTED" : "NOT DOCUMENTED"}</span></div>{selectedChallenge.flagAvailable ? <div className="flag-list">{selectedChallenge.flags.map((flag) => <div className="flag-row" key={`${flag.source}-${flag.value}`}><div><code>{flag.value}</code><small>Detected in {flag.source}</small></div><button onClick={() => { navigator.clipboard?.writeText(flag.value); setCopiedFlag(flag.value); }}>{copiedFlag === flag.value ? "Copied" : "Copy flag"}</button></div>)}</div> : <p className="flag-missing-copy">No explicit flag value was detected in the repository text for this challenge. The supporting evidence remains available below.</p>}</div>
                    {selectedChallenge.textArtifacts.length > 0 && <div className="inline-artifacts"><p className="media-heading"><span className="media-heading-rule" /> IN-PAGE WRITE-UPS & SOURCE NOTES</p>{selectedChallenge.textArtifacts.map((artifact) => <article className="inline-artifact" key={artifact.path}><div className="inline-artifact-heading"><FileText size={13} /><span>{artifact.path}</span><span className="inline-artifact-type">{artifact.type}</span></div><pre>{artifact.content}</pre></article>)}</div>}
                    {selectedChallenge.binaries.length > 0 && <div className="artifact-list"><p className="media-heading"><span className="media-heading-rule" /> BINARY ARTEFACTS</p><div className="artifact-list-items">{selectedChallenge.binaries.map((artifactName) => <div key={artifactName}><span>{artifactName}</span><span className="binary-note">binary / source folder</span></div>)}</div></div>}
                    <div className="modal-actions"><span className="in-page-note"><Check size={14} /> Content rendered from the repository archive</span></div>
                  </div>
                  <div className="modal-media-column">
                    <p className="media-heading"><span className="media-heading-rule" /> SOURCE SCREENSHOTS</p>
                    {selectedChallenge.rawImages.length > 0 ? <div className="screenshot-gallery">{selectedChallenge.rawImages.map((imageUrl, index) => <button className="screenshot-frame" key={imageUrl} onClick={() => { setSelectedImage({ url: imageUrl, caption: selectedChallenge.imagePaths[index] }); setImageZoom(1); }} aria-label={`Open screenshot ${index + 1} fullscreen`}><img src={imageUrl} alt={`${selectedChallenge.title} repository screenshot ${index + 1}`} /><span>FIG. {String(index + 1).padStart(2, "0")} / {selectedChallenge.imagePaths[index]}</span></button>)}</div> : <div className="no-media"><FileText size={20} /><p>No screenshot asset was detected in this challenge folder.</p><span className="no-media-note">The source folder is still represented in the in-page evidence record.</span></div>}
                  </div>
                </div>
              </section>
            </div>
          )}

          {selectedImage && <div className="image-viewer-backdrop" role="presentation" onClick={() => setSelectedImage(null)}><section className="image-viewer" role="dialog" aria-modal="true" aria-label="Fullscreen screenshot viewer" onClick={(event) => event.stopPropagation()}><div className="image-viewer-header"><span className="section-label"><span>FIGURE</span> SOURCE EVIDENCE</span><button className="modal-close" onClick={() => setSelectedImage(null)} aria-label="Close screenshot viewer"><X size={19} /></button></div><div className="image-canvas"><img src={selectedImage.url} alt={selectedImage.caption} style={{ transform: `scale(${imageZoom})` }} /></div><div className="image-viewer-footer"><p>{selectedImage.caption}</p><div className="zoom-controls"><button onClick={() => setImageZoom((value) => Math.max(0.75, Number((value - 0.25).toFixed(2))))} aria-label="Zoom out"><Minus size={15} /></button><span>{Math.round(imageZoom * 100)}%</span><button onClick={() => setImageZoom((value) => Math.min(3, Number((value + 0.25).toFixed(2))))} aria-label="Zoom in"><Plus size={15} /></button><button className="zoom-reset" onClick={() => setImageZoom(1)}>Reset</button></div></div></section></div>}

          <section className="section-block evidence-section" id="evidence">
            <div className="section-heading-row evidence-heading-row">
              <div>
                <p className="section-label"><span>05</span> SELECTED WORK</p>
                <h2>A closer look at the<br /><em>working record.</em></h2>
              </div>
              <div className="evidence-header-note"><span className="note-line" /> <span>Each record opens a detailed<br />in-page case study.</span></div>
            </div>
            <div className="evidence-grid">
              {visibleEvidence.map((item) => {
                const Icon = item.icon;
                return (
                  <article className={`evidence-card evidence-card-${item.tone}`} key={item.number}>
                    <div className="evidence-card-top"><span className="evidence-number">{item.number}</span><Icon size={20} strokeWidth={1.7} /></div>
                    <p className="evidence-label">{item.label}</p>
                    <h3>{item.title}</h3>
                    <p className="evidence-summary">{item.summary}</p>
                    <button className="external-link evidence-open" onClick={() => { const challenge = catalogue.challenges.find((entry) => entry.path === item.path); if (challenge) { setCopiedFlag(null); setSelectedChallenge(challenge); } }}>Open full record <ArrowUpRight size={15} /></button>
                  </article>
                );
              })}
            </div>
            {filteredEvidence.length > 3 && (
              <button className="load-more" onClick={() => setShowAllEvidence((visible) => !visible)}>{showAllEvidence ? "Show less" : `View ${filteredEvidence.length - 3} more records`} <ChevronRight size={16} className={showAllEvidence ? "rotate-90" : ""} /></button>
            )}
          </section>

          <section className="closing-section">
            <div className="closing-visual" aria-label="Abstract layered technical evidence sheets">
              <div className="evidence-visual" aria-hidden="true">
                <span className="evidence-sheet evidence-sheet-back" />
                <span className="evidence-sheet evidence-sheet-mid" />
                <span className="evidence-sheet evidence-sheet-front"><span className="sheet-bar sheet-bar-blue" /><span className="sheet-bar sheet-bar-short" /><span className="sheet-row" /><span className="sheet-row sheet-row-short" /><span className="sheet-corner" /></span>
                <span className="evidence-pin evidence-pin-blue" /><span className="evidence-pin evidence-pin-gold" />
              </div>
            </div>
            <div className="closing-copy"><p className="section-label"><span>END / 06</span> SELF-CONTAINED BY DESIGN</p><h2>The best next step<br /><em>is inspection.</em></h2><p>Read the challenge statements, workflows, write-ups, screenshots, and supporting artefacts directly in this page. The archive is the detailed version of the story.</p><button className="primary-button" onClick={() => scrollToSection("catalogue")}><Layers3 size={16} /> Browse the full challenge archive <ArrowUpRight size={15} /></button></div>
          </section>

          <footer className="site-footer"><span>SK-CERT CYBERGAME 2026 / PROJECT SHOWCASE</span><span>Self-contained archive <span className="footer-dot">·</span> itatipaul</span></footer>
        </main>
      </div>
    </div>
  );
}
