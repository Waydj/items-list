import { useState, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";
import { getFieldValues, getFields, getFilteredProductDetails } from "../api";

const ProductFilter = ({ setFilteredProducts }) => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [fieldValues, setFieldValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const getFieldsProduct = async () => {
    const fields = await getFields();
    setFields(fields);
  };

  const getFieldValuesProduct = async () => {
    const fieldValues = await getFieldValues(selectedField);
    setFieldValues(fieldValues);
  };

  const getFilteredProducts = async () => {
    const filteredProducts = await getFilteredProductDetails({
      selectedField,
      selectedValue,
    });
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    getFieldsProduct();
  }, []);

  useEffect(() => {
    if (selectedField) {
      getFieldValuesProduct();
    } else {
      setFieldValues([]);
      setSelectedValue("");
      setFilteredProducts([]);
    }
  }, [selectedField]);

  useEffect(() => {
    if (selectedValue && selectedField) {
      getFilteredProducts();
    } else {
      setFilteredProducts([]);
    }
  }, [selectedValue, selectedField]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <FilterDropdown
          label="Выбрать поле:"
          options={fields}
          value={selectedField}
          onChange={setSelectedField}
        />
        <FilterDropdown
          label="Выбрать значение:"
          options={fieldValues}
          value={selectedValue}
          onChange={setSelectedValue}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
