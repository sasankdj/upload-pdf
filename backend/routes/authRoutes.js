const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const {
  getAuthUrl,
  setCredentials
} = require("../config/drive");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  `${process.env.BASE_URL}/auth/google/callback`
);

// Step 1: Login
router.get("/google", (req, res) => {
  res.redirect(getAuthUrl());
});

// Step 2: Callback
router.get("/google/callback", async (req, res) => {
  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);
  setCredentials(tokens);

  res.send("✅ Google Drive Connected. You can now upload PDFs.");
});

module.exports = router;