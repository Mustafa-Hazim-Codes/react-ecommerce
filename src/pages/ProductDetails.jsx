import { useParams } from "react-router-dom";
import products from "../data/products";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details">
      {/* Image */}
      <div className="image-container">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = "https://picsum.photos/400";
          }}
        />
      </div>

      {/* Info */}
      <div className="details">
        <h1>{product.title}</h1>

        <p className="price">${product.price}</p>

        <p className="description">{product.description}</p>

        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;