// import {createSlice} from "@reduxjs/toolkit";
// const socketSlice = createSlice({
//     name:"socket",
//     initialState:{
//         socket:null
//     },
//     reducers:{
//         setSocket:(state, action)=>{
//             state.socket = action.payload;
//         }
//     }
// });
// export const {setSocket} = socketSlice.actions;
// export default socketSlice.reducer;



//working
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null
    },
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        }
    }
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const socketSlice = createSlice({
//     name: "socket",
//     initialState: {
//         connected: false,
//         socketId: null,
//     },
//     reducers: {
//         setSocketStatus: (state, action) => {
//             state.connected = action.payload.connected;
//             state.socketId = action.payload.socketId;
//         }
//     }
// });

// export const { setSocketStatus } = socketSlice.actions;
// export default socketSlice.reducer;
