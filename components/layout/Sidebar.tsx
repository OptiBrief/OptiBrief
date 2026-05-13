'use client'
import React from 'react'
import { cn } from '@/lib/utils'

export type View = 'feed' | 'narratives' | 'explain' | 'watchlist' | 'brief' | 'pulse'

const NAV = [
  { id: 'feed',       label: 'My Feed',     icon: '◈', description: 'Personalized intelligence' },
  { id: 'brief',      label: 'Daily Brief', icon: '◉', description: 'What matters today'        },
  { id: 'narratives', label: 'Narratives',  icon: '◎', description: 'Market themes'             },
  { id: 'explain',    label: 'Explain Move',icon: '◐', description: 'Why stocks moved'          },
  { id: 'watchlist',  label: 'Watchlist',   icon: '◌', description: 'AI-monitored assets'       },
  { id: 'pulse',      label: 'Market Pulse',icon: '◍', description: 'Global overview'           },
] as const

interface SidebarProps {
  active: View
  onSelect: (v: View) => void
}

export default function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="w-56 shrink-0 flex flex-col h-full border-r border-ink-border bg-ink-50/50">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-ink-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-signal flex items-center justify-center shadow-glow-sm">
            <span className="text-white text-xs font-black">O</span>
          </div>
          <div>
            <div className="text-ink-bright font-semibold text-sm tracking-tight">OptiBrief</div>
            <div className="text-[10px] text-ink-dim mt-0.5">AI Market Intelligence</div>
          </div>
        </div>
      </div>

      {/* User profile */}
      <div className="px-4 py-4 border-b border-ink-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-signal/30 to-pulse/30 border border-signal/border flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-signal">A</span>
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-ink-soft truncate">Alex</div>
            <div className="text-[10px] text-ink-dim truncate">Swing Trader</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id as View)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150',
              active === item.id
                ? 'bg-signal/10 text-signal border border-signal/border shadow-[inset_0_1px_0_rgba(91,140,248,0.1)]'
                : 'text-ink-text hover:text-ink-soft hover:bg-ink-subtle/30'
            )}
          >
            <span className={cn('text-base leading-none', active === item.id ? 'text-signal' : 'text-ink-dim')}>
              {item.icon}
            </span>
            <span className="text-[13px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-ink-border">
        <div className="text-[10px] text-ink-dim leading-relaxed">
          Not financial advice. For informational purposes only.
        </div>
      </div>
    </aside>
  )
}
