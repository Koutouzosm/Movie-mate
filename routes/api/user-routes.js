const router = require('express').Router();

const {
  register,
  login,
  getUserProfile,
  getMovies
} = require('../../controllers/user-controller');

const withAuth = require('../../middleware/authentication');


// GET user profile '/api/user'
router
  .route('/')
  .get(withAuth, getUserProfile);

// POST register user '/api/user/register'
router
  .route('/register')
  .post(register);

// POST login user '/api/user/login'
router
  .route('/login')
  .post(login);

// GET route to match
router
.route('/movies')
.get(withAuth, getMovies)




module.exports = router;