import { getUserDevices, logoutDevices } from "@/api/user";
import Heading from "@/dls/Heading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import ContentWrapper from "@/components/Container/ContentWrapper";
import useStore from "../../../stores/store";
import { useRouter } from "next/navigation";
import { Routes } from "@/types/Routes";
import { QueryKey } from "@/types/QueryKey";
import { toast } from "react-hot-toast";
import Device from "./Device";
import LoadingButton from "@/dls/Button/LoadingButton";

type Props = {};

const DevicesLists = (props: Props) => {
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["devices"],
    queryFn: getUserDevices,
  });

  const deleteDeviceMutation = useMutation({
    mutationFn: logoutDevices,
    onSuccess: (data) => {
      setUser(null);
      router.push(Routes.Home);
      localStorage.removeItem("access-token");
      queryClient.invalidateQueries();
      queryClient.removeQueries([QueryKey.USER]);
      toast.success("Berhasil keluar dari semua perangkat");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleDeleteAllDevices = () => {
    const ids = data?.map((device) => device._id);
    if (!ids || ids!.length === 0) return;
    deleteDeviceMutation.mutate(ids);
  };

  if (isLoading) return <></>;
  if (!data) return <></>;
  const sortedData = data?.sort((a, b) => {
    if (a.isCurrent) return -1;
    if (b.isCurrent) return 1;
    return 0;
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading fontWeight="medium" level={2}>
          Daftar Perangkat
        </Heading>
        <LoadingButton
          onClick={handleDeleteAllDevices}
          styleButton="danger"
          className="!font-medium !px-2 md:!px-4 !rounded-lg !py-2"
          width="fit"
          title="Hapus Semua"
          isLoading={deleteDeviceMutation.isLoading}
          onLoadingText="Menghapus"
        />
      </div>
      <ContentWrapper>
        {sortedData.map((device, index) => (
          <Device
            key={device._id}
            _id={device._id}
            isCurrent={device.isCurrent}
            createdAt={device.createdAt}
            userAgent={device.userAgent}
            isLastItem={index === sortedData.length - 1}
          />
        ))}
      </ContentWrapper>
    </div>
  );
};

export default DevicesLists;
