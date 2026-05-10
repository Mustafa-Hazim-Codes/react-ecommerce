import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useMemo } from "react";
import Spinner from "../components/Spinner";
import { Button, Input } from "../components/ui";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);


  const maxProductPrice = products.length
    ? Math.max(...products.map(p => p.price))
    : 0;
  const [maxPrice, setMaxPrice] = useState((maxProductPrice + 0.99).toFixed(2));

  useEffect(() => {
    if (maxProductPrice > 0) {
      setMaxPrice((maxProductPrice + 0.99).toFixed(2));
    }
  }, [maxProductPrice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const categories = ["all", ...new Set(products.map(p => p.category))];
  const featuredProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);
  const categoryShowcase = categories
    .filter((category) => category !== "all")
    .map((category) => {
      const categoryProducts = products.filter((product) => product.category === category);
      const previewProduct = categoryProducts[0];

      return {
        name: category,
        count: categoryProducts.length,
        image: previewProduct?.image,
      };
    });

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

  if (error) {
    return (
      <div className="listing-empty">
        <h2>Unable to load products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="hero-content">
          <div className="hero-copy">
            <p className="hero-kicker">Premium everyday essentials</p>
            <h1 id="home-hero-title">Curated goods for a sharper daily rhythm</h1>
            <p className="hero-description">
              Discover refined tech, wardrobe staples, and practical upgrades
              selected for quality, utility, and quiet confidence.
            </p>

            <div className="hero-actions">
              <Button as={Link} to="/products" variant="light">
                Shop Collection
              </Button>
              <Button as="a" href="#categories-title" variant="ghost-light">
                Explore Edits
              </Button>
            </div>
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

        <div className="hero-showcase" aria-label="Featured product">
          <div className="hero-product hero-product-main">
            <img
              src={products[0]?.image}
              alt={products[0]?.title || "Featured product"}
              onError={(e) => {
                e.target.src = "https://placehold.co/560x420";
              }}
            />
            <div>
              <span>New arrival</span>
              <strong>{products[0]?.title}</strong>
              <p>${products[0]?.price}</p>
            </div>
          </div>

          <div className="hero-product hero-product-small">
            <img
              src={featuredProducts[0]?.image}
              alt={featuredProducts[0]?.title || "Featured product"}
              onError={(e) => {
                e.target.src = "https://placehold.co/320x240";
              }}
            />
            <div>
              <span>Top pick</span>
              <strong>{featuredProducts[0]?.title}</strong>
              <p>${featuredProducts[0]?.price}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-strip" aria-label="Store benefits">
        <div>
          <strong>Free shipping</strong>
          <span>On orders over $100</span>
        </div>
        <div>
          <strong>Curated catalog</strong>
          <span>Focused picks, no clutter</span>
        </div>
        <div>
          <strong>Secure checkout</strong>
          <span>Fast cart and saved wishlist</span>
        </div>
      </section>

      <section className="editorial-section" aria-labelledby="editorial-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">The latest edit</p>
            <h2 id="editorial-title">Built around how you actually move</h2>
          </div>
        </div>

        <div className="editorial-grid">
          <article className="editorial-card editorial-card-large">
            <img
              src="https://placehold.co/1200x240"
              alt="Premium desk setup"
            />
            <div>
              <span>Work smarter</span>
              <h3>Clean tech for focused days</h3>
              <p>Upgrade the tools you reach for every morning.</p>
            </div>
          </article>

           <article className="editorial-card">
            <img
              src="https://placehold.co/900x240"
              alt="Refined fashion essentials"
            />
            <div>
              <span>Style edit</span>
              <h3>Easy pieces with polish</h3>
            </div>
          </article>

          <article className="editorial-card">
            <img
              src="https://placehold.co/900x240"
              alt="Accessories and daily carry"
            />
            <div>
              <span>Daily carry</span>
              <h3>Small upgrades, big difference</h3>
            </div>
          </article>
        </div>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Featured products</p>
            <h2 id="featured-title">Signature picks from the collection</h2>
          </div>
          <Button as={Link} to="/products" variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={`featured-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      <section className="categories-showcase" aria-labelledby="categories-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Shop by category</p>
            <h2 id="categories-title">Explore curated departments</h2>
          </div>
        </div>

        <div className="category-grid">
          {categoryShowcase.map((category) => (
            <button
              type="button"
              key={category.name}
              className="category-tile"
              onClick={() => {
                setSelectedCategory(category.name);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img
                src={category.image}
                alt=""
                onError={(e) => {
                  e.target.src = "https://picsum.photos/480/320";
                }}
              />
              <span>
                <strong>{category.name}</strong>
                {category.count} products
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Browse the catalog</p>
            <h2>All products</h2>
          </div>
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
