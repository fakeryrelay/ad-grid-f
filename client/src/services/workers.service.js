import { $axios } from "../api";

const WORKERS = "/workers";

export class WorkersService {
  async getAll(params) {
    return $axios.get(WORKERS, {
      params: params
    });
  }
  async getByShopId(id, params) {
    return $axios.get(`${WORKERS}/${id}`, {
      params: params
    });
  }
  async create(body) {
    return $axios.post(WORKERS, body);
  }
  async update(id, body) {
    return $axios.put(`${WORKERS}/${id}`, body);
  }
  async delete(id) {
    return $axios.delete(`${WORKERS}/${id}`);
  }
}

export default new WorkersService();
