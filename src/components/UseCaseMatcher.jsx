import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  Database, 
  FileCheck, 
  CheckCircle2, 
  AlertCircle, 
  Quote, 
  Copy, 
  Check, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ROLE_PERSONAS } from '../data/content';

export default function UseCaseMatcher() {
  const [selectedRoleId, setSelectedRoleId] = useState('ciso');
  const [copiedPitch, setCopiedPitch] = useState(false);

  const activePersona = ROLE_PERSONAS.find(p => p.id === selectedRoleId) || ROLE_PERSONAS[0];

  const handleCopyPitch = () => {
    const textToCopy = `[IOMETE Persona Pitch for ${activePersona.title}]\n\nCore Question: "${activePersona.coreQuestion}"\n\nExecutive Answer: ${activePersona.executiveSummary}\n\nBoardroom Elevator Pitch: "${activePersona.elevatorPitch}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-brand-950/40 p-6 md:p-8 border border-slate-800 shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Role-Based Clarity Engine</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            "I Don't Understand What This Does For Me"
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-300 leading-relaxed">
            Enterprise software purchases stall when different stakeholders speak different languages. 
            Select your role below to see tailored, zero-fluff answers backed by IOMETE architecture and economics.
          </p>
        </div>

        {/* Persona Selector Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {ROLE_PERSONAS.map((persona) => {
            const isSelected = selectedRoleId === persona.id;
            let RoleIcon = ShieldCheck;
            if (persona.id === 'cfo') RoleIcon = DollarSign;
            if (persona.id === 'data-lead') RoleIcon = Database;
            if (persona.id === 'compliance') RoleIcon = FileCheck;

            return (
              <button
                key={persona.id}
                onClick={() => setSelectedRoleId(persona.id)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-brand-500/15 border-brand-500 shadow-lg shadow-brand-500/15 ring-1 ring-brand-500'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <RoleIcon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {persona.badge.split(' ')[0]}
                  </span>
                </div>
                <h3 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {persona.title.split(' (')[0]}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {persona.badge}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Persona Deep Dive Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
        
        {/* Top Header of Persona Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-400 font-bold">
                Persona Perspective
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-medium">{activePersona.badge}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              {activePersona.title}
            </h2>
          </div>

          <button
            onClick={handleCopyPitch}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            {copiedPitch ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Persona Executive Brief</span>
              </>
            )}
          </button>
        </div>

        {/* The Burning Question */}
        <div className="p-4 md:p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-4">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5 flex-shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 font-mono">
              The #1 Critical Concern:
            </span>
            <p className="text-base md:text-lg font-semibold text-white mt-0.5">
              "{activePersona.coreQuestion}"
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
            The Sourced Answer:
          </h4>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed bg-brand-950/20 p-4 rounded-xl border border-brand-500/20">
            {activePersona.executiveSummary}
          </p>
        </div>

        {/* Concrete Architectural Proof Points */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
            Architectural & Economic Proof Points:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePersona.proofPoints.map((point, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-850/70 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{point.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Incumbent Friction Section */}
        <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Why The Incumbents (Snowflake / Databricks) Fail Here</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-rose-900/50">
              <span className="font-bold text-slate-200">Snowflake Friction:</span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                {activePersona.incumbentFriction.snowflake}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-rose-900/50">
              <span className="font-bold text-slate-200">Databricks Friction:</span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                {activePersona.incumbentFriction.databricks}
              </p>
            </div>
          </div>
        </div>

        {/* Boardroom Elevator Pitch */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-brand-950/60 to-slate-900 border border-brand-500/30 flex items-start gap-4">
          <Quote className="w-8 h-8 text-brand-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-brand-400 font-bold">
              Boardroom / Executive Elevator Pitch:
            </span>
            <p className="text-sm md:text-base font-semibold text-white italic mt-1 leading-relaxed">
              "{activePersona.elevatorPitch}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
