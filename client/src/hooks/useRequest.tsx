import { useState } from "react";

import axios from "axios";

import Notification from "../components/UI/Notification";

type useRequestProps = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  onSuccess: (props?: any) => void;
};

type doRequestProps = {
  body?: object;
};

const useRequest = ({ url, method, onSuccess }: useRequestProps) => {
  const [httpNotification, setHttpNotification] = useState<JSX.Element | null>(
    null
  );

  const doRequest = async ({ body }: doRequestProps) => {
    try {
      const { data } = await axios[method](url, { ...body });
      onSuccess(data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const { response } = err;
        console.log(response?.data.message);
        setHttpNotification(
          <Notification
            status="error"
            title="HttpError"
            message={response?.data.message}
          />
        );
      }
    }
  };

  return { doRequest, httpNotification };
};

export default useRequest;
