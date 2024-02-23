import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 mx-2">Каталог товаров</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4 gap-4">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            brand={product.brand}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
