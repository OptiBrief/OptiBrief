export type Sentiment  = 'Bullish' | 'Bearish' | 'Neutral' | 'Mixed'
export type Urgency    = 'Breaking' | 'High' | 'Medium' | 'Low'
export type Conviction = 'High' | 'Medium' | 'Low'
export type Direction  = 'Accelerating' | 'Decelerating' | 'Stable' | 'Reversing'

export interface FeedItem {
  id:             string
  headline:       string
  summary:        string
  whyItMatters:   string
  whyYouSeeThis:  string          // personalization reason
  nextImplication: string         // "What could happen next"
  narrativeTags:  string[]
  tickers:        string[]
  sentiment:      Sentiment
  urgency:        Urgency
  confidence:     number          // 0–100
  relevance:      number          // 0–100 to this user
  source:         string
  timeAgo:        string
  category:       string
  conflictingSignals?: string     // uncertainty layer
}

export interface Narrative {
  id:          string
  name:        string
  description: string
  momentum:    number             // 0–100
  direction:   Direction
  sentiment:   Sentiment
  tickers:     string[]
  explanation: string
  institutionalAttention: 'Rising' | 'Stable' | 'Falling'
  change7d:    number             // momentum change over 7 days
  color:       string
  icon:        string
}

export interface MoveExplanation {
  ticker:         string
  name:           string
  price:          number
  change:         number
  changePct:      number
  primaryReason:  string
  aiNarrative:    string
  catalysts:      string[]
  sectorSymapthy: string
  macroInfluence: string
  optionsNote:    string
  earningsNote:   string
  confidence:     number
  riskNote:       string
  nextToWatch:    string
}

export interface WatchlistItem {
  ticker:      string
  name:        string
  price:       number
  change:      number
  changePct:   number
  alert:       string | null
  narratives:  string[]
  sentiment:   Sentiment
  aiNote:      string
  urgency:     Urgency
}

export interface DailyBrief {
  greeting:    string
  date:        string
  subtitle:    string
  topEvents:   BriefEvent[]
  macroRisk:   string
  narrativeShift: string
  watchToday:  string
  confidence:  string
}

export interface BriefEvent {
  id:         string
  headline:   string
  impact:     string
  relevance:  string
  tickers:    string[]
  sentiment:  Sentiment
}

export interface MarketPulse {
  overallSentiment: Sentiment
  sentimentScore:   number        // -100 to +100
  volatilityLevel:  'Extreme' | 'High' | 'Elevated' | 'Normal' | 'Low'
  riskAppetite:     'Risk-On' | 'Neutral' | 'Risk-Off'
  institutionalBias:string
  fearGreed:        number        // 0-100
  topNarratives:    string[]
  summary:          string
  vix:              number
}

export interface UserProfile {
  name:           string
  tradingStyle:   string
  riskTolerance:  string
  watchlist:      string[]
  focusNarratives:string[]
  experience:     string
}
