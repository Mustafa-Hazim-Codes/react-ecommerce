import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card } from "./ui";
import { selectIsWishlisted, toggleWishlist } from "../store/wishlistSlice";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlisted = useSelector(selectIsWishlisted(product.id));

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
    toast.info(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      theme: wishlisted ? "light" : "colored",
    });
  };

  return (
    <Card className="product-card" interactive>
      <button
        type="button"
        className={`wishlist-toggle ${wishlisted ? "is-active" : ""}`}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        onClick={handleWishlistToggle}
      >
        {wishlisted ? "\u2665" : "\u2661"}
      </button>

      <Link to={`/product/${product.id}`} className="product-card-link">
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
    </Card>
  );
};

export default ProductCard;
