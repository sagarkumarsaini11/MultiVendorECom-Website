import { useState } from "react";

const defaultForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "General",
  image: "",
};

export default function ProductForm({ initial = {}, onSubmit, loading, submitLabel = "Save Product" }) {
  const [form, setForm] = useState({ ...defaultForm, ...initial });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(initial.image || "");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key !== "image" && val !== "") fd.append(key, val);
    });
    if (imageFile) fd.append("image", imageFile);
    else if (form.image) fd.append("image", form.image);
    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Price (₹)</label>
          <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Stock</label>
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Image</label>
          <input type="file" accept="image/*" onChange={handleImage} className="input-field" />
        </div>
        {preview && (
          <div className="sm:col-span-2">
            <img src={preview} alt="Preview" className="h-32 w-32 rounded-lg object-cover" />
          </div>
        )}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea name="description" rows={4} value={form.description} onChange={handleChange} className="input-field" />
        </div>
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
