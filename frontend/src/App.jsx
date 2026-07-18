import Home from "./pages/Home.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import getCurrentUser from "./features/getCurrentUser.js";
import { setUserData } from "./redux/userSlice.js"; 
function App() {

const dispatch = useDispatch();
 useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser();
      console.log("Current user:", data);
    
      dispatch(setUserData(data));
      
    };

    getUser();
 }, []);

  return (
    <>
      <Home />
    </>
  )
}

export default App
