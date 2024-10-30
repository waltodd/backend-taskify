import express from 'express'
import {signIn, signUp} from '../controllers/authController.js'
import {verifyToken} from '../utils/authUtils.js'

const router = express.Router();

router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.get('/me', verifyToken, getCurrentUser)

export default router