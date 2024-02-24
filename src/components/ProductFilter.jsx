import { useState, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";
import { getFieldValues, getFields, getFilteredProductDetails } from "../api";

const ProductFilter = ({ setFilteredProducts, setIsLoadingProducts }) => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [fieldValues, setFieldValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const getFieldsProduct = async () => {
    const fields = await getFields();
    setFields(fields);
  };

  const getFieldValuesProduct = async () => {
    setIsLoading(true);
    const fieldValues = await getFieldValues(selectedField);
    setFieldValues(fieldValues);
    setIsLoading(false);
  };

  const getFilteredProducts = async () => {
    setIsLoadingProducts(true);
    setIsLoading(true);
    const filteredProducts = await getFilteredProductDetails({
      selectedField,
      selectedValue,
    });
    setFilteredProducts(filteredProducts);
    setIsLoadingProducts(false);
    setIsLoading(false);
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
          disabled={isLoading}
        />
        <FilterDropdown
          label="Выбрать значение:"
          options={fieldValues}
          value={selectedValue}
          onChange={setSelectedValue}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
