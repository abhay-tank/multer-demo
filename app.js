const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ storage: "uploads/" });

app.post("/", upload.single("proficPicture"), (req, res) => {
	console.log(req.file);
});

app.listen(3000, () => {
	console.log(`Server running on http://localhost:3000`);
});
