import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Server, 
  Cpu, 
  Key, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  FileCode2, 
  Layers, 
  Info, 
  AlertTriangle,
  Cloud,
  Terminal,
  Activity
} from 'lucide-react';
import { MENTAL_MODEL_CONCEPTS, QUERY_SIMULATION_STEPS } from '../data/content';

export default function ArchitectureExplorer() {
  const [activeTab, setActiveTab] = useState('blueprint'); // 'blueprint' | 'simulator' | 'zerotrust'
  const [selectedComponent, setSelectedComponent] = useState('room1');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Auto-step query simulation
  const handleStartSimulation = () => {
    setIsSimulating(true);
    setActiveStepIndex(0);
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < QUERY_SIMULATION_STEPS.length) {
        setActiveStepIndex(currentStep);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1800);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setActiveStepIndex(0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-brand-950/40 p-6 md:p-8 border border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/30 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Mental Model #1</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            The "Two-Room House" Architecture
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-300 leading-relaxed">
            Enterprise buyers struggle to understand where their data lives. Traditional SaaS warehouses make you 
            surrender custody. IOMETE decouples the <span className="text-brand-400 font-semibold">Data Plane</span> (your private vault) 
            from the <span className="text-cyan-400 font-semibold">Control Plane</span> (the orchestration tower), giving you 100% data sovereignty.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-800/80 pt-6">
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'blueprint'
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Two-Room Visual Blueprint</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'simulator'
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Interactive Query Tracer (Simulation)</span>
          </button>

          <button
            onClick={() => setActiveTab('zerotrust')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'zerotrust'
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Data-Access Boundary Spec</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TWO-ROOM BLUEPRINT */}
      {activeTab === 'blueprint' && (
        <div className="space-y-6">
          {/* Main Visual Dual Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* ROOM 1: THE DATA PLANE (CUSTOMER VPC) */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/40 p-6 md:p-7 relative shadow-xl glow-emerald flex flex-col justify-between">
              <div className="absolute -top-3.5 left-6 bg-emerald-500 text-slate-950 px-3.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Room 1: The Sovereign Vault (Customer VPC)</span>
              </div>

              <div>
                <div className="flex items-start justify-between mt-2 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>Your Private Data Plane</span>
                      <span className="text-xs font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                        100% In-VPC
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Runs in your AWS / GCP / Azure account or private Kubernetes cluster. Zero raw data egress.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Database className="w-6 h-6" />
                  </div>
                </div>

                {/* Sub-components of Room 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
                  {MENTAL_MODEL_CONCEPTS.analogy.room1.components.map((comp, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-850/80 border border-slate-700/60 hover:border-emerald-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{comp.name}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        {comp.tech}
                      </div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {comp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <Key className="w-3.5 h-3.5 text-emerald-400" />
                  <span>KMS Master Keys: Customer Held</span>
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>No Inbound Public Ports Required</span>
                </span>
              </div>
            </div>

            {/* SEPARATION DIVIDER / AIR GAP */}
            <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center py-6">
              <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-slate-700 to-transparent flex flex-col items-center justify-center relative">
                <div className="absolute top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 px-2 py-3 rounded-xl flex flex-col items-center text-[10px] font-mono text-slate-400 text-center gap-2 shadow-lg">
                  <span className="rotate-90 text-brand-400 font-bold tracking-widest uppercase">AirGap</span>
                  <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* ROOM 2: THE CONTROL PLANE (IOMETE SaaS) */}
            <div className="lg:col-span-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 p-6 md:p-7 relative shadow-xl glow-blue flex flex-col justify-between">
              <div className="absolute -top-3.5 left-6 bg-cyan-500 text-slate-950 px-3.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Server className="w-3.5 h-3.5" />
                <span>Room 2: The Control Tower (SaaS)</span>
              </div>

              <div>
                <div className="flex items-start justify-between mt-2 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>IOMETE Control Plane</span>
                      <span className="text-xs font-mono px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
                        Orchestration
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      SaaS convenience without data access. Dispatches policies and clusters.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                </div>

                {/* Sub-components of Room 2 */}
                <div className="space-y-3 my-5">
                  {MENTAL_MODEL_CONCEPTS.analogy.room2.components.map((comp, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-850/80 border border-slate-700/60 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{comp.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {comp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Data Visibility:</span>
                <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  ZERO Raw Data Access
                </span>
              </div>
            </div>

          </div>

          {/* Quick Mental Model Callout */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-500/15 text-brand-400">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  The Core Architectural Difference vs Snowflake / BigQuery
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  In Snowflake, you upload your data into their black-box storage. With IOMETE, you bring the software to your data in-VPC.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('simulator')}
              className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 whitespace-nowrap bg-brand-500/10 hover:bg-brand-500/20 px-3 py-1.5 rounded-lg border border-brand-500/30 transition-colors"
            >
              <span>Watch simulated query path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE QUERY TRACER */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Simulation Target:</span>
                <code className="ml-2 text-xs font-mono text-cyan-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  SELECT customer_tier, SUM(trans_vol) FROM lakehouse.payments GROUP BY 1;
                </code>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleStartSimulation}
                disabled={isSimulating}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? 'Tracing Execution...' : 'Run Simulated Query'}</span>
              </button>

              <button
                onClick={handleResetSimulation}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
                title="Reset Simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            {QUERY_SIMULATION_STEPS.map((stepItem, idx) => {
              const isCurrent = activeStepIndex === idx;
              const isPassed = activeStepIndex > idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left relative ${
                    isCurrent
                      ? 'bg-brand-950/60 border-brand-500 ring-2 ring-brand-500/30'
                      : isPassed
                      ? 'bg-slate-900/90 border-emerald-500/40 text-slate-300'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      isCurrent
                        ? 'bg-brand-500 text-white'
                        : isPassed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      Step {stepItem.step}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {stepItem.plane === 'customer' ? 'Customer VPC' : stepItem.plane === 'control' ? 'Control Plane' : 'Token Auth'}
                    </span>
                  </div>
                  <h4 className={`text-xs font-bold leading-tight ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                    {stepItem.title.split('. ')[1]}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* Active Step Deep Dive Card */}
          {QUERY_SIMULATION_STEPS[activeStepIndex] && (
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 p-6 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono text-brand-400 font-semibold mb-1">
                    EXECUTION STEP {QUERY_SIMULATION_STEPS[activeStepIndex].step} OF {QUERY_SIMULATION_STEPS.length}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {QUERY_SIMULATION_STEPS[activeStepIndex].title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Active Perimeter:</span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    QUERY_SIMULATION_STEPS[activeStepIndex].plane === 'customer'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : QUERY_SIMULATION_STEPS[activeStepIndex].plane === 'control'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {QUERY_SIMULATION_STEPS[activeStepIndex].plane === 'customer'
                      ? '🛡️ Inside Customer VPC'
                      : QUERY_SIMULATION_STEPS[activeStepIndex].plane === 'control'
                      ? '☁️ IOMETE Control Plane'
                      : '⚡ Local Agent Validation'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">What is happening:</h5>
                    <p className="text-sm text-slate-200 mt-1.5 leading-relaxed">
                      {QUERY_SIMULATION_STEPS[activeStepIndex].description}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <h5 className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-brand-400" />
                      <span>Executing Actor:</span>
                    </h5>
                    <span className="text-xs font-semibold text-slate-200">
                      {QUERY_SIMULATION_STEPS[activeStepIndex].actor}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Data Exposure Audit:</span>
                    </div>
                    <p className="text-xs font-medium text-slate-300 leading-normal">
                      {QUERY_SIMULATION_STEPS[activeStepIndex].dataExposedToIOMETE}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    ✅ Result: Customer rows processed in VPC RAM only.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ZERO-DATA-ACCESS BOUNDARY SPEC */}
      {activeTab === 'zerotrust' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Encryption & Keys</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Storage files are encrypted via AWS KMS, GCP KMS, or Azure Key Vault using customer-managed keys (CMK). IOMETE never asks for, manages, or stores your cryptographic secrets.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
              KMS Policy: Strict Deny to external principals
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Network Egress Isolation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The customer VPC requires only outbound HTTPS (443) connectivity to IOMETE's heartbeat endpoint for cluster health telemetry. No inbound ports are exposed to the public internet.
            </p>
            <div className="text-[11px] font-mono text-brand-300 bg-brand-500/10 p-2 rounded border border-brand-500/20">
              Ingress Rule: 0.0.0.0/0 inbound is BLOCKED
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">3. Apache Iceberg Freedom</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Data is written as standard Apache Iceberg metadata and Parquet files in your bucket. If you ever unsubscribe from IOMETE, you can query your data on day one using open-source Trino or DuckDB.
            </p>
            <div className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 p-2 rounded border border-cyan-500/20">
              No Unload / No Extraction fees needed
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
