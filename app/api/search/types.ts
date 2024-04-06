export interface SearchQuery {
  keyword: string;
}

export interface SearchResult {
  title: string;
  url: string;
  description: string;
  image: string;
}

export interface SearchResponse {
  results: SearchResult[];
}
