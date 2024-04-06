import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import SERVER_CONFIG from "../config";
import commonConfig from "@/config";
import { SearchResponse } from "./types";

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");
  if (!keyword) {
    return NextResponse.json({ error: "No keyword provided" }, { status: 400 });
  }
  const searchResponse: SearchResponse = {
    results: [
      {
        title: "Next.js",
        url: "https://nextjs.org",
        description: "The React Framework for Production",
        image: "https://nextjs.org/og.png",
      },
      {
        title: "NextUI",
        url: "https://nextui.org",
        description: "A High-Quality React UI Library",
        image: "https://nextui.org/og.png",
      },
    ],
  };
  return NextResponse.json(searchResponse, { status: 200 });
}
