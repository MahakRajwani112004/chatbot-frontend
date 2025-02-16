import { GetCallSchema } from "@/components/getCall/getCall.types";
import { useHttpMethodContext } from "@/context/HttpContextProvider";
import { useCallback } from "react";

const useCallAPis = () => {
  const { post } = useHttpMethodContext();
  const initiateCall = useCallback(
    async (requestBody: GetCallSchema) => {
      const response = await post("/api/make-call", requestBody);
      return response;
    },
    [post]
  );
  return { initiateCall };
};
export default useCallAPis;
