import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GlobalErrorsState {
  authErrors: string[];
  addAuthError: (error: string) => void;
  clearAuthErrors: () => void;

  generalErrors: string[];
  addGeneralError: (error: string) => void;
  clearErrors: () => void;
}
export const useGlobalErrorsStore = create<GlobalErrorsState>()(
  devtools(
    (set) => ({
      authErrors: [],
      addAuthError: (error) => set((state) => ({ authErrors: [...state.authErrors, error] })),
      clearAuthErrors: () => set({ authErrors: [] }),

      generalErrors: [],
      addGeneralError: (error) => set((state) => ({ generalErrors: [...state.generalErrors, error] })),
      clearErrors: () => set({ generalErrors: [] }),
    }),
    { name: "GlobalErrorsStore" }
  )
);
