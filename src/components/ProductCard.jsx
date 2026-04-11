import React from "react";
import { Link } from "react-router-dom";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = "https://picsum.photos/200";
          }}
        />
      </Link>

      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
    </div>
  );
};

export default React.memo(ProductCard);