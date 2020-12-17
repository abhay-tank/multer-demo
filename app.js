const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: path.join(__dirname, "config.env") });

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const userDirectory = path.join(
			__dirname,
			process.env.PICTURE_CDN,
			req.body.uid
		);
		const dirExists = fs.existsSync(userDirectory);
		if (!dirExists) {
			fs.mkdirSync(userDirectory);
		}
		return cb(null, userDirectory);
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	},
});
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 10 } });

app.use(express.json());
app.post("/", upload.single("profilePicture"), (req, res) => {
	console.log(req.body.name);
	console.log(req.file);
	const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
	let picturePath = req.body.uid + "/" + req.file.filename;
	res.send(fullUrl + picturePath);
});

app.use(express.static(process.env.PICTURE_CDN));

app.listen(3000, () => {
	console.log(`Server running on http://localhost:3000`);
});
