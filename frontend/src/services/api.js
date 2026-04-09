const BASE_URL = 'https://banking-backend-o0oc.onrender.com';

const api = {
  async register(name, pin) {
    const res = await fetch(`${BASE_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, pin }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  async login(id, pin) {
    const res = await fetch(`${BASE_URL}/accounts/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(id), pin }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
  },

  async getAccount(id) {
    const res = await fetch(`${BASE_URL}/accounts/${id}`);
    if (!res.ok) throw new Error('Account not found');
    return res.json();
  },

  async transfer(accountId, toAccountId, amount, type = 'transfer') {
    const res = await fetch(`${BASE_URL}/transactions/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amount,
            type,
            account: { id: accountId },
            toAccountId: toAccountId
        }),
    });
    if (!res.ok) throw new Error('Transfer failed');
    return res.text();
},

  async deposit(id, amount) {
    const res = await fetch(`${BASE_URL}/accounts/${id}/deposit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error('Deposit failed');
    return res.json();
  },

  async withdraw(id, amount) {
    const res = await fetch(`${BASE_URL}/accounts/${id}/withdraw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error('Insufficient balance or error');
    return res.json();
  },

  async getTransactions(id) {
    const res = await fetch(`${BASE_URL}/accounts/${id}/transactions`);
    if (!res.ok) throw new Error('Could not fetch transactions');
    return res.json();
  },
};

export default api;
