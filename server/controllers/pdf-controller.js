import { Router } from "express";
import "dotenv/config";
import crypto from "crypto";
import path from "path";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const router = Router();

const storage = new GridFsStorage({
    url: process.env.MONGODB,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage }).single("file");

// upload pdf to database
router.post("/pdf/upload", upload, async (request, response) => {
    try {
        console.log("starting upload of pdf")
        response.send({ 
            message: "Pdf successfully uploaded to database."
        });
    }
    catch(err) {
        response.status(500).send({
            message: err.message
        });
    }
});

export default router;6