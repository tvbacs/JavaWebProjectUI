import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';

const cx = classNames.bind(styles);

// 📦 Modal thêm sản phẩm mới
export function CreateProductModal({ onClose, onSubmit, categories, brands }) {
  const [formData, setFormData] = useState({
    cat_id: '',
    brand_id: '',
    name: '',
    cpu: '',
    ram: '',
    gpu: '',
    material: '',
    power_rating: '',
    operating_system: '',
    storage_capacity: '',
    battery_life: '',
    price: '',
    manufacture_year: '',
    description: '',
    quantity: '',
    status: 'instock',
    imageFile: null
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      imageFile: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      'cat_id', 'brand_id', 'name', 'cpu', 'ram', 'gpu', 'material',
      'power_rating', 'operating_system', 'storage_capacity', 'battery_life',
      'price', 'manufacture_year', 'description', 'quantity'
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = 'Trường này là bắt buộc';
      }
    });

    // Price validation
    if (formData.price && (isNaN(formData.price) || parseFloat(formData.price) <= 0)) {
      newErrors.price = 'Giá phải là số dương';
    }

    // Quantity validation
    if (formData.quantity && (isNaN(formData.quantity) || parseInt(formData.quantity) < 0)) {
      newErrors.quantity = 'Số lượng phải là số nguyên không âm';
    }

    // Image file validation
    if (!formData.imageFile) {
      newErrors.imageFile = 'Vui lòng chọn hình ảnh sản phẩm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal", "large-modal")}>
        <div className={cx("modal-header")}>
          <h3>Thêm sản phẩm mới</h3>
          <button onClick={onClose} className={cx("close-btn")}>×</button>
        </div>

        <div className={cx("modal-content")}>
          <form onSubmit={handleSubmit} className={cx("product-form")}>
            <div className={cx("form-grid")}>
              {/* Danh mục và Thương hiệu */}
              <div className={cx("form-group", "category-group")}>
                <label>Danh mục *</label>
                <select
                  name="cat_id"
                  value={formData.cat_id}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.cat_id })}
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(cat => (
                    <option key={cat.cat_id} value={cat.cat_id}>
                      {cat.cat_name}
                    </option>
                  ))}
                </select>
                {errors.cat_id && <span className={cx("error-message")}>{errors.cat_id}</span>}
              </div>

              <div className={cx("form-group", "brand-group")}>
                <label>Thương hiệu *</label>
                <select
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.brand_id })}
                  required
                >
                  <option value="">Chọn thương hiệu</option>
                  {brands.map(brand => (
                    <option key={brand.brand_id} value={brand.brand_id}>
                      {brand.brand_name}
                    </option>
                  ))}
                </select>
                {errors.brand_id && <span className={cx("error-message")}>{errors.brand_id}</span>}
              </div>

              {/* Tên sản phẩm */}
              <div className={cx("form-group", "full-width")}>
                <label>Tên sản phẩm *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.name })}
                  placeholder="Nhập tên sản phẩm"
                  required
                />
                {errors.name && <span className={cx("error-message")}>{errors.name}</span>}
              </div>

              {/* Thông số kỹ thuật */}
              <div className={cx("form-group")}>
                <label>CPU *</label>
                <input
                  type="text"
                  name="cpu"
                  value={formData.cpu}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.cpu })}
                  placeholder="VD: Intel Core i7"
                  required
                />
                {errors.cpu && <span className={cx("error-message")}>{errors.cpu}</span>}
              </div>

              <div className={cx("form-group")}>
                <label>RAM *</label>
                <input
                  type="text"
                  name="ram"
                  value={formData.ram}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.ram })}
                  placeholder="VD: 16GB DDR4"
                  required
                />
                {errors.ram && <span className={cx("error-message")}>{errors.ram}</span>}
              </div>

              <div className={cx("form-group")}>
                <label>GPU *</label>
                <input
                  type="text"
                  name="gpu"
                  value={formData.gpu}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.gpu })}
                  placeholder="VD: NVIDIA RTX 4060"
                  required
                />
                {errors.gpu && <span className={cx("error-message")}>{errors.gpu}</span>}
              </div>

              <div className={cx("form-group")}>
                <label>Chất liệu *</label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.material })}
                  placeholder="VD: Nhôm, Nhựa"
                  required
                />
                {errors.material && <span className={cx("error-message")}>{errors.material}</span>}
              </div>

              <div className={cx("form-group")}>
                <label>Công suất *</label>
                <input
                  type="text"
                  name="power_rating"
                  value={formData.power_rating}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.power_rating })}
                  placeholder="VD: 65W"
                  required
                />
                {errors.power_rating && <span className={cx("error-message")}>{errors.power_rating}</span>}
              </div>

              <div className={cx("form-group")}>
                <label>Hệ điều hành *</label>
                <input
                  type="text"
                  name="operating_system"
                  value={formData.operating_system}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.operating_system })}
                  placeholder="VD: Windows 11"
                  required
                />
                {errors.operating_system && <span className={cx("error-message")}>{errors.operating_system}</span>}
              </div>

              <div className={cx("form-group")}>
                <label>Dung lượng lưu trữ *</label>
                <input
                  type="text"
                  name="storage_capacity"
                  value={formData.storage_capacity}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.storage_capacity })}
                  placeholder="VD: 512GB SSD"
                  required
                />
                {errors.storage_capacity && <span className={cx("error-message")}>{errors.storage_capacity}</span>}
              </div>

              <div className={cx("form-group")}>
                <label>Thời lượng pin *</label>
                <input
                  type="text"
                  name="battery_life"
                  value={formData.battery_life}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.battery_life })}
                  placeholder="VD: 8 giờ"
                  required
                />
                {errors.battery_life && <span className={cx("error-message")}>{errors.battery_life}</span>}
              </div>

              <div className={cx("form-group", "price-group")}>
                <label>Giá *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.price })}
                  placeholder="VD: 25000000"
                  min="0"
                  required
                />
                {errors.price && <span className={cx("error-message")}>{errors.price}</span>}
              </div>

              <div className={cx("form-group")}>
                <label>Năm sản xuất *</label>
                <input
                  type="text"
                  name="manufacture_year"
                  value={formData.manufacture_year}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.manufacture_year })}
                  placeholder="VD: 2024"
                  required
                />
                {errors.manufacture_year && <span className={cx("error-message")}>{errors.manufacture_year}</span>}
              </div>

              <div className={cx("form-group", "quantity-group")}>
                <label>Số lượng *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.quantity })}
                  placeholder="VD: 50"
                  min="0"
                  required
                />
                {errors.quantity && <span className={cx("error-message")}>{errors.quantity}</span>}
              </div>

              <div className={cx("form-group", "status-group")}>
                <label>Trạng thái *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="instock">Còn hàng</option>
                  <option value="outofstock">Hết hàng</option>
                </select>
              </div>

              {/* Mô tả */}
              <div className={cx("form-group", "full-width")}>
                <label>Mô tả *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.description })}
                  placeholder="Nhập mô tả chi tiết sản phẩm"
                  rows="4"
                  required
                />
                {errors.description && <span className={cx("error-message")}>{errors.description}</span>}
              </div>

              {/* Hình ảnh */}
              <div className={cx("form-group", "full-width", "image-group")}>
                <label>Hình ảnh sản phẩm *</label>
                <div className={cx("file-upload-area")}>
                  <div className={cx("upload-text")}>Chọn hình ảnh sản phẩm</div>
                  <div className={cx("upload-hint")}>Hỗ trợ JPG, PNG, GIF (tối đa 5MB)</div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={cx({ 'error': errors.imageFile })}
                    required
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                  />
                </div>
                {errors.imageFile && <span className={cx("error-message")}>{errors.imageFile}</span>}
                {formData.imageFile && (
                  <div className={cx("file-preview")}>
                    <span>✅ Đã chọn: {formData.imageFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={cx("modal-actions")}>
              <button type="button" onClick={onClose} className={cx("cancel-btn")}>
                Hủy
              </button>
              <button type="submit" disabled={loading} className={cx("submit-btn")}>
                {loading ? 'Đang thêm...' : 'Thêm sản phẩm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ✏️ Modal sửa sản phẩm
export function EditProductModal({ product, onClose, onSubmit, categories, brands }) {
  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    material: product?.material || '',
    power_rating: product?.power_rating || '',
    operating_system: product?.operating_system || '',
    storage_capacity: product?.storage_capacity || '',
    battery_life: product?.battery_life || '',
    manufacture_year: product?.manufacture_year || '',
    description: product?.description || '',
    quantity: product?.quantity || '',
    status: product?.status || 'instock',
    imageFile: null
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      imageFile: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Quantity validation
    if (formData.quantity && (isNaN(formData.quantity) || parseInt(formData.quantity) < 0)) {
      newErrors.quantity = 'Số lượng phải là số nguyên không âm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Chỉ gửi các field đã thay đổi
      const updatedData = { id: formData.id };

      // So sánh với dữ liệu gốc và chỉ thêm field đã thay đổi
      if (formData.name !== product.name) updatedData.name = formData.name;
      if (formData.material !== product.material) updatedData.material = formData.material;
      if (formData.power_rating !== product.power_rating) updatedData.power_rating = formData.power_rating;
      if (formData.operating_system !== product.operating_system) updatedData.operating_system = formData.operating_system;
      if (formData.storage_capacity !== product.storage_capacity) updatedData.storage_capacity = formData.storage_capacity;
      if (formData.battery_life !== product.battery_life) updatedData.battery_life = formData.battery_life;
      if (formData.manufacture_year !== product.manufacture_year) updatedData.manufacture_year = formData.manufacture_year;
      if (formData.description !== product.description) updatedData.description = formData.description;
      if (parseInt(formData.quantity) !== product.quantity) updatedData.quantity = parseInt(formData.quantity);
      if (formData.status !== product.status) updatedData.status = formData.status;
      if (formData.imageFile) updatedData.imageFile = formData.imageFile;

      await onSubmit(updatedData);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal", "large-modal")}>
        <div className={cx("modal-header")}>
          <h3>Sửa thông tin sản phẩm</h3>
          <button onClick={onClose} className={cx("close-btn")}>×</button>
        </div>

        <div className={cx("modal-content")}>
          <div className={cx("product-preview")}>
            <img
              src={product?.image ? `http://localhost:1512${product.image}` : "/images/item.jpg"}
              alt={product?.name}
              className={cx("preview-image")}
            />
            <div className={cx("preview-info")}>
              <strong>{product?.name}</strong>
              <span>ID: {product?.id}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={cx("product-form")}>
            <div className={cx("form-grid")}>
              {/* Tên sản phẩm */}
              <div className={cx("form-group", "full-width")}>
                <label>Tên sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              {/* Chất liệu */}
              <div className={cx("form-group")}>
                <label>Chất liệu</label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  placeholder="VD: Nhôm, Nhựa"
                />
              </div>

              {/* Công suất */}
              <div className={cx("form-group")}>
                <label>Công suất</label>
                <input
                  type="text"
                  name="power_rating"
                  value={formData.power_rating}
                  onChange={handleInputChange}
                  placeholder="VD: 65W"
                />
              </div>

              {/* Hệ điều hành */}
              <div className={cx("form-group")}>
                <label>Hệ điều hành</label>
                <input
                  type="text"
                  name="operating_system"
                  value={formData.operating_system}
                  onChange={handleInputChange}
                  placeholder="VD: Windows 11"
                />
              </div>

              {/* Dung lượng lưu trữ */}
              <div className={cx("form-group")}>
                <label>Dung lượng lưu trữ</label>
                <input
                  type="text"
                  name="storage_capacity"
                  value={formData.storage_capacity}
                  onChange={handleInputChange}
                  placeholder="VD: 512GB SSD"
                />
              </div>

              {/* Thời lượng pin */}
              <div className={cx("form-group")}>
                <label>Thời lượng pin</label>
                <input
                  type="text"
                  name="battery_life"
                  value={formData.battery_life}
                  onChange={handleInputChange}
                  placeholder="VD: 8 giờ"
                />
              </div>

              {/* Năm sản xuất */}
              <div className={cx("form-group")}>
                <label>Năm sản xuất</label>
                <input
                  type="text"
                  name="manufacture_year"
                  value={formData.manufacture_year}
                  onChange={handleInputChange}
                  placeholder="VD: 2024"
                />
              </div>

              {/* Số lượng */}
              <div className={cx("form-group", "quantity-group")}>
                <label>Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className={cx({ 'error': errors.quantity })}
                  placeholder="VD: 50"
                  min="0"
                />
                {errors.quantity && <span className={cx("error-message")}>{errors.quantity}</span>}
              </div>

              {/* Trạng thái */}
              <div className={cx("form-group", "status-group")}>
                <label>Trạng thái</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="instock">Còn hàng</option>
                  <option value="outofstock">Hết hàng</option>
                </select>
              </div>

              {/* Mô tả */}
              <div className={cx("form-group", "full-width")}>
                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả chi tiết sản phẩm"
                  rows="4"
                />
              </div>

              {/* Hình ảnh mới */}
              <div className={cx("form-group", "full-width", "image-group")}>
                <label className={cx("optional")}>Hình ảnh mới (tùy chọn)</label>
                <div className={cx("file-upload-area")}>
                  <span className={cx("upload-icon")}>🖼️</span>
                  <div className={cx("upload-text")}>Chọn hình ảnh mới</div>
                  <div className={cx("upload-hint")}>Để trống nếu không muốn thay đổi</div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                  />
                </div>
                {formData.imageFile && (
                  <div className={cx("file-preview")}>
                    <span>✅ Đã chọn: {formData.imageFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={cx("modal-actions")}>
              <button type="button" onClick={onClose} className={cx("cancel-btn")}>
                Hủy
              </button>
              <button type="submit" disabled={loading} className={cx("submit-btn")}>
                {loading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
