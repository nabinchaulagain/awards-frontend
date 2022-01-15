import api from "@/utils/api";

export interface Unit {
  name: string;
  country: string;
  branch: string;
  establishedDate: number;
}

export const getUnits = function (): Promise<Unit[]> {
  return api.get("/units");
};
