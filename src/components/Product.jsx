const Product = ({ id, name, price, brand }) => {
  return (
    <div className="bg-white shadow-md rounded px-4 md:px-8 pt-6 pb-4 mb-4">
      <div className="mb-4">
        <div className="text-gray-900 font-semibold text-base mb-2">
          ID: {id}
        </div>
        <div className="text-gray-700 text-base">Название: {name}</div>
        <div className="text-gray-700 text-base">Цена: {price}</div>
        <div className="text-gray-700 text-base">Бренд: {brand}</div>
      </div>
    </div>
  );
};

export default Product;
