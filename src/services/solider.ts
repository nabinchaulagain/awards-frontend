import api from "@/utils/api";

export interface Soldier {
  name: string;
  unit: {
    name: string;
    branch: string;
    country: string;
  };
  serviceStartDate: number;
  serviceEndDate: number;
}

export function getSoldiers(
  page: number
): Promise<{ data: Soldier[]; size: number }> {
  return api.get(`/soldiers?pageNumber=${page}&pageSize=2`);
}
