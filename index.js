const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const filesRouter = require('./src/files');

app.use(cors());

app.use('/files', filesRouter);

app.listen(port, () => {
    console.log(`Приложение запущено и слушает порт ${port}`);
});
