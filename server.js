const path = require('path');
require('dotenv').config({ path: '/custom/path/to/.env' });
const express = require('express');
const bodyParser = require('body-parser');

const eworkLogUsersController = require('./controller/eworklog-users.controller');
const eworkLogConfigController = require('./controller/eworklog-config.controller');
const eworkLogController = require('./controller/eworklog.controller');

console.log("***");
console.log(process.env.HOST);

const app = express();
const port = process.env.PORT || 3000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.json());
//app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});

app.post('/api/user/signUp', (req, res) => {
    console.log(req.body);
    eworkLogUsersController.signUp(req.body).then(data => res.json(data));
});

app.post('/api/user/signIn', (req, res) => {
    console.log(req.body);
    eworkLogUsersController.signIn(req.body).then(data => res.json(data));
});

app.get('/api/user/:username', (req, res) => {
    console.log(req.body);
    eworkLogUsersController.getUser(req.params.username).then(data => res.json(data));
});

app.put('/api/user/reset', (req, res) => {
    console.log(req.body);
    eworkLogUsersController.resetPassword(req.body).then(data => res.json(data));
});

app.get('/api/config', (req, res) => {
    eworkLogConfigController.getConfigValues().then(data => res.json(data));
});

app.post('/api/config', (req, res) => {
    console.log(req.body);
    eworkLogConfigController.addConfigValue(req.body).then(data => res.json(data));
});

app.get('/api/config/values', (req, res) => {
    eworkLogConfigController.getConfigValuesByType(req.query.type).then(data => res.json(data));
});

app.post('/api/worklog', (req, res) => {
    console.log(req.body);
    eworkLogController.create(req.body).then(data => res.json(data));
});

app.put('/api/worklog', (req, res) => {
    console.log(req.body);
    eworkLogController.update(req.body).then(data => res.json(data));
});

app.get('/api/worklog/user/:userId/limit/:limit?', (req, res) => {
    eworkLogController.getTasks(req.params.userId, req.params.limit).then(data => res.json(data));
});

app.get('/api/worklog/task/:taskId', (req, res) => {
    eworkLogController.getTask(req.params.taskId).then(data => res.json(data));
});

app.get('/api/worklog/hours/:userId/period/:period', (req, res) => {
    eworkLogController.getNoOfSavedHours(req.params.userId, req.params.period).then(data => res.json(data));
});

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})