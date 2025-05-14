import request from '../utils/request';

const cartService = {
  addToCart: async ({ electronicId, quantity, token }) => {
    try {
      console.log('Adding to cart:', { electronicId, quantity, token });
      const response = await request.post(
        `/carts/add?electronicId=${electronicId}&quantity=${quantity}`,
        {},
      );
      console.log('Add to cart response:', response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Add to cart error:', error.response?.data || error.message);
      const message = error.response?.data?.error || 'Không thể thêm vào giỏ hàng';
      return { success: false, message };
    }
  },

  getCart: async (token) => {
    try {
      console.log('Fetching cart with token:', token);
      const response = await request.get('/carts/get');
      console.log('Get cart response:', response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Get cart error:', error.response?.data || error.message, error.response?.status);
      if (error.response?.status === 404) {
        return {
          success: true,
          data: { cart_id: null, user: null, items: [] },
        };
      }
      const message = error.response?.data?.error || 'Không thể lấy thông tin giỏ hàng';
      return { success: false, message };
    }
  },
};

export default cartService;