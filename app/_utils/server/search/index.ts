import { SearchEngineBasic } from "./basic";
import { initializedSearchBasic } from "./processor";

const searchEngineBasic = new SearchEngineBasic();
let initialized = false;
export async function getSearchBasic() {
  if (!searchEngineBasic.existsJsonFile) {
    if (!initialized) {
      console.count(`${new Date().toISOString()} - initialize search basic`);
      await initializedSearchBasic(searchEngineBasic);
      searchEngineBasic.saveJsonFile();
    }
  }
  if (!searchEngineBasic.isLoaded) {
    console.count(`${new Date().toISOString()} - load search basic json file`);
    searchEngineBasic.loadJsonFile();
  }
  return searchEngineBasic;
}
export default getSearchBasic;
