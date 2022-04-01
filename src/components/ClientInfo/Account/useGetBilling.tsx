import axios from "axios";
import { useEffect, useState } from "react";
import { instance } from "../../../api/axiosInstance";
import { store } from "../../../redux";

interface IBilling {
  date: string;
  description: string;
  amount: string | null;
  subscription_interval: string | null;
  pay_period: string | null;
  subscription_quantity: string | null;
  client_name: string;
  doctor_name: string;
  paid: boolean | null;
  status: string | null;
  date_next_payment_attempt: string | null;
}

export default function useGetBilling(
  api_key: string,
  query: string,
  pageNumber: number
) {
  const [loadingBilling, setLoadingBilling] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [billingData, setBillingData] = useState<Array<IBilling>>([
    {
      date: "",
      description: "",
      amount: null,
      subscription_interval: null,
      pay_period: null,
      subscription_quantity: null,
      client_name: "",
      doctor_name: "",
      paid: null,
      status: null,
      date_next_payment_attempt: null,
    },
  ]);

  const [hasMore, setHasMore] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [size, setSize] = useState<number>(4);
  const status = store.getState().stripe;

  const getBilling = async () => {
    let cancel: any;
    try {
      const response = await instance("", pageNumber).get(
        `api/stripe/billing_history/${api_key}`
      );
      console.log("useGetBilling: getBilling => ", response.data);
      setBillingData((prevBilling) => {
        return [...prevBilling, ...response.data.items];
      });
      setTotal(response.data.total);
      setSize(response.data.size);
      setHasMore(response.data.items.length > 0);
      setLoadingBilling(false);
    } catch (error: any) {
      if (axios.isCancel(error)) return;
      setError(true);
      console.log("GET: error message billing history =>  ", error.message);

      // throw new Error(error.message);
    }
    return () => cancel();
  };

  useEffect(() => {
    setLoadingBilling(true);
    setError(false);
    getBilling();
  }, [api_key, query, pageNumber, status]);

  return { loadingBilling, error, billingData, hasMore, total, size };
}