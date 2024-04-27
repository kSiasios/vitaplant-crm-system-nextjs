"use client";

import React, { useState } from "react";

interface OrderItemEntryProps {
  handleChange: Function;
}

const OrderItemEntry = ({ handleChange }: OrderItemEntryProps) => {
  const [inputFields, setInputFields] = useState([
    { subject: "", variety: "", price: 0, amount: 0, ownStock: true },
  ]);

  const [subjectNew, setSubjectNew] = useState("existing");
  const [varietyNew, setVarietyNew] = useState("existing");
  const [price, setPrice] = useState(0.0);
  const [amount, setAmount] = useState(0);
  const [ownStock, setOwnStock] = useState(true);

  return (
    <div>
      {inputFields.map((input, index) => {
        return (
          <div key={index}>
            <h3>Item</h3>
            {/* Subject */}
            <div>
              <div className="flex gap-1">
                <h4>Subject</h4>
                <div>
                  <label htmlFor="subject_existing">Existing</label>
                  <input
                    type="radio"
                    value={subjectNew}
                    name="subject_new"
                    checked={subjectNew === "existing"}
                    onClick={() => setSubjectNew("existing")}
                    id="subject_existing"
                  />
                </div>
                <div>
                  <label htmlFor="subject_new">New</label>
                  <input
                    type="radio"
                    value={subjectNew}
                    name="subject_new"
                    checked={subjectNew === "new"}
                    onClick={() => setSubjectNew("new")}
                    id="subject_new"
                  />
                </div>
              </div>
              {subjectNew === "existing" && (
                <select>
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                </select>
              )}
              {subjectNew === "new" && (
                <input
                  type="text"
                  placeholder="Subject"
                  // value={input.subject}
                  // onChange={(e) => set}
                />
              )}
            </div>
            {/* Variety */}
            <div>
              <div className="flex gap-1">
                <h4>Variety</h4>
                <div>
                  <label htmlFor="variety_existing">Existing</label>
                  <input
                    type="radio"
                    value={varietyNew}
                    name="variety_new"
                    checked={varietyNew === "existing"}
                    onClick={() => setVarietyNew("existing")}
                    id="variety_existing"
                  />
                </div>
                <div>
                  <label htmlFor="variety_new">New</label>
                  <input
                    type="radio"
                    value={varietyNew}
                    name="variety_new"
                    checked={varietyNew === "new"}
                    onClick={() => setVarietyNew("new")}
                    id="variety_new"
                  />
                </div>
              </div>
              {varietyNew === "existing" && (
                <select>
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                </select>
              )}
              {varietyNew === "new" && (
                <input
                  type="text"
                  placeholder="Subject"
                  // value={input.subject}
                  // onChange={(e) => set}
                />
              )}
            </div>
            {/* Price */}
            <div>
              <label htmlFor={`price_${index}`}>Price</label>
              <input type="number" name="price" id={`price_${index}`} />
            </div>
            {/* Amount */}
            {/* Own Stock */}
          </div>
        );
      })}
    </div>
  );
};

export default OrderItemEntry;
