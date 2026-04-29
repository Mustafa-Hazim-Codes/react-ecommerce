import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui";
import { clearWishlist, selectWishlistItems } from "../store/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.info("Wishlist cleared");
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your wishlist is empty</h2>
        <p>Save products you like and come back to them later.</p>

        <Button as={Link} to="/products">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <section className="wishlist-page" aria-labelledby="wishlist-title">
      <div className="listing-header">
        <div>
          <p className="section-kicker">Wishlist</p>
          <h1 id="wishlist-title">Saved products</h1>
          <p>{wishlistItems.length} products saved for later</p>
        </div>

        <Button variant="outline" size="sm" onClick={handleClearWishlist}>
          Clear Wishlist
        </Button>
      </div>

      <div className="listing-grid">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
