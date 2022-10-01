const express = require("express");
const app = express();
const port = 4000;

app.use(express.static("asg-ssl.akamaized.net"));

app.listen(port, () => {
    console.log(`AssetServer listening on port ${port}`);
});

