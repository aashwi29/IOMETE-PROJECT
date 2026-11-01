import React, { useState } from 'react';
import { 
  Briefcase, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  Target, 
  HelpCircle, 
  ShieldAlert, 
  Flame, 
  ArrowRight,
  Download,
  Building,
  Cloud,
  FileText
} from 'lucide-react';
import { SALES_PRECALL_KNOWLEDGE, ROLE_PERSONAS } from '../data/content';

export default function SalesPreCallBrief() {
  const [companyName, setCompanyName] = useState('Acme Financial Corp');
  const [selectedIndustryId, setSelectedIndustryId] = useState('fintech');
  const [selectedIncumbentId, setSelectedIncumbentId] = useState('snowflake');
  const [selectedPersonaId, setSelectedPersonaId] = useState('ciso');
  const [copied, setCopied] = useState(false);

  const activeIndustry = SALES_PRECALL_KNOWLEDGE.industries.find(i => i.id === selectedIndustryId) || SALES_PRECALL_KNOWLEDGE.industries[0];
  const activeIncumbent = SALES_PRECALL_KNOWLEDGE.incumbents[selectedIncumbentId] || SALES_PRECALL_KNOWLEDGE.incumbents.snowflake;
  const activePersona = ROLE_PERSONAS.find(p => p.id === selectedPersonaId) || ROLE_PERSONAS[0];

  // Generate markdown brief for copying
  const generatedMarkdownBrief = `# SALES PRE-CALL BRIEF: ${companyName.toUpperCase()}
Target Prospect: ${companyName}
Industry: ${activeIndustry.name}
Current Platform / Incumbent: ${activeIncumbent.name}
Target Stakeholder: ${activePersona.title}

---

### 1. Strategic 30-Second Opening Hook:
"Hi [Prospect Name], most ${activeIndustry.name} leaders we speak with are feeling the pinch of ${activeIncumbent.name}'s compounding compute markups while security teams are increasingly anxious about raw customer data residing in multi-tenant SaaS. At IOMETE, we provide a sovereign lakehouse where your data and compute stay 100% inside your VPC, cutting TCO by up to 75% while eliminating third-party data processor exposure."

---

### 2. Primary Pain Points & Incumbent Weakness (${activeIncumbent.name}):
- Incumbent Vulnerability: ${activeIncumbent.primaryVulnerability}
- Industry Trigger Event: ${activeIndustry.triggerEvents[0]}
- Core Stakeholder Fear: "${activePersona.coreQuestion}"

---

### 3. Anticipated Objections & Counter-Battlescripts:
${activeIndustry.objections.map((obj, i) => `
**Objection #${i+1}:** "${obj.objection}"
- **Rebuttal:** ${obj.rebuttal}
- **Proof Point:** ${obj.proofPoint}
`).join('')}

---

### 4. Three Killer Discovery Questions:
${activeIndustry.discoveryQuestions.map((q, i) => `${i+1}. ${q}`).join('\n')}

---

### 5. Recommended 14-Day POC Scope:
- In-place Iceberg registration on an existing bucket (Zero data migration).
- Run high-frequency ETL or daily transformation job in customer VPC.
- Benchmark: Demonstrate 60%+ compute savings and verified zero outbound data flow to IOMETE.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdownBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-brand-950/40 p-6 md:p-8 border border-slate-800 shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/30 mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Sales Enablement & Deal Acceleration</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Sales Pre-Call Brief Generator
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-300 leading-relaxed">
            Arm sales reps and solution architects with instant objection handles, discovery questions, 
            and tailored positioning before stepping onto a call with an enterprise buyer.
          </p>
        </div>
      </div>

      {/* Generator Form Controls */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-brand-400" />
          <span>Configure Deal Parameters</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Target Company Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Prospect Company Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-brand-500 transition-colors"
              />
              <Building className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Industry Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Industry Vertical
            </label>
            <select
              value={selectedIndustryId}
              onChange={(e) => setSelectedIndustryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-brand-500 transition-colors"
            >
              {SALES_PRECALL_KNOWLEDGE.industries.map(ind => (
                <option key={ind.id} value={ind.id}>{ind.name}</option>
              ))}
            </select>
          </div>

          {/* Incumbent Platform */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Current Incumbent / Competitor
            </label>
            <select
              value={selectedIncumbentId}
              onChange={(e) => setSelectedIncumbentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-brand-500 transition-colors"
            >
              <option value="snowflake">Snowflake (High Markup)</option>
              <option value="databricks">Databricks (DBU Complexity)</option>
              <option value="cloudera">Cloudera / Legacy Hadoop</option>
            </select>
          </div>

          {/* Target Buyer Persona */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Primary Call Persona
            </label>
            <select
              value={selectedPersonaId}
              onChange={(e) => setSelectedPersonaId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-brand-500 transition-colors"
            >
              {ROLE_PERSONAS.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Generated Pre-Call Brief Output */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
        
        {/* Output Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Ready For Call
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{activeIndustry.name}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Executive Pre-Call Brief: {companyName}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-brand-500/20"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied Brief!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Brief to Markdown / Slack</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1. Conversational 30-Second Hook */}
        <div className="p-5 rounded-xl bg-brand-950/30 border border-brand-500/30 space-y-2">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>The 30-Second Conversational Opener</span>
          </div>
          <p className="text-sm font-medium text-slate-200 leading-relaxed italic">
            "Hi, most {activeIndustry.name} leaders we speak with are feeling the pinch of {activeIncumbent.name}'s compounding compute markups while security teams are increasingly anxious about raw customer data residing in multi-tenant SaaS. At IOMETE, we provide a sovereign lakehouse where your data and compute stay 100% inside your VPC, cutting TCO by up to 75% while eliminating third-party data processor exposure."
          </p>
        </div>

        {/* 2. Incumbent Vulnerability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
              Target's Incumbent Vulnerability ({activeIncumbent.name}):
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeIncumbent.primaryVulnerability}
            </p>
            <div className="mt-3 text-[11px] text-brand-400 font-semibold">
              Displacement Angle: {activeIncumbent.displacementStrategy}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold block mb-1">
              Core Persona Hot-Button Concern:
            </span>
            <p className="text-xs text-slate-300 font-medium italic mb-2">
              "{activePersona.coreQuestion}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activePersona.executiveSummary}
            </p>
          </div>
        </div>

        {/* 3. High-Probability Objections & Battlecards */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Anticipated Objections & Counter-Battlescripts:</span>
          </h4>

          <div className="space-y-3">
            {activeIndustry.objections.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-850/80 border border-slate-800 space-y-2"
              >
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400">
                    Objection #{idx + 1}
                  </span>
                  <span>"{item.objection}"</span>
                </div>
                <div className="pl-3 border-l-2 border-brand-500 space-y-1">
                  <div className="text-xs text-slate-200 leading-relaxed">
                    <span className="font-bold text-brand-300">Rebuttal: </span>
                    {item.rebuttal}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">
                    ✦ Sourced Proof: {item.proofPoint}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Three Killer Discovery Questions */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-3">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>3 Discovery Questions to Expose Incumbent Flaws:</span>
          </div>

          <div className="space-y-2 text-xs">
            {activeIndustry.discoveryQuestions.map((q, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/60 border border-slate-850">
                <span className="font-mono font-bold text-brand-400">0{idx + 1}.</span>
                <span className="text-slate-200 font-medium">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Recommended 14-Day POC Scope */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Recommended Call Closing Call-to-Action (14-Day POC):
            </h5>
            <p className="text-xs text-slate-300 mt-1">
              "Let's register one high-volume table in your S3/ADLS bucket in-place. We'll run your hardest transformations in your VPC and prove a 60%+ cost reduction with zero outbound data egress in under 2 weeks."
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors"
          >
            Copy Full Brief
          </button>
        </div>

      </div>
    </div>
  );
}
