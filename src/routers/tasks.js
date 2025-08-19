import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  createTaskController,
  deleteTaskController,
  getTaskByIdController,
  getTasksController,
  patchTaskController,
} from '../controllers/tasks.js';
import { taskAddSchema, taskUpdateSchema } from '../validation/task.js';

const tasksRouter = Router();
tasksRouter.use(authenticate);

tasksRouter.get('/', ctrlWrapper(getTasksController));
tasksRouter.get('/:taskId', isValidId, ctrlWrapper(getTaskByIdController));
tasksRouter.post(
  '/',
  validateBody(taskAddSchema),
  ctrlWrapper(createTaskController),
);

tasksRouter.patch(
  '/:taskId',
  isValidId,
  validateBody(taskUpdateSchema),
  ctrlWrapper(patchTaskController),
);
tasksRouter.delete('/:taskId', isValidId, ctrlWrapper(deleteTaskController));

export default tasksRouter;
