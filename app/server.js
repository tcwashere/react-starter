import express from 'express';
import path from 'path';
import open from 'open';
import config from '../webpack.config.dev';
import webpack from 'webpack';

const compiler = webpack(config);
const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

// api: /hello
app.get("/hello", (req, res) => {
    res.send("Hello World!");
});

// default web
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'src/index.html'));
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
