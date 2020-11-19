const aws = require('aws-sdk');
const path = require('path');
const express = require("express");
const multer = require('multer');
const multerS3 = require('multer-s3');

const router = express.Router();

const s3 = new aws.S3({
 accessKeyId: 'AKIAWRAPQXD74ZWZFQQ5',
 secretAccessKey: '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',
 Bucket: 'buykitlist-media'
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'buykitlist-media',
        metadata: function (req, file, cb) {
            console.log(file);
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, `${Date.now()}_${file.originalname}`);
        }
    }),
    // limits: { fieldSize: 25 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        checkFileType( file, cb );

    }
});

function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );if( mimetype && extname ){
     return cb( null, true );
    } else {
     cb( 'Error: Images Only!' );
    }
}

const deleteFile = async (filePath) => {
    const fileName = filePath.substring(filePath.lastIndexOf('s3.amazonaws.com')+17);
    const params = { Bucket: 'youplanetstestfileupload', Key: fileName };

    s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack);  // error
        else console.log();                 // deleted
    });
}

module.exports = {
    upload: upload,
    deleteFile: deleteFile
}