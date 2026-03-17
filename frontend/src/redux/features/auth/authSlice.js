import { createSlice } from "@reduxjs/toolkit";

const parseStoredData = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error parsing ${key} from localStorage:`, error);
        localStorage.removeItem(key); // Remove corrupted data
        return null;
    }
};

const isTokenExpired = () => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (!expirationTime) return true;
    return new Date().getTime() > parseInt(expirationTime);
};

const initializeState = () => {
    if (isTokenExpired()) {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return {
            userInfo: null,
            token: null,
        };
    }
    
    return {
        userInfo: parseStoredData("userInfo"),
        token: localStorage.getItem("token") || null,
    };
};

const initialState = initializeState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            if (!action.payload || !action.payload.user || !action.payload.token) {
                console.error("Invalid payload structure for setCredentials");
                return;
            }
            
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
            
            try {
                localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                
                const expirationTime = new Date().getTime() + 1000 * 60 * 60 * 24 * 30;
                localStorage.setItem("expirationTime", expirationTime.toString());
            } catch (error) {
                console.error("Error storing auth data:", error);
            }
        },
        
        logOut: (state) => {
            state.userInfo = null;
            state.token = null;
            
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime");
        },
        
        updateUserInfo: (state, action) => {
            if (action.payload) {
                state.userInfo = { ...state.userInfo, ...action.payload };
                try {
                    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
                } catch (error) {
                    console.error("Error updating user info:", error);
                }
            }
        },
    },
});

export const { setCredentials, logOut, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;