import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { Button, Input, Select } from "../components/ui";
import { useProducts } from "../hooks/useProducts";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["all", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const visibleProducts = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    return [...visibleProducts].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.title.localeCompare(b.title);

      return a.id - b.id;
    });
  }, [selectedCategory, searchQuery, sortBy]);

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
    <section className="listing-page" aria-labelledby="listing-title">
      <div className="listing-header">
        <div>
          <p className="section-kicker">Product catalog</p>
          <h1 id="listing-title">Explore all products</h1>
          <p>
            Search, filter, and compare the full collection in a responsive grid.
          </p>
        </div>

        <span className="listing-count">{filteredProducts.length} results</span>
      </div>

      <div className="listing-toolbar">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name</option>
        </Select>
      </div>

      <div className="listing-filters" aria-label="Product categories">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "active-filter" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="listing-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="listing-empty">
          <h2>No products found</h2>
          <p>Try a different search or category.</p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSortBy("featured");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </section>
  );
};

export default Products;
