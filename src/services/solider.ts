import api from "@/utils/api";

export interface Soldier {
  id: number;
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
  return api.get(`/soldiers?pageNumber=${page}&pageSize=6`);
}

export function addSoldier(
  formData: Record<string, unknown>
): Promise<Soldier> {
  return api.post("/soldiers", formData);
}

export function getSoldier(id: number): Promise<Soldier> {
  return api.get(`/soldiers/${id}`);
}
