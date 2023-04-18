export const APP_CONSTANTS = {
  apiPrefix: '/revise',
  service: 'Revise API',
  params: 'params',
  query: 'query',
  body: 'body',
  file: 'file',
};

export const DEFAULT_PAGING = {
  limit: 10,
  skip: 0,
};

export const ROLES = {
  ADMIN: {
    name: 'ADMIN',
    value: 1,
  },
  APPROVER: {
    name: 'APPROVER',
    value: 2,
  },
  USER: {
    name: 'USER',
    value: 3,
  },
};

export const HOU_ENDPOINT = '.hou.edu.vn';

interface RankType {
  [key: string]: {
    name: string;
    score: number;
    level?: number;
  };
}

export const RANK_TYPE: RankType = {
  NOVICE: {
    name: 'NOVICE',
    score: 0,
    level: 0,
  },
  ENTHUSIAST: {
    name: 'ENTHUSIAST',
    score: 10,
    level: 1,
  },
  DEDICATED: {
    name: 'DEDICATED',
    score: 20,
    level: 2,
  },
  PASSIONATE: {
    name: 'PASSIONATE',
    score: 30,
    level: 3,
  },
  GURU: {
    name: 'GURU',
    score: 40,
    level: 4,
  },
};
