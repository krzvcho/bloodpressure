import { create } from "zustand";
import { Dayjs } from "dayjs";

interface BloodRecordsFiltersState {
	dateFrom: Dayjs | null;
	dateTo: Dayjs | null;
	setDateFrom: (date: Dayjs | null) => void;
	setDateTo: (date: Dayjs | null) => void;
}

export const useBloodRecordsFilters = create<BloodRecordsFiltersState>((set) => ({
	dateFrom: null,
	dateTo: null,
	setDateFrom: (date) => set({ dateFrom: date }),
	setDateTo: (date) => set({ dateTo: date }),
}));
