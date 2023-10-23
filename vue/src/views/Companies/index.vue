<template>
    <div>
        <!-- Main Content -->
        <div class="main-content">
            <section class="section">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="row p-3">
                                <div class="card-header col-10">
                                    <h4>Companies</h4>
                                    <pre></pre>
                                </div>
                                <div class="col-2">
                                    <button
                                        class="btn btn-warning rounded-pill"
                                        data-toggle="modal"
                                        data-target="#addCategory"
                                    >
                                        <i data-feather="plus-square"></i> Add
                                        Companies
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table
                                        class="display table table-striped text-center"
                                        id="display"
                                        style="width: 100%"
                                    >
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Logo</th>
                                                <th>Website</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="company in companies"
                                                :key="company.id"
                                            >
                                                <td>{{ company.id }}</td>
                                                <td>{{ company.name }}</td>
                                                <td>{{ company.email }}</td>
                                                <td>
                                                    <img
                                                        v-if="company.logo"
                                                        :src="
                                                            'http://127.0.0.1:5173/' +
                                                            company.logo
                                                        "
                                                        width="65"
                                                        height="40"
                                                        class="rounded"
                                                    />
                                                </td>
                                                <td>
                                                    <span class="badge">
                                                        {{ company.website }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        @click="
                                                            editCompany(
                                                                company.id
                                                            )
                                                        "
                                                        class="btn btn-sm btn-indigo mx-1"
                                                        style="
                                                            position: relative;
                                                            display: inline-block;
                                                        "
                                                        type="button"
                                                        data-toggle="modal"
                                                        data-target="#editCategory"
                                                    >
                                                        <i
                                                            class="far fa-edit"
                                                        ></i>
                                                    </button>
                                                    <button
                                                        @click="
                                                            deleteCompany(
                                                                company.id
                                                            )
                                                        "
                                                        class="btn btn-sm btn-danger cutealert"
                                                        data-toggle="modal"
                                                        data-target="#confirm"
                                                    >
                                                        <i
                                                            class="far fa-trash-alt"
                                                        ></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <CompanyAdd />
        <CompanyEdit />
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, toRefs, nextTick } from "vue";
import DataTable from "datatables.net-vue3";
import CompanyAdd from "../Companies/add.vue";
import CompanyEdit from "../Companies/edit.vue";
import axiosClient from "../../axios";
import { useStore } from "vuex";

const store = useStore();
const companies = computed(() => store.state.company);
//-----------------Refresh/Fetch List on Page Load----------------
onMounted(() => {
    refresh();
});
//----------Refresh List--------------------------
function refresh() {
    store.dispatch("companyList").then((res) => {});
}
//-------------Dispatch Action In Store To Edit Category --------------
function editCompany(Id) {
    store.dispatch("companyEdit", Id).then((res) => {});
}
//-----------------Delete Company --------------------
function deleteCompany(Id) {
    return axiosClient
        .delete("/companies/" + Id)
        .then((response) => {
            refresh();
        })
        .catch((error) => {
            console.log(error);
        });
}
//----------Data Table---------------
// $('#display').DataTable({
//   data: categories.value,
//   columns: [
//       { data: 'id' },
//       { data: 'name' },
//       { data: 'image' },
//       { data: 'status' }
//   ]
// });
</script>

<style lang="scss" scoped></style>
