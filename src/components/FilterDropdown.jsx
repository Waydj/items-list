const FIELDS = {
  brand: "Бренд",
  product: "Название",
  price: "Цена",
};

const FilterDropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor={label} className="block mb-1">
        {label}
      </label>
      <select
        id={label}
        className="border border-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Выбрать...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {label == "Выбрать поле:" ? FIELDS[option] : option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
