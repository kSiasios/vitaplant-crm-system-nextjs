"use client";

import { deepCompare, Item, normalizeGreekString, Stock } from "@/utils/helper";
import { ChangeEvent, useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import ItemInput from "./ItemInput";
interface OrderItemEntryProps {
  handleChange: Function;
  newItem?: boolean;
  providedSections?: Item[];
  editable?: string;
  isOrder?: boolean;
}

export interface Checks {
  plantNew: boolean;
  subjectNew: boolean;
  varietyNew: boolean;
}

const OrderItemEntry = ({
  handleChange,
  newItem,
  providedSections,
  editable = "edit",
  isOrder,
}: OrderItemEntryProps) => {
  const [items, setItems] = useState({});
  const [fetching, setFetching] = useState({});

  const [availablePlants, setAvailablePlants] = useState<Array<string>>([]);
  const [availableSubjects, setAvailableSubjects] = useState<Array<string>>([]);
  const [availableVarieties, setAvailableVarieties] = useState<Array<string>>(
    []
  );

  const defaultItems: Item[] = [
    {
      plant: "",
      subject: "",
      variety: "",
      price: "0",
      amount: "0",
      stock: { own: "true", distributor: "" },
    },
  ];

  const [sections, setSections] = useState<Item[]>([
    {
      plant: "",
      subject: "",
      variety: "",
      price: "0",
      amount: "0",
      stock: { own: "true", distributor: "" },
    },
  ]);
  const [defaultSections, setDefaultSections] = useState<Item[]>([
    {
      plant: "",
      subject: "",
      variety: "",
      price: "0",
      amount: "0",
      stock: { own: "true", distributor: "" },
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

      const availableItems = await res.json();

      const plants: Set<Object> = new Set(
        availableItems.map((item: Item) => item.plant)
      );
      const subjects: Set<Object> = new Set(
        availableItems.map((item: Item) => item.subject)
      );
      const varieties: Set<Object> = new Set(
        availableItems.map((item: Item) => item.variety)
      );

      setAvailablePlants(Array.from(plants.values()) as string[]);
      setAvailableSubjects(Array.from(subjects.values()) as string[]);
      setAvailableVarieties(Array.from(varieties.values()) as string[]);

      if (providedSections && Object.keys(providedSections[0]).length === 0) {
        setDefaultSections([
          {
            plant: availablePlants ? availablePlants[0] : "",
            subject: availableSubjects ? availableSubjects[0] : "",
            variety: availableVarieties ? availableVarieties[0] : "",
            price: "0",
            amount: "0",
            stock: { own: "true", distributor: "" },
          },
        ]);
        // setSections([
        //   {
        //     plant: availablePlants ? availablePlants[0] : "",
        //     subject: availableSubjects ? availableSubjects[0] : "",
        //     variety: availableVarieties ? availableVarieties[0] : "",
        //     price: "0",
        //     amount: "0",
        //     stock: { own: "true", distributor: "" },
        //   },
        // ]);
      }

      setItemSectionExpanded(providedSections?.map((section) => true) || []);

      setItems(items);
    };

    fetchItems();

    setChecks([
      {
        plantNew: false,
        subjectNew: false,
        varietyNew: false,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!deepCompare(sections, providedSections)) {
      setSections(defaultSections);
    }
  }, [defaultSections]);

  useEffect(() => {
    // console.log(sections);

    if (!isOrder) {
      updateChecks();
    }

    if (
      handleChange &&
      (editable === "edit" || editable === "new") &&
      !deepCompare(sections, providedSections)
    ) {
      console.log(sections, providedSections);
      console.log(deepCompare(sections, providedSections));
      console.log("sections");

      handleChange(sections);
    }

    function updateChecks() {
      // console.log(providedSections);
      const providedChecks: any = [];

      if (
        !providedSections ||
        (Object.keys(providedSections[0]).length === 0 && checks.length < 1)
      ) {
        sections?.forEach((item, index) => {
          providedChecks.push({
            plantNew: false,
            subjectNew: false,
            varietyNew: false,
          });

          if (
            !availablePlants.find(
              (plant: string) =>
                normalizeGreekString(plant ? plant.toLowerCase() : "") ===
                normalizeGreekString(
                  item.plant ? item.plant.toLowerCase() : "_"
                )
            )
          ) {
            providedChecks[index].plantNew = true;
          }

          if (
            !availableSubjects.find(
              (subject: string) =>
                normalizeGreekString(subject ? subject.toLowerCase() : "") ===
                normalizeGreekString(
                  item.subject ? item.subject.toLowerCase() : "_"
                )
            )
          ) {
            providedChecks[index].subjectNew = true;
          }

          if (
            !availableVarieties.find(
              (variety: string) =>
                normalizeGreekString(variety ? variety.toLowerCase() : "") ===
                normalizeGreekString(
                  item.variety ? item.variety.toLowerCase() : "_"
                )
            )
          ) {
            providedChecks[index].varietyNew = true;
          }
        });

        setChecks(providedChecks);

        return;
      }

      if (
        availablePlants.length < 1 &&
        availableSubjects.length < 1 &&
        availableVarieties.length < 1
      ) {
        return;
      }

      providedSections?.forEach((item, index) => {
        providedChecks.push({
          plantNew: false,
          subjectNew: false,
          varietyNew: false,
        });

        if (
          !availablePlants.find(
            (plant: string) =>
              normalizeGreekString(plant ? plant.toLowerCase() : "") ===
              normalizeGreekString(item.plant ? item.plant.toLowerCase() : "_")
          )
        ) {
          providedChecks[index].plantNew = true;
        }

        if (
          !availableSubjects.find(
            (subject: string) =>
              normalizeGreekString(subject ? subject.toLowerCase() : "") ===
              normalizeGreekString(
                item.subject ? item.subject.toLowerCase() : "_"
              )
          )
        ) {
          providedChecks[index].subjectNew = true;
        }

        if (
          !availableVarieties.find(
            (variety: string) =>
              normalizeGreekString(variety ? variety.toLowerCase() : "") ===
              normalizeGreekString(
                item.variety ? item.variety.toLowerCase() : "_"
              )
          )
        ) {
          providedChecks[index].varietyNew = true;
        }
      });

      console.log("called");

      setChecks(providedChecks);
    }
  }, [sections]);

  useEffect(() => {
    // console.log("Update providedSections");
    // console.log(providedSections);

    if (providedSections && Object.keys(providedSections[0]).length === 0) {
      return;
    }

    if (!providedSections) {
      return;
    }

    console.log(providedSections as Item[]);

    // do {
    setSections(providedSections as Item[]);
    // } while (fetching);
  }, [providedSections]);

  const addSection = (e: any) => {
    e.preventDefault();
    setSections([
      ...sections,
      {
        plant: availablePlants ? availablePlants[0] : "",
        subject: availableSubjects ? availableSubjects[0] : "",
        variety: availableVarieties ? availableVarieties[0] : "",
        price: "0",
        amount: "0",
        stock: { own: "true", distributor: "" },
      },
    ]);

    setChecks([
      ...checks,
      { plantNew: false, subjectNew: false, varietyNew: false },
    ]);
    setItemSectionExpanded([...itemSectionExpanded, true]);
    // console.log(checks);
    // console.log(sections);
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
    // console.log(index);
    // console.log(field);
    // console.log(value);

    if (!editable) {
      return;
    }

    let newValue = value;

    const newSections = [...sections];

    if (field === "amount") {
      newValue = value;
    }

    if (field === "price") {
      newValue = value;
    }

    // if (field in newSections[index]) {
    (newSections[index][field] as string | number | boolean) = newValue;

    setSections(newSections);
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
    const newSections = [...sections];

    // console.log(newSections);

    if (!newSections) {
      return;
    }

    if (field in newSections[index]["stock"]) {
      (newSections[index]["stock"][field] as string | number | boolean) = value;

      setSections(newSections);
    }
  };

  const handleExpand = (index: number) => {
    // return;
    const newExpanded = [...itemSectionExpanded];
    newExpanded[index] = !itemSectionExpanded[index];
    // console.log(index);
    setItemSectionExpanded(newExpanded);

    // // reset item data
    // setSections(sections);
  };

  const handleCheckChange = (
    index: number,
    field: keyof Checks,
    value: boolean
  ) => {
    if (isOrder) {
      return;
    }

    // console.log(checks);

    const newChecks = [...checks];
    newChecks[index][field] = value;
    setChecks(newChecks);
  };

  return (
    <div className="flex flex-col gap-4">
      {sections &&
        sections.map((section, index) => {
          return (
            <div
              key={index}
              className="border border-gray-400 rounded-lg p-4 flex flex-col gap-4 bg-white"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => {
                  handleExpand(index);
                }}
              >
                <h3 className="font-bold">Αντικείμενο</h3>
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
                  {/* <button
                    className="border border-gray-400 p-4 rounded-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      // handleExpand(index, !itemSectionExpanded[index]);
                    }}
                  >
                    {!itemSectionExpanded[index] && <IoIosArrowDown />}
                    {itemSectionExpanded[index] && <IoIosArrowUp />}
                  </button> */}
                </div>
              </div>
              {itemSectionExpanded[index] && (
                <div className="flex flex-col gap-3">
                  <ItemInput
                    editable={editable}
                    isItem={!isOrder}
                    title="Φυτό"
                    property="plant"
                    isNew={checks[index]?.plantNew}
                    value={section.plant}
                    index={index}
                    handleCheckChange={handleCheckChange}
                    handleInputChange={handleInputChange}
                    options={availablePlants}
                  />
                  <ItemInput
                    editable={editable}
                    isItem={!isOrder}
                    title="Υποκείμενο"
                    property="subject"
                    isNew={checks[index]?.subjectNew}
                    value={section.subject}
                    index={index}
                    handleCheckChange={handleCheckChange}
                    handleInputChange={handleInputChange}
                    options={availableSubjects}
                  />
                  <ItemInput
                    editable={editable}
                    isItem={!isOrder}
                    title="Ποικιλία"
                    property="variety"
                    isNew={checks[index]?.varietyNew}
                    value={section.variety}
                    index={index}
                    handleCheckChange={handleCheckChange}
                    handleInputChange={handleInputChange}
                    options={availableVarieties}
                  />
                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <label htmlFor={`price_${index}`}>Τιμή</label>
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
                            e.target.value = "0";
                          }
                        }}
                      />
                    )}
                    {!editable && <p id={`price_${index}`}>{section.price}</p>}
                  </div>
                  {/* Amount */}
                  <div className="flex justify-between items-center">
                    <label htmlFor={`amount_${index}`}>Ποσότητα</label>
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
                            e.target.value = "0";
                          }
                        }}
                      />
                    )}
                    {!editable && (
                      <p id={`amount_${index}`}>{section.amount}</p>
                    )}
                  </div>
                  {parseInt(section.amount) * parseFloat(section.price) > 0 && (
                    <sup className="text-blue-400 ">
                      Σύνολο:{" "}
                      {parseInt(section.amount) * parseFloat(section.price) > 0
                        ? parseInt(section.amount) * parseFloat(section.price)
                        : 0}
                    </sup>
                  )}
                  {/* Own Stock */}
                  {section.stock && (
                    <div className="flex items-center gap-1">
                      {editable && (
                        <div className="flex gap-4 w-full">
                          <input
                            type="checkbox"
                            name="own_stock"
                            id={`own_stock_${index}`}
                            value={section.stock.own}
                            checked={
                              section.stock.own
                                ? section.stock.own === "true"
                                : true
                            }
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              handleStockInputChange(
                                index,
                                "own",
                                `${e.target.checked}`
                              );
                            }}
                            className="cursor-pointer"
                          />
                          {section.stock.own == "false" && (
                            <div className="flex gap-2 items-center justify-between w-full">
                              Απόθεμα από:
                              <input
                                type="text"
                                name="distributor"
                                placeholder="Προμηθευτής"
                                value={
                                  section.stock?.distributor
                                    ? section.stock.distributor
                                    : ""
                                }
                                onChange={(e) => {
                                  handleStockInputChange(
                                    index,
                                    "distributor",
                                    e.target.value
                                  );
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      {!editable && section.stock.own !== "true" && (
                        <p>Απόθεμα από: {section.stock.distributor}</p>
                      )}
                      {section.stock?.own === "true" && (
                        <label
                          htmlFor={`own_stock_${index}`}
                          className={`${
                            editable ? "cursor-pointer" : ""
                          } w-full`}
                        >
                          Ίδιο Απόθεμα
                        </label>
                      )}
                    </div>
                  )}
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
          Προσθήκη Αντικειμένου
        </button>
      )}
    </div>
  );
};

export default OrderItemEntry;
