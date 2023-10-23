<template>
    <div>
        <!-- <div class="loader"></div> -->
        <div id="app">
            <section class="section">
                <div class="container mt-5">
                    <div class="row">
                        <div
                            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4"
                        >
                            <div class="card card-primary">
                                <div class="card-header">
                                    <h4>Login</h4>
                                </div>
                                <div class="card-body">
                                    <form
                                        @submit="login"
                                        class="needs-validation"
                                        novalidate=""
                                    >
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <input
                                                v-model="user.email"
                                                id="email"
                                                type="email"
                                                class="form-control"
                                                name="email"
                                                tabindex="1"
                                                required
                                                autofocus
                                            />
                                            <div class="invalid-feedback">
                                                Please fill in your email
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="d-block">
                                                <label
                                                    for="password"
                                                    class="control-label"
                                                    >Password</label
                                                >
                                            </div>
                                            <input
                                                v-model="user.password"
                                                id="password"
                                                type="password"
                                                class="form-control"
                                                name="password"
                                                tabindex="2"
                                                required
                                            />
                                            <div class="invalid-feedback">
                                                please fill in your password
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div
                                                class="custom-control custom-checkbox"
                                            >
                                                <input
                                                    v-model="user.remember"
                                                    type="checkbox"
                                                    name="remember"
                                                    class="custom-control-input"
                                                    tabindex="3"
                                                    id="remember-me"
                                                />
                                                <label
                                                    class="custom-control-label"
                                                    for="remember-me"
                                                    >Remember Me</label
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-lg btn-block"
                                                tabindex="4"
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const user = {
    email: "",
    password: "",
    remember: false,
};

function login(ev) {
    ev.preventDefault();
    store
        .dispatch("login", user)
        .then((res) => {
            router.push({
                name: "Dashboard",
            });
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>

<style></style>
