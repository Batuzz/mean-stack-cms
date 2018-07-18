import express from 'express';
import UploadController from '../controllers/upload.controller';

const router = express.Router();

router.route('/')

/** POST    /api/upload     Upload single file */
    .post(UploadController.uploadFile);


export default router;