require("../config/database");
const express = require("express");
const routes = require("../routes/index.route");
const app = express();



app.use(require("./middlewares"));
app.use(routes);

app.use((err, _req, res, _next) => {

    const msg = err.message ? err.message : "Server Error Occurred"
    const status = err.status ? err.status : 500
    console.log(err);
    res.status(status).json({
        message: msg
    })
})

app.use('*', (_req, res) =>{
    res.status(404).json({message: "404, Bad URL"})
})


module.exports = app;
