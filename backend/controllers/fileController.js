const File = require("../models/File");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { getDrive } = require("../config/drive");

const extractTopics = (text) => {
  const keywords = ["array", "stack", "queue", "tree", "linked list"];
  return keywords.filter(k => text.toLowerCase().includes(k));
};

exports.uploadPDF = async (req, res) => {
  try {
    const drive = getDrive();

    const filePath = req.file.path;

    // extract text
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);

    const topics = extractTopics(data.text);

    // upload to drive
   const response = await drive.files.create({
  requestBody: {
    name: req.file.originalname,
    parents: ["1wySosmcKjZc1MokDBAP2oNsa-GL9TmTO"]   // ✅ ADD THIS
  },
  media: {
    mimeType: "application/pdf",
    body: fs.createReadStream(filePath)
  },
  fields: "id"
});
    const file = await File.create({
      name: req.file.originalname,
      driveId: response.data.id,
      driveLink: `https://drive.google.com/file/d/${response.data.id}/view`,
      topics
    });

    fs.unlinkSync(filePath);

    res.json(file);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getFiles = async (req, res) => {
  const files = await File.find().sort({ createdAt: -1 });
  res.json(files);
};

exports.searchFiles = async (req, res) => {
  const q = req.query.q || "";

  const files = await File.find({
    topics: { $regex: q, $options: "i" }
  });

  res.json(files);
};