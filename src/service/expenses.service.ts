import type { Expense } from "@/entities/Expense";
import apiService from "./api.service";
import type { Slice } from "@/types/api.types";

class ExpensesService {
  async fetchAllByUserId(userId: string,  limit: number, lastDate?: Date, lastId?: string): Promise<Slice<Expense>> {
    let params = `?user_id=${userId}&limit=${limit}`;
    if (lastDate && lastId) {
      params += `&last_date=${lastDate}&last_id=${lastId}`;
    }
    return apiService.get(`/api/expenses${params}`);
  }
}

export default new ExpensesService();