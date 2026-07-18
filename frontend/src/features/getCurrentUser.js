import api from "../../utils/axios.js";
const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/me");
        return data;
    } catch (error) {
        if (import.meta.env.DEV) {
            const status = error?.response?.status;
            if (status && status !== 401) {
                console.warn("Unable to fetch current user:", error.message);
            }
        }
        return null;
    }
}

export default getCurrentUser;
