import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4 gap-4">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.product}
            price={product.price}
            brand={product.brand}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
