import { SearchEngineBasic } from "./basic";
import { initializedSearchBasic } from "./processor";

let initialized = false;
const searchBasic = new SearchEngineBasic();
export const getSearchBasic = async () => {
  if (!initialized) {
    initialized = true;
    await initializedSearchBasic(searchBasic);
  }
  return searchBasic;
};

export default getSearchBasic;
