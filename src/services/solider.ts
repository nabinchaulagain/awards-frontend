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

export function getSoldiers(): Promise<Soldier[]> {
  return api.get("/soldiers");
}
