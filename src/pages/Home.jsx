import { useEffect, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useMemo } from "react";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const maxProductPrice = Math.max(...products.map(p => p.price));
  const [maxPrice, setMaxPrice] = useState((maxProductPrice+0.99).toFixed(2));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase());

      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, selectedCategory, debouncedQuery, maxPrice]);

  return (
    <div>
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <div className="price-filter">
        <label>Max Price: ${maxPrice}</label>

        <input
          type="range"
          min="0"
          max={maxProductPrice}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

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

      {filteredProducts.length === 0 && <p>No products found</p>}
    </div>
  );
};

export default Home;