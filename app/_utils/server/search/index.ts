import { SearchEngineBasic } from "./basic";
import { initializedSearchBasic } from "./processor";

let initialized = false;
const searchBasic = new SearchEngineBasic();
export const getSearchBasic = async () => {
  if (!initialized) {
    console.log("initializing searchBasic");
    await initializedSearchBasic(searchBasic);
    initialized = true;
  }
  return searchBasic;
};

export default getSearchBasic;
