import { useEffect, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useMemo } from "react";
import Spinner from "../components/Spinner";
import { Button, Input } from "../components/ui";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // simulate loading

    return () => clearTimeout(timer);
  }, []);


  const maxProductPrice = Math.max(...products.map(p => p.price));
  const [maxPrice, setMaxPrice] = useState((maxProductPrice + 0.99).toFixed(2));

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


  if (loading) return <Spinner />;

  return (
    <div>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="hero-copy">
          <p className="hero-kicker">Fresh picks for everyday upgrades</p>
          <h1 id="home-hero-title">Shop smarter essentials in one place</h1>
          <p className="hero-description">
            Browse practical electronics, fashion, and accessories with quick
            filtering and a simple cart flow built for easy checkout.
          </p>

          <div className="hero-actions">
            <Button as="a" href="#products" variant="light">
              Shop Now
            </Button>
            <Button as="a" href="#filters" variant="ghost-light">
              Browse Categories
            </Button>
          </div>

          <div className="hero-stats" aria-label="Store highlights">
            <span>
              <strong>{products.length}</strong>
              Products
            </span>
            <span>
              <strong>{categories.length - 1}</strong>
              Categories
            </span>
            <span>
              <strong>${Math.round(maxProductPrice)}</strong>
              Top Price
            </span>
          </div>
        </div>

        <div className="hero-product" aria-label="Featured product">
          <img
            src={products[0]?.image}
            alt={products[0]?.title || "Featured product"}
            onError={(e) => {
              e.target.src = "https://picsum.photos/560/420";
            }}
          />
          <div>
            <span>Featured</span>
            <strong>{products[0]?.title}</strong>
            <p>${products[0]?.price}</p>
          </div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="section-heading">
          <h2>Products</h2>
          <p>{filteredProducts.length} items available</p>
        </div>

        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />


      {/* Filters */}
      <div id="filters" className="filters">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "active-filter" : ""}
          >
            {cat}
          </Button>
        ))}
      </div>


      
      <div className="price-filter">
        <label>Max Price: ${maxPrice}</label>

        <input
          type="range"
          min="0"
          setp="1"
          max={maxProductPrice || 0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value)+2)}
        />
      </div>

      {/* Products */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && <p>No products found</p>}
      </section>
    </div>
  );
};

export default Home;
