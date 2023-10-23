<template>
    <div>
        <div
            class="modal fade"
            id="addCars"
            ref="wrapper"
            tabindex="-1"
            role="dialog"
            aria-labelledby="formModal"
            aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="formModal">Add Employee</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form
                            @submit.prevent="saveEmployee"
                            enctype="multipart/form-data"
                        >
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

                            <div class="form-group">
                                <label>Company</label>
                                <div class="input-group">
                                    <select
                                        v-model="newEmployee.company_id"
                                        class="rounded-pill form-control"
                                    >
                                        <option selected>select company</option>
                                        <option
                                            v-for="item in companies"
                                            :key="item.id"
                                            v-bind:value="item.id"
                                        >
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>First Name</label>
                                <div class="input-group">
                                    <input
                                        type="text"
                                        v-model="newEmployee.first_name"
                                        class="rounded-pill form-control"
                                        placeholder="first name"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Last Name</label>
                                <div class="input-group">
                                    <input
                                        type="text"
                                        v-model="newEmployee.last_name"
                                        class="rounded-pill form-control"
                                        placeholder="last name"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <div class="input-group">
                                    <input
                                        type="text"
                                        v-model="newEmployee.email"
                                        class="rounded-pill form-control"
                                        placeholder="email"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Phone</label>
                                <div class="input-group">
                                    <input
                                        type="text"
                                        v-model="newEmployee.phone"
                                        class="rounded-pill form-control"
                                        placeholder="phone"
                                    />
                                </div>
                            </div>

                            <div class="text-right">
                                <button
                                    type="submit"
                                    class="btn btn-warning waves-effect rounded-pill"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, toRefs, ref, defineExpose } from "vue";
import useEmployees from "../../composables/employees";

const { companies, errors, getCompanies, storeEmployee, validation } =
    useEmployees();
const emits = defineEmits(["refreshList"]);

//-------------On Page Load-------------------
onMounted(() => {
    getCompanies();
});
//-------------Input Data Object-------------------
const newEmployee = reactive({
    company_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
});
//-------------Validate And Store Data-------------------
const saveEmployee = async (ev) => {
    await validation(newEmployee);
    if (errors.length == 0) {
        await storeEmployee(newEmployee);
        ev.target.reset();
        emits("refreshList");
    }
};
</script>

<style lang="scss" scoped></style>
