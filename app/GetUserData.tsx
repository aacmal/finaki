"use client";

import { instance } from "@/api/api";
import { getUserData } from "@/api/user";
import { QueryKey } from "@/types/QueryKey";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useStore from "../stores/store";

const GetUserData = () => {
  const setUser = useStore((state) => state.setUser);
  useQuery({
    queryKey: [QueryKey.USER],
    queryFn: getUserData,
    onSuccess: (data) => {
      setUser(data);
    },
    staleTime: 0,
  });

  useEffect(() => {
    instance.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access-token"
    )}`;
  }, []);

  return <></>;
};

export default GetUserData;
