'use client'
import React, { useState } from 'react'
import { NARRATIVES } from '@/data/feed'
import { Narrative } from '@/lib/types'
import { cn, narrativeMomentumBar, sentimentColors } from '@/lib/utils'
import { TickerTag, ScoreBar } from '@/components/ui'

function NarrativeCard({ n, isSelected, onClick }: { n: Narrative; isSelected: boolean; onClick: () => void }) {
  const sc = sentimentColors(n.sentiment)
  const isUp = n.direction === 'Accelerating'
  const dirColor = isUp ? 'text-up' : n.direction === 'Decelerating' ? 'text-down' : 'text-warn'
  const dirIcon  = isUp ? '↑' : n.direction === 'Decelerating' ? '↓' : '→'

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border p-5 cursor-pointer transition-all duration-200',
        'bg-card-gradient shadow-card shadow-inner',
        isSelected
          ? 'border-signal/30 shadow-card-hover'
          : 'border-ink-border hover:border-ink-subtle hover:shadow-card-hover'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{n.icon}</span>
          <div>
            <h3 className="text-[15px] font-semibold text-ink-bright tracking-tight">{n.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={cn('text-[11px] font-medium', dirColor)}>
                {dirIcon} {n.direction}
              </span>
              <span className="text-ink-border">·</span>
              <span className={cn('text-[11px] font-medium', sc.text)}>{n.sentiment}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={cn('text-lg font-bold font-mono tabular-nums', narrativeMomentumBar(n.momentum).replace('bg-', 'text-'))}>
            {n.momentum}
          </div>
          <div className="text-[10px] text-ink-dim">momentum</div>
        </div>
      </div>

      {/* Momentum bar */}
      <ScoreBar value={n.momentum} color={narrativeMomentumBar(n.momentum)} className="mb-4" />

      {/* 7-day change */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] text-ink-dim">7-day change</span>
        <span className={cn('text-[12px] font-semibold font-mono', n.change7d >= 0 ? 'text-up' : 'text-down')}>
          {n.change7d >= 0 ? '+' : ''}{n.change7d} pts
        </span>
      </div>

      {/* Tickers */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {n.tickers.slice(0, 5).map(t => <TickerTag key={t} ticker={t} />)}
      </div>

      {/* Institutional attention */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-ink-dim uppercase tracking-wider">Institutional attention</span>
        <span className={cn(
          'text-[11px] font-semibold',
          n.institutionalAttention === 'Rising'  ? 'text-up'   :
          n.institutionalAttention === 'Falling' ? 'text-down' : 'text-ink-sub'
        )}>
          {n.institutionalAttention === 'Rising' ? '↑' : n.institutionalAttention === 'Falling' ? '↓' : '→'} {n.institutionalAttention}
        </span>
      </div>

      {/* Expanded explanation */}
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-ink-border animate-fadeIn">
          <p className="text-[13px] text-ink-text leading-relaxed">{n.explanation}</p>
        </div>
      )}
    </div>
  )
}

export default function NarrativeView() {
  const [selectedId, setSelectedId] = useState<string | null>('n1')

  const toggle = (id: string) => setSelectedId(prev => prev === id ? null : id)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest mb-2">Narrative Intelligence</p>
        <h1 className="text-2xl font-semibold text-ink-bright tracking-tight mb-1">Market Narratives</h1>
        <p className="text-[14px] text-ink-dim">
          The themes institutional money is moving around right now. Click any narrative to understand it.
        </p>
      </div>

      <div className="space-y-3">
        {NARRATIVES.map((n, i) => (
          <div key={n.id} className="animate-fadeUp" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both', opacity: 0 }}>
            <NarrativeCard n={n} isSelected={selectedId === n.id} onClick={() => toggle(n.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}
