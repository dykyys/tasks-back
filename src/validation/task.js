import Joi from 'joi';
import { STATUS_LIST } from '../constants/tasks.js';

export const taskAddSchema = Joi.object({
  title: Joi.string().min(3).max(10).required().messages({
    'string.min': 'title min length 3 characters',
    'string.max': 'title max length 10 characters',
    'any.required': 'title is required',
  }),
  description: Joi.string().min(3).max(50).required().messages({
    'string.min': 'description min length 3 characters',
    'string.max': 'description max length 50 characters',
    'any.required': 'description is required',
  }),
  status: Joi.string()
    .valid(...STATUS_LIST)
    .required(),
});

export const taskUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(10).messages({
    'string.min': 'title min length 3 characters',
    'string.max': 'title max length 10 characters',
    'any.required': 'title is required',
  }),
  description: Joi.string().min(3).max(50).messages({
    'string.min': 'description min length 3 characters',
    'string.max': 'description max length 50 characters',
    'any.required': 'description is required',
  }),
  status: Joi.string().valid(...STATUS_LIST),
});
