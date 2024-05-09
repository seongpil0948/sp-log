export interface SearchQuery {
  keyword: string
}

interface DocBase {
  title: string
  href: string
}
export interface SearchDoc extends DocBase {
  content: string
}
export interface SearchResult extends DocBase {
  matchedContent: string[]
}

export interface SearchResponse {
  results: SearchResult[]
}
