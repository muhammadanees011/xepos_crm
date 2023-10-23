<template>
    <div>
        <!-- sidebar -->
        <div class="main-sidebar sidebar-style-2">
            <aside id="sidebar-wrapper">
                <div class="sidebar-brand">
                    <a href="index.html">
                        <!-- <img alt="image" src="http://127.0.0.1:8000/assets/img/logo.png" class="header-logo" /> -->
                        <span class="logo-name" style="color: #fda50f"
                            >XEPOS CRM</span
                        >
                    </a>
                </div>
                <ul class="sidebar-menu">
                    <li class="menu-header" style="margin-bottom: 20px">
                        Main
                    </li>
                    <li class="dropdown">
                        <router-link
                            :to="{ name: 'Dashboard' }"
                            active-class="active"
                            class="nav-link"
                        >
                            <i
                                class="fas fa-home"
                                style="font-size: 10px"
                                data-feather="monitor"
                            ></i
                            ><span>Dashboard</span>
                        </router-link>
                    </li>

                    <li class="dropdown">
                        <router-link
                            :to="{ name: 'Company' }"
                            active-class="active"
                            class="nav-link"
                        >
                            <i
                                class="fas fa-tag"
                                style="font-size: 10px"
                                data-feather="monitor"
                            ></i
                            ><span>Companies</span>
                        </router-link>
                    </li>

                    <li class="dropdown">
                        <router-link
                            :to="{ name: 'Employee' }"
                            active-class="active"
                            class="nav-link"
                        >
                            <i
                                class="fas fa-tag"
                                style="font-size: 10px"
                                data-feather="monitor"
                            ></i
                            ><span>Employees</span>
                        </router-link>
                    </li>
                </ul>
            </aside>
        </div>
        <!-- ./sidebar -->
    </div>
</template>

<script setup>
const navigation = [
    { name: "Dashboard", to: { name: "Dashboard" } },
    { name: "Category", to: { name: "Category" } },
];
</script>

<style></style>
