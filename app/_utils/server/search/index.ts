import { SearchEngineBasic } from './engines/basic'
export { initializedSearchBasic } from './processor'
const searchEngineBasic = new SearchEngineBasic()
export async function getSearchBasic() {
  searchEngineBasic.load()
  return searchEngineBasic
}
export default getSearchBasic
