import express from 'express'
import { createContent, createShareableLink, createTag, getContent, getShareLinkContent, getTypeLink, searchDoc, userSignIn, userSignup } from '../controllers/userController';
import { auth } from '../middleware/authentication';
import { checkAuth } from '../utils/checkAuth';

export const router  = express.Router();

router.route('/signup').post(userSignup)
router.route('/signin').post(userSignIn)
router.route('/add/content').post(auth, createContent)
router.route('/get/content/:id').get(auth, getContent)
router.route('/share').get(createShareableLink)
router.route('/share/content/:link').get(getShareLinkContent)
router.route('/get/type').post(getTypeLink)
router.route('/search').get(searchDoc)
router.route('/create/tag').post(createTag)
router.route('/isauth').get(checkAuth)