import User from 'models/types/User';

export const hideUserInfoIfRequired = (user: User) => {
  if (user?.is_show_info) {
    return user;
  }

  return {
    _id: user._id,
    nickname: user?.nickname,
  };
};
