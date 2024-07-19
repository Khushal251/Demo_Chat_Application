// working
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const {socket} = useSelector(store=>store.socket);
    const {messages} = useSelector(store=>store.message);
    const dispatch = useDispatch();
    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            dispatch(setMessages([...messages, newMessage]));
        });
        return () => socket?.off("newMessage");
    },[setMessages, messages]);
};
export default useGetRealTimeMessage;





// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setMessages } from "../redux/messageSlice";

// const useGetRealTimeMessage = () => {
//     const { socket } = useSelector(store => store.socket);
//     const messages = useSelector(store => store.message.messages);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (socket) {
//             const handleNewMessage = (newMessage) => {
//                 dispatch(setMessages(prevMessages => [...prevMessages, newMessage]));
//             };
            
//             socket.on("newMessage", handleNewMessage);

//             // Clean up on unmount
//             return () => {
//                 socket.off("newMessage", handleNewMessage);
//             };
//         }
//     }, [socket, dispatch]);

//     // If socket is not defined, this hook will do nothing
// };

// export default useGetRealTimeMessage;
