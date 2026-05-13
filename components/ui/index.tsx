'use client'
import React from 'react'
import { cn } from '@/lib/utils'

// ── Confidence Ring ───────────────────────────────────────────
export function ConfidenceRing({ value, size = 40 }: { value: number; size?: number }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const filled = (value / 100) * circ
  const color = value >= 80 ? '#34d399' : value >= 60 ? '#5b8cf8' : value >= 40 ? '#fbbf24' : '#6b7280'

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={`${filled} ${circ}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.8s ease' }} />
      </svg>
      <span className="absolute text-[10px] font-mono font-semibold" style={{ color }}>{value}</span>
    </div>
  )
}

// ── Score Bar ─────────────────────────────────────────────────
export function ScoreBar({ value, color = 'bg-signal', className }: { value: number; color?: string; className?: string }) {
  return (
    <div className={cn('h-1 rounded-full bg-white/6 overflow-hidden', className)}>
      <div className={cn('h-full rounded-full transition-all duration-700', color)} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  )
}

// ── Relevance Pill ────────────────────────────────────────────
export function RelevancePill({ value }: { value: number }) {
  const isHigh = value >= 85
  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full border',
      isHigh
        ? 'bg-signal/10 text-signal border-signal/border'
        : 'bg-ink-subtle/30 text-ink-sub border-ink-border'
    )}>
      <span className={cn('w-1 h-1 rounded-full', isHigh ? 'bg-signal animate-breathe' : 'bg-ink-dim')} />
      {value}% match
    </span>
  )
}

// ── Ticker Tag ────────────────────────────────────────────────
export function TickerTag({ ticker }: { ticker: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold text-ink-soft bg-ink-subtle/30 border border-ink-border hover:bg-ink-subtle/50 hover:text-ink-bright transition-colors cursor-default">
      {ticker}
    </span>
  )
}

// ── Section Header ────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-ink-bright tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-ink-dim mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

// ── Skeleton Loader ───────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      'rounded-xl bg-gradient-to-r from-ink-150 via-ink-200 to-ink-150 bg-[length:200%_100%] animate-shimmer',
      className
    )} />
  )
}

// ── Sentiment Badge ───────────────────────────────────────────
export function SentimentDot({ sentiment }: { sentiment: 'Bullish' | 'Bearish' | 'Neutral' | 'Mixed' }) {
  const colors = {
    Bullish: 'bg-up',
    Bearish: 'bg-down',
    Neutral: 'bg-ink-dim',
    Mixed:   'bg-warn',
  }
  return <span className={cn('inline-block w-2 h-2 rounded-full', colors[sentiment])} />
}

// ── Divider ───────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px bg-ink-border', className)} />
}
