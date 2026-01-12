import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    // Search for the resume file by name globally (not restricted to a specific folder)
    const result = await drive.files.list({
      q: "name = 'Aarav_Agarwal_Resume.pdf' and trashed = false",
      fields: "files(id, name, webViewLink, webContentLink)",
      pageSize: 1,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    const files = result.data.files;

    if (files && files.length > 0) {
      const file = files[0];
      // Redirect to the Google Drive View Link
      // webViewLink is the link to view the file in Google Drive
      if (file.webViewLink) {
         return NextResponse.redirect(file.webViewLink);
      }
    }

    // Fallback if not found or no link
    return NextResponse.json(
      { error: "Resume file not found in Google Drive." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Google Drive API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
