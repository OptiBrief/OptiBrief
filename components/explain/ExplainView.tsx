'use client'
import React, { useState } from 'react'
import { MOVE_EXPLANATIONS, WATCHLIST } from '@/data/feed'
import { cn, sentimentColors } from '@/lib/utils'
import { ConfidenceRing, TickerTag, ScoreBar } from '@/components/ui'

export default function ExplainView() {
  const [selected, setSelected] = useState<string>('NVDA')
  const [loading, setLoading]   = useState(false)

  const explanation = MOVE_EXPLANATIONS[selected]
  const isUp = explanation?.changePct >= 0

  const handleSelect = (ticker: string) => {
    if (!MOVE_EXPLANATIONS[ticker]) return
    setLoading(true)
    setSelected(ticker)
    setTimeout(() => setLoading(false), 600)
  }

  const TICKERS = ['NVDA', 'TSLA']

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest mb-2">AI Move Analysis</p>
        <h1 className="text-2xl font-semibold text-ink-bright tracking-tight mb-1">Explain The Move</h1>
        <p className="text-[14px] text-ink-dim">
          Click any asset to instantly understand why it moved and what it means.
        </p>
      </div>

      {/* Ticker selector */}
      <div className="flex gap-2 mb-6">
        {WATCHLIST.map(item => (
          <button
            key={item.ticker}
            onClick={() => handleSelect(item.ticker)}
            disabled={!MOVE_EXPLANATIONS[item.ticker]}
            className={cn(
              'px-4 py-2 rounded-xl text-[13px] font-medium border transition-all duration-150',
              selected === item.ticker
                ? 'bg-signal/10 border-signal/border text-signal'
                : MOVE_EXPLANATIONS[item.ticker]
                  ? 'border-ink-border text-ink-sub hover:text-ink-soft hover:border-ink-subtle'
                  : 'border-ink-border text-ink-muted opacity-40 cursor-not-allowed'
            )}
          >
            <span className="font-mono">{item.ticker}</span>
            <span className={cn('text-[11px] ml-1.5 font-mono', item.changePct >= 0 ? 'text-up' : 'text-down')}>
              {item.changePct >= 0 ? '+' : ''}{item.changePct.toFixed(1)}%
            </span>
          </button>
        ))}
      </div>

      {/* Explanation card */}
      {loading ? (
        <div className="rounded-2xl border border-ink-border bg-ink-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-signal animate-breathe" />
            <span className="text-[13px] text-ink-dim">AI analyzing price movement…</span>
          </div>
          <div className="space-y-3">
            {[80, 60, 90, 50, 70].map((w, i) => (
              <div key={i} className="h-3 rounded-xl bg-gradient-to-r from-ink-150 via-ink-200 to-ink-150 bg-[length:200%_100%] animate-shimmer" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      ) : explanation ? (
        <div className="rounded-2xl border border-ink-border bg-card-gradient bg-ink-100 shadow-card shadow-inner overflow-hidden">
          {/* Stripe */}
          <div className={cn('h-[1.5px]', isUp ? 'bg-gradient-to-r from-up/60 via-up/20 to-transparent' : 'bg-gradient-to-r from-down/60 via-down/20 to-transparent')} />

          <div className="p-6 space-y-6">
            {/* Stock header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-bold font-mono text-ink-bright">{explanation.ticker}</span>
                  <span className="text-ink-dim text-[13px]">{explanation.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-mono text-ink-bright tabular-nums">
                    ${explanation.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={cn('text-lg font-semibold font-mono', isUp ? 'text-up' : 'text-down')}>
                    {isUp ? '+' : ''}{explanation.changePct.toFixed(2)}%
                  </span>
                </div>
              </div>
              <ConfidenceRing value={explanation.confidence} size={48} />
            </div>

            {/* AI narrative — the magic moment */}
            <div className="rounded-xl bg-signal/5 border border-signal/border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                <span className="text-[10px] font-semibold text-signal uppercase tracking-widest">AI Interpretation</span>
              </div>
              <p className="text-[14px] text-ink-soft leading-relaxed font-medium">{explanation.aiNarrative}</p>
            </div>

            {/* Catalysts */}
            <div>
              <p className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest mb-3">Primary Catalysts</p>
              <ul className="space-y-2.5">
                {explanation.catalysts.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-signal/10 border border-signal/border text-signal text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-ink-text leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Grid: sector + macro */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-ink-150 border border-ink-border p-4">
                <p className="text-[10px] font-semibold text-ink-dim uppercase tracking-widest mb-2">Sector Sympathy</p>
                <p className="text-[12px] text-ink-text leading-snug">{explanation.sectorSymapthy}</p>
              </div>
              <div className="rounded-xl bg-ink-150 border border-ink-border p-4">
                <p className="text-[10px] font-semibold text-ink-dim uppercase tracking-widest mb-2">Macro Influence</p>
                <p className="text-[12px] text-ink-text leading-snug">{explanation.macroInfluence}</p>
              </div>
            </div>

            {/* Earnings note */}
            <div className="rounded-xl bg-ink-150 border border-ink-border p-4">
              <p className="text-[10px] font-semibold text-ink-dim uppercase tracking-widest mb-2">Earnings Detail</p>
              <p className="text-[13px] text-ink-text leading-relaxed">{explanation.earningsNote}</p>
            </div>

            {/* Options note */}
            <div className="rounded-xl bg-ink-150 border border-ink-border p-4">
              <p className="text-[10px] font-semibold text-ink-dim uppercase tracking-widest mb-2">Options Activity</p>
              <p className="text-[13px] text-ink-text leading-relaxed">{explanation.optionsNote}</p>
            </div>

            {/* Risk note */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-warn/5 border border-warn/border">
              <span className="text-warn mt-0.5">⚠</span>
              <div>
                <p className="text-[10px] font-semibold text-warn uppercase tracking-widest mb-1">Risk to Monitor</p>
                <p className="text-[12px] text-ink-sub leading-relaxed">{explanation.riskNote}</p>
              </div>
            </div>

            {/* What to watch */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-signal/5 border border-signal/border">
              <span className="text-signal mt-0.5">→</span>
              <div>
                <p className="text-[10px] font-semibold text-signal uppercase tracking-widest mb-1">Next To Watch</p>
                <p className="text-[12px] text-ink-soft leading-relaxed">{explanation.nextToWatch}</p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-ink-border bg-ink-100 p-12 text-center">
          <p className="text-ink-dim text-[14px]">Select an asset above to see the AI explanation</p>
        </div>
      )}
    </div>
  )
}
