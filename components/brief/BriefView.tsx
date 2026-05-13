'use client'
import React from 'react'
import { DAILY_BRIEF } from '@/data/feed'
import { cn, sentimentColors } from '@/lib/utils'
import { TickerTag } from '@/components/ui'

export default function BriefView() {
  const b = DAILY_BRIEF
  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero greeting */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest mb-3">
          {b.date}
        </p>
        <h1 className="text-3xl font-semibold text-ink-bright tracking-tight mb-2">
          {b.greeting}
        </h1>
        <p className="text-[15px] text-ink-dim leading-relaxed">{b.subtitle}</p>
      </div>

      {/* Top events */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest mb-4">
          Top 5 Things That Matter Today
        </p>
        <div className="space-y-3">
          {b.topEvents.map((event, i) => {
            const sc = sentimentColors(event.sentiment)
            return (
              <div
                key={event.id}
                className="animate-fadeUp rounded-2xl border border-ink-border bg-card-gradient bg-ink-100 shadow-card shadow-inner overflow-hidden"
                style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both', opacity: 0 }}
              >
                <div className={cn('h-[1.5px]', {
                  Bullish: 'bg-gradient-to-r from-up/50 via-up/20 to-transparent',
                  Bearish: 'bg-gradient-to-r from-down/50 via-down/20 to-transparent',
                  Neutral: 'bg-gradient-to-r from-ink-dim/30 to-transparent',
                  Mixed:   'bg-gradient-to-r from-warn/50 via-warn/20 to-transparent',
                }[event.sentiment])} />

                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <div className="w-7 h-7 rounded-full bg-ink-200 border border-ink-border flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[12px] font-bold text-ink-sub font-mono">{i + 1}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-semibold text-ink-bright leading-snug mb-2">
                        {event.headline}
                      </h3>

                      {/* Impact */}
                      <p className="text-[12px] text-ink-text leading-relaxed mb-2">{event.impact}</p>

                      {/* Relevance to you */}
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-signal/5 border border-signal/border mb-3">
                        <span className="text-[9px] font-bold text-signal mt-0.5">AI</span>
                        <p className="text-[11px] text-ink-sub leading-snug">{event.relevance}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {event.tickers.map(t => <TickerTag key={t} ticker={t} />)}
                        <div className="flex items-center gap-1 ml-1">
                          <span className={cn('w-1.5 h-1.5 rounded-full', sc.dot)} />
                          <span className={cn('text-[11px] font-medium', sc.text)}>{event.sentiment}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom intel cards */}
      <div className="grid grid-cols-1 gap-3">
        {[
          { label: 'Macro Risk to Watch', content: b.macroRisk,       icon: '⚠', color: 'warn'   },
          { label: 'Narrative Shift',     content: b.narrativeShift,  icon: '◉', color: 'pulse'  },
          { label: 'Watch Today',         content: b.watchToday,      icon: '→', color: 'signal' },
          { label: 'AI Confidence Today', content: b.confidence,      icon: '◈', color: 'up'     },
        ].map(card => (
          <div key={card.label} className={cn(
            'rounded-2xl border p-5 bg-ink-100',
            card.color === 'warn'   ? 'border-warn/border   bg-warn/5'   :
            card.color === 'pulse'  ? 'border-pulse/border  bg-pulse/5'  :
            card.color === 'signal' ? 'border-signal/border bg-signal/5' :
            'border-up/border bg-up/5'
          )}>
            <div className="flex items-center gap-2 mb-2">
              <span className={cn('text-sm',
                card.color === 'warn'   ? 'text-warn'   :
                card.color === 'pulse'  ? 'text-pulse'  :
                card.color === 'signal' ? 'text-signal' : 'text-up'
              )}>{card.icon}</span>
              <p className={cn('text-[10px] font-semibold uppercase tracking-widest',
                card.color === 'warn'   ? 'text-warn'   :
                card.color === 'pulse'  ? 'text-pulse'  :
                card.color === 'signal' ? 'text-signal' : 'text-up'
              )}>{card.label}</p>
            </div>
            <p className="text-[13px] text-ink-text leading-relaxed">{card.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-[12px] text-ink-dim">
          Briefing generated at 6:42 AM · Processed 2,400+ signals from 180+ sources
        </p>
      </div>
    </div>
  )
}
