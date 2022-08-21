const URI =
  'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production';

const API = {
  SIGN_UP: `${URI}/auth/signup`,
  SIGN_IN: `${URI}/auth/signin`,
  CREATE_GET_TODO: `${URI}/todos`,
  UPDATE_DELETE_TODO: `${URI}/todos/:id`,
};

export default API;
