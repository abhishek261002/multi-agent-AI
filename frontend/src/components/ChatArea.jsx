import { useEffect, useState } from "react";
import getMessages from "../features/getMessages.js"
// import AIBanner from "./AiBanner";
import ChatInput from "./ChatInput.jsx";
// import MessageBubble from "./MessageBubble";
 import MessageList from "./MessageList.jsx";
import Navbar from "./Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";


function ChatArea() {
  const [banner,setBanner]=useState({
    open:false,
    title:"",
    message:""
});
const {selectedConversation} = useSelector((state)=>state.conversation);
const dispatch = useDispatch()
useEffect(()=>{
  const getMsg = async()=>{
    if(selectedConversation){
      const data = await getMessages(selectedConversation?._id);
      dispatch(setMessages(data))
    }
  }
  getMsg();
},[selectedConversation])
  return (
    <div className="flex-1 flex flex-col min-w-0">

      <Navbar />

      <MessageList/>
      {/*
      <AIBanner

   open={banner.open}

   title={banner.title}

   message={banner.message}

   onClose={()=>

      setBanner({
         ...banner,
         open:false
      })

   }

/>
*/}
     <ChatInput
  setBanner={setBanner}
/> 

    </div>
  );
}

export default ChatArea;