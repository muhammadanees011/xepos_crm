<template>
    <div>
        <div
            class="modal fade"
            id="editCategory"
            tabindex="-1"
            role="dialog"
            aria-labelledby="formModal"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
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
                        <h5 class="modal-title my-3" id="formModal">
                            Edit Company
                        </h5>

                        <form
                            @submit="updateCompany"
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
                                        style="line-height: 1px"
                                        v-model="company.name"
                                        type="text"
                                        class="rounded-pill form-control"
                                        placeholder="Name"
                                        name="name"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <div class="input-group">
                                    <input
                                        style="line-height: 1px"
                                        v-model="company.email"
                                        type="text"
                                        class="rounded-pill form-control"
                                        placeholder="email"
                                        name="email"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Logo</label>
                                <div class="input-group">
                                    <input
                                        v-on:change="uploadFile"
                                        ref="fileInput"
                                        type="file"
                                        class="rounded-pill form-control"
                                        placeholder="choose image"
                                        name="logo"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Website</label>
                                <div class="input-group">
                                    <input
                                        style="line-height: 1px"
                                        v-model="company.website"
                                        type="text"
                                        class="rounded-pill form-control"
                                        placeholder="website"
                                        name="website"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="text-right">
                                <button
                                    type="submit"
                                    @click="updateCompany"
                                    class="btn btn-warning rounded-pill waves-effect"
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
import { computed, onMounted, ref } from "vue";
import axiosClient from "../../axios";
import { useStore } from "vuex";
import useCompanies from "../../composables/companies";

const { errors, validation } = useCompanies();
const store = useStore();
let selectedFile = null;
let currentCompany = computed(() => {
    return store.state.currentCompany;
});
const company = currentCompany;
let saveCompany = ref([]);
saveCompany.value = company;

let fd = new FormData();

//--------------Update Data-------------------
const updateCompany = async (ev) => {
    ev.preventDefault();
    fd.append("id", saveCompany.value.value.id);
    fd.append("name", saveCompany.value.value.name);
    fd.append("email", saveCompany.value.value.email);
    fd.append("website", saveCompany.value.value.website);
    await validation(saveCompany.value.value);
    if (errors.length == 0) {
        return axiosClient
            .put("/companies/" + saveCompany.value.value.id, fd)
            .then(({ data }) => {
                console.log(data);
                store.dispatch("companyList").then((res) => {
                    ev.target.reset();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

//----------File/image Upload--------------------
function uploadFile(event) {
    selectedFile = event.target.files[0];
    fd.append("logo", selectedFile);
}
</script>

<style lang="scss" scoped></style>
