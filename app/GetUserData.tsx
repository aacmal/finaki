"use client";

import { instance } from "@/api/api";
import { getUserData } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useStore from "../stores/store";

const GetUserData = () => {
  const setUser = useStore((state) => state.setUser);
  useQuery(["user"], () => getUserData(), {
    onSuccess: (data) => {
      setUser(data);
    },
  });

  useEffect(() => {
    instance.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access-token"
    )}`;
  }, []);

  return <></>;
};

export default GetUserData;
