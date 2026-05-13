'use client'
import React from 'react'
import { WATCHLIST } from '@/data/feed'
import { cn, sentimentColors } from '@/lib/utils'
import { TickerTag } from '@/components/ui'

export default function WatchlistView() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest mb-2">AI Watchlist</p>
        <h1 className="text-2xl font-semibold text-ink-bright tracking-tight mb-1">Your Assets</h1>
        <p className="text-[14px] text-ink-dim">
          AI-monitored positions with smart alerts and narrative alignment tracking.
        </p>
      </div>

      <div className="space-y-3">
        {WATCHLIST.map((item, i) => {
          const sc = sentimentColors(item.sentiment)
          const isUp = item.changePct >= 0
          return (
            <div
              key={item.ticker}
              className="animate-fadeUp rounded-2xl border border-ink-border bg-card-gradient bg-ink-100 shadow-card shadow-inner overflow-hidden"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both', opacity: 0 }}
            >
              <div className={cn('h-[1.5px]', isUp
                ? 'bg-gradient-to-r from-up/50 via-up/20 to-transparent'
                : 'bg-gradient-to-r from-down/50 via-down/20 to-transparent'
              )} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono font-bold text-ink-bright text-[15px]">{item.ticker}</span>
                      <span className="text-ink-dim text-[12px]">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-ink-soft text-[13px] tabular-nums">
                        {item.ticker === 'BTC'
                          ? `$${item.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                          : `$${item.price.toFixed(2)}`}
                      </span>
                      <span className={cn('font-mono text-[12px] font-semibold tabular-nums', isUp ? 'text-up' : 'text-down')}>
                        {isUp ? '+' : ''}{item.changePct.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={cn('w-1.5 h-1.5 rounded-full', sc.dot)} />
                    <span className={cn('text-[11px] font-medium', sc.text)}>{item.sentiment}</span>
                  </div>
                </div>

                {/* Alert */}
                {item.alert && (
                  <div className={cn(
                    'flex items-start gap-2 px-3 py-2.5 rounded-xl mb-3 border text-[12px]',
                    item.urgency === 'High'
                      ? 'bg-warn/5 border-warn/border text-warn'
                      : 'bg-signal/5 border-signal/border text-signal'
                  )}>
                    <span className="mt-0.5">{item.urgency === 'High' ? '⚠' : '→'}</span>
                    <span className="leading-snug">{item.alert}</span>
                  </div>
                )}

                {/* AI note */}
                <div className="flex items-start gap-2.5 mb-3">
                  <div className="w-5 h-5 rounded-full bg-signal/10 border border-signal/border flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-signal text-[9px] font-bold">AI</span>
                  </div>
                  <p className="text-[12px] text-ink-sub leading-relaxed">{item.aiNote}</p>
                </div>

                {/* Narratives */}
                <div className="flex flex-wrap gap-1.5">
                  {item.narratives.map(n => (
                    <span key={n} className="text-[10px] text-pulse border border-pulse/border bg-pulse/muted px-2 py-0.5 rounded-full">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 rounded-2xl border border-ink-border bg-ink-100 text-center">
        <p className="text-[12px] text-ink-dim">
          AI monitoring 247 signals across your 5 watched assets · Last updated 2 minutes ago
        </p>
      </div>
    </div>
  )
}
