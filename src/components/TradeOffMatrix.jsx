import React, { useState } from 'react';
import { 
  Scale, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  Filter,
  Check,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { TRADEOFF_COMPARISON } from '../data/content';

export default function TradeOffMatrix() {
  const [filterCategory, setFilterCategory] = useState('all');
  const [quizAnswers, setQuizAnswers] = useState({
    strictSecurity: true,
    highComputeSpend: true,
    kubernetesReady: false,
    avoidLockin: true
  });

  const toggleQuiz = (key) => {
    setQuizAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Compute recommendation
  const score = Object.values(quizAnswers).filter(Boolean).length;
  let recommendation = {
    title: "Strong IOMETE Fit (Sovereign Lakehouse)",
    summary: "Your organization has high security/cost sensitivity and wants to own its data in open formats. IOMETE will deliver massive TCO savings and Zero-Trust isolation.",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  };

  if (score <= 1) {
    recommendation = {
      title: "Consider Turnkey Serverless (Snowflake / BigQuery)",
      summary: "If you have minimal data volumes (<1TB), zero DevOps, and no compliance concerns, paying a markup for hands-off turnkey SaaS may be acceptable for now.",
      badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
    };
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-brand-950/40 p-6 md:p-8 border border-slate-800 shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Honest Evaluation Framework</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Trade-Off Matrix: Sovereignty vs. Turnkey SaaS
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-300 leading-relaxed">
            No single tool is right for everyone. Real enterprise buyers respect honest trade-off analysis. 
            Here is an unvarnished comparison of IOMETE, Snowflake, Databricks, and DIY Lakehouse across critical enterprise vectors.
          </p>
        </div>
      </div>

      {/* Interactive Quick Fit Quiz */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <span>Interactive Fit Assessment (4-Question Check)</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${recommendation.badgeClass}`}>
            {recommendation.title}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-5">
          <label 
            onClick={() => toggleQuiz('strictSecurity')}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer select-none transition-colors"
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border ${
              quizAnswers.strictSecurity ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-600 bg-slate-900'
            }`}>
              {quizAnswers.strictSecurity && <Check className="w-3.5 h-3.5" />}
            </div>
            <div>
              <div className="text-xs font-bold text-white">Strict Data Residency or Zero-Trust Mandate</div>
              <p className="text-[11px] text-slate-400 mt-0.5">We cannot allow raw customer records to leave our private VPC or cloud perimeter.</p>
            </div>
          </label>

          <label 
            onClick={() => toggleQuiz('highComputeSpend')}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer select-none transition-colors"
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border ${
              quizAnswers.highComputeSpend ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-600 bg-slate-900'
            }`}>
              {quizAnswers.highComputeSpend && <Check className="w-3.5 h-3.5" />}
            </div>
            <div>
              <div className="text-xs font-bold text-white">Cost Frustration with 3x-5x Compute Markup</div>
              <p className="text-[11px] text-slate-400 mt-0.5">We want predictable pricing without opaque 'credits' or runaway compute bills.</p>
            </div>
          </label>

          <label 
            onClick={() => toggleQuiz('avoidLockin')}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer select-none transition-colors"
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border ${
              quizAnswers.avoidLockin ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-600 bg-slate-900'
            }`}>
              {quizAnswers.avoidLockin && <Check className="w-3.5 h-3.5" />}
            </div>
            <div>
              <div className="text-xs font-bold text-white">Committed to Open Formats (Apache Iceberg)</div>
              <p className="text-[11px] text-slate-400 mt-0.5">We refuse to be locked into proprietary table storage formats that require expensive unloads.</p>
            </div>
          </label>

          <label 
            onClick={() => toggleQuiz('kubernetesReady')}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer select-none transition-colors"
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border ${
              quizAnswers.kubernetesReady ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-600 bg-slate-900'
            }`}>
              {quizAnswers.kubernetesReady && <Check className="w-3.5 h-3.5" />}
            </div>
            <div>
              <div className="text-xs font-bold text-white">Cloud or Private Infrastructure Available</div>
              <p className="text-[11px] text-slate-400 mt-0.5">We already have AWS / Azure / GCP accounts or Kubernetes where data plane can run.</p>
            </div>
          </label>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <span>{recommendation.summary}</span>
        </div>
      </div>

      {/* The Full Comparison Matrix Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-mono uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5 w-1/5">Evaluation Vector</th>
                <th className="py-4 px-5 w-1/4 bg-brand-950/30 text-brand-400 border-x border-brand-500/20">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>IOMETE</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 font-mono">Sovereign</span>
                  </div>
                </th>
                <th className="py-4 px-5 w-1/5 text-slate-300">Snowflake</th>
                <th className="py-4 px-5 w-1/5 text-slate-300">Databricks</th>
                <th className="py-4 px-5 w-1/5 text-slate-400">DIY Lakehouse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {TRADEOFF_COMPARISON.pillars.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-850/40 transition-colors">
                  <td className="py-4 px-5 font-bold text-white bg-slate-900/50">
                    {row.category}
                  </td>
                  
                  {/* IOMETE Cell */}
                  <td className="py-4 px-5 bg-brand-950/20 border-x border-brand-500/20">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-1">
                      {row.iomete.score}
                    </span>
                    <p className="text-slate-200 mt-1 leading-relaxed">
                      {row.iomete.text}
                    </p>
                  </td>

                  {/* Snowflake Cell */}
                  <td className="py-4 px-5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold mb-1 ${
                      row.snowflake.status === 'risk' 
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {row.snowflake.score}
                    </span>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      {row.snowflake.text}
                    </p>
                  </td>

                  {/* Databricks Cell */}
                  <td className="py-4 px-5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold mb-1 ${
                      row.databricks.status === 'warning' 
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {row.databricks.score}
                    </span>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      {row.databricks.text}
                    </p>
                  </td>

                  {/* DIY Cell */}
                  <td className="py-4 px-5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold mb-1 ${
                      row.diy.status === 'risk' 
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {row.diy.score}
                    </span>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      {row.diy.text}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Honest Decision Guide: When To Choose What */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Choose IOMETE */}
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Choose IOMETE When:</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 mt-2">
            {TRADEOFF_COMPARISON.whenToChoose.chooseIomete.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* When NOT to choose IOMETE / When to choose others */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-bold text-base">
            <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span>When Other Options Make More Sense:</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-cyan-400">Choose Snowflake if:</span>
              <p className="text-slate-400 mt-1">
                {TRADEOFF_COMPARISON.whenToChoose.chooseSnowflake[0]} {TRADEOFF_COMPARISON.whenToChoose.chooseSnowflake[1]}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-amber-400">Choose Databricks if:</span>
              <p className="text-slate-400 mt-1">
                {TRADEOFF_COMPARISON.whenToChoose.chooseDatabricks[0]}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="font-bold text-slate-400">Choose 100% DIY if:</span>
              <p className="text-slate-400 mt-1">
                {TRADEOFF_COMPARISON.whenToChoose.chooseDIY[0]}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
