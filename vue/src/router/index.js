import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Company from "../views/Companies/index.vue";
import Employee from "../views/Employees/index.vue";
import store from "../store";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/",
        redirect: "/dashboard",
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "/dashboard", name: "Dashboard", component: Dashboard },
            { path: "/Companies", name: "Company", component: Company },
            { path: "/Employees", name: "Employee", component: Employee },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else if (store.state.user.token && to.name === "Login") {
        next({ name: "Dashboard" });
    } else {
        next();
    }
});

export default router;
