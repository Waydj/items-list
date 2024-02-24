const Product = ({ id, name, price, brand }) => {
  return (
    <div className="bg-white shadow-md rounded px-2 pt-4 pb-2 hover:shadow-xl transition">
      <div className="mb-4">
        <div className="text-gray-900 font-semibold text-base mb-2">
          ID: <span className="font-normal">{id}</span>
        </div>
        <div className="text-gray-700 font-semibold text-base">
          Название: <span className="font-normal">{name}</span>
        </div>
        <div className="text-gray-700 font-semibold text-base">
          Цена: <span className="font-normal">{price} руб.</span>
        </div>
        <div className="text-gray-700 font-semibold text-base">
          Бренд: <span className="font-normal">{brand}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
