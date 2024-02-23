import { useState, useEffect } from "react";
import ky from "ky";
import { API_URL, getProductDetails } from "../api";
import { generateAuthHeader } from "../utils";
import ProductList from "./ProductList";

const ProductFilter = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [fieldValues, setFieldValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ky
          .post(API_URL, {
            json: {
              action: "get_fields",
              // params: {},
            },
            headers: {
              "X-Auth": generateAuthHeader(),
            },
          })
          .json();
        setFields(response.result.filter((field) => field !== null));
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFieldValues = async () => {
      if (selectedField) {
        try {
          const response = await ky
            .post(API_URL, {
              json: {
                action: "get_fields",
                params: { field: selectedField, offset: 0, limit: 10 },
              },
              headers: {
                "X-Auth": generateAuthHeader(),
              },
            })
            .json();
          setFieldValues(response.result.filter((value) => value !== null));
        } catch (error) {
          console.error("Error fetching field values:", error);
        }
      }
    };

    fetchFieldValues();
  }, [selectedField]);

  useEffect(() => {
    const filterProducts = async () => {
      if (selectedValue && selectedField) {
        try {
          const response = await ky
            .post(API_URL, {
              json: {
                action: "filter",
                params: { [selectedField]: selectedValue },
              },
              headers: {
                "X-Auth": generateAuthHeader(),
              },
            })
            .json();

          const res = await getProductDetails(response.result);
          setFilteredProducts(res);
        } catch (error) {
          console.error("Error filtering products:", error);
        }
      }
    };

    filterProducts();
  }, [selectedValue, selectedField]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="field" className="block mb-1">
            Выбрать поле:
          </label>
          <select
            id="field"
            className="border border-gray-400"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="">Выбрать...</option>
            {fields.map((field, index) => (
              <option key={index} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="value" className="block mb-1">
            Выбрать значение:
          </label>
          <select
            id="value"
            className="border border-gray-400"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Выбрать...</option>
            {fieldValues.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg mb-2">Отфильтрованные товары:</h2>
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductFilter;
