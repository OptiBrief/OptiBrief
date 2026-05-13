import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Sentiment, Urgency, Conviction } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmtPrice(n: number): string {
  if (n >= 1000) return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  return `$${n.toFixed(2)}`
}

export function fmtPct(n: number): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`
}

export function sentimentColors(s: Sentiment) {
  return {
    Bullish: { text: 'text-up',   bg: 'bg-up/10',   border: 'border-up/20',   dot: 'bg-up'   },
    Bearish: { text: 'text-down', bg: 'bg-down/10',  border: 'border-down/20', dot: 'bg-down' },
    Neutral: { text: 'text-ink-sub',bg:'bg-ink-subtle/40',border:'border-ink-border',dot:'bg-ink-dim'},
    Mixed:   { text: 'text-warn',  bg: 'bg-warn/10',  border: 'border-warn/20', dot: 'bg-warn'  },
  }[s]
}

export function urgencyColors(u: Urgency) {
  return {
    Breaking: { text: 'text-down',   bg: 'bg-down/10',  badge: 'bg-down/15 text-down border-down/25'  },
    High:     { text: 'text-warn',   bg: 'bg-warn/10',  badge: 'bg-warn/15 text-warn border-warn/25'  },
    Medium:   { text: 'text-signal', bg: 'bg-signal/10',badge: 'bg-signal/10 text-signal border-signal/border' },
    Low:      { text: 'text-ink-dim',bg: 'bg-ink-subtle/30',badge: 'bg-ink-subtle/40 text-ink-sub border-ink-border' },
  }[u]
}

export function confidenceLabel(n: number): { label: string; color: string } {
  if (n >= 80) return { label: 'High confidence',   color: 'text-up'      }
  if (n >= 60) return { label: 'Medium confidence', color: 'text-ink-soft' }
  if (n >= 40) return { label: 'Uncertain signals', color: 'text-warn'     }
  return           { label: 'Low conviction',     color: 'text-ink-dim'  }
}

export function narrativeMomentumBar(n: number): string {
  if (n >= 80) return 'bg-up'
  if (n >= 60) return 'bg-signal'
  if (n >= 40) return 'bg-warn'
  return 'bg-ink-dim'
}
