<template>
    <div>
        <!-- Main Content -->
        <div class="main-content">
            <section class="section">
                <div class="row">
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="card">
                            <div class="card-statistic-4">
                                <div
                                    class="align-items-center justify-content-between"
                                >
                                    <div class="row">
                                        <div
                                            class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3"
                                        >
                                            <div class="card-content">
                                                <h5 class="font-15">
                                                    Companies
                                                </h5>

                                                <!-- <h2 class="mb-3 font-18">0</h2> -->
                                                <p class="mb-0">
                                                    <span
                                                        class="col-green"
                                                    ></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0"
                                        >
                                            <div class="banner-img">
                                                <img
                                                    src="http://127.0.0.1:8000/assets/img/banner/1.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="card">
                            <div class="card-statistic-4">
                                <div
                                    class="align-items-center justify-content-between"
                                >
                                    <div class="row">
                                        <div
                                            class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3"
                                        >
                                            <div class="card-content">
                                                <h5 class="font-15">
                                                    Employees
                                                </h5>
                                                <!-- <h2 class="mb-3 font-18">0</h2> -->
                                                <p class="mb-0">
                                                    <span
                                                        class="col-orange"
                                                    ></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0"
                                        >
                                            <div class="banner-img">
                                                <img
                                                    src="http://127.0.0.1:8000/assets/img/banner/2.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
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
import { onMounted } from "vue";
import useDashboard from "../composables/dashboard.js";
</script>

<style></style>
