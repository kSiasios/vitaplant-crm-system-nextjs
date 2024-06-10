interface ItemInputProps {
  editable: boolean;
  title: string;
  property: string;
  isNew: boolean;
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
  value,
  index,
  handleCheckChange,
  handleInputChange,
  options,
}: ItemInputProps) => {
  return (
    <div className={`flex gap-2 ${editable ? "flex-col" : "flex-row"}`}>
      <div className="flex gap-1 justify-between">
        <h4>{title}</h4>
        {editable && (
          <div className="flex gap-1">
            <div>
              <label
                className="border border-gray-300 rounded-lg"
                htmlFor={`${property}_existing_${index}`}
              >
                Existing
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
                New
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
      {!isNew && editable && (
        <select
          value={value}
          onChange={(e) => handleInputChange(index, property, e.target.value)}
        >
          {options &&
            editable &&
            options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
        </select>
      )}
      {isNew && editable && (
        <input
          type="text"
          placeholder={title}
          value={value}
          onChange={(e) => handleInputChange(index, property, e.target.value)}
        />
      )}
      {!editable && (
        <p>
          {property}_{index}
        </p>
      )}
    </div>
  );
};

export default ItemInput;
