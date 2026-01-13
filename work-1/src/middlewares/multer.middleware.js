import multer from "multer";
import path from "path";
import fs from "fs";

const tempFolder = './public/temp';
if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder, { recursive: true });
}

// MULTER STORAGE CONFIGURATION
const storage = multer.diskStorage({
    // Where to store the uploaded files temporarily
    destination: function (req, file, cb) {
        cb(null, tempFolder); // temp folder
    },
    // How to name the uploaded files
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // get file extension
        const name = file.fieldname + '-' + Date.now() + ext; // e.g. avatar-168123456.png
        cb(null, name);
    }
});

// Optional: Filter only image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// MULTER UPLOAD MIDDLEWARE
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // limit 5MB per file
    }
});
