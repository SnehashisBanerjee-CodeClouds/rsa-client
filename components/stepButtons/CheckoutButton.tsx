"use client";
import { ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/hooks/useStore";
import { FormEvent, useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";

function CheckoutButton({
  title = "Checkout",
  isDisabled,
  type,
  submitForm,
  loadingButton,
}: {
  title?: string;
  isDisabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
  submitForm?: () => void;
  loadingButton?: boolean;
}) {
  const { rooms } = useAppSelector((state) => state.room);
  const { materials, quotationId } = useAppSelector((state) => state.step);
  const [loadingCheckout,setLoadingCheckout]=useState<boolean>(false)
  const [selectedId, setSelectedId] = useState(0);
  useEffect(()=>{
    setSelectedId(+materials?.id);
  },[materials])
  async function handleCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = {
      id: quotationId,
      material_id: materials.id.toString(),
      colors: rooms.map((data) => {
        return { room_id: data.id.toString(), name: data.stall.stallColor };
      }),
    };
    setLoadingCheckout(true)
    await axiosInstance
      .post(`/quotation/generatePaymentLink`, payload)
      .then((res) => {
        if (res.data.status === true) {
          setLoadingCheckout(false)
          setTimeout(()=>{
            window.open(res.data.checkoutUrl, "_self");
          },1000)
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <form onSubmit={(e) => handleCheckout(e)}>
      <Button type={type}   isActionButton isDisabled={!selectedId||loadingCheckout}>
       {loadingCheckout?"Redirecting...":title}
      </Button>
    </form>
  );
}

export default CheckoutButton;
