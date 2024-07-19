// import {combineReducers, configureStore} from "@reduxjs/toolkit";
// import userReducer from "./userSlice.js";
// import messageReducer from "./messageSlice.js";
// import socketReducer from "./socketSlice.js";
// import {
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist';
//   import storage from 'redux-persist/lib/storage'

//   const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
//   }

//   const rootReducer = combineReducers({
//     user:userReducer,
//     message:messageReducer,
//     socket:socketReducer
//  })

// const persistedReducer = persistReducer(persistConfig, rootReducer)


// const store = configureStore({
//     reducer:persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// export default store;


//working
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createTransform } from 'redux-persist';

// Transform to handle socket state
const socketTransform = createTransform(
  // Transform state before persistence
  (inboundState) => {
    return {
      ...inboundState,
      socket: null, // Remove or set to null
    };
  },
  // Transform state during rehydration
  (outboundState) => {
    return outboundState;
  },
  { whitelist: ['socket'] }
);

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [socketTransform], // Apply transform here
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;



// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import messageReducer from "./messageSlice";
// import socketReducer from "./socketSlice";
// import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { createTransform } from 'redux-persist';

// // Transform to handle socket state
// const socketTransform = createTransform(
//   // Transform state before persistence
//   (inboundState) => ({
//     ...inboundState,
//     socketId: null, // Set to null or remove as needed
//   }),
//   // Transform state during rehydration
//   (outboundState) => outboundState,
//   { whitelist: ['socket'] }
// );

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
//   transforms: [socketTransform],
// };

// const rootReducer = combineReducers({
//   user: userReducer,
//   message: messageReducer,
//   socket: socketReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export default store;
