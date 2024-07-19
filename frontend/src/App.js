// working
import Signup from './components/Signup';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import { BASE_URL } from '.';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])

function App() { 
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socketio = io(`${BASE_URL}`, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>

  );
}

export default App;




// import Signup from './components/Signup';
// import './App.css';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomePage from './components/HomePage';
// import Login from './components/Login';
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import io from "socket.io-client";
// import { setSocketStatus } from './redux/socketSlice';
// import { setOnlineUsers } from './redux/userSlice';
// import { BASE_URL } from '.';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />
//   },
//   {
//     path: "/signup",
//     element: <Signup />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
// ]);

// function App() {
//   const { authUser } = useSelector(store => store.user);
//   const { connected, socketId } = useSelector(store => store.socket);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (authUser) {
//       const socketio = io(`${BASE_URL}`, {
//         query: {
//           userId: authUser._id
//         }
//       });

//       // Dispatch socket status
//       dispatch(setSocketStatus({ connected: true, socketId: socketio.id }));

//       socketio.on('getOnlineUsers', (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });

//       // Clean up function
//       return () => {
//         socketio.close();
//         dispatch(setSocketStatus({ connected: false, socketId: null }));
//       };
//     } else {
//       // If there's an existing socket, close it and update state
//       if (connected) {
//         dispatch(setSocketStatus({ connected: false, socketId: null }));
//       }
//     }
//   }, [authUser, dispatch, connected]);

//   return (
//     <div className="p-4 h-screen flex items-center justify-center">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;




// import React, { useEffect } from 'react';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import io from "socket.io-client";
// import { setSocketStatus } from './redux/socketSlice';
// import { setOnlineUsers } from './redux/userSlice';
// import { BASE_URL } from '.';
// import Signup from './components/Signup';
// import HomePage from './components/HomePage';
// import Login from './components/Login';
// import useGetRealTimeMessage from './hooks/useGetRealTimeMessage';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />
//   },
//   {
//     path: "/signup",
//     element: <Signup />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
// ]);

// function App() {
//   const { authUser } = useSelector(store => store.user);
//   const { connected, socketId } = useSelector(store => store.socket);
//   const dispatch = useDispatch();

//   useGetRealTimeMessage(); // Make sure to call the hook

//   useEffect(() => {
//     if (authUser) {
//       const socketio = io(`${BASE_URL}`, {
//         query: {
//           userId: authUser._id
//         }
//       });

//       // Dispatch socket status
//       dispatch(setSocketStatus({ connected: true, socketId: socketio.id }));

//       socketio.on('getOnlineUsers', (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });

//       // Clean up function
//       return () => {
//         socketio.close();
//         dispatch(setSocketStatus({ connected: false, socketId: null }));
//       };
//     } else {
//       // If there's an existing socket, close it and update state
//       if (connected) {
//         dispatch(setSocketStatus({ connected: false, socketId: null }));
//       }
//     }
//   }, [authUser, dispatch, connected]);

//   return (
//     <div className="p-4 h-screen flex items-center justify-center">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;
