import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { API_URL } from "../../constant/api";
import { debounce } from "throttle-debounce";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useSelector } from "react-redux";

const CartItems = ({ val, setCartItems }) => {
  const [quantity, setQuantity] = useState(val.quantity);
  const userGlobal = useSelector((state) => state.user);

  const qtyHandler = useCallback(
    debounce(1000, async (quantity) => {
      const results = await Axios.patch(`${API_URL}/carts/quantity/${val.id}`, {
        userId: userGlobal.id,
        quantity,
      });
      setCartItems(results.data.getUserCart);
    }),
    []
  );

  useEffect(() => {
    qtyHandler(quantity);
  }, [quantity]);

  return (
    <tr className="text-center h-20 border-none">
      <td>
        <div className="flex items-center space-x-2">
          <div>
            <img
              className="mask mask-squircle w-20"
              src={`${API_URL}/${val.product.product_image}`}
            />
          </div>
          <div className="space-y-2">
            <div>
              <p className="font-bold text-left">{val.product.name}</p>
            </div>
            <div className="flex">
              <div>
                <p className="text-gray-400">
                  Size: <span className="text-black">9</span>
                </p>
              </div>
              <span className="border-1 h-5 mx-2"></span>
              <div>
                <p className="text-gray-400">
                  Color:
                  <span className="text-black"> Green</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="text-left">{currencyFormatter(val.product.price)}</td>
      <td className="text-left">
        <div>
          <div className="flex border-1 rounded-md space-x-4 items-center justify-center align-middle">
            <button
              className="text-4xl"
              onClick={() => {
                setQuantity(quantity - 1);
              }}
            >
              -
            </button>
            <span className="text-1xl">{quantity}</span>
            <button
              className="text-2xl"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <div>
            <p className="text-gray-400 text-xs text-center mt-1">
              available: {val.product.warehouse_products[0].stock_ready}
            </p>
          </div>
        </div>
      </td>
      <td className="text-center">{currencyFormatter(val.subtotal)}</td>

      <td>
        <i className="hover:cursor-pointer fas fa-trash-alt"></i>
      </td>
    </tr>
  );
};

export default CartItems;
