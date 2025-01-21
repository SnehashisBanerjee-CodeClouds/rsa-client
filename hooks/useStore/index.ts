/**
 * Required Packages:
 * @reduxjs/toolkit
 * react-redux
 * ---
 * Documentation - https://redux-toolkit.js.org/tutorials/typescript, https://redux-toolkit.js.org/usage/nextjs
 */
import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "@/lib/store";

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
