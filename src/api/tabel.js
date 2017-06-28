import fetch from 'utils/fetch';

// 获取表格数据api
export function getTabelData(token) {
  const params = {
    access_token:token
  };
  return fetch({
    url: "/v1/auth/assignment",
    method: 'post',
    params
  });
}


export function loginByEmail(email, password) {
  const data = {
    email,
    password
  };
  return fetch({
    url: '/login/loginbyemail',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

