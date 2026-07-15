import api from "../../utils/axios.js";
const getCurrentUser = async (req, res) => {
    try {
        const {data} = await api.get("/api/me")
        console.log(data);
    } catch (error) {
        console.error("Error fetching current user:", error);
    }
}

export default getCurrentUser;