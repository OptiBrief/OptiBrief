'use client'

import React, { useState } from 'react'
import Sidebar, { View } from '@/components/layout/Sidebar'
import FeedView      from '@/components/feed/FeedView'
import NarrativeView from '@/components/narrative/NarrativeView'
import ExplainView   from '@/components/explain/ExplainView'
import WatchlistView from '@/components/watchlist/WatchlistView'
import BriefView     from '@/components/brief/BriefView'
import PulseView     from '@/components/pulse/PulseView'
import { cn }        from '@/lib/utils'

const VIEW_HEADERS: Record<View, { title: string; sub: string }> = {
  feed:       { title: 'My Feed',      sub: 'Personalized intelligence · Updated 3 minutes ago'        },
  brief:      { title: 'Daily Brief',  sub: 'Wednesday, July 17 · AI-generated morning briefing'       },
  narratives: { title: 'Narratives',   sub: '6 active themes · 2 accelerating today'                   },
  explain:    { title: 'Explain Move', sub: 'AI-powered move analysis · Click any asset'               },
  watchlist:  { title: 'Watchlist',    sub: '5 assets monitored · 2 alerts active'                     },
  pulse:      { title: 'Market Pulse', sub: 'Risk-on session · VIX at 14.2 · Sentiment: Bullish'       },
}

function MobileNav({ active, onSelect }: { active: View; onSelect: (v: View) => void }) {
  const items: { id: View; label: string; icon: string }[] = [
    { id: 'feed',       label: 'Feed',      icon: '◈' },
    { id: 'brief',      label: 'Brief',     icon: '◉' },
    { id: 'narratives', label: 'Themes',    icon: '◎' },
    { id: 'explain',    label: 'Explain',   icon: '◐' },
    { id: 'watchlist',  label: 'Watch',     icon: '◌' },
    { id: 'pulse',      label: 'Pulse',     icon: '◍' },
  ]
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-ink-border bg-ink-50/95 backdrop-blur-md">
      <div className="flex">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              'flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors',
              active === item.id ? 'text-signal' : 'text-ink-dim'
            )}
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span className="text-[9px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [view, setView] = useState<View>('feed')
  const header = VIEW_HEADERS[view]

  const renderView = () => {
    switch (view) {
      case 'feed':       return <FeedView />
      case 'brief':      return <BriefView />
      case 'narratives': return <NarrativeView />
      case 'explain':    return <ExplainView />
      case 'watchlist':  return <WatchlistView />
      case 'pulse':      return <PulseView />
    }
  }

  return (
    <div className="h-full flex overflow-hidden bg-ink-0">
      {/* Sidebar — desktop only */}
      <div className="hidden md:block">
        <Sidebar active={view} onSelect={setView} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-ink-border flex items-center justify-between px-6 shrink-0 bg-ink-50/60 backdrop-blur-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-6 h-6 rounded-lg bg-signal flex items-center justify-center">
              <span className="text-white text-[10px] font-black">O</span>
            </div>
            <span className="text-ink-bright font-semibold text-sm">OptiBrief</span>
          </div>

          {/* Desktop header info */}
          <div className="hidden md:block">
            <h2 className="text-[14px] font-semibold text-ink-bright">{header.title}</h2>
            <p className="text-[11px] text-ink-dim mt-0.5">{header.sub}</p>
          </div>

          {/* Right: live indicator + time */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-up animate-breathe" />
              <span className="text-[11px] text-ink-dim font-medium">Markets Open</span>
            </div>
            <LiveClock />
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-ink-200 border border-ink-border">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-signal/30 to-pulse/30 border border-signal/border flex items-center justify-center">
                <span className="text-signal text-[9px] font-bold">A</span>
              </div>
              <span className="text-[12px] text-ink-soft hidden sm:inline">Alex</span>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8" key={view}>
          <div className="px-4 md:px-8 py-6 md:py-8 animate-fadeIn">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav active={view} onSelect={setView} />
    </div>
  )
}

function LiveClock() {
  const [time, setTime] = React.useState('')
  React.useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      timeZone: 'America/New_York'
    }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="hidden sm:inline text-[11px] font-mono text-ink-dim tabular-nums">
      {time} ET
    </span>
  )
}
