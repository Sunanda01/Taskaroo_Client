import {devtools} from "zustand/middleware";
export const createUserSlice=devtools((set)=>({
    userInfo:undefined,
    setUserInfo:(userInfo)=>set({userInfo})
}),{name:"userSlice"})