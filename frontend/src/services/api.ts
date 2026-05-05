import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const authApi = {
    login: (email: string, password: string) =>
        api.post('auth/login', {email, password}),
    register: (username: string, email: string, password: string) =>
        api.post('auth/register', {username, email, password}),
};

export const reviewAPI = {
    upload: (file: File, model: string) => {
        const form = new FormData();
        form.append('file', file);
        form.append('model_name', model);
        return api.post('/reviews', form, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    },
    getList: (page = 1) => api.get('/reviews', {params: {page}}),
    getById: (id: number) => api.get(`/reviews/${id}`),
    getModels: () => api.get('/models'),
};

export default api;