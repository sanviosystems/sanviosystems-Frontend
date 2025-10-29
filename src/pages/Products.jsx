import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const Touch_Pos = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]); // Backend fetched products
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();
  const productsPerPage = 8;

  const categories = [
    "All",
    "Barcode Scanners",
    "Currency Counters",
    "Cash Drawers",
    "Computing devices - laptops, tablets,desktops ",
    "Consumables",
    "Dot Matrix Printers",
    "Keyboards and Mouse",
    "Label Printers",
    "Mobile Printer",
    "Miscellaneous Products",
    "POS Printer",
    "Specialty printers",
    "Spares",
    "Touch POS Systems",
    "Thermal Receipt Printers",
    "Web Camera",
  ];

  // Fetch products from backend API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);  // start loader
      try {
        const res = await fetch("https://backend-k59u.onrender.com/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        console.log("✅ Products fetched:", data);
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);  // stop loader after fetch or error
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
        (item) =>
          item.category && item.category.toLowerCase() === selectedCategory.toLowerCase()
      );


  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item._id === product._id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`"${product.name}" added to cart ✅`);
  };

  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const ratingNum = Math.round(Number(rating)) || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ color: i <= ratingNum ? "#FFD700" : "#ccc", fontSize: "18px" }}
        >
          {i <= ratingNum ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  const handleFilterSelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setShowFilters(false);
  };


  return (
    <>
      <style>{`
  .touch-container {
    display: flex;
    gap: 20px;
    margin-top: 100px;
    padding: 20px;
  }

  .sidebar {
    width: 250px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    height: fit-content;
  }

  .sidebar h3 {
    margin-bottom: 10px;
    font-size: 18px;
    text-align: center;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar li {
    padding: 10px;
    margin: 4px 0;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
    font-size: 14px;
  }

  .sidebar li:hover {
    background: #f5f5f5;
  }

  .sidebar li.active {
    background: #007bff;
    color: white;
  }

  .product-section {
    flex: 1;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .product-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }

  .product-card img {
    width: 100%;
    height: 180px;
    object-fit: contain;
    border-radius: 6px;
  }

  .product-name {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 10px 0 5px;
  }

  .product-price {
    font-weight: bold;
    color: #444;
    margin-bottom: 5px;
  }

  .product-rating {
    margin-bottom: 10px;
    user-select: none;
  }

  .button-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .add-to-cart-btn, .buy-now-btn {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: white;
    font-weight: 600;
  }

  .add-to-cart-btn {
    background-color: #1e88e5;
  }

  .add-to-cart-btn:hover {
    background-color: #1565c0;
  }

  .buy-now-btn {
    background-color: #ff9800;
  }

  .buy-now-btn:hover {
    background-color: #f57c00;
  }

 .pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.pagination button {
  padding: 8px 14px;
  border: none;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 36px;
  height: 36px;
}

.pagination button.active {
  background-color: #007bff;
  color: white;
  transform: scale(1.1);
}

.pagination button:hover:not(.active) {
  background-color: #ddd;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  padding: 0 6px;
  color: #888;
  font-weight: 600;
}

.arrow-btn {
  border-radius: 50%;
  font-size: 18px;
}


  .mobile-filter-btn {
    display: none;
    position: fixed;
    top: 90px;
    left: 10px;
    background: #007bff;
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    z-index: 999;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    .touch-container {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      display: none;
      margin-bottom: 20px;
    }

    .sidebar.show {
      display: block;
    }

    .product-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .mobile-filter-btn {
      display: flex;
    }
  }

  @media (max-width: 480px) {
    .product-grid {
      grid-template-columns: 1fr;
    }
  }
`}</style>


      <button className="mobile-filter-btn" onClick={() => setShowFilters(!showFilters)}>
        <FaFilter size={16} /> Filter
      </button>

      <div className="touch-container">
        <div className={`sidebar ${showFilters ? "show" : ""}`}>
          <h3 style={{ backgroundColor: "#ff9800", color: "white", padding: "10px", borderRadius: "6px" }}>
            Filter by Category
          </h3>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => handleFilterSelect(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="product-section">
          <h2 style={{ textAlign: "center" }}>
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h2>

          {loading ? (
            <p style={{ textAlign: "center", fontSize: "18px" }}>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p style={{ textAlign: "center" }}>No products found.</p>
          ) : (
            <>
              <div className="product-grid">
                {currentProducts.map((product) => (
                  <div className="product-card" key={product._id}>
                    <Link
                      to={`/product-detail/${product._id}`}
                      state={{ product }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : "/images/default-product.png"
                        }
                        alt={product.name}
                      />
                      <div className="product-name">{product.name}</div>
                      <div className="product-price">₹{product.price}</div>
                      <div className="product-rating">{renderStars(product.rating)}</div>
                    </Link>

                    <div className="button-row">
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="buy-now-btn"
                        onClick={() =>
                          navigate("/buy-now", { state: { cart: [{ ...product, quantity: 1 }] } })
                        }
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="arrow-btn"
                    disabled={currentPage === 1}
                  >
                    &#8592;
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;

                    // Show first, last, current ±1 pages
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      Math.abs(pageNum - currentPage) <= 1
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={currentPage === pageNum ? "active" : ""}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return <span key={pageNum}>...</span>;
                    } else {
                      return null;
                    }
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="arrow-btn"
                    disabled={currentPage === totalPages}
                  >
                    &#8594;
                  </button>
                </div>
              )}

            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Touch_Pos;
