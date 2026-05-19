import React, { useState } from "react";
import "./UploadProducts.css";

const UploadProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    offer: "",
    rating: "",
    category: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const allFiles = [...product.images, ...newFiles].slice(0, 5);
    setProduct((prev) => ({ ...prev, images: allFiles }));
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews].slice(0, 5));
  };

  const removeImage = (index) => {
    const newImages = product.images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, images: newImages }));
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.category) {
      alert("⚠️ Please fill Product Name & Category!");
      return;
    }

    setIsLoading(true);

    try {
      const CLOUD_NAME = "dwavtlwjj";
      const UPLOAD_PRESET = "e8bkrlgm";

      const uploadedImageURLs = await Promise.all(
        product.images.map(async (imageFile) => {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("upload_preset", UPLOAD_PRESET);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData }
          );

          if (!response.ok) throw new Error("Cloudinary upload failed");
          const data = await response.json();
          return data.secure_url;
        })
      );

      const discountedPrice =
        product.price && product.offer
          ? (Number(product.price) * (100 - Number(product.offer))) / 100
          : product.price;

      const newProduct = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        offer: product.offer ? Number(product.offer) : 0,
        discountedPrice: discountedPrice ? Number(discountedPrice.toFixed(2)) : null,
        rating: product.rating,
        category: product.category,
        images: uploadedImageURLs,
      };

      const backendResponse = await fetch(
        "https://backend-k59u.onrender.com/api/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );

      if (!backendResponse.ok) throw new Error("Failed to save product to backend");

      alert("✅ Product uploaded successfully!");
      setProduct({
        name: "",
        description: "",
        price: "",
        offer: "",
        rating: "",
        category: "",
        images: [],
      });
      setPreviewImages([]);
    } catch (error) {
      alert("❌ Error uploading product: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    "Barcode Scanners",
    "Currency Counters",
    "Cash Drawers",
    "Computing devices - laptops, tablets, desktops",
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

  const discountedPrice =
    product.price && product.offer
      ? (Number(product.price) * (100 - Number(product.offer))) / 100
      : product.price;

  return (
    <div className="upload-container">
      {isLoading && (
        <div className="overlay-loader">
          <div className="spinner"></div>
          <p>Uploading product, please wait...</p>
        </div>
      )}

      <h2 className="upload-title">📦 Add New Product</h2>

      <div className="image-preview-grid">
        {previewImages.length > 0 ? (
          previewImages.map((src, idx) => (
            <div key={idx} className="image-card">
              <img src={src} alt={`preview-${idx}`} />
              <button type="button" className="remove-image" onClick={() => removeImage(idx)}>
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="no-image">No images selected</p>
        )}
      </div>

      <form className="upload-form-modern" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload Images (max 5)</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        </div>

        <div className="form-group">
          <label>Product Name*</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>

        <div className="form-group full">
          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Offer (%)</label>
            <input
              type="number"
              name="offer"
              value={product.offer}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Enter discount %"
            />
          </div>

          <div className="form-group">
            <label>Rating (1–5)</label>
            <input
              type="number"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Category*</label>
          <select name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {product.price && (
          <div className="price-preview">
            {product.offer ? (
              <>
                <span className="original-price">₹{product.price}</span>
                <span className="discounted-price">₹{discountedPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="normal-price">₹{product.price}</span>
            )}
          </div>
        )}

        <button type="submit" className="modern-submit">
          Upload Product 🚀
        </button>
      </form>
    </div>
  );
};

export default UploadProducts;
