import request from '../utils/request';

const invoiceService = {
  createInvoice: async ({ address, paymentMethod, purchasedItems, totalPrice, status }) => {
    try {
      const response = await request.post(
        '/invoices',
        null,
        {
          params: {
            address,
            paymentMethod,
            purchasedItems,
            totalPrice,
            status,
          },
        }
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể tạo hóa đơn';
      return { success: false, message };
    }
  },

  getInvoicesByUser: async () => {
    try {
      const response = await request.get('/invoices/user');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.error || 'Không thể lấy danh sách hóa đơn';
      return { success: false, message };
    }
  },
};

export default invoiceService;
