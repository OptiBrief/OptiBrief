'use client'
import React from 'react'
import { FEED_ITEMS, USER_PROFILE } from '@/data/feed'
import FeedCard from './FeedCard'
import { RelevancePill } from '@/components/ui'

export default function FeedView() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Feed header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-up animate-breathe" />
          <span className="text-[11px] font-semibold text-ink-dim uppercase tracking-widest">Live Intelligence Feed</span>
        </div>
        <h1 className="text-2xl font-semibold text-ink-bright tracking-tight mb-1">
          Good morning, {USER_PROFILE.name}.
        </h1>
        <p className="text-[14px] text-ink-dim leading-relaxed">
          The AI processed <span className="text-ink-soft">2,400+ signals</span> this morning.
          Here's everything that actually matters to you.
        </p>
      </div>

      {/* Profile context bar */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-ink-100 border border-ink-border mb-8 flex-wrap">
        <span className="text-[11px] text-ink-dim font-medium uppercase tracking-wider">Personalized for:</span>
        <span className="text-[12px] text-ink-soft">{USER_PROFILE.tradingStyle}</span>
        <span className="text-ink-border">·</span>
        <span className="text-[12px] text-ink-soft">{USER_PROFILE.riskTolerance} risk</span>
        <span className="text-ink-border">·</span>
        <div className="flex gap-1">
          {USER_PROFILE.focusNarratives.map(n => (
            <span key={n} className="text-[10px] text-pulse border border-pulse/border bg-pulse/muted px-2 py-0.5 rounded-full">{n}</span>
          ))}
        </div>
        <div className="ml-auto">
          <RelevancePill value={93} />
        </div>
      </div>

      {/* Feed items */}
      <div className="space-y-4">
        {FEED_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="animate-fadeUp"
            style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both', opacity: 0 }}
          >
            <FeedCard item={item} index={i} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-[12px] text-ink-dim">
          Showing top signals by relevance score · Updated 3 minutes ago
        </p>
      </div>
    </div>
  )
}
