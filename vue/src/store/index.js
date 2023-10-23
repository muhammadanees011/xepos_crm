import { createStore } from "vuex";
import axiosClient from "../axios";

const companies = [];
const products = [];

const store = createStore({
    state: {
        user: {
            data: { name: "Muhammad Anees" },
            token: localStorage.getItem("TOKEN"),
        },
        company: [],
        currentCompany: [],
        product: [...products],
        currentProduct: [],
    },
    getters: {},
    actions: {
        //--------Register User-----------
        register({ commit }, user) {
            return axiosClient.post("/register", user).then(({ data }) => {
                commit("setUser", data);
                return data;
            });
        },
        //--------Login User-----------
        login({ commit }, user) {
            return axiosClient
                .post("/login", user)
                .then(({ data }) => {
                    commit("setUser", data);
                    return data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //--------Logout User-----------
        logout({ commit }) {
            return axiosClient.post("/logout").then((response) => {
                commit("logout");
                return response;
            });
        },
        //---------Company list---------------
        companyList({ commit }) {
            return axiosClient.get("/companies/").then((response) => {
                commit("companyList", response.data.data);
                return response.data.data;
            });
        },
        //--------------Company Edit------------
        companyEdit({ commit }, Id) {
            return axiosClient
                .get("/companies/" + Id + "/edit/")
                .then((response) => {
                    commit("currentCompany", response.data.data);
                });
        },
    },

    mutations: {
        logout: (state) => {
            state.user.token = null;
            localStorage.removeItem("TOKEN");
            state.user.data = {};
        },

        setUser: (state, userData) => {
            state.user.token = userData.data.token;
            state.user.data = userData.data.user;
            localStorage.setItem("TOKEN", userData.data.token);
        },
        companyList: (state, data) => {
            state.company = data;
            console.log("companyList", state.company);
        },
        currentCompany: (state, data) => {
            state.currentCompany = data[0];
            console.log("currentCompany", state.currentCompany);
        },
    },

    modules: {},
});

export default store;
