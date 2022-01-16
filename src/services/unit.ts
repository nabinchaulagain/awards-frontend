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

export const addUnit = function (payload: Unit): Promise<Unit> {
  return api.post("/units", payload);
};
