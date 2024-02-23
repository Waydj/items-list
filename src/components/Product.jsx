const Product = ({ id, name, price, brand }) => {
  return (
    <div className="bg-white shadow-md rounded px-4 md:px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <div className="text-gray-900 font-bold text-lg md:text-xl mb-2">
          ID: {id}
        </div>
        <div className="text-gray-700 text-base md:text-lg">Название: {name}</div>
        <div className="text-gray-700 text-base md:text-lg">Цена: {price}</div>
        <div className="text-gray-700 text-base md:text-lg">Бренд: {brand}</div>
      </div>
    </div>
  );
};

export default Product;
