import { Request, Router } from "express";
import { createRomm, userSigin, userSignup } from "../controllers/controller";
import { auth } from "../middleware/auth";


export const router : Router= Router()


router.route('/signup').post(userSignup)
router.route('/login').post(userSigin)
router.route('/create/room').post(auth, createRomm)