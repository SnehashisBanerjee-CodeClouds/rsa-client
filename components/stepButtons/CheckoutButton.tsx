"use client";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/hooks/useStore";
import { FormEvent, useState } from "react";
import axiosInstance from "@/utils/axios";
import { StallColorOption, StallTextureOption } from "@/types/ColorDialog";
import { RoomConfig, StallColor } from "@/types/model";
import { handleError } from "@/utils/stall/helpers";

function CheckoutButton({
  title = "Add to Cart",
  type,
  selectedData,
  selectedId,
  selectedTexture,
}: {
  title?: string;
  type?: "button" | "reset" | "submit" | undefined;
  selectedData: StallColorOption;
  selectedId: number;
  selectedTexture: StallTextureOption;
}) {
  const { rooms } = useAppSelector((state) => state.room);
  const { quotationId } = useAppSelector((state) => state.step);
  const [loadingCheckout, setLoadingCheckout] = useState<boolean>(false);
  async function handleCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const colorType = rooms.reduce((acc: string, curr: RoomConfig) => {
      if (curr.stall.wallTexture !== "") {
        acc = "texture";
      } else {
        acc = curr.stall.stallColorName === "" ? "" : "color";
      }
      return acc;
    }, "");
    const colorData = rooms.reduce(
      (
        acc: Array<{
          room_id: string;
          name: string;
          src?: string;
          color?: StallColor;
        }>,
        curr: RoomConfig
      ) => {
        if (curr.stall.wallTexture !== "") {
          acc.push({
            room_id: curr.id.toString(),
            name: curr.stall.wallTextureName,
            src: curr.stall.wallTexture.split("/uploads/textures/")[1],
          });
        } else {
          acc.push({
            room_id: curr.id.toString(),
            name: curr.stall.stallColorName,
            color: curr.stall.stallColor,
          });
        }
        return acc;
      },
      []
    );
    const formattedColorsByRoom = {
      type: colorType,
      data: colorData,
    };
    const payload = {
      id: quotationId,
      material_id: selectedId.toString(),
      colors: formattedColorsByRoom.type === "" ? {} : formattedColorsByRoom,
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
        handleError(
          err.response.data.message,
          "top-center",
          7000,
          false,
          "payment-link-error"
        );
        setTimeout(() => {
          setLoadingCheckout(false);
        }, 7500);
      });
  }
  return (
    <form onSubmit={(e) => handleCheckout(e)}>
      <Button
        type={type}
        className="custom_btn y_btn mt-0 my-1 w-full !px-10 disabled:opacity-35 min-w-[150px]"
        isDisabled={
          (selectedId === 4
            ? false
            : selectedData.name === "" && selectedTexture.name === ""
            ? true
            : false) || loadingCheckout
        }
      >
        {loadingCheckout ? "Redirecting" : title}
      </Button>
    </form>
  );
}

export default CheckoutButton;
