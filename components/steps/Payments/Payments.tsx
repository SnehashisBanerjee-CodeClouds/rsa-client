"use client";
import {
  PaymentErrorActionKind,
  PaymentErrorActionState,
} from "@/types/action";
import { RoomConfig, StallColor } from "@/types/model";
import { PaymentErrorState } from "@/types/payment";
import axiosInstance from "@/utils/axios";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useReducer, useState } from "react";
const paymentErrorReducer = (
  state: PaymentErrorState,
  action: PaymentErrorActionState
): PaymentErrorState => {
  const { type, payload } = action;
  if (type === PaymentErrorActionKind.FAILURE) {
    return { message: payload, isError: payload !== "" };
  } else {
    return { message: "", isError: false };
  }
};
function Payments() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");
  const paramMaterailId = searchParams.get("material_id");
  const [loadingPayment, setLoadingPayment] = useState<boolean>(true);
  const [paymentError, dispatchPaymentErrorState] = useReducer(
    paymentErrorReducer,
    {
      isError: false,
      message: "",
    }
  );
  const fetchCheckoutUrl = useCallback(async () => {
    if (
      pathname === "/generate-payment-link" &&
      paramId !== null &&
      paramMaterailId !== null
    ) {
      await axiosInstance
        .get(`/quotation/view?id=${paramId}`)
        .then(async (res) => {
          if (res.data.status === true) {
            const colorType = res.data.data.submittedData.rooms.reduce(
              (acc: string, curr: RoomConfig) => {
                if (curr.stall.wallTexture !== "") {
                  acc = "texture";
                } else {
                  acc = curr.stall.stallColorName === "" ? "" : "color";
                }
                return acc;
              },
              ""
            );
            const colorData = res.data.data.submittedData.rooms.reduce(
              (
                acc: Array<{
                  room_id: string;
                  name: string;
                  src?: string;
                  color?: StallColor;
                }>,
                curr: RoomConfig
              ) => {
                if (
                  Object.keys(curr.stall).includes("wallTexture") &&
                  curr.stall.wallTexture !== ""
                ) {
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
              id: paramId,
              material_id: paramMaterailId,
              colors:
                formattedColorsByRoom.type === "" ? {} : formattedColorsByRoom,
            };
            return payload;
          }
        })
        .then(async (payload) => {
          const response = await axiosInstance.post(
            "/quotation/generatePaymentLink",
            payload
          );

          return response;
        })
        .then((res) => {
          if (res.data.status === true) {
            setLoadingPayment(false);
            setTimeout(() => {
              window.open(res.data.checkoutUrl, "_self");
            }, 1000);
          }
        })
        .catch((err) => {
          setLoadingPayment(false);
          dispatchPaymentErrorState({
            type: PaymentErrorActionKind.FAILURE,
            payload:
              "Another request is already being processed. Please try again in a minute.",
          });
        });
    }
  }, [pathname, paramId, paramMaterailId]);
  useEffect(() => {
    fetchCheckoutUrl();
  }, [fetchCheckoutUrl]);
  return loadingPayment ? (
    <div className="payment_loader">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-20 h-20 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <span>Preparing Checkout URL</span>:
    </div>
  ) : paymentError.isError ? (
    <div className="mt-32  gap-1 flex flex-col items-center error_pdf">
      <Image
        src="/assets/images/warning.png"
        alt="404_png"
        loading="lazy"
        width={128}
        height={128}
      />
      <span>{paymentError.message}</span>
      {/* <Link href="/" className="mt-4 custom_btn y_btn cursor-pointer">
        Return Home
      </Link> */}
    </div>
  ) : (
    <div className="payment_loader">
      <svg
        className="w-20 h-20 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      <span>Checkout URL Prepared</span>
    </div>
  );
}

export default Payments;
