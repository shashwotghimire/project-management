import multer from "multer";
import path from "path";

const allowedExtensions = new Set([".jpg", ".jpeg", ".png"]);

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.has(extension)) {
      return cb(new Error("Unsupported file type. Only JPG and PNG are allowed."));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
