"use client";

import { useState } from "react";

interface OrderItemEntryProps {
  handleChange: Function;
}

interface ItemFormData {
  subject: string;
  variety: string;
  price: number;
  amount: number;
  ownStock: boolean;
}

interface Checks {
  subjectNew: boolean;
  varietyNew: boolean;
}

const OrderItemEntry = ({ handleChange }: OrderItemEntryProps) => {
  const [sections, setSections] = useState<ItemFormData[]>([
    { subject: "", variety: "", price: 0, amount: 0, ownStock: true },
  ]);

  const [checks, setChecks] = useState<Checks[]>([
    {
      subjectNew: false,
      varietyNew: false,
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      { subject: "", variety: "", price: 0, amount: 0, ownStock: false },
    ]);

    setChecks([...checks, { subjectNew: false, varietyNew: false }]);
  };

  const removeSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);

    const newChecks = [...checks];
    newChecks.splice(index, 1);
    setChecks(newChecks);
  };

  const handleInputChange = (
    index: number,
    field: keyof ItemFormData,
    value: string | number | boolean
  ) => {
    const newSections = [...sections];
    if (field in newSections[index]) {
      (newSections[index][field] as string | number | boolean) = value;
      setSections(newSections);
    }
  };

  const handleCheckChange = (
    index: number,
    field: keyof Checks,
    value: boolean
  ) => {
    const newChecks = [...checks];
    newChecks[index][field] = value;
    setChecks(newChecks);
  };

  return (
    <div>
      {sections.map((section, index) => {
        return (
          <div key={index}>
            <div>
              <h3>Item</h3>
              {index > 0 && (
                <button
                  className="bg-red-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => removeSection(index)}
                >
                  Remove
                </button>
              )}
            </div>
            {/* Subject */}
            <div>
              <div className="flex gap-1">
                <h4>Subject</h4>
                <div>
                  <label htmlFor={`subject_existing_${index}`}>Existing</label>
                  <input
                    type="radio"
                    name={`subject_new_${index}`}
                    checked={!checks[index].subjectNew}
                    onChange={(e) =>
                      handleCheckChange(index, "subjectNew", !e.target.checked)
                    }
                    id={`subject_existing_${index}`}
                  />
                </div>
                <div>
                  <label htmlFor={`subject_new_${index}`}>New</label>
                  <input
                    type="radio"
                    name={`subject_new_${index}`}
                    checked={checks[index].subjectNew}
                    onChange={(e) => {
                      handleCheckChange(index, "subjectNew", e.target.checked);
                    }}
                    id={`subject_new_${index}`}
                  />
                </div>
              </div>
              {!checks[index].subjectNew && (
                <select
                  value={section.subject}
                  onChange={(e) =>
                    handleInputChange(index, "subject", e.target.value)
                  }
                >
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                </select>
              )}
              {checks[index].subjectNew && (
                <input
                  type="text"
                  placeholder="Subject"
                  value={section.subject}
                  onChange={(e) =>
                    handleInputChange(index, "subject", e.target.value)
                  }
                />
              )}
            </div>
            {/* Variety */}
            <div>
              <div className="flex gap-1">
                <h4>Variety</h4>
                <div>
                  <label htmlFor={`variety_existing_${index}`}>Existing</label>
                  <input
                    type="radio"
                    name={`variety_new_${index}`}
                    checked={!checks[index].varietyNew}
                    onChange={(e) => {
                      handleCheckChange(index, "varietyNew", !e.target.checked);
                    }}
                    id={`variety_existing_${index}`}
                  />
                </div>
                <div>
                  <label htmlFor={`variety_new_${index}`}>New</label>
                  <input
                    type="radio"
                    name={`variety_new_${index}`}
                    checked={checks[index].varietyNew}
                    onChange={(e) => {
                      handleCheckChange(index, "varietyNew", e.target.checked);
                    }}
                    id={`variety_new_${index}`}
                  />
                </div>
              </div>
              {!checks[index].varietyNew && (
                <select
                  value={section.variety}
                  onChange={(e) =>
                    handleInputChange(index, "variety", e.target.value)
                  }
                >
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                </select>
              )}
              {checks[index].varietyNew && (
                <input
                  type="text"
                  placeholder="Variety"
                  value={section.variety}
                  onChange={(e) =>
                    handleInputChange(index, "variety", e.target.value)
                  }
                />
              )}
            </div>
            {/* Price */}
            <div>
              <label htmlFor={`price_${index}`}>Price</label>
              <input
                type="number"
                name="price"
                id={`price_${index}`}
                value={section.price}
                onChange={(e) =>
                  handleInputChange(index, "price", parseFloat(e.target.value))
                }
              />
            </div>
            {/* Amount */}
            <div>
              <label htmlFor={`amount_${index}`}>Amount</label>
              <input
                type="number"
                name="amount"
                id={`amount_${index}`}
                value={section.amount}
                onChange={(e) =>
                  handleInputChange(index, "amount", parseInt(e.target.value))
                }
              />
            </div>
            {/* Own Stock */}
            <div>
              <label htmlFor={`own_stock_${index}`}>Own Stock</label>
              <input
                type="checkbox"
                name="own_stock"
                id={`own_stock_${index}`}
                checked={section.ownStock}
                onChange={(e) => {
                  handleInputChange(index, "ownStock", e.target.checked);
                }}
              />
            </div>
          </div>
        );
      })}
      <button
        onClick={addSection}
        className="bg-green-300 text-black px-4 py-2 rounded-lg"
      >
        Add More..
      </button>
    </div>
  );
};

export default OrderItemEntry;
