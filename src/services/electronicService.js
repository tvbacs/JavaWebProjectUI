// src/services/ElectronicService.js
import request from '../utils/request';

const electronicService = {
  getAllElectronics: async () => {
    try {
      const response = await request.get('/electronics');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Không thể lấy danh sách electronics';
      return { success: false, message };
    }
  },
 getElectronicById: async (id) => {
    try {
      const response = await request.get(`/electronics/${id}`);
      return {
        success: true,
        data: response.data, 
      };
    } catch (error) {
      const message = error.response?.data?.message || "Không thể lấy chi tiết sản phẩm";
      return { success: false, message };
    }
  },
};

export default electronicService;