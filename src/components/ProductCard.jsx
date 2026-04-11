import { Link } from "react-router-dom";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="card-image">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = "https://picsum.photos/300";
          }}
        />
      </div>

      <div className="card-content">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;