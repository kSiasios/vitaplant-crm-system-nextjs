import { useEffect } from "react";
import { GiTreeRoots } from "react-icons/gi";
import { PiFlowerTulip, PiPlant } from "react-icons/pi";

interface ItemInputProps {
  editable: string;
  title: string;
  property: string;
  isNew: boolean;
  isItem: boolean;
  value: string;
  index: number;
  handleCheckChange: any;
  handleInputChange: any;
  options: string[];
}

const ItemInput = ({
  editable,
  title,
  property,
  isNew,
  isItem,
  value,
  index,
  handleCheckChange,
  handleInputChange,
  options,
}: ItemInputProps) => {
  // console.log(isNew);

  useEffect(() => {
    if (!value) handleInputChange(index, property, options[0]);
  }, [options]);

  // const isNew = !options.includes(value);

  return (
    <div
      className={`flex gap-2 ${
        editable === "edit" || editable === "new" ? "flex-col" : "flex-row"
      }`}
    >
      <div className="flex gap-1 justify-between">
        <h4 className="inline-flex gap-2 items-center">
          {property === "plant" && <PiFlowerTulip />}
          {property === "subject" && <GiTreeRoots />}
          {property === "variety" && <PiPlant />}
          {title}
        </h4>
        {isItem && (
          <div className="flex gap-1">
            <div>
              <label
                className="border border-gray-300 rounded-lg"
                htmlFor={`${property}_existing_${index}`}
              >
                Υπάρχον
                <input
                  type="radio"
                  name={`${property}_new_${index}`}
                  checked={!isNew}
                  value={`${!isNew}`}
                  onChange={(e) =>
                    handleCheckChange(
                      index,
                      `${property}New`,
                      !e.target.checked
                    )
                  }
                  id={`${property}_existing_${index}`}
                />
              </label>
            </div>
            <div>
              <label
                className="border border-gray-400 rounded-lg"
                htmlFor={`${property}_new_${index}`}
              >
                Νέο
                <input
                  type="radio"
                  name={`${property}_new_${index}`}
                  checked={isNew}
                  onChange={(e) => {
                    handleCheckChange(
                      index,
                      `${property}New`,
                      e.target.checked
                    );
                  }}
                  id={`${property}_new_${index}`}
                />
              </label>
            </div>
          </div>
        )}
      </div>
      {!isNew && (editable === "edit" || editable === "new") && (
        <select
          value={value}
          onChange={(e) => handleInputChange(index, property, e.target.value)}
        >
          {options &&
            (editable === "edit" || editable === "new") &&
            options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
        </select>
      )}
      {isNew && (editable === "edit" || editable === "new") && (
        <input
          type="text"
          placeholder={title}
          value={value}
          onChange={(e) => handleInputChange(index, property, e.target.value)}
        />
      )}
      {/* {editable !== "edit" && (
        <p>
          {property}_{index}
        </p>
      )} */}
    </div>
  );
};

export default ItemInput;
