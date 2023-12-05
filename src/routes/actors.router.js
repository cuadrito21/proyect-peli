const { getAll, create, getOne, remove, update } = require('../controllers/actors.controllers');
const express = require('express');

const acotrsRouter = express.Router();

acotrsRouter.route('/')
    .get(getAll)
    .post(create);

acotrsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = acotrsRouter;