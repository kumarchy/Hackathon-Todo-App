import express from 'express';
const router = express.Router();
const { googleOAuthLogin } = require('../controllers/userController');

router.post('/oauth/google', googleOAuthLogin);

module.exports = router;
