import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  getCartCookie,
  getAddressCookie,
  getPaymentCookie,
} from "../../hooks/getCookie";

import { AiOutlineCheck } from "react-icons/ai";

const OrderProgress = ({ change, setChange }) => {
  const cartCookie = getCartCookie() ? JSON.parse(getCartCookie()) : null;
  const paymentCookie = getPaymentCookie()
    ? JSON.parse(getPaymentCookie())
    : null;
  const addressCookie = getAddressCookie()
    ? JSON.parse(getAddressCookie())
    : null;

  useEffect(() => {
    let total = change;
    total += 1;
  }, [setChange]);

  return (
    <>
      {/* HEADER STARTS */}
      <div className="mt-28">
        {/* Checkout Links */}
        <div className="ml-60 mt-10 mb-4">
          <div>
            <h1 className="text-xl font-bold mb-2">Checkout</h1>
          </div>
          <div className="flex flex-row space-x-4">
            <Link to="/" className="hover:text-gray-500 text-sm">
              <h2>Dashboard</h2>
            </Link>
            <span>•</span>
            <Link to="/" className="hover:text-gray-500 text-sm">
              <h2>E-Commerce</h2>
            </Link>

            <span>•</span>
            <h2 className="text-sm">Checkout</h2>
          </div>
        </div>

        <div className="mr-60">
          {/* PROGRESS BAR-NYA */}
          <div className="w-full flex justify-center space-x-5 text-center items-center">
            {cartCookie ? (
              <>
                <span className="text-xl text-green-600">
                  <AiOutlineCheck />
                </span>
                <span className="flex border-top bg-green-600 h-[3px] w-[200px]"></span>
              </>
            ) : (
              <>
                <span className="text-4xl text-gray-400">•</span>
                <span className="flex border-top h-[3px] bg-slate-100 w-[200px]"></span>
              </>
            )}
            {cartCookie && addressCookie ? (
              <>
                <span className="text-xl text-green-600">
                  <AiOutlineCheck />
                </span>
                <span className="flex border-top bg-green-600 h-[3px] w-[200px]"></span>
              </>
            ) : (
              <>
                <span className="text-4xl text-gray-400">•</span>
                <span className="flex border-top h-[3px] bg-slate-100 w-[200px]"></span>
              </>
            )}
            {cartCookie && addressCookie && paymentCookie ? (
              <span className="text-xl text-green-600">
                <AiOutlineCheck />
              </span>
            ) : (
              <span className="text-4xl text-gray-400">•</span>
            )}
          </div>

          {/* Progress Head */}
          <div className="w-full justify-center tabs ">
            <div className="">
              <NavLink
                to="/cart"
                end
                className={
                  cartCookie
                    ? "italic text-black font-bold tab hover:text-accent"
                    : "text-sm text-black font-bold tab"
                }
              >
                Cart
              </NavLink>
            </div>
            <div className="mx-40 ">
              <NavLink
                to={cartCookie ? "billing" : "#"}
                className={
                  addressCookie
                    ? "italic text-black font-bold tab hover:text-accent"
                    : "text-sm text-gray-400 hover:text-gray-400 font-bold tab"
                }
              >
                {" "}
                Billing & Address
              </NavLink>
            </div>
            <div>
              <NavLink
                to={cartCookie && addressCookie ? "payment" : "#"}
                className={
                  paymentCookie
                    ? "italic text-black font-bold tab hover:text-accent"
                    : "text-sm text-gray-400 hover:text-gray-400 font-bold tab"
                }
              >
                Payment
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* HEADER ENDS */}
    </>
  );
};

export default OrderProgress;
