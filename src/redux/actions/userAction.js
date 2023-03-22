import {
  loginUserAction, getUserByIdAction, logoutUserAction, refreshTokenAction,
} from './actionTypes';

import {
  loginUser, logoutUser, refreshToken, getUserById,
} from '../../utils/http';

export const getUserByIdActionCreator = (id, token) => ({
  type: getUserByIdAction,
  payload: getUserById(id, token),
});

export const loginUserActionCreator = (body) => ({
  type: loginUserAction,
  payload: loginUser(body),
});

export const logoutUserActionCreator = (token) => ({
  type: logoutUserAction,
  payload: logoutUser({ refreshToken: token }),
});
export const refreshTokenActionCreator = (token) => ({
  type: refreshTokenAction,
  payload: refreshToken({ refreshToken: token }),
});
