const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const upload = require('./upload');
const stream = require('./stream');

const router = express.Router();

router.use('/_download', express.static(path.join(process.cwd(), 'upload')));

router.post('/_upload', fileUpload({}), upload);
router.get('/_stream/:id', stream);

module.exports = router;
