import express from 'express';
import path from 'path';
import open from 'open';

var app = express();

var hello = require("./hello");

// default api
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get('/hello', function (req, res) {
    res.sendFile(path.join(__dirname, './src/hello.html'));
});

const port = 8080;
app.listen(port, function (error) { //starts the server
    console.log(`server is listening on port ${port}`);
    if(error) {
        console.log(error);
    } else {
        open(`http://localhost:${port}`);
    }
});
