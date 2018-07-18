import multer from 'multer';
import crypto from 'crypto';
import mime from 'mime';
import httpStatus from 'http-status';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

let upload = multer({ storage: storage }).single('image');

function uploadFile(req, res) {
    let filename = '';
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res
                .status(httpStatus.UNPROCESSABLE_ENTITY)
                .send("An error occurred");
        }
        filename = req.file.filename;
        return res
            .status(httpStatus.OK)
            .send("http://localhost:8080/uploads/" + filename);
    });
}

export default { uploadFile }