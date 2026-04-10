import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      <h1>Products</h1>

      {/* Filters */}
      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "active-filter" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;