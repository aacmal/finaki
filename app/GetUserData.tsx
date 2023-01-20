"use client";

import { getUserData } from "@/utils/api/commonApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useStore from "../stores/store";

const GetUserData = () => {
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();
  useQuery(["user"], () => getUserData(), {
    onSuccess: (data) => {
      console.log("user data", data);
    },
    onError: (error) => {
      router.push("/auth/login");
    },
  });

  return <></>;
};

export default GetUserData;
