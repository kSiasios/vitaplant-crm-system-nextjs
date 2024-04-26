"use client";

import React, { useState } from "react";

interface OrderItemEntryProps {
  handleChange: Function;
}

const OrderItemEntry = ({ handleChange }: OrderItemEntryProps) => {
  const [inputFields, setInputFields] = useState([
    { subject: "", variety: "", price: 0, amount: 0, ownStock: true },
  ]);

  return (
    <div>
      {inputFields.map((input, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              placeholder="Subject"
              // value={input.subject}
              // onChange={(e) => set}
            />
            <select>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItemEntry;
