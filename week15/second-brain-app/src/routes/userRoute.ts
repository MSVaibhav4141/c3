import express from 'express'
import { allowAccessToUser, bookMark, changeVisibilty, checkForToken, createContent, createShareableLink, createTag, deleteContent, deleteShareableLink, getAllowedUser, getAllSharedPost, getContent, getExsitingAllowedUsers, getShareLinkContent, getTypeLink, getUserContentPublic, getUserDetails, getUserName, removeAccesFromUser, resetUserPassword, searchDoc, sendResetTokenOnMail, userSignIn, userSignup } from '../controllers/userController';
import { auth } from '../middleware/authentication';
import { checkAuth } from '../utils/checkAuth';

export const router  = express.Router();

router.route('/signup').post(userSignup)
router.route('/signin').post(userSignIn)
router.route('/add/content').post(auth, createContent)
router.route('/get/content/:name').get(auth, getContent)
router.route('/delete/content/:postId').delete(auth, deleteContent)
router.route('/public/user/:name').get(getUserContentPublic)
router.route('/users/allowed').get(auth,getAllowedUser)
router.route('/allow/user').post(auth,allowAccessToUser)
router.route('/remove/user/:userId').delete(auth,removeAccesFromUser)
router.route('/change/visibility').put(auth, changeVisibilty)
router.route('/allow/get/user/:name').get(auth,getExsitingAllowedUsers)
router.route('/share/:contentId').get(auth,createShareableLink)
router.route('/remove/link/:postId').delete(auth, deleteShareableLink)
router.route('/all/shared').get(auth, getAllSharedPost)
router.route('/share/content/:hash').get(getShareLinkContent)
router.route('/get/type').post(auth, getTypeLink)
router.route('/search').post(auth, searchDoc)
router.route('/create/tag').post(auth, createTag)
router.route('/create/bookmark').post(auth, bookMark)
router.route('/user/info').get(auth, getUserDetails)
router.route('/user/:name').get(getUserName)
router.route('/isauth').get(checkAuth)
router.route('/send/reset/password').post(sendResetTokenOnMail)
router.route('/reset/password').post(resetUserPassword)
router.route('/check/reset/:token/:userId').get(checkForToken)