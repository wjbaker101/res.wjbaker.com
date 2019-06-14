const express = require('express');
const router = express.Router();
const multer = require('multer');

const imageUploadService = require('../service/ImageUploadService.js');
const Auth = require('../auth/Auth.js');

const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MiB
    },
});

router.post('/upload/image', Auth.requireAuth, upload.single('image'), async (request, response) => {
    try {
        const result = await imageUploadService.uploadImage(request.file.buffer);

        response.status(201).send({
            result: result.url,
        });
    }
    catch (exception) {
        response.status(400).send({
            error: 'Unable to upload image.',
        });
    }
});

module.exports = router;