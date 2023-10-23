import { reactive } from "vue";

export default function useCompanies() {
    const errors = reactive([]);

    //-------------Input Validation------------------
    const validation = async (data) => {
        errors.splice(0);
        if (data.name == "") {
            errors.push("Name is required");
        }
    };

    return {
        validation,
        errors,
    };
}
