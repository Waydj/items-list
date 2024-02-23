import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import ProductFilter from "./components/ProductFilter";
import { getIdsProducts, getTotalCountProducts } from "./api";

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      /> */}
      <ProductFilter />
      <h1 className="text-3xl font-bold mb-8 mx-10">Каталог товаров</h1>
      <ProductList products={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default App;
