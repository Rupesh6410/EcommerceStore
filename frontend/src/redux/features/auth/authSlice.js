import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely parse JSON
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

// Check if token is expired
const isTokenExpired = () => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (!expirationTime) return true;
    return new Date().getTime() > parseInt(expirationTime);
};

// Initialize state with expiration check
const initializeState = () => {
    if (isTokenExpired()) {
        // Clear expired data
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
            // Validate payload structure
            if (!action.payload || !action.payload.user || !action.payload.token) {
                console.error("Invalid payload structure for setCredentials");
                return;
            }
            
            // Extract both user and token from payload
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
            
            // Store both in localStorage
            try {
                localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                
                // Set expiration time (30 days from now)
                const expirationTime = new Date().getTime() + 1000 * 60 * 60 * 24 * 30;
                localStorage.setItem("expirationTime", expirationTime.toString());
            } catch (error) {
                console.error("Error storing auth data:", error);
            }
        },
        
        logOut: (state) => {
            state.userInfo = null;
            state.token = null;
            
            // Clear specific items instead of localStorage.clear() to avoid clearing other app data
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime");
        },
        
        // Optional: Update user info without changing token
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