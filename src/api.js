const request = async (path, options = {}) => {
    let response;
    try {
        response = await fetch(`/api${path}`, { headers: { 'Content-Type': 'application/json', ...options.headers }, ...options });
    } catch {
        throw new Error('API is not running. Start it with: npm run server');
    }
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : {}; } catch { throw new Error('The API returned an invalid response. Check the server terminal.'); }
    if (!response.ok) throw new Error(data.message || 'Something went wrong.');
    return data;
};

export const getProducts = (category) => request(`/products${category ? `?category=${category}` : ''}`);
export const createOrder = (order) => request('/orders', { method: 'POST', body: JSON.stringify(order) });
export const login = (details) => request('/auth/login', { method: 'POST', body: JSON.stringify(details) });
export const signup = (details) => request('/auth/signup', { method: 'POST', body: JSON.stringify(details) });
