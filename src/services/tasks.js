import { TasksCollection } from '../db/models/Task.js';

export const getTasks = async ({ page = 1, perPage = 10, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const tasksQuery = TasksCollection.find();

  if (filter.status) {
    tasksQuery.where('status').equals(filter.status);
  }

  const totalItems = await TasksCollection.find()
    .merge(tasksQuery)
    .countDocuments(); //загальна кількість (одразу число)

  const tasks = await tasksQuery.find().skip(skip).limit(limit);

  return {
    tasks,
    page,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
  };
};

export const getTaskById = async (filter) => {
  return await TasksCollection.findOne(filter);
};

export const addTask = (payload) => TasksCollection.create(payload);

export const updateTask = async (filter, payload, options = {}) => {
  const result = await TasksCollection.findOneAndUpdate(filter, payload, {
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  return {
    data: result.value,
  };
};

export const deleteTask = (filter) => TasksCollection.findOneAndDelete(filter);
