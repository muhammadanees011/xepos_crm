<template>
    <div>
        <div
            class="modal fade"
            id="addCategory"
            tabindex="-1"
            role="dialog"
            aria-labelledby="formModal"
            aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="formModal">
                            Add Companies
                        </h5>
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
                            @submit="storeCompany"
                            ref="categoryForm"
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
                                <label>Name</label>
                                <div class="input-group">
                                    <input
                                        type="text"
                                        v-model="company.name"
                                        class="rounded-pill form-control"
                                        placeholder="Name"
                                        name="name"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <div class="input-group">
                                    <input
                                        type="text"
                                        v-model="company.email"
                                        class="rounded-pill form-control"
                                        placeholder="Email"
                                        name="email"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Logo</label>
                                <div class="input-group">
                                    <input
                                        v-on:change="uploadFile"
                                        type="file"
                                        class="rounded-pill form-control"
                                        placeholder="choose logo"
                                        name="logo"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Website</label>
                                <div class="input-group">
                                    <input
                                        type="text"
                                        v-model="company.website"
                                        class="rounded-pill form-control"
                                        placeholder="website"
                                        name="website"
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
import axiosClient from "../../axios";
import { useStore } from "vuex";
import useCompanies from "../../composables/companies";

const { errors, validation } = useCompanies();
const store = useStore();

//-------------COMPANY DATA-----------------
const company = {
    name: "",
    email: "",
    logo: "",
    website: "",
};

//-------------Form Data-----------------
const fd = new FormData();
let selectedFile = null;
//-------------Store Company-----------------
const storeCompany = async (ev) => {
    ev.preventDefault();
    fd.append("id", company.id);
    fd.append("name", company.name);
    fd.append("email", company.email);
    fd.append("website", company.website);
    await validation(company);
    if (errors.length == 0) {
        return axiosClient
            .post("/companies/", fd)
            .then(({ data }) => {
                store.dispatch("companyList").then((res) => {
                    ev.target.reset();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
//-------------Upload Image/File-----------------
function uploadFile(event) {
    selectedFile = event.target.files[0];
    fd.append("logo", selectedFile);
}
</script>

<style lang="scss" scoped></style>
