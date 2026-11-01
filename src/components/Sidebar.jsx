import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Users, 
  Scale, 
  Briefcase, 
  Calculator, 
  ExternalLink,
  Database,
  Menu,
  X,
  Heart,
  Sparkles,
  Lock
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'architecture', label: 'Architecture Explorer', icon: Layers, badge: 'Two-Room Model' },
    { id: 'roles', label: 'Role-Based Engine', icon: Users, badge: 'Buyer Clarity' },
    { id: 'tradeoffs', label: 'Trade-Off Matrix', icon: Scale, badge: 'Honest Compare' },
    { id: 'sales-brief', label: 'Sales Pre-Call Brief', icon: Briefcase, badge: 'Rep Tool' },
    { id: 'tco', label: 'TCO Calculator', icon: Calculator, badge: '70% Savings' }
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  const currentTabLabel = navItems.find(item => item.id === activeTab)?.label || 'Explorer';

  return (
    <>
      {/* ========================================================= */}
      {/* MOBILE TOP BAR (visible on screens < lg)                  */}
      {/* ========================================================= */}
      <div className="lg:hidden sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-700 to-cyan-400 p-[1px] flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-brand-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base text-white">IOMETE</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30">
                Sovereign
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Active: <span className="text-slate-200 font-medium">{currentTabLabel}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5 text-brand-400" />}
        </button>
      </div>

      {/* ========================================================= */}
      {/* MOBILE SLIDE-OVER BACKDROP & DRAWER                       */}
      {/* ========================================================= */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 h-full flex flex-col justify-between p-5 z-10 shadow-2xl animate-fadeIn">
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-cyan-400 p-[1px] flex items-center justify-center shadow-md">
                    <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                      <Database className="w-4 h-4 text-brand-400" />
                    </div>
                  </div>
                  <div>
                    <span className="font-extrabold text-white text-base">IOMETE</span>
                    <span className="block text-[10px] text-brand-400 font-mono">Sovereign Explorer</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Vertical Navigation Items */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40 shadow-sm shadow-brand-500/20'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                        isActive ? 'bg-brand-400/20 text-brand-200' : 'bg-slate-900 text-slate-500'
                      }`}>
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Drawer Bottom with Credits */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <a
                href="https://iomete.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs border border-slate-800"
              >
                <span>IOMETE Docs</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <div className="p-3 rounded-xl bg-gradient-to-r from-brand-950/40 to-slate-900 border border-brand-500/20 text-center">
                <p className="text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5">
                  <span>Built with</span>
                  <span className="text-rose-500 animate-pulse">❤️</span>
                  <span className="bg-gradient-to-r from-brand-400 to-cyan-300 bg-clip-text text-transparent font-extrabold">
                    by noob coders
                  </span>
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                  hackCBS 2026 • IOMETE Track
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DESKTOP FIXED LEFT SIDEBAR (visible on screens >= lg)     */}
      {/* ========================================================= */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-72 bg-slate-950/95 backdrop-blur-md border-r border-slate-800/80 flex-col justify-between z-30 p-5 overflow-y-auto">
        
        {/* Top Part: Branding & Vertical Navigation */}
        <div className="space-y-6">
          
          {/* Logo & Platform Info */}
          <div 
            onClick={() => setActiveTab('architecture')}
            className="flex items-center gap-3 p-2 -m-2 rounded-xl hover:bg-slate-900/60 cursor-pointer transition-colors"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-500 to-cyan-400 p-[1px] shadow-lg shadow-brand-500/25 flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-brand-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  IOMETE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-brand-500/15 text-brand-400 border border-brand-500/30">
                  Explorer
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Sovereign Data Lakehouse
              </p>
            </div>
          </div>

          {/* Hackathon Badge Pill */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800/90 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-mono">Track:</span>
            <span className="text-cyan-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>hackCBS 2026</span>
            </span>
          </div>

          {/* Section Divider */}
          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold px-2 block mb-2">
              Decision Modules
            </span>

            {/* Vertical Navigation Buttons: ONE BELOW THE OTHER */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-brand-500/15 text-brand-300 border border-brand-500/40 shadow-sm shadow-brand-500/15'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                        isActive ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>

                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono flex-shrink-0 ml-1 ${
                      isActive ? 'bg-brand-400/20 text-brand-200' : 'bg-slate-900 text-slate-500'
                    }`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

        </div>

        {/* Bottom Part: Security Badge, Resource Links & Noob Coders Credit */}
        <div className="pt-6 border-t border-slate-800/80 space-y-4">
          
          {/* Zero-Data-Access Card */}
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <span>Zero-Data-Access</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">
                Customer VPC Isolation
              </p>
            </div>
          </div>

          {/* External Docs Link */}
          <a
            href="https://iomete.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs border border-slate-800 transition-colors"
          >
            <span className="font-medium">Official IOMETE Docs</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          {/* Prominent Built with ❤️ by noob coders Badge */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950/40 border border-brand-500/30 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-brand-500/10 rounded-full blur-xl pointer-events-none" />
            <p className="text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 flex-wrap">
              <span>built with</span>
              <span className="text-rose-500 animate-pulse text-sm">❤️</span>
              <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-brand-200 bg-clip-text text-transparent font-black tracking-wide">
                by noob coders
              </span>
            </p>
            <p className="text-[10px] text-slate-500 mt-1 font-mono tracking-wider">
              hackCBS 2026 • IOMETE Track
            </p>
          </div>

        </div>

      </aside>
    </>
  );
}
