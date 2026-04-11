import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const productId = Number(id);

  // ❌ Invalid ID (NaN, string, etc.)
  if (!productId) {
    return (
      <div className="not-found">
        <h2>Invalid product ID</h2>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }

  const product = products.find((p) => p.id === productId);

  // ❌ Product not found
  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <p>The product you’re looking for doesn’t exist.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="image-container">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = "https://picsum.photos/400";
          }}
        />
      </div>

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