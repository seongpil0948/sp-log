import { NextRequest, NextResponse } from "next/server";
import { SearchResponse } from "./types";
import getSearchBasic from "@/app/_utils/server/search";

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");
  if (!keyword) {
    return NextResponse.json({ error: "No keyword provided" }, { status: 400 });
  }
  const searchBasic = await getSearchBasic();
  const searchResult = searchBasic.search(keyword);
  const searchResponse: SearchResponse = {
    results: searchResult,
  };
  return NextResponse.json(searchResponse, { status: 200 });
}
