import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import Pagination from "./components/Pagination";
import { getIdsProducts, getTotalCountProducts } from "./api";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getPageCount = async () => {
    const totalCountProducts = await getTotalCountProducts();
    setTotalPages(totalCountProducts);
  };

  const getProducts = async (page) => {
    const products = await getIdsProducts(page);
    setProducts(products);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    getPageCount();
  }, []);

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-gray-200 py-6 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2 mx-2">Каталог товаров</h1>
        <ProductFilter setFilteredProducts={setFilteredProducts} />
        <ProductList
          products={filteredProducts.length > 0 ? filteredProducts : products}
        />
        {!filteredProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
      </div>
    </div>
  );
};

export default App;
