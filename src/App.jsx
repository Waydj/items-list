import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import { getTotalCountProducts } from "./api";

const productsData = [
  { id: 1, name: "Product 1", price: "$10", brand: "Brand A" },
  { id: 2, name: "Product 2", price: "$20", brand: "Brand B" },
  { id: 3, name: "Product 3", price: "$30", brand: "Brand C" },
];

const App = () => {
  const [products, setProducts] = useState(productsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getPageCount = async () => {
    const totalCountProducts = await getTotalCountProducts();
    setTotalPages(totalCountProducts);
  };

  useEffect(() => {
    getPageCount();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="py-8">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default App;
