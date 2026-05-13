'use client'
import React, { useState } from 'react'
import { FeedItem } from '@/lib/types'
import { cn, sentimentColors, urgencyColors, confidenceLabel } from '@/lib/utils'
import { ConfidenceRing, RelevancePill, TickerTag, ScoreBar } from '@/components/ui'

interface FeedCardProps {
  item: FeedItem
  index: number
}

export default function FeedCard({ item, index }: FeedCardProps) {
  const [expanded, setExpanded] = useState(false)
  const sc = sentimentColors(item.sentiment)
  const uc = urgencyColors(item.urgency)
  const cl = confidenceLabel(item.confidence)
  const isBreaking = item.urgency === 'Breaking' || item.urgency === 'High'

  return (
    <article
      className={cn(
        'group relative rounded-2xl border transition-all duration-300 overflow-hidden',
        'bg-card-gradient bg-ink-100 shadow-card shadow-inner',
        expanded
          ? 'border-ink-subtle shadow-card-hover'
          : 'border-ink-border hover:border-ink-subtle hover:shadow-card-hover cursor-pointer'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => setExpanded(e => !e)}
    >
      {/* Top sentiment stripe */}
      <div className={cn('h-[1.5px] w-full', {
        Bullish: 'bg-gradient-to-r from-up/60 via-up/20 to-transparent',
        Bearish: 'bg-gradient-to-r from-down/60 via-down/20 to-transparent',
        Neutral: 'bg-gradient-to-r from-ink-dim/40 to-transparent',
        Mixed:   'bg-gradient-to-r from-warn/60 via-warn/20 to-transparent',
      }[item.sentiment])} />

      <div className="p-6">
        {/* Row 1: Meta badges */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Urgency */}
            {isBreaking && (
              <span className={cn('text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full border', uc.badge)}>
                {item.urgency}
              </span>
            )}
            {/* Category */}
            <span className="text-[11px] text-ink-dim">{item.category}</span>
            <span className="text-ink-border">·</span>
            <span className="text-[11px] text-ink-dim">{item.source}</span>
            <span className="text-ink-border">·</span>
            <span className="text-[11px] text-ink-dim">{item.timeAgo}</span>
          </div>
          {/* Relevance + confidence */}
          <div className="flex items-center gap-2 shrink-0">
            <RelevancePill value={item.relevance} />
            <ConfidenceRing value={item.confidence} size={36} />
          </div>
        </div>

        {/* Headline */}
        <h3 className="text-[17px] font-semibold text-ink-bright leading-snug tracking-tight mb-3">
          {item.headline}
        </h3>

        {/* Summary */}
        <p className="text-[14px] text-ink-text leading-relaxed mb-4">
          {item.summary}
        </p>

        {/* WHY IT MATTERS — always visible */}
        <div className="rounded-xl bg-signal/5 border border-signal/border p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            <span className="text-[10px] font-semibold text-signal uppercase tracking-widest">Why This Matters</span>
          </div>
          <p className="text-[13px] text-ink-soft leading-relaxed">{item.whyItMatters}</p>
        </div>

        {/* WHY YOU'RE SEEING THIS — personalization moat */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-ink-subtle/20 border border-ink-border mb-4">
          <div className="w-5 h-5 rounded-full bg-signal/15 border border-signal/border flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-signal text-[9px] font-bold">AI</span>
          </div>
          <p className="text-[12px] text-ink-sub leading-relaxed">
            <span className="text-ink-soft font-medium">Personalized for you · </span>
            {item.whyYouSeeThis}
          </p>
        </div>

        {/* Tickers */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tickers.map(t => <TickerTag key={t} ticker={t} />)}
          {item.narrativeTags.map(n => (
            <span key={n} className="text-[10px] text-pulse border border-pulse/border bg-pulse/muted px-2 py-0.5 rounded-full">
              {n}
            </span>
          ))}
        </div>

        {/* Expand / collapse */}
        {expanded && (
          <div className="space-y-4 border-t border-ink-border pt-4 mt-2 animate-fadeIn">

            {/* Next implication */}
            <div>
              <p className="text-[10px] font-semibold text-ink-dim uppercase tracking-widest mb-2">What Could Happen Next</p>
              <p className="text-[13px] text-ink-text leading-relaxed">{item.nextImplication}</p>
            </div>

            {/* Confidence detail */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-semibold text-ink-dim uppercase tracking-widest">Signal Confidence</p>
                <span className={cn('text-[11px] font-medium', cl.color)}>{cl.label}</span>
              </div>
              <ScoreBar value={item.confidence} color={item.confidence >= 80 ? 'bg-up' : item.confidence >= 60 ? 'bg-signal' : 'bg-warn'} />
            </div>

            {/* Conflicting signals */}
            {item.conflictingSignals && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-warn/5 border border-warn/border">
                <span className="text-warn text-sm mt-0.5">⚠</span>
                <div>
                  <p className="text-[10px] font-semibold text-warn uppercase tracking-widest mb-1">Conflicting Signal</p>
                  <p className="text-[12px] text-ink-sub leading-relaxed">{item.conflictingSignals}</p>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-border">
          <div className="flex items-center gap-1.5">
            <span className={cn('w-1.5 h-1.5 rounded-full', sc.dot)} />
            <span className={cn('text-[11px] font-medium', sc.text)}>{item.sentiment}</span>
          </div>
          <button
            onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
            className="text-[11px] text-ink-dim hover:text-ink-soft transition-colors"
          >
            {expanded ? 'Show less ↑' : 'Deep analysis ↓'}
          </button>
        </div>
      </div>
    </article>
  )
}
