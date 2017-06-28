import { loginByEmail, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

export default {
    // 邮箱登录
    LoginByEmail({ commit }, userInfo) {
            const email = userInfo.email.trim();
            return new Promise((resolve, reject) => {
                loginByEmail(email, userInfo.password).then(response => {
                    const data = response.data;
                    Cookies.set('Admin-Token', response.data.token);
                    commit('SET_TOKEN', data.token);
                    commit('SET_EMAIL', email);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data;
                    commit('SET_ROLES', data.role);
                    commit('SET_NAME', data.name);
                    commit('SET_AVATAR', data.avatar);
                    commit('SET_UID', data.uid);
                    commit('SET_INTRODUCTION', data.introduction);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 第三方验证登录
        LoginByThirdparty({ commit, state }, code) {
            return new Promise((resolve, reject) => {
                commit('SET_CODE', code);
                loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
                    commit('SET_TOKEN', response.data.token);
                    Cookies.set('Admin-Token', response.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    Cookies.remove('Admin-Token');
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('Admin-Token');
                resolve();
            });
        },

        // 动态修改权限
        ChangeRole({ commit }, role) {
            return new Promise(resolve => {
                commit('SET_ROLES', [role]);
                commit('SET_TOKEN', role);
                Cookies.set('Admin-Token', role);
                resolve();
            })
        }
}