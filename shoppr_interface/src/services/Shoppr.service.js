import ShopprBase from "../api/ShopprBase.js";
class ShopprService {
  getAll() {
    return ShopprBase.get('search/');
  }
}
export default new ShopprService();