import api from "@/utils/api";

export const uploadFile = function (file: File): Promise<{ link: string }> {
  const payload = new FormData();
  payload.set("file", file);

  return api.post("/file", payload);
};
