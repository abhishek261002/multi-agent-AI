import React from 'react'
import api from '../../utils/axios.js'

async function sendMessage(payload) {
  try {
    const {data} = api.post("/agent/chat",payload)
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default sendMessage