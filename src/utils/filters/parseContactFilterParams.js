import { STATUS_LIST } from '../../constants/tasks.js';

const parseStatus = (type) => {
  if (typeof type === 'string' && STATUS_LIST.includes(type)) {
    return type;
  }
  return undefined;
};

export const parseContactFilterParams = (query) => {
  const { status } = query;

  return {
    status: parseStatus(status),
  };
};
