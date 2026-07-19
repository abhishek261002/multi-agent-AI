import React from 'react'
import api from '../../utils/axios.js'

async function getMessages (conversationId) {
  try {
    const {data} = await api.get(`/chat/get-messages/${conversationId}`)
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default getMessages