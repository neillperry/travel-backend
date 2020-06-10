// manages the routes for creating, deleting, updating, and reading callback requests
let CallbackRequest = require('../models/callback-request').CallbackRequest;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/', async (request, response) => {
  response.send(await CallbackRequest.find());
});

router.post('/', async (request, response) => {
    let requestBody = request.body;
    let newRequest = new CallbackRequest({
       id: uniqid(),
       phoneNumber: requestBody.phoneNumber,
       date: new Date()
    });
    await newRequest.save();
    response.send('Accepted!');
});

router.delete('/:id', async (request, response) => {
    await CallbackRequest.deleteOne({id: request.params.id});
    response.send('Deleted!');
});

module.exports = router;
