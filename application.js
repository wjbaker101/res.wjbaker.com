const express = require('express');
const app = express();
const path = require('path');

const properties = require('./properties.json');
const DateUtils = require('./util/DateUtils.js');

const controllers = [
    require('./controller/ImageUploadController.js'),
];

app.use((request, response, next) => {
    const now = DateUtils.formatDate(new Date());
    console.log(`${now} - ${request.path}`);

    next();
});

controllers.forEach(controller => {
    app.use(controller);

    controller.stack
            .filter(r => r && r.route && r.route.path)
            .map(r => r.route.path)
            .forEach(p => console.log(`Exposing: ${p}`));
});

app.use('/static', express.static(path.join(__dirname, 'static')));

app.listen(properties.server.port, () => {
    console.log(`Started application on port ${properties.server.port}.`);
});