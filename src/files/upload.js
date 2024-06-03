const fs = require('fs');
const path = require('path');

const upload = (req, res) => {
    const { name } = req.files.video;
    const { id } = req.body;

    let extension = name.split('.').pop();

    if (extension === name) {
        extension = '';
    }

    const videoFolder = path.join(process.cwd(), 'upload', id);

    let filename = 1;
    const filePath = path.join(process.cwd(), 'upload', id, `${filename}.${extension}`);

    if (!fs.existsSync(videoFolder)) {
        fs.mkdirSync(videoFolder, { recursive: true });
    }

    // if (!fs.existsSync(videoFolder)) {
    //     fs.mkdirSync(videoFolder, { recursive: true });
    // } else {
    //     filename = 0;
    //     do {
    //         filename += 1;
    //         filePath = path.join(process.cwd(), 'upload', id, `${filename}.${extension}`);
    //     } while(fs.existsSync(filePath));
    // }

    if (fs.existsSync(filePath)) {
        console.log(req.files.video.data);

        fs.appendFileSync(filePath, new Uint8Array(req.files.video.data), {});

        res.json({
            status: 'ok',
        });
    } else {
        req.files.video.mv(filePath, (err) => {
            if (err) {
                res.status(500);

                res.json(err);

                return;
            }

            res.json({
                status: 'ok',
            });
        });
    }

};

module.exports = upload;
