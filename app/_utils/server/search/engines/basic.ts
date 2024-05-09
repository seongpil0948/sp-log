import type { SearchDoc, SearchResult } from '@/app/api/search/types'
import fs from 'node:fs'

export interface SearchEngineCommon {
  docs: SearchDoc[]
  cache: { [keyword: string]: SearchResult[] }
  clear(): void
  save(): void
  addDoc(doc: SearchDoc): void
  addCache(keyword: string, searchResult: SearchResult[]): void
  search(keyword: string): SearchResult[]
  load: () => void
}

export class SearchEngineBasic implements SearchEngineCommon {
  docs: SearchDoc[]
  cache: { [keyword: string]: SearchResult[] }
  constructor() {
    this.docs = []
    this.cache = {}
  }

  static JSON_PATH = '/search-docs.json'
  static JSON_BUILD_PATH = '/public' + SearchEngineBasic.JSON_PATH

  public get isLoaded(): boolean {
    return this.docs.length > 0
  }

  clear() {
    this.docs = []
    this.cache = {}
    if (fs.existsSync(SearchEngineBasic.JSON_BUILD_PATH)) {
      fs.rmSync(SearchEngineBasic.JSON_BUILD_PATH)
    }
  }

  addDoc(doc: SearchDoc) {
    this.docs.push(doc)
  }

  addCache(keyword: string, searchResult: SearchResult[]) {
    this.cache[keyword] = searchResult
  }

  search(keyword: string): SearchResult[] {
    console.log('state in search: ', this.docs.length, Object.keys(this.cache))
    if (this.cache[keyword]) {
      console.info('hit the cache for search: ', keyword)
      return this.cache[keyword]
    } else {
      console.info('searching new keyword: ', keyword)
    }
    const result: SearchResult[] = []
    this.docs.forEach(doc => {
      const index = doc.content.indexOf(keyword)
      if (index !== -1) {
        const start = index - 5
        const end = index + 20
        const exist = result.find(r => r.href === doc.href)
        const content = doc.content.slice(start, end)
        if (content.trim().length > 3) {
          if (!exist) {
            result.push({
              href: doc.href,
              title: doc.title,
              matchedContent: [content],
            })
          } else if (exist.matchedContent.every(c => c !== content)) {
            exist.matchedContent.push(content)
          }
        }
      }
    })
    this.cache[keyword] = result
    return result
  }
  get toJson() {
    return JSON.stringify(this.docs)
  }

  save() {
    fs.writeFileSync(SearchEngineBasic.JSON_BUILD_PATH, this.toJson)
  }
  load() {
    if (!fs.existsSync(SearchEngineBasic.JSON_PATH)) {
      throw new Error(
        `not initialized search engine,${SearchEngineBasic.JSON_PATH} is not found`,
      )
    }
    const data = fs.readFileSync(SearchEngineBasic.JSON_PATH, 'utf-8')
    this.docs = JSON.parse(data)
  }
}
