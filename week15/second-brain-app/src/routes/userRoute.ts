import express from 'express'
import { createContent, createShareableLink, getContent, getShareLinkContent, userSignIn, userSignup } from '../controllers/userController';
import { auth } from '../middleware/authentication';

export const router  = express.Router();

router.route('/signup').post(userSignup)
router.route('/signin').post(userSignIn)
router.route('/add/content').post(auth, createContent)
router.route('/get/content/:id').get(auth, getContent)
router.route('/share').get(createShareableLink)
router.route('/share/content/:link').get(getShareLinkContent)
