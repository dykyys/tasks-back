import { Router } from 'express';

import * as authController from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { authRegisterSchema } from '../validation/auth.js';

const authRouter = Router();

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

authRouter.post(
  '/register',
  upload.none(),
  validateBody(authRegisterSchema),
  ctrlWrapper(authController.registerController),
);

export default authRouter;
