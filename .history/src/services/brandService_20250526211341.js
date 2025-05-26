import request from '../utils/request';

// 🔐 Validate admin access
const validateAdminAccess = async () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    throw new Error('Vui lòng đăng nhập để tiếp tục');
  }

  if (userRole !== 'admin') {
    throw new Error('Bạn không có quyền truy cập chức năng này');
  }
};

const brandService = {
  getAllBrands: async () => {
    try {
      const response = await request.get('/brands');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy danh sách thương hiệu';
      return { success: false, message };
    }
  },

  createBrand: async (brand) => {
    try {
      // Validate admin access
      await validateAdminAccess();

      console.log('🔄 Creating new brand via brandService...', brand);

      const response = await request.post('/brands', brand);

      console.log('✅ Brand created successfully via brandService');
      console.log('📋 Response:', response.data);

      return {
        success: true,
        data: response.data,
        message: `Thương hiệu "${brand.brand_name}" đã được thêm thành công`
      };
    } catch (error) {
      console.error('❌ Error creating brand via brandService:', error);

      // Detailed error logging
      if (error.response) {
        console.error('❌ Response status:', error.response.status);
        console.error('❌ Response data:', error.response.data);
      }

      const message = error.response?.data?.error ||
                     error.response?.data?.message ||
                     error.message ||
                     'Không thể tạo thương hiệu';
      return { success: false, message };
    }
  },
};

export default brandService;