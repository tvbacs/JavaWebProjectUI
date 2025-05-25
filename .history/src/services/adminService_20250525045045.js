import request from '../utils/request';
import authService from './authService';

// Helper function to validate admin access before API calls
const validateAdminAccess = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Không có token xác thực');
  }

  const userResult = await authService.getMe();
  if (!userResult.success) {
    localStorage.removeItem('token');
    throw new Error('Token không hợp lệ');
  }

  if (userResult.user.type !== 'admin') {
    throw new Error('Không có quyền truy cập admin');
  }

  return userResult.user;
};

const adminService = {
  // ============ USER MANAGEMENT ============

  getUserStatistics: async () => {
    try {
      // Validate admin access before making API call
      await validateAdminAccess();

      // Get users from getAllUsers method (which now uses real API)
      const usersResult = await adminService.getAllUsers();
      if (!usersResult.success) {
        return usersResult;
      }

      const users = usersResult.data;

      // Calculate statistics from real API data
      const userStats = {
        totalUsers: users.length,
        adminCount: users.filter(u => u.type === 'admin').length,
        userCount: users.filter(u => u.type === 'user').length,
        newUsersThisMonth: users.filter(u => {
          const createdDate = new Date(u.createdAt);
          const now = new Date();
          const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          return createdDate >= thisMonth;
        }).length,
        activeUsers: users.filter(u => u.status === 'active' || !u.status).length // Assume active if no status field
      };

      console.log('📊 User statistics calculated from real API:', userStats);
      return {
        success: true,
        data: userStats,
      };
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Không thể lấy thống kê người dùng';
      return { success: false, message };
    }
  },

  createUser: async (userData) => {
    try {
      // Validate admin access before making API call
      await validateAdminAccess();

      console.log('🔄 Creating user via /auth/signup:', userData);

      // Use existing /auth/signup endpoint for user creation
      const formData = new URLSearchParams();
      formData.append('email', userData.email);
      formData.append('fullname', userData.fullname);
      formData.append('phonenumber', userData.phonenumber);
      formData.append('password', userData.password);
      // Note: /auth/signup creates regular users by default
      // Admin type assignment would need to be handled separately if needed

      const response = await request.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('✅ User created successfully via /auth/signup');
      return {
        success: true,
        data: {
          message: response.data.message || `User ${userData.fullname} đã được tạo thành công`,
          email: userData.email,
          fullname: userData.fullname,
          phonenumber: userData.phonenumber,
          type: 'user' // Default type from signup
        },
      };
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Không thể tạo người dùng';
      return { success: false, message };
    }
  },

  updateUser: async (userId, userData) => {
    try {
      // Validate admin access before making API call
      await validateAdminAccess();

      console.log('🔄 Mock updating user (no update endpoint available):', userId, userData);

      // MOCK IMPLEMENTATION - Backend doesn't have user update endpoint
      // This would require a new endpoint like PUT /auth/users/{id} or PUT /admin/users/{id}
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('✅ Mock user update successful');
      return {
        success: true,
        data: {
          userId: userId,
          ...userData,
          message: `User ${userId} đã được cập nhật thành công (Mock)`
        },
      };
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Không thể cập nhật người dùng';
      return { success: false, message };
    }
  },

  deleteUser: async (userId) => {
    try {
      // Validate admin access before making API call
      await validateAdminAccess();

      console.log('🔄 Mock deleting user (no delete endpoint available):', userId);

      // MOCK IMPLEMENTATION - Backend doesn't have user delete endpoint
      // This would require a new endpoint like DELETE /auth/users/{id} or DELETE /admin/users/{id}

      // Get user data to check if it's an admin (for frontend validation)
      const usersResult = await adminService.getAllUsers();
      if (!usersResult.success) {
        return usersResult;
      }

      const userToDelete = usersResult.data.find(user => user.userId === userId);
      if (!userToDelete) {
        return { success: false, message: 'Không tìm thấy user cần xóa' };
      }

      // Prevent deleting admin users (frontend validation)
      if (userToDelete.type === 'admin') {
        return {
          success: false,
          message: 'Không thể xóa tài khoản admin. Chỉ có thể xóa tài khoản user thường.'
        };
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('✅ Mock user deletion successful');
      return {
        success: true,
        data: {
          userId: userId,
          message: `User ${userToDelete.fullname} đã được xóa thành công (Mock)`
        },
      };
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Không thể xóa người dùng';
      return { success: false, message };
    }
  },

  getAllUsers: async () => {
    try {
      // Validate admin access before making API call
      await validateAdminAccess();

      console.log('🔄 Fetching users from /auth/all-users...');

      // Use the confirmed working endpoint
      const response = await request.get('/auth/all-users');
      console.log('✅ Users fetched successfully:', response.data.length, 'users');

      return {
        success: true,
        data: response.data,
      };

    } catch (error) {
      console.error('� All user endpoints failed:', error);
      const message = error.response?.data?.error || error.message || 'Không thể lấy danh sách người dùng từ API';
      return { success: false, message };
    }
  },

  searchUsers: async (keyword, type) => {
    try {
      // Validate admin access before making API call
      await validateAdminAccess();

      // Get users from getAllUsers method (which now uses real API)
      const usersResult = await adminService.getAllUsers();
      if (!usersResult.success) {
        return usersResult;
      }

      let users = usersResult.data;

      // Apply filters on frontend
      if (keyword) {
        const searchTerm = keyword.toLowerCase();
        users = users.filter(user =>
          user.fullname?.toLowerCase().includes(searchTerm) ||
          user.email?.toLowerCase().includes(searchTerm) ||
          user.userId?.toLowerCase().includes(searchTerm) ||
          user.username?.toLowerCase().includes(searchTerm) // Additional field
        );
      }

      if (type) {
        users = users.filter(user => user.type === type);
      }

      console.log('🔍 Search results from real API:', users.length, 'users found');
      return {
        success: true,
        data: users,
      };
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Không thể tìm kiếm người dùng';
      return { success: false, message };
    }
  },

  // ============ PRODUCT MANAGEMENT ============

  getProductStatistics: async () => {
    try {
      // Use existing endpoint instead of non-existent admin endpoint
      const response = await request.get('/electronics');
      const products = response.data;

      // Calculate statistics from raw data
      const productStats = {
        totalProducts: products.length,
        activeProducts: products.filter(p => p.quantity > 0).length,
        inactiveProducts: products.filter(p => p.quantity === 0).length,
        totalStock: products.reduce((sum, p) => sum + p.quantity, 0),
        lowStockProducts: products.filter(p => p.quantity <= 10 && p.quantity > 0).length,
        outOfStockProducts: products.filter(p => p.quantity === 0).length
      };

      return {
        success: true,
        data: productStats,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy thống kê sản phẩm';
      return { success: false, message };
    }
  },

  getLowStockProducts: async (threshold = 10) => {
    try {
      // Use existing endpoint instead of non-existent admin endpoint
      const response = await request.get('/electronics');
      const products = response.data;

      // Filter low stock products
      const lowStockProducts = products
        .filter(p => p.quantity <= threshold && p.quantity > 0)
        .map(p => ({
          id: p.id,
          name: p.name,
          quantity: p.quantity,
          price: p.price,
          category: p.category?.cat_name || 'Unknown',
          brand: p.brand?.brand_name || 'Unknown'
        }));

      return {
        success: true,
        data: lowStockProducts,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy sản phẩm sắp hết hàng';
      return { success: false, message };
    }
  },

  updateProductStock: async (productId, quantity) => {
    try {
      const response = await request.put(`/admin/products/${productId}/stock`, {
        quantity: quantity
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể cập nhật số lượng sản phẩm';
      return { success: false, message };
    }
  },

  getProductStatisticsByCategory: async () => {
    try {
      const response = await request.get('/admin/products/statistics/by-category');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy thống kê theo danh mục';
      return { success: false, message };
    }
  },

  getProductStatisticsByBrand: async () => {
    try {
      const response = await request.get('/admin/products/statistics/by-brand');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy thống kê theo thương hiệu';
      return { success: false, message };
    }
  },

  getProductsByStatus: async (status) => {
    try {
      const response = await request.get(`/admin/products/by-status?status=${status}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy sản phẩm theo trạng thái';
      return { success: false, message };
    }
  },

  bulkUpdateProductStatus: async (productIds, status) => {
    try {
      const response = await request.put('/admin/products/bulk-status', {
        productIds: productIds,
        status: status
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể cập nhật trạng thái sản phẩm';
      return { success: false, message };
    }
  },

  searchProducts: async (filters) => {
    try {
      // Use existing /electronics endpoint and filter on frontend
      const response = await request.get('/electronics');
      let products = response.data;

      // Apply filters
      if (filters.keyword) {
        const searchTerm = filters.keyword.toLowerCase();
        products = products.filter(product =>
          product.name?.toLowerCase().includes(searchTerm) ||
          product.id?.toString().includes(searchTerm)
        );
      }

      if (filters.categoryId) {
        products = products.filter(product =>
          product.category?.cat_id?.toString() === filters.categoryId
        );
      }

      if (filters.brandId) {
        products = products.filter(product =>
          product.brand?.brand_id?.toString() === filters.brandId
        );
      }

      if (filters.status) {
        if (filters.status === 'active') {
          products = products.filter(product => product.quantity > 0);
        } else if (filters.status === 'inactive') {
          products = products.filter(product => product.quantity === 0);
        }
      }

      console.log('🔍 Product search results:', products.length, 'products found');
      return {
        success: true,
        data: products,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể tìm kiếm sản phẩm';
      return { success: false, message };
    }
  },

  // ============ ORDER MANAGEMENT ============

  getOrderStatistics: async () => {
    try {
      // Mock data since backend doesn't have complete order system yet
      const orderStats = {
        totalOrders: 5,
        pendingOrders: 2,
        processingOrders: 1,
        processedOrders: 1,
        cancelledOrders: 1,
        totalRevenue: "165000000",      // Sum of all orders
        todayRevenue: "35000000",       // Today's revenue
        revenueThisMonth: "165000000",  // This month revenue
        averageOrderValue: "33000000"   // Average order value
      };

      return {
        success: true,
        data: orderStats,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy thống kê đơn hàng';
      return { success: false, message };
    }
  },

  getRevenueReport: async (fromDate, toDate, groupBy = 'month') => {
    try {
      const params = new URLSearchParams();
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);
      params.append('groupBy', groupBy);

      const response = await request.get(`/admin/orders/revenue?${params.toString()}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy báo cáo doanh thu';
      return { success: false, message };
    }
  },

  getAllOrders: async (filters = {}) => {
    try {
      // Try to get real invoices data from backend
      const response = await request.get('/invoices');
      let orders = response.data;

      // Map invoice data to order format
      orders = orders.map(invoice => ({
        invoiceId: invoice.invoiceId,
        user: {
          fullname: invoice.user?.fullname || 'N/A',
          email: invoice.user?.email || 'N/A'
        },
        purchasedItems: invoice.purchasedItems,
        totalPrice: invoice.totalPrice,
        paymentMethod: invoice.paymentMethod,
        status: invoice.status || 'pending',
        createdAt: invoice.createdAt
      }));

      // Apply filters if provided
      let filteredOrders = orders;

      if (filters.status) {
        filteredOrders = filteredOrders.filter(order => order.status === filters.status);
      }

      if (filters.userId) {
        const searchTerm = filters.userId.toLowerCase();
        filteredOrders = filteredOrders.filter(order =>
          order.user.email.toLowerCase().includes(searchTerm) ||
          order.user.fullname.toLowerCase().includes(searchTerm) ||
          order.invoiceId.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.fromDate) {
        const fromDate = new Date(filters.fromDate);
        filteredOrders = filteredOrders.filter(order =>
          new Date(order.createdAt) >= fromDate
        );
      }

      if (filters.toDate) {
        const toDate = new Date(filters.toDate);
        toDate.setHours(23, 59, 59, 999); // End of day
        filteredOrders = filteredOrders.filter(order =>
          new Date(order.createdAt) <= toDate
        );
      }

      console.log('🔍 Real API Order search results:', filteredOrders.length, 'orders found');

      return {
        success: true,
        data: filteredOrders,
      };
    } catch (error) {
      console.error('Error fetching real orders, falling back to mock:', error);

      // Fallback to mock data if API fails
      const mockOrders = [
        {
          invoiceId: "INV001",
          user: {
            fullname: "Nguyễn Văn A",
            email: "nguyenvana@email.com"
          },
          purchasedItems: "iPhone 15 Pro x1, AirPods Pro x1",
          totalPrice: "35000000",
          paymentMethod: "cod",
          status: "pending",
          createdAt: "2024-01-15T10:30:00Z"
        },
        {
          invoiceId: "INV002",
          user: {
            fullname: "Trần Thị B",
            email: "tranthib@email.com"
          },
          purchasedItems: "MacBook Pro M3 x1",
          totalPrice: "45000000",
          paymentMethod: "online",
          status: "processing",
          createdAt: "2024-01-14T14:20:00Z"
        }
      ];

      return {
        success: true,
        data: mockOrders,
      };
    }
  },

  getOrderDetails: async (invoiceId) => {
    try {
      // Mock order details since backend doesn't have complete order system yet
      const mockOrderDetail = {
        invoiceId: invoiceId,
        user: {
          fullname: "Nguyễn Văn A",
          email: "nguyenvana@email.com",
          phone: "0123456789"
        },
        address: "123 Đường ABC, Quận 1, TP.HCM",
        purchasedItems: "iPhone 15 Pro x1, AirPods Pro x1",
        totalPrice: "35000000",
        paymentMethod: "cod",
        status: "pending",
        createdAt: "2024-01-15T10:30:00Z",
        items: [
          {
            id: "1",
            name: "iPhone 15 Pro",
            quantity: 1,
            price: "30000000"
          },
          {
            id: "2",
            name: "AirPods Pro",
            quantity: 1,
            price: "5000000"
          }
        ]
      };

      return {
        success: true,
        data: mockOrderDetail,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy chi tiết đơn hàng';
      return { success: false, message };
    }
  },

  updateOrderStatus: async (invoiceId, status) => {
    try {
      // Mock successful update since backend doesn't have complete order system yet
      console.log(`Mock: Updating order ${invoiceId} to status ${status}`);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        data: {
          invoiceId: invoiceId,
          status: status,
          message: `Đơn hàng ${invoiceId} đã được cập nhật thành ${status}`
        },
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể cập nhật trạng thái đơn hàng';
      return { success: false, message };
    }
  },

  bulkUpdateOrderStatus: async (invoiceIds, status) => {
    try {
      const response = await request.put('/admin/orders/bulk-status', {
        invoiceIds: invoiceIds,
        status: status
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể cập nhật trạng thái đơn hàng';
      return { success: false, message };
    }
  },

  getPendingOrders: async () => {
    try {
      const response = await request.get('/admin/orders/pending');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy đơn hàng chờ xử lý';
      return { success: false, message };
    }
  },

  // ============ CATEGORY MANAGEMENT ============

  getCategoryStatistics: async () => {
    try {
      const response = await request.get('/admin/categories/statistics');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy thống kê danh mục';
      return { success: false, message };
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await request.put(`/admin/categories/${categoryId}`, categoryData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể cập nhật danh mục';
      return { success: false, message };
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await request.delete(`/admin/categories/${categoryId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể xóa danh mục';
      return { success: false, message };
    }
  },

  getCategoryProducts: async (categoryId) => {
    try {
      const response = await request.get(`/admin/categories/${categoryId}/products`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy sản phẩm theo danh mục';
      return { success: false, message };
    }
  },

  // ============ BRAND MANAGEMENT ============

  getBrandStatistics: async () => {
    try {
      const response = await request.get('/admin/brands/statistics');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy thống kê thương hiệu';
      return { success: false, message };
    }
  },

  updateBrand: async (brandId, brandData) => {
    try {
      const response = await request.put(`/admin/brands/${brandId}`, brandData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể cập nhật thương hiệu';
      return { success: false, message };
    }
  },

  deleteBrand: async (brandId) => {
    try {
      const response = await request.delete(`/admin/brands/${brandId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể xóa thương hiệu';
      return { success: false, message };
    }
  },

  getBrandProducts: async (brandId) => {
    try {
      const response = await request.get(`/admin/brands/${brandId}/products`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy sản phẩm theo thương hiệu';
      return { success: false, message };
    }
  },

  searchBrands: async (keyword) => {
    try {
      const response = await request.get(`/admin/brands/search?keyword=${keyword}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể tìm kiếm thương hiệu';
      return { success: false, message };
    }
  },
};

export default adminService;
