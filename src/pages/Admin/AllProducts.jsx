import React, { useEffect, useState } from "react";
import "./AllProducts.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // For editing product info
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", category: "" });

  // For editing image
  const [editingImage, setEditingImage] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://backend-k59u.onrender.com/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`https://backend-k59u.onrender.com/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      alert("✅ Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      alert("❌ Error deleting product: " + err.message);
    }
  };

  // Open edit product modal
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
    });
  };

  // Save product info
  const handleEditSave = async () => {
    try {
      const res = await fetch(
        `https://backend-k59u.onrender.com/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        }
      );

      if (!res.ok) throw new Error("Failed to update product");

      alert("✅ Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert("❌ Error updating product: " + err.message);
    }
  };

  // Open edit image modal
  const handleImageEdit = (productId, imageIndex) => {
    setEditingImage({ productId, imageIndex });
    const product = products.find((p) => p._id === productId);
    setNewImageUrl(product.images[imageIndex]);
  };

  // Save updated image
  const saveImageUpdate = async () => {
    const { productId, imageIndex } = editingImage;
    const formData = new FormData();
    formData.append("imageIndex", imageIndex);
    formData.append("imageFile", newImageUrl); // newImageUrl is File object

    try {
      const res = await fetch(`https://backend-k59u.onrender.com/api/products/${productId}/image`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update image");

      alert("✅ Image updated successfully!");
      setEditingImage(null);
      fetchProducts();
    } catch (err) {
      alert("❌ Error updating image: " + err.message);
    }
  };

  return (
    <div className="all-products-container">
      <h2>🛍️ All Products</h2>

      {loading ? (
        <p className="loading">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="product-table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="product-images">
                      {p.images.map((img, index) => (
                        <div key={index} className="image-wrapper">
                          <img
                            src={img}
                            alt={`${p.name} ${index + 1}`}
                            className="product-img"
                          />
                          
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn edit-btn" onClick={() => handleEditClick(p)}>
                        Edit
                      </button>
                      <button className="btn delete-btn" onClick={() => handleDelete(p._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Product</h3>
            <label>Name:</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <label>Price (₹):</label>
            <input
              type="number"
              value={editForm.price}
              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
            />
            <label>Category:</label>
            <input
              type="text"
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            />

            <div className="modal-buttons">
              <button className="btn save-btn" onClick={handleEditSave}>
                Save
              </button>
              <button className="btn cancel-btn" onClick={() => setEditingProduct(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {editingImage && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Image</h3>
            <input
              type="file"
              onChange={(e) => setNewImageUrl(e.target.files[0])}
            />
            <div className="modal-buttons">
              <button className="btn save-btn" onClick={saveImageUpdate}>Save</button>
              <button className="btn cancel-btn" onClick={() => setEditingImage(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;