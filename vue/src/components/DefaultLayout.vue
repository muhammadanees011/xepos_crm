<template>
    <div>
       <!-- <div class="loader"></div> -->
        <div id="app">
            <div class="main-wrapper main-wrapper-1">
 
                <Navbar></Navbar>
                <Sidebar></Sidebar>

                <router-view></router-view>

                <Footer></Footer>

            </div>
        </div>
    </div>
</template>

<script >
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

    export default{
  components: { Sidebar, Navbar, Footer },
        name:"DefaultLayout"
    }


</script>

<style >

</style>