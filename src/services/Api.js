const BASE_URL = "http://localhost:3001";

//helper
async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("خطا در ارتباط با سرور");
  return res.json();
}

const Api = {
  fetchTransactions() {
    return request(`${BASE_URL}/transactions`);
  },

  addTransaction(data) {
    return request(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  updateTransaction(id, updatedData) {
    return request(`${BASE_URL}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
  },

  async deleteTransaction(id) {
    await request(`${BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    });
    return id;
  },
};

export default Api;
