import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui";
import products from "../data/products";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productId = Number(id);

  if (!productId) {
    return (
      <div className="not-found">
        <h2>Invalid product ID</h2>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const productLabel = encodeURIComponent(product.title);
  const galleryImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [
          product.image,
          `https://placehold.co/640x640/f8fafc/0f172a?text=${productLabel}`,
          `https://placehold.co/640x640/e0f2fe/0f172a?text=${product.category}`,
          "https://placehold.co/640x640/ccfbf1/0f172a?text=Details",
        ];

  const selectedImage = galleryImages[selectedImageIndex] || galleryImages[0];

  return (
    <div className="product-details">
      <div className="product-gallery">
        <div className="image-container">
          <img
            src={selectedImage}
            alt={`${product.title} view ${selectedImageIndex + 1}`}
            onError={(e) => {
              e.target.src = "https://picsum.photos/640";
            }}
          />
        </div>

        <div className="gallery-thumbnails" aria-label="Product image gallery">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              className={index === selectedImageIndex ? "active-thumbnail" : ""}
              aria-label={`Show ${product.title} image ${index + 1}`}
              aria-pressed={index === selectedImageIndex}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image}
                alt=""
                onError={(e) => {
                  e.target.src = "https://picsum.photos/120";
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="details">
        <Link to="/products" className="back-link">
          Back to products
        </Link>
        <span className="product-category">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>

        <div className="detail-highlights">
          <span>Free returns</span>
          <span>Fast checkout</span>
          <span>Secure payment</span>
        </div>

        <div className="detail-actions">
          <Button className="add-to-cart" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
          <Button as={Link} to="/cart" variant="outline">
            View Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
