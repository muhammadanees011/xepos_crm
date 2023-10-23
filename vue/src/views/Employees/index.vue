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
                                    <h4>Employees</h4>
                                </div>
                                <div class="col-2">
                                    <button
                                        class="btn btn-warning rounded-pill"
                                        data-toggle="modal"
                                        data-target="#addCars"
                                    >
                                        <i data-feather="plus-square"></i> Add
                                        Employee
                                    </button>
                                </div>
                            </div>

                            <div class="card-body">
                                <div v-if="errors.length" class="form-group">
                                    <label>Errors</label>
                                    <ul>
                                        <li
                                            v-for="e in errors"
                                            v-bind:key="e.id"
                                            class="text-danger"
                                        >
                                            {{ e }}
                                        </li>
                                    </ul>
                                </div>

                                <div class="table-responsive">
                                    <table
                                        class="table table-striped text-center"
                                        id="data_table"
                                        style="width: 100%"
                                    >
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Company</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="item in employees"
                                                :key="item.id"
                                            >
                                                <td>{{ item.id }}</td>
                                                <td>
                                                    {{ item.company.name }}
                                                </td>
                                                <td>{{ item.first_name }}</td>
                                                <td>{{ item.last_name }}</td>
                                                <td>{{ item.email }}</td>
                                                <td>
                                                    {{ item.phone }}
                                                </td>
                                                <td>
                                                    <button
                                                        @click="edit(item.id)"
                                                        class="btn btn-sm btn-indigo mx-1"
                                                        style="
                                                            position: relative;
                                                            display: inline-block;
                                                        "
                                                        type="button"
                                                        data-toggle="modal"
                                                        data-target="#editCars"
                                                    >
                                                        <i
                                                            class="far fa-edit"
                                                        ></i>
                                                    </button>
                                                    <button
                                                        @click="
                                                            destroy(item.id)
                                                        "
                                                        class="btn btn-sm btn-danger"
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

        <EmployeeAdd @refreshList="refresh" />
        <EmployeeEdit @refreshList="refresh" :employee="employee" />
    </div>
</template>

<script setup>
import EmployeeAdd from "../Employees/add.vue";
import EmployeeEdit from "../Employees/edit.vue";
import useEmployees from "../../composables/employees";
import { onMounted, computed, watch } from "vue";

const {
    errors,
    employees,
    employee,
    getEmployees,
    editEmployee,
    deleteEmplpoyee,
} = useEmployees();

//------------ON  Mount--------------
onMounted(() => {
    getEmployees();
});
//------------Refresh List--------------
function refresh() {
    getEmployees();
}
//------------Edit Record--------------
function edit(id) {
    editEmployee(id);
}
//------------Delete Record--------------
function destroy(id) {
    deleteEmplpoyee(id);
    getEmployees();
}
</script>

<style lang="scss" scoped></style>
