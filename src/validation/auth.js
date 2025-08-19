import Joi from 'joi';
import { emailRegexp } from '../constants/users.js';

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Email is not valid',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
});
