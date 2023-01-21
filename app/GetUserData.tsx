"use client";

import { getUserData, commonApi } from "@/utils/api/commonApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useStore from "../stores/store";

const GetUserData = () => {
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();
  useQuery(["user"], () => getUserData(), {
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  useEffect(() => {
    commonApi.defaults.headers[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("access-token")}`;
  }, []);

  return <></>;
};

export default GetUserData;
