"use client";
import { ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/hooks/useStore";
import { FormEvent, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { StallColorOption } from "@/types/ColorDialog";

function CheckoutButton({
  title = "Add to Cart",
  type,
  selectedData,
  selectedId,
}: {
  title?: string;
  type?: "button" | "reset" | "submit" | undefined;
  selectedData: StallColorOption;
  selectedId: number;
}) {
  const { rooms } = useAppSelector((state) => state.room);
  const { materials, quotationId } = useAppSelector((state) => state.step);
  const [loadingCheckout, setLoadingCheckout] = useState<boolean>(false);
  async function handleCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = {
      id: quotationId,
      material_id: materials.id.toString(),
      colors: rooms.map((data) => {
        return { room_id: data.id.toString(), name: data.stall.stallColor };
      }),
    };
    setLoadingCheckout(true);
    await axiosInstance
      .post(`/quotation/generatePaymentLink`, payload)
      .then((res) => {
        if (res.data.status === true) {
          setLoadingCheckout(false);
          setTimeout(() => {
            window.open(res.data.checkoutUrl, "_self");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <form onSubmit={(e) => handleCheckout(e)}>
      <Button
        type={type}
        className="custom_btn y_btn mt-0 my-1 !px-10 disabled:opacity-35 min-w-32"
        isDisabled={
          !selectedId ||
          (selectedId !== 4 ? selectedData.id === "" : false) ||
          loadingCheckout
        }
      >
        {loadingCheckout ? "Redirecting..." : title}
      </Button>
    </form>
  );
}

export default CheckoutButton;
