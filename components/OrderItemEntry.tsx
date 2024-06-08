"use client";

import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import ItemInput from "./ItemInput";
import { Item, Stock } from "./OrderItem";

interface OrderItemEntryProps {
  handleChange?: Function;
  newItem?: boolean;
  item?: Item;
  editable?: boolean;
}

interface Checks {
  plantNew: boolean;
  subjectNew: boolean;
  varietyNew: boolean;
}

const OrderItemEntry = ({
  handleChange,
  newItem,
  item,
  editable = true,
}: OrderItemEntryProps) => {
  const [items, setItems] = useState({});

  const [availablePlants, setAvailablePlants] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableVarieties, setAvailableVarieties] = useState([]);

  const [sections, setSections] = useState<Item[]>([
    {
      plant: item ? item.plant : "",
      subject: item ? item.subject : "",
      variety: item ? item.variety : "",
      price: item ? item.price : 0,
      amount: item ? item.amount : 0,
      stock: item ? item.stock : { own: true, distributor: "" },
    },
  ]);

  const [checks, setChecks] = useState<Checks[]>([
    {
      plantNew: false,
      subjectNew: false,
      varietyNew: false,
    },
  ]);

  const [itemSectionExpanded, setItemSectionExpanded] = useState<boolean[]>([
    true,
  ]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`/api/items`);

      if (!res.ok) {
        const resText = await res.text();
        console.error(resText);
        alert(`Error while fetching items ${resText}`);
        return;
      }

      const items = await res.json();

      const plants: Set<Object> = new Set(
        items.map((item: Item) => item.plant)
      );
      const subjects: Set<Object> = new Set(
        items.map((item: Item) => item.subject)
      );
      const varieties: Set<Object> = new Set(
        items.map((item: Item) => item.variety)
      );

      setAvailablePlants(Array.from(plants.values()));
      setAvailableSubjects(Array.from(subjects.values()));
      setAvailableVarieties(Array.from(varieties.values()));

      setItems(items);
    };

    fetchItems();
  }, []);

  useEffect(() => {}, [items]);

  useEffect(() => {
    if (handleChange && editable) {
      handleChange(sections);
    }
  }, [sections]);

  // useEffect(() => {
  //   sections.forEach((section) => {
  //     section.plant = availablePlants ? availablePlants[0] : "";
  //     section.subject = availableSubjects ? availableSubjects[0] : "";
  //     section.variety = availableVarieties ? availableVarieties[0] : "";
  //   });
  // }, [availablePlants, availableSubjects, availableVarieties]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        plant: availablePlants ? availablePlants[0] : "",
        subject: availableSubjects ? availableSubjects[0] : "",
        variety: availableVarieties ? availableVarieties[0] : "",
        price: 0,
        amount: 0,
        stock: { own: true, distributor: "" },
      },
    ]);

    setChecks([
      ...checks,
      { plantNew: false, subjectNew: false, varietyNew: false },
    ]);
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
    field: keyof Item,
    value: string | number | boolean
  ) => {
    if (!editable) {
      return;
    }

    let newValue = value;

    const newSections = [...sections];

    if (field === "amount") {
      // console.log(`amount: ${newValue}`);
      // parse int
      newValue = parseInt(value, 10);

      // if (!newValue) {
      //   newValue = 0;
      //   // console.log(`amount: ${newValue}, ${typeof newValue}`);
      // }

      // console.log(`amount: ${newValue}, ${typeof newValue}`);
    }

    if (field === "price") {
      // parse float
      newValue = parseFloat(value);

      // if (!newValue) {
      //   newValue = 0.0;
      // }
    }

    if (field in newSections[index]) {
      (newSections[index][field] as string | number | boolean) = newValue;
      setSections(newSections);
    }

    // const items: Array<Object> = [];

    // if (handleChange) {
    //   handleChange(sections);
    // }
  };

  const handleStockInputChange = (
    index: number,
    field: keyof Stock,
    value: string | number | boolean
  ) => {
    if (!editable) {
      return;
    }
    // console.log("Cjheck");
    const newSections = [...sections];
    // console.log(newSections);
    if (field in newSections[index]["stock"]) {
      (newSections[index]["stock"][field] as string | number | boolean) = value;
      // console.log(newSections);

      setSections(newSections);
    }

    // const items: Array<Object> = [];
  };

  const handleExpand = (index: number, value: boolean) => {
    const newExpanded = [...itemSectionExpanded];
    newExpanded[index] = value;
    // console.log(index);
    setItemSectionExpanded(newExpanded);
  };

  const handleCheckChange = (
    index: number,
    field: keyof Checks,
    value: boolean
  ) => {
    if (!editable) {
      return;
    }
    const newChecks = [...checks];
    newChecks[index][field] = value;
    setChecks(newChecks);
  };

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section, index) => {
        return (
          <div
            key={index}
            className="border border-gray-400 rounded-lg p-4 flex flex-col gap-4 bg-white"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => {
                handleExpand(index, !itemSectionExpanded[index]);
              }}
            >
              <h3 className="font-bold">Item</h3>
              <div className="flex gap-4">
                {index > 0 && editable && (
                  <button
                    className="border border-red-700 bg-red-100 text-red-700 hover:bg-red-700 focus:bg-red-700 hover:text-white focus:text-white p-4 rounded-lg"
                    onClick={() => removeSection(index)}
                  >
                    {/* Remove */}
                    <IoTrashOutline />
                  </button>
                )}
                <button
                  className="border border-gray-400 p-4 rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    // handleExpand(index, !itemSectionExpanded[index]);
                  }}
                >
                  {!itemSectionExpanded[index] && <IoIosArrowDown />}
                  {itemSectionExpanded[index] && <IoIosArrowUp />}
                </button>
              </div>
            </div>
            {itemSectionExpanded[index] && (
              <div className="flex flex-col gap-3">
                <ItemInput
                  editable={editable}
                  title="Plant"
                  property="plant"
                  isNew={checks[index].plantNew}
                  value={section.plant}
                  index={index}
                  handleCheckChange={handleCheckChange}
                  handleInputChange={handleInputChange}
                  options={availablePlants}
                />
                <ItemInput
                  editable={editable}
                  title="Subject"
                  property="subject"
                  isNew={checks[index].subjectNew}
                  value={section.subject}
                  index={index}
                  handleCheckChange={handleCheckChange}
                  handleInputChange={handleInputChange}
                  options={availableSubjects}
                />
                <ItemInput
                  editable={editable}
                  title="Variety"
                  property="variety"
                  isNew={checks[index].varietyNew}
                  value={section.variety}
                  index={index}
                  handleCheckChange={handleCheckChange}
                  handleInputChange={handleInputChange}
                  options={availableVarieties}
                />
                {/* Price */}
                <div className="flex justify-between items-center">
                  <label htmlFor={`price_${index}`}>Price</label>
                  {editable && (
                    <input
                      type="number"
                      name="price"
                      step={0.01}
                      id={`price_${index}`}
                      value={section.price}
                      onChange={(e) =>
                        handleInputChange(index, "price", e.target.value)
                      }
                      onFocus={(e) => {
                        if (parseFloat(e.target.value) === 0) {
                          e.target.value = "";
                        }
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          e.target.value = 0;
                        }
                      }}
                    />
                  )}
                  {!editable && <p id={`price_${index}`}>{section.price}</p>}
                </div>
                {/* Amount */}
                <div className="flex justify-between items-center">
                  <label htmlFor={`amount_${index}`}>Amount</label>
                  {editable && (
                    <input
                      type="number"
                      name="amount"
                      id={`amount_${index}`}
                      value={section.amount}
                      onChange={(e) =>
                        handleInputChange(index, "amount", e.target.value)
                      }
                      onFocus={(e) => {
                        if (parseInt(e.target.value, 10) == 0) {
                          e.target.value = "";
                        }
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          e.target.value = 0;
                        }
                      }}
                    />
                  )}
                  {!editable && <p id={`amount_${index}`}>{section.amount}</p>}
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
                  {editable && (
                    <>
                      <input
                        type="checkbox"
                        name="own_stock"
                        id={`own_stock_${index}`}
                        checked={section.stock.own}
                        onChange={(e) => {
                          handleStockInputChange(
                            index,
                            "own",
                            e.target.checked
                          );
                          // handleInputChange(index, "stock.own", e.target.checked);
                        }}
                        className="cursor-pointer"
                      />
                      {!section.stock.own && (
                        <>
                          <input
                            type="text"
                            placeholder="Distributor"
                            onChange={(e) => {
                              handleStockInputChange(
                                index,
                                "distributor",
                                e.target.value
                              );
                            }}
                          />
                          &apos;s
                        </>
                      )}
                    </>
                  )}
                  {/* {!editable && !section.ownStock && <p>NOT</p>} */}
                  {!editable && !section.stock.own && (
                    <p>{section.stock.distributor}&apos;s</p>
                  )}
                  <label
                    htmlFor={`own_stock_${index}`}
                    className={`${editable ? "cursor-pointer" : ""}`}
                  >
                    {section.stock.own && "Own "}
                    Stock
                  </label>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {!newItem && editable && (
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
