import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username } = body;

    // Fetch LeetCode Badges
    const leetCodePromise = fetch("https://leetcode.com/graphql", {
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
    })
      .then((res) => res.json())
      .catch((err) => ({ error: err }));

    // Fetch Google Drive Certificates
    const drivePromise = (async () => {
      try {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          },
          scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        });

        const drive = google.drive({ version: "v3", auth });
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

        if (
          !folderId ||
          !process.env.GOOGLE_CLIENT_EMAIL ||
          !process.env.GOOGLE_PRIVATE_KEY
        ) {
          console.warn("Google Drive credentials or Folder ID missing.");
          return [];
        }

        const response = await drive.files.list({
          q: `'${folderId}' in parents and (mimeType contains 'image/' or mimeType = 'application/pdf') and trashed = false`,
          fields:
            "files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink)",
        });

        return response.data.files || [];
      } catch (error) {
        console.error("Google Drive API Error:", error);
        return [];
      }
    })();

    const [leetCodeData, driveFiles] = await Promise.all([
      leetCodePromise,
      drivePromise,
    ]);

    return NextResponse.json({
      leetcode: leetCodeData,
      certificates: driveFiles,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
