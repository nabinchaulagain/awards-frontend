import api from "@/utils/api";
import { toDashedDateString } from "@/utils/date";

export interface Soldier {
  id: number;
  name: string;
  unit: {
    name: string;
    branch: string;
    country: string;
  };
  serviceStartDate: number | string;
  serviceEndDate: number | string;
  dateOfBirth: number | string;
  dateOfDeath: number | string;
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

export async function getSoldier(id: number): Promise<Soldier> {
  const data = await api.get<unknown, Soldier>(`/soldiers/${id}`);
  return {
    ...data,
    serviceStartDate: toDashedDateString(data.serviceStartDate),
    serviceEndDate: toDashedDateString(data.serviceEndDate),
    dateOfBirth: toDashedDateString(data.dateOfBirth),
    dateOfDeath: toDashedDateString(data.dateOfDeath),
  };
}

export function editSoldier(id: number, formData: Soldier): Promise<Soldier> {
  return api.patch(`/soldiers/${id}`, formData);
}
