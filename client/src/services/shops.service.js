import { $axios } from "../api";

const SHOPS = "/shops";

class ShopsService {
  async getAll(params) {
    return $axios.get(SHOPS, {
      params: params
    });
  }
  async getShop(id) {
    return $axios.get(`${SHOPS}/${id}`);
  }
  async create(body) {
    return $axios.post(SHOPS, body);
  }
  async update(id, body) {
    return $axios.put(`${SHOPS}/${id}`, body);
  }
  async delete(id) {
    return $axios.delete(`${SHOPS}/${id}`);
  }
}

export default new ShopsService();
