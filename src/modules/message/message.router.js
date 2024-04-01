import { Router } from "express";
import * as MessageController from "./message.controller.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import auth from "../../middleware/auth.js";

const router = Router();
router.get('/',asyncHandler(auth),asyncHandler(MessageController.getMessages))
router.post('/:receiverId',asyncHandler(auth),asyncHandler(MessageController.sendMessage))



export default router;