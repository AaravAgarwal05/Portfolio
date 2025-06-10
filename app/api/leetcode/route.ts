import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username } = body;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `
          query userBadges($username: String!) {
            matchedUser(username: $username) {
              badges {
                id
                name
                shortName
                displayName
                icon
                hoverText
                medal {
                  slug
                  config {
                    iconGif
                    iconGifBackground
                  }
                }
                creationDate
                category
              }
            }
          }
        `,
        variables: { username },
        operationName: "userBadges",
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
