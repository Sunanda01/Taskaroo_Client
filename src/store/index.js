import { create } from "zustand";
import { createUserSlice } from "./slices/userSlice";
export const useAppStore=create()((...a)=>({
    ...createUserSlice(...a)
}))
