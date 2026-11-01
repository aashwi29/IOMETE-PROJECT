import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingDown, 
  ShieldCheck, 
  Zap, 
  Layers, 
  ArrowRight,
  PieChart,
  CheckCircle2
} from 'lucide-react';
import { TCO_BENCHMARK_DEFAULTS } from '../data/content';

export default function TcoCalculator() {
  const [monthlySpend, setMonthlySpend] = useState(35000);
  const [dataVolumeTB, setDataVolumeTB] = useState(50);
  const [hasEdpDiscount, setHasEdpDiscount] = useState(true);

  // Dynamic calculations
  const annualCurrent = monthlySpend * 12;
  
  // IOMETE compute cost is ~25% of Snowflake spend (since Snowflake markups are ~4x)
  // If customer has cloud EDP discount, compute is another 15% cheaper
  const computeDiscount = hasEdpDiscount ? 0.85 : 1.0;
  const estimatedIometeCompute = Math.round(monthlySpend * 0.22 * computeDiscount);
  const estimatedIometeSoftware = Math.round(Math.min(12000, Math.max(2500, dataVolumeTB * 80)));
  const monthlyIometeTotal = estimatedIometeCompute + estimatedIometeSoftware;
  const annualIometeTotal = monthlyIometeTotal * 12;
  
  const annualSavings = Math.max(0, annualCurrent - annualIometeTotal);
  const savingsPercent = Math.round((annualSavings / annualCurrent) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-brand-950/40 p-6 md:p-8 border border-slate-800 shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-4">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Economic Transparency</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Lakehouse TCO & Savings Estimator
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-300 leading-relaxed">
            SaaS data warehouses package raw cloud compute into proprietary credits with a 300% to 500% markup. 
            Calculate what you save by running IOMETE on raw cloud compute inside your own VPC.
          </p>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Parameters (Col 5) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-400" />
            <span>Your Current Environment</span>
          </h3>

          {/* Current Monthly Spend Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Monthly Snowflake/Databricks Spend</span>
              <span className="font-mono font-bold text-brand-400 text-sm">
                ${monthlySpend.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="150000"
              step="2500"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>$5,000/mo</span>
              <span>$75,000/mo</span>
              <span>$150,000+/mo</span>
            </div>
          </div>

          {/* Data Volume Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Lakehouse Data Volume</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">
                {dataVolumeTB} TB
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={dataVolumeTB}
              onChange={(e) => setDataVolumeTB(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>5 TB</span>
              <span>250 TB</span>
              <span>500+ TB</span>
            </div>
          </div>

          {/* Cloud Provider EDP Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasEdpDiscount}
                onChange={(e) => setHasEdpDiscount(e.target.checked)}
                className="w-4 h-4 rounded text-brand-500 bg-slate-900 border-slate-700 focus:ring-0"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">Existing Cloud Commitment (EDP / Commit)</span>
                <span className="text-[11px] text-slate-400">Apply negotiated AWS/Azure compute discounts (est. ~15%)</span>
              </div>
            </label>
          </div>

          {/* Why such huge savings note */}
          <div className="p-4 rounded-xl bg-brand-950/20 border border-brand-500/20 space-y-2 text-xs">
            <span className="font-bold text-brand-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Where The 70% Savings Come From:</span>
            </span>
            <ul className="space-y-1.5 text-slate-300 text-[11px]">
              <li>• <strong>No compute markup:</strong> Raw AWS/GCP EC2 instance pricing.</li>
              <li>• <strong>No egress:</strong> Processing colocated with your S3 buckets.</li>
              <li>• <strong>Auto-scale to zero:</strong> Spark worker pods terminate immediately when queries complete.</li>
            </ul>
          </div>
        </div>

        {/* Results Showcase (Col 7) */}
        <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-700 p-6 md:p-8 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                Projected Annual Impact
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Estimated Net Savings
              </h2>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-extrabold text-sm flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4" />
              <span>{savingsPercent}% Lower TCO</span>
            </div>
          </div>

          {/* Big Number Headline */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold block mb-1">
              Estimated Annual Savings
            </span>
            <div className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tight">
              ${annualSavings.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              Over <span className="text-slate-200 font-bold">${Math.round(annualSavings / 12).toLocaleString()} saved each month</span> compared to your current data warehouse bill.
            </p>
          </div>

          {/* Side-by-side annual comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Current Spend Box */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Current Annual Warehouse Bill
              </div>
              <div className="text-2xl font-black text-rose-400">
                ${annualCurrent.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400">
                High compute markups, proprietary credit burn, and idle warehouse running costs.
              </div>
            </div>

            {/* IOMETE Spend Box */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Projected IOMETE All-In Annual
              </div>
              <div className="text-2xl font-black text-emerald-400">
                ${annualIometeTotal.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400">
                ${(estimatedIometeCompute * 12).toLocaleString()} raw compute + ${(estimatedIometeSoftware * 12).toLocaleString()} flat IOMETE software.
              </div>
            </div>

          </div>

          {/* Real World Impact Callout */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">What this capital unlocks: </strong>
              Saving ${annualSavings.toLocaleString()}/yr is equivalent to hiring{' '}
              <span className="text-emerald-400 font-bold">
                {Math.max(1, Math.round(annualSavings / 150000))} additional full-time data engineers
              </span>{' '}
              or funding your company's entire AI / LLM research compute budget for the next 2 years.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
