import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import { getIdsProducts, getTotalCountProducts } from "./api";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getPageCount = async () => {
    const totalCountProducts = await getTotalCountProducts();
    setTotalPages(totalCountProducts);
  };

  const getProducts = async () => {
    const products = await getIdsProducts(currentPage);
    setProducts(products);
  };

  useEffect(() => {
    getPageCount();
  }, []);

  useEffect(() => {
    getProducts();
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
