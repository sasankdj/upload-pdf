import { google } from "googleapis";
// import {google }from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  `${process.env.BACKEND_URI}/auth/google/callback`
);

// store tokens globally (simple version)
let oauthTokens = null;

const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.file"]
  });
};

const setCredentials = (tokens) => {
  oauthTokens = tokens;
  oauth2Client.setCredentials(tokens);
};

const getDrive = () => {
  if (!oauthTokens) throw new Error("User not authenticated");

  return google.drive({
    version: "v3",
    auth: oauth2Client
  });
};

export { getAuthUrl, setCredentials, getDrive };