'use client'
import React from 'react'
import { MARKET_PULSE, NARRATIVES } from '@/data/feed'
import { cn, sentimentColors, narrativeMomentumBar } from '@/lib/utils'
import { ScoreBar } from '@/components/ui'

function GaugeBar({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] text-ink-dim">{label}</span>
        <span className={cn('text-[12px] font-mono font-semibold tabular-nums', color)}>{value}</span>
      </div>
      <ScoreBar value={value} color={color.replace('text-', 'bg-')} />
    </div>
  )
}

export default function PulseView() {
  const p = MARKET_PULSE
  const sc = sentimentColors(p.overallSentiment)
  const sentimentNorm = Math.round((p.sentimentScore + 100) / 2)
  const fgLabel = p.fearGreed >= 75 ? 'Extreme Greed' : p.fearGreed >= 55 ? 'Greed' : p.fearGreed >= 45 ? 'Neutral' : p.fearGreed >= 25 ? 'Fear' : 'Extreme Fear'
  const fgColor = p.fearGreed >= 60 ? 'text-up' : p.fearGreed >= 40 ? 'text-ink-soft' : 'text-down'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest mb-2">Live Overview</p>
        <h1 className="text-2xl font-semibold text-ink-bright tracking-tight mb-1">Market Pulse</h1>
        <p className="text-[14px] text-ink-dim">The global market state, compressed into what actually matters.</p>
      </div>

      {/* Hero sentiment card */}
      <div className="rounded-2xl border border-ink-border bg-card-gradient bg-ink-100 shadow-card shadow-inner overflow-hidden mb-4 animate-fadeUp" style={{ animationFillMode: 'both', opacity: 0 }}>
        <div className={cn('h-[1.5px]', {
          Bullish: 'bg-gradient-to-r from-up/60 via-up/20 to-transparent',
          Bearish: 'bg-gradient-to-r from-down/60 via-down/20 to-transparent',
          Neutral: 'bg-gradient-to-r from-ink-dim/40 to-transparent',
          Mixed:   'bg-gradient-to-r from-warn/60 via-warn/20 to-transparent',
        }[p.overallSentiment])} />

        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest mb-1">Overall Sentiment</p>
              <div className="flex items-center gap-2">
                <span className={cn('w-2.5 h-2.5 rounded-full', sc.dot)} />
                <span className={cn('text-2xl font-bold tracking-tight', sc.text)}>{p.overallSentiment}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-ink-dim mb-0.5">VIX</p>
              <span className="text-2xl font-bold font-mono text-ink-bright tabular-nums">{p.vix}</span>
            </div>
          </div>

          <p className="text-[13px] text-ink-text leading-relaxed mb-5">{p.summary}</p>

          <div className="space-y-4">
            <GaugeBar value={sentimentNorm} label="Market Sentiment" color={p.sentimentScore >= 0 ? 'text-up' : 'text-down'} />
            <GaugeBar value={p.fearGreed}   label={`Fear & Greed — ${fgLabel}`} color={fgColor} />
          </div>
        </div>
      </div>

      {/* Risk + appetite */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Risk Appetite', value: p.riskAppetite, color: p.riskAppetite === 'Risk-On' ? 'text-up' : p.riskAppetite === 'Risk-Off' ? 'text-down' : 'text-ink-soft' },
          { label: 'Volatility',   value: p.volatilityLevel, color: p.volatilityLevel === 'High' || p.volatilityLevel === 'Extreme' ? 'text-warn' : 'text-ink-soft' },
          { label: 'Inst. Bias',   value: 'Buyers', color: 'text-up' },
        ].map(card => (
          <div key={card.label} className="animate-fadeUp rounded-2xl border border-ink-border bg-ink-100 p-4 text-center" style={{ animationFillMode: 'both', opacity: 0 }}>
            <p className="text-[10px] text-ink-dim uppercase tracking-wider mb-1.5">{card.label}</p>
            <p className={cn('text-[13px] font-semibold', card.color)}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Top narratives */}
      <div className="rounded-2xl border border-ink-border bg-ink-100 p-5 mb-4 animate-fadeUp" style={{ animationDelay: '120ms', animationFillMode: 'both', opacity: 0 }}>
        <p className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest mb-4">Dominant Narratives</p>
        <div className="space-y-4">
          {NARRATIVES.slice(0, 4).map(n => (
            <div key={n.id} className="flex items-center gap-3">
              <span className="text-lg w-6 text-center">{n.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-ink-soft truncate">{n.name}</span>
                  <span className={cn('text-[11px] font-mono font-semibold ml-3 shrink-0', narrativeMomentumBar(n.momentum).replace('bg-', 'text-'))}>
                    {n.momentum}
                  </span>
                </div>
                <ScoreBar value={n.momentum} color={narrativeMomentumBar(n.momentum)} />
              </div>
              <span className={cn('text-[11px] font-medium shrink-0', n.change7d >= 0 ? 'text-up' : 'text-down')}>
                {n.change7d >= 0 ? '+' : ''}{n.change7d}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional note */}
      <div className="rounded-2xl border border-signal/border bg-signal/5 p-5 animate-fadeUp" style={{ animationDelay: '180ms', animationFillMode: 'both', opacity: 0 }}>
        <p className="text-[10px] font-semibold text-signal uppercase tracking-widest mb-2">Institutional Positioning</p>
        <p className="text-[13px] text-ink-text leading-relaxed">{p.institutionalBias}</p>
      </div>
    </div>
  )
}
