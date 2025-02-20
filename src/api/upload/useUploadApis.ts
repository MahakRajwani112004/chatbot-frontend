import { useHttpMethodContext } from "@/context/HttpContextProvider";
import { IApiResponseData, IUploadResponse } from "@/types/common";
import { useCallback } from "react";

const useUploadApis = () => {
  const { post } = useHttpMethodContext();

  const uploadDocument = useCallback(
    async (
      requestBody: FormData
    ): Promise<IApiResponseData<IUploadResponse>> => {
      const response = await post<IUploadResponse>("/api/upload", requestBody, {
        "Content-Type": "multipart/form-data",
      });
      return response;
    },

    [post]
  );
  return { uploadDocument };
};
export default useUploadApis;
