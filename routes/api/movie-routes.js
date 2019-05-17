const router = require('express').Router();

const {moviePreference} = require("../../controllers/movie-controller");

router
  .route('/')
  .get(moviePreference);


module.exports = router;
