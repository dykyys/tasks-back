import { STATUS_LIST } from '../../constants/tasks.js';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const buildTasksFilter = (filter = {}) => {
  const and = [];

  if (filter.status) {
    and.push({ status: filter.status });
  }

  if (typeof filter.search === 'string' && filter.search.trim()) {
    const re = new RegExp(escapeRegex(filter.search.trim()), 'i');
    and.push({ $or: [{ title: re }, { description: re }] });
  }

  return and.length ? { $and: and } : {};
};

const parseStatus = (type) => {
  if (typeof type === 'string' && STATUS_LIST.includes(type)) {
    return type;
  }
  return undefined;
};

export const parseContactFilterParams = (query) => {
  const { status, search } = query;

  return {
    status: parseStatus(status),
    search:
      typeof search === 'string' && search.trim() ? search.trim() : undefined,
  };
};
