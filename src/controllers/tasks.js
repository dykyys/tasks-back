import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import {
  addTask,
  getTaskById,
  getTasks,
  deleteTask,
  updateTask,
} from '../services/tasks.js';
import createHttpError from 'http-errors';

export const getTasksController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseContactFilterParams(req.query);

  const data = await getTasks({
    page,
    perPage,
    filter,
  });

  res.json(data);
};

export const getTaskByIdController = async (req, res, next) => {
  const { taskId } = req.params;
  const task = await getTaskById({ _id: taskId });

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json(task);
};

export const createTaskController = async (req, res, next) => {
  const task = await addTask({ ...req.body });
  res.status(201).json(task);
};

export const deleteTaskController = async (req, res) => {
  const { taskId } = req.params;

  const task = await deleteTask({ _id: taskId });

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json(task);
};

export const patchTaskController = async (req, res, next) => {
  const { taskId } = req.params;

  const result = await updateTask(taskId, req.body);

  if (!result) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json(result);
};
