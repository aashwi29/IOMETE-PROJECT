import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ArchitectureExplorer from './components/ArchitectureExplorer';
import UseCaseMatcher from './components/UseCaseMatcher';
import TradeOffMatrix from './components/TradeOffMatrix';
import SalesPreCallBrief from './components/SalesPreCallBrief';
import TcoCalculator from './components/TcoCalculator';
import { 
  ShieldCheck, 
  Layers, 
  Users, 
  Scale, 
  Briefcase, 
  Calculator, 
  Database, 
  ArrowRight, 
  Lock, 
  TrendingDown, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Terminal,
  FileText,
  Heart
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Left Sidebar Navigation (Desktop Fixed, Mobile Slide-over) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area (Offset by lg:pl-72 to accommodate fixed sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-10">
          
          {/* Quick Hero Hook (Subtle, professional) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-slate-800/60">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/30">
                  hackCBS Track Solution
                </span>
                <span className="text-xs text-slate-400">
                  Solving Buyer & Sales Friction in Enterprise Data
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Sovereign Architecture & Decision Explorer
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                "Complex technology is hard to explain, evaluate, and buy." This interactive tool provides absolute mental model clarity, transparent trade-offs, and pre-call enablement for IOMETE.
              </p>
            </div>

            {/* Quick Value Metrics Pill Box */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Custody</div>
                  <div className="text-xs font-bold text-white">100% In-VPC</div>
                </div>
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-brand-400" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Economics</div>
                  <div className="text-xs font-bold text-white">70-85% Lower TCO</div>
                </div>
              </div>

              <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Open Format</div>
                  <div className="text-xs font-bold text-white">Apache Iceberg</div>
                </div>
              </div>
            </div>
          </div>

          {/* View Routing */}
          <section className="transition-all duration-300">
            {activeTab === 'architecture' && <ArchitectureExplorer />}
            {activeTab === 'roles' && <UseCaseMatcher />}
            {activeTab === 'tradeoffs' && <TradeOffMatrix />}
            {activeTab === 'sales-brief' && <SalesPreCallBrief />}
            {activeTab === 'tco' && <TcoCalculator />}
          </section>

        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/90 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Database className="w-4 h-4 text-brand-400" />
                  <span>IOMETE Sovereign Explorer</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  A purpose-built decision & sales acceleration tool developed for the hackCBS IOMETE track. Designed to eliminate buyer hesitation and accelerate enterprise lakehouse adoption.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    <span>built with</span>
                    <span className="text-rose-500">❤️</span>
                    <span className="bg-gradient-to-r from-brand-400 to-cyan-300 bg-clip-text text-transparent font-extrabold">
                      by noob coders
                    </span>
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono mb-3">
                  Core Features
                </h4>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <button onClick={() => setActiveTab('architecture')} className="hover:text-brand-400 transition-colors">
                      Two-Room House Visualizer
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('roles')} className="hover:text-brand-400 transition-colors">
                      Role-Based Answer Engine
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('tradeoffs')} className="hover:text-brand-400 transition-colors">
                      Sovereignty vs SaaS Matrix
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('sales-brief')} className="hover:text-brand-400 transition-colors">
                      Sales Pre-Call Brief Generator
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('tco')} className="hover:text-brand-400 transition-colors">
                      Lakehouse TCO Calculator
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono mb-3">
                  HackCBS Criteria Alignment
                </h4>
                <ul className="space-y-1.5 text-slate-400 text-[11px]">
                  <li>• <strong>Practical Impact (35%):</strong> Solves real sales pipeline & buying friction.</li>
                  <li>• <strong>Buyer Clarity (25%):</strong> Mental models, zero-jargon role answers.</li>
                  <li>• <strong>Technical Accuracy (25%):</strong> Iceberg, Spark, KMS, In-VPC control.</li>
                  <li>• <strong>Working Execution (15%):</strong> Responsive, interactive, production build.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono mb-3">
                  Official Resources
                </h4>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <a href="https://iomete.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <span>IOMETE Website</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  </li>
                  <li>
                    <a href="https://iomete.com/docs" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <span>Architecture Docs</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  </li>
                  <li>
                    <a href="https://iceberg.apache.org" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <span>Apache Iceberg Spec</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs gap-3">
              <div className="flex items-center gap-1.5 font-medium">
                <span>built with</span>
                <span className="text-rose-500 text-sm">❤️</span>
                <span className="text-white font-bold">by noob coders</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500">hackCBS 2026 • IOMETE Track Solution</span>
              </div>
              <span className="font-mono text-slate-500 text-[11px]">100% In-VPC Sovereign Data Lakehouse</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
