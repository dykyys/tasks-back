import { TasksCollection } from '../db/models/Task.js';
import { buildTasksFilter } from '../utils/filters/parseContactFilterParams.js';

export const getTasks = async ({ page = 1, perPage = 10, filter = {} }) => {
  const limit = Number(perPage) || 10;
  const skip = (Number(page) > 0 ? Number(page) - 1 : 0) * limit;

  const mongoFilter = buildTasksFilter(filter);

  const totalItems = await TasksCollection.countDocuments(mongoFilter);

  const tasks = await TasksCollection.find(mongoFilter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    tasks,
    page: Number(page) || 1,
    perPage: limit,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  };
};

export const getTaskById = async (filter) => {
  return await TasksCollection.findOne(filter);
};

export const addTask = (payload) => TasksCollection.create(payload);

export const updateTask = async (filter, payload, options = {}) => {
  const result = await TasksCollection.findByIdAndUpdate(filter, payload, {
    new: true,
  });
  return result;
};

export const deleteTask = (filter) => TasksCollection.findOneAndDelete(filter);
