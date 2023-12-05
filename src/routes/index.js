const express = require('express');
const genresRouter = require('./genres.router');
const acotrsRouter = require('./actors.router');
const directorsRouter = require('./directors');
const moviesRouter = require('./movies.router');
const router = express.Router();


router.use('/genres', genresRouter)
router.use('/actors', acotrsRouter)
router.use('/directors', directorsRouter)
router.use('/movies', moviesRouter)

module.exports = router;