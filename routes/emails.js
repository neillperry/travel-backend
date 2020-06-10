// manages the routes for creating, deleting, updating, and reading callback requests
let Email = require('../models/email').Email;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/', async (request, response) => {
  response.send(await Email.find());
});

router.post('/', async (request, response) => {
    let requestBody = request.body;
    let newEmail = new Email({
       id: uniqid(),
       name: requestBody.name,
       text: requestBody.text,
       email: requestBody.email,
       date: new Date()
    });
    await newEmail.save();
    response.send('Accepted!');
});

router.delete('/:id', async (request, response) => {
    await Email.deleteOne({id: request.params.id});
    response.send('Deleted!');
});

module.exports = router;
