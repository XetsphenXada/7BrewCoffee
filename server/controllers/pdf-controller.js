import { Router } from "express";
import "dotenv/config";
import crypto from "crypto";
import path from "path";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import { gfs, gridFsBucket } from "../app.js";
import ExpressFormidable from "express-formidable";
import fileSystem from "fs";

const router = Router();

// upload pdf to database
router.post("/pdf/upload", ExpressFormidable, (request, response) => {
    try {
        console.log("starting upload of pdf")

        const file = request.files.file;
        const filePath = (new Date().getTime()) + "-" + file.name;

        fileSystem.createReadStream(file.path).pipe(gridFsBucket.openUploadStream(filePath, {
            chunkSizeBytes: 1048576,
            metadata: {
                name: file.name,
                size: file.size,
                type: file.type
            }
        })).on("finish", () => resourceLimits.redirect("/"));

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

// get single pdf file from database
router.get("/pdf/:filename", async (request, response) => {
    
});

export default router;