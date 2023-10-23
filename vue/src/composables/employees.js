import { ref, reactive } from "vue";
import axiosClient from "../axios";

export default function useEmployees() {
    const companies = ref([]);
    const employees = ref([]);
    const employee = ref([]);
    const errors = reactive([]);

    //-------------Get Companies------------------
    const getCompanies = async () => {
        const res = await axiosClient.get("/companies/");
        companies.value = await res.data.data;
    };
    //-------------Get Employees------------------
    const getEmployees = async () => {
        const res = await axiosClient.get("/employees/");
        employees.value = await res.data.data;
    };
    //-------------Store Employee------------------
    const storeEmployee = async (data) => {
        let res = await axiosClient.post("/employees/", data);
    };
    //-------------Edit Employee------------------
    const editEmployee = async (id) => {
        const res = await axiosClient.get("/employees/" + id + "/edit/");
        employee.value = res.data.data[0];
    };
    //-------------Update Employee------------------
    const updateEmployee = async (data) => {
        await axiosClient.put("/employees/" + data.id, data);
    };
    //-------------Delete Employee------------------
    const deleteEmplpoyee = async (id) => {
        let res = await axiosClient.delete("/employees/" + id);
    };
    //-------------Input Validation------------------
    const validation = async (data) => {
        errors.splice(0);
        if (data.company_id == "") {
            errors.push("company is required");
        }
        if (data.first_name == "") {
            errors.push("First name is required");
        }
        if (data.last_name == "") {
            errors.push("Last name is required");
        }
        if (data.email == "") {
            errors.push("email is required");
        }
        if (data.phone == "") {
            errors.push("phone is required");
        }
    };

    //-------------Return Data------------------
    return {
        storeEmployee,
        getEmployees,
        editEmployee,
        updateEmployee,
        deleteEmplpoyee,
        getCompanies,
        validation,
        employees,
        employee,
        companies,
        errors,
    };
}
