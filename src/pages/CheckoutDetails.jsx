import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { API_URL } from "../constant/api";
import OrderProgress from "../components/Checkout/OrderProgress";
import OrderSummary from "../components/Checkout/OrderSummary";
import TableAddress from "../components/Checkout/TableAddress";
import Axios from "axios";
import { getAddressCookie } from "../hooks/getCookie";
import { removeAddressCookie, removeCartCookie } from "../hooks/removeCookie";

const CheckoutDetails = () => {
  const [change, setChange] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const userGlobal = useSelector((state) => state.user);
  const summaryGlobal = useSelector((state) => state.summary);

  const addressCookie = getAddressCookie()
    ? JSON.parse(getAddressCookie())
    : null;

  useEffect(() => {
    const getCart = async () => {
      try {
        const results = await Axios.get(
          `${API_URL}/carts/get/${userGlobal.id}`
        );
        setCartItems(results.data.carts);
      } catch (err) {
        console.log(err);
      }
    };
    getCart();
  }, [userGlobal]);

  return (
    <div>
      <OrderProgress />
      <div className="flex w-screen space-x-4 pt-5 justify-end pr-48 ">
        <Outlet context={[cartItems, setCartItems, change, setChange]} />
        <div className="w-3/12 space-y-4 flex flex-col">
          {addressCookie && <TableAddress />}
          <OrderSummary
            cartItems={cartItems}
            setCartItems={setCartItems}
            change={change}
            setChange={setChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
