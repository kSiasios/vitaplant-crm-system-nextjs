"use client";

import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";

interface OrderItemEntryProps {
  handleChange?: Function;
  newItem?: boolean;
  item?: ItemFormData;
  availableSubjects?: Array<string>;
  availableVarieties?: Array<string>;
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

const OrderItemEntry = ({
  handleChange,
  newItem,
  item,
  availableSubjects,
  availableVarieties,
}: OrderItemEntryProps) => {
  const [sections, setSections] = useState<ItemFormData[]>([
    {
      subject: item ? item.subject : "",
      variety: item ? item.variety : "",
      price: item ? item.price : 0,
      amount: item ? item.amount : 0,
      ownStock: item ? item.ownStock : true,
    },
  ]);

  const [checks, setChecks] = useState<Checks[]>([
    {
      subjectNew: false,
      varietyNew: false,
    },
  ]);

  const [itemSectionExpanded, setItemSectionExpanded] = useState<boolean[]>([
    true,
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      { subject: "", variety: "", price: 0, amount: 0, ownStock: false },
    ]);

    setChecks([...checks, { subjectNew: false, varietyNew: false }]);
    setItemSectionExpanded([...itemSectionExpanded, true]);
  };

  const removeSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);

    const newChecks = [...checks];
    newChecks.splice(index, 1);
    setChecks(newChecks);

    const newExpanded = [...itemSectionExpanded];
    newExpanded.splice(index, 1);
    setItemSectionExpanded(newExpanded);
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

    // const items: Array<Object> = [];

    if (handleChange) {
      handleChange(sections);
    }
  };

  const handleExpand = (index: number, value: boolean) => {
    const newExpanded = [...itemSectionExpanded];
    newExpanded[index] = value;
    setItemSectionExpanded(newExpanded);
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

  useEffect(() => {
    if (handleChange) {
      handleChange(sections);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section, index) => {
        return (
          <div
            key={index}
            className="border border-gray-400 rounded-lg p-4 flex flex-col gap-4"
          >
            <div
              className="flex justify-between items-center"
              onClick={() => {
                handleExpand(index, !itemSectionExpanded[index]);
              }}
            >
              <h3 className="font-bold">Item</h3>
              <div className="flex gap-4">
                {index > 0 && (
                  <button
                    className="border border-red-700 bg-red-100 text-red-700 hover:bg-red-700 focus:bg-red-700 hover:text-white focus:text-white p-4 rounded-lg"
                    onClick={() => removeSection(index)}
                  >
                    {/* Remove */}
                    <IoTrashOutline />
                  </button>
                )}
                <button className="border border-gray-400 p-4 rounded-lg">
                  {!itemSectionExpanded[index] && <IoIosArrowDown />}
                  {itemSectionExpanded[index] && <IoIosArrowUp />}
                </button>
              </div>
            </div>
            {itemSectionExpanded[index] && (
              <div className="flex flex-col gap-3">
                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 justify-between">
                    <h4>Subject</h4>
                    <div className="flex gap-1">
                      <div>
                        <label
                          className="border border-gray-300 rounded-lg"
                          htmlFor={`subject_existing_${index}`}
                        >
                          Existing
                          <input
                            type="radio"
                            name={`subject_new_${index}`}
                            checked={!checks[index].subjectNew}
                            onChange={(e) =>
                              handleCheckChange(
                                index,
                                "subjectNew",
                                !e.target.checked
                              )
                            }
                            id={`subject_existing_${index}`}
                          />
                        </label>
                      </div>
                      <div>
                        <label
                          className="border border-gray-400 rounded-lg"
                          htmlFor={`subject_new_${index}`}
                        >
                          New
                          <input
                            type="radio"
                            name={`subject_new_${index}`}
                            checked={checks[index].subjectNew}
                            onChange={(e) => {
                              handleCheckChange(
                                index,
                                "subjectNew",
                                e.target.checked
                              );
                            }}
                            id={`subject_new_${index}`}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  {!checks[index].subjectNew && (
                    <select
                      value={section.subject}
                      onChange={(e) =>
                        handleInputChange(index, "subject", e.target.value)
                      }
                    >
                      {availableSubjects &&
                        availableSubjects.map((subject) => (
                          <option value={subject}>{subject}</option>
                        ))}
                      {/* <option>One</option>
                      <option>Two</option>
                      <option>Three</option> */}
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
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 justify-between">
                    <h4>Variety</h4>
                    <div className="flex gap-1">
                      <div>
                        <label htmlFor={`variety_existing_${index}`}>
                          Existing
                          <input
                            type="radio"
                            name={`variety_new_${index}`}
                            checked={!checks[index].varietyNew}
                            onChange={(e) => {
                              handleCheckChange(
                                index,
                                "varietyNew",
                                !e.target.checked
                              );
                            }}
                            id={`variety_existing_${index}`}
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor={`variety_new_${index}`}>
                          New
                          <input
                            type="radio"
                            name={`variety_new_${index}`}
                            checked={checks[index].varietyNew}
                            onChange={(e) => {
                              handleCheckChange(
                                index,
                                "varietyNew",
                                e.target.checked
                              );
                            }}
                            id={`variety_new_${index}`}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  {!checks[index].varietyNew && (
                    <select
                      value={section.variety}
                      onChange={(e) =>
                        handleInputChange(index, "variety", e.target.value)
                      }
                    >
                      {availableVarieties &&
                        availableVarieties.map((variety) => (
                          <option value={variety}>{variety}</option>
                        ))}
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
                <div className="flex justify-between items-center">
                  <label htmlFor={`price_${index}`}>Price</label>
                  <input
                    type="number"
                    name="price"
                    step={0.01}
                    id={`price_${index}`}
                    value={section.price}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                {/* Amount */}
                <div className="flex justify-between items-center">
                  <label htmlFor={`amount_${index}`}>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    id={`amount_${index}`}
                    value={section.amount}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "amount",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                {section.amount * section.price > 0 && (
                  <sup className="text-blue-400 ">
                    Total Cost:{" "}
                    {section.amount * section.price > 0
                      ? section.amount * section.price
                      : 0}
                  </sup>
                )}
                {/* Own Stock */}
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="own_stock"
                    id={`own_stock_${index}`}
                    checked={section.ownStock}
                    onChange={(e) => {
                      handleInputChange(index, "ownStock", e.target.checked);
                    }}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={`own_stock_${index}`}
                    className="cursor-pointer"
                  >
                    Own Stock
                  </label>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {!newItem && (
        <button
          onClick={addSection}
          className="border border-green-700 bg-green-100 text-green-700 hover:bg-green-700 focus:bg-green-700 hover:text-white focus:text-white px-4 py-2 rounded-lg m-auto"
        >
          Add More..
        </button>
      )}
    </div>
  );
};

export default OrderItemEntry;
