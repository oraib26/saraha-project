import { Router } from "express";
import * as UserController from "./user.controller.js";
import auth from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/errorHandling.js";

const router = Router();

router.get('/profile',asyncHandler(auth), asyncHandler(UserController.profile))
router.delete('/', asyncHandler(auth),asyncHandler(UserController.deleteUser))



export default router;