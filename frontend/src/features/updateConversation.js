import api from "../../utils/axios.js";
export const updateConversation = async(payload)=>{
    try {
        const {data} = await api.post(`/chat/update-conversation`,payload)
        //console.log(data);
        return data

    } catch (error) {
        console.log(error);
        return []
    }
}