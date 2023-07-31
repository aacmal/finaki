"use client";

import Placeholder from "@/components/Placeholder";
import AddNewWallet from "@/components/WalletCard/AddNewWallet";
import WalletCard from "@/components/WalletCard/WalletCard";
import WalletCardSkeleton from "@/components/WalletCard/WalletCardSkeleton";
import Heading from "@/dls/Heading";
import { QueryKey } from "@/types/QueryKey";
import { getAllWallets, reoderWallets } from "@/utils/api/wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableWalletCard } from "./SortableItem";
import { useEffect, useState } from "react";

type Props = {};

const MyWallets = (props: Props) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [items, setItems] = useState<any[]>([]);

  const {
    data: wallets,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryKey.WALLETS],
    queryFn: getAllWallets,
  });

  const { mutate: reoderMutation } = useMutation({
    mutationFn: reoderWallets,
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (wallets) {
      setItems(
        wallets.map((wallet) => ({
          id: wallet._id,
          name: wallet.name,
          color: wallet.color,
          balance: wallet.balance,
        }))
      );
    }
  }, [wallets]);

  if (isLoading) {
    return (
      <div className="mt-6 space-y-3">
        <div className="mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="font-semibold text-stone-700 dark:text-slate-200">
              <span className="text-center md:text-left block w-full">
                Total saldo
              </span>
              <Placeholder className="w-44 h-12 mt-1" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 gap-5">
            <WalletCardSkeleton />
          </div>
        </div>
      </div>
    );
  }
  if (!wallets) {
    return (
      <Heading className="text-center mt-10" level={3}>
        Terjadi Kesalahan
        <span>{(error as any).response.data.message}</span>
      </Heading>
    );
  }

  const totalBalance = wallets.reduce(
    (acc: number, curr: any) => acc + curr.balance,
    0
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // return if there is no over or over is the same as active
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const result = arrayMove(items, oldIndex, newIndex);
      setItems(result);
      reoderMutation({
        walletIds: result.map((item) => item.id),
      });
    }
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="font-semibold text-stone-700 dark:text-slate-200">
          <span className="text-center md:text-left block w-full">
            Total saldo
          </span>
          <span className="text-2xl">{currencyFormat(totalBalance)}</span>
        </div>
        <AddNewWallet />
      </div>
      {wallets.length > 0 || items?.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <div className="mt-6 grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 gap-5">
              {items.map((wallet: any) => (
                <SortableWalletCard
                  key={wallet.id}
                  id={wallet.id}
                  name={wallet.name}
                  initColorKey={wallet.color}
                  balance={wallet.balance}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="mt-6">
          <Image
            className="mx-auto"
            src="/images/wallet.png"
            width={200}
            height={200}
            alt="empty-wallet"
          />
          <Heading className="text-center mt-2" level={3}>
            Belum ada Dompet yang ditambahkan
          </Heading>
        </div>
      )}
    </div>
  );
};

export default MyWallets;
