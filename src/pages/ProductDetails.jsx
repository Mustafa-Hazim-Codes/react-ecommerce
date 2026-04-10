import { useParams } from "react-router-dom";
import products from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />

      <div className="details">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;