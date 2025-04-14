import express from 'express'
import { bookMark, createContent, createShareableLink, createTag, getAllSharedPost, getContent, getShareLinkContent, getTypeLink, searchDoc, userSignIn, userSignup } from '../controllers/userController';
import { auth } from '../middleware/authentication';
import { checkAuth } from '../utils/checkAuth';

export const router  = express.Router();

router.route('/signup').post(userSignup)
router.route('/signin').post(userSignIn)
router.route('/add/content').post(auth, createContent)
router.route('/get/content/:id').get(auth, getContent)
router.route('/share/:contentId').get(createShareableLink)
router.route('/all/shared').get(getAllSharedPost)
router.route('/share/content/:link').get(getShareLinkContent)
router.route('/get/type').post(auth, getTypeLink)
router.route('/search').post(auth, searchDoc)
router.route('/create/tag').post(auth, createTag)
router.route('/create/bookmark').post(auth, bookMark)
router.route('/isauth').get(checkAuth)