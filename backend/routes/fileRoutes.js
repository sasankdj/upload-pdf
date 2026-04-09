const express = require("express");
const multer = require("multer");
const {
  uploadPDF,
  getFiles,
  searchFiles
} = require("../controllers/fileController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadPDF);
router.get("/files", getFiles);
router.get("/search", searchFiles);

module.exports = router;