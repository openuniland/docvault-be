import User from 'models/types/User';
import { RANK_TYPE } from './constants';

export const hideUserInfoIfRequired = (user: User) => {
  if (!user) {
    return null;
  }

  if (user?.is_show_info) {
    return user;
  }

  return {
    _id: user?._id,
    nickname: user?.nickname,
    rank: user?.rank,
  };
};

export const checkRankCompatibility = (userRank: string, postRank: string) => {
  const levelOfUserRank = RANK_TYPE[userRank];
  const levelOfPostRank = RANK_TYPE[postRank];

  if (!levelOfPostRank) {
    return true;
  }
  if (levelOfUserRank?.level >= levelOfPostRank?.level) {
    return true;
  }

  return false;
};

export const checkDedicationScoreCompatibility = (dedication_score: number) => {
  if (dedication_score >= 40) {
    return 'GURU';
  }

  if (dedication_score >= 30) {
    return 'PASSIONATE';
  }

  if (dedication_score >= 20) {
    return 'DEDICATED';
  }

  if (dedication_score >= 10) {
    return 'ENTHUSIAST';
  }

  return 'NOVICE';
};
