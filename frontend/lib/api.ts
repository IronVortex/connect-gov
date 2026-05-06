const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:3001/api';

function buildApiUrl(endpoint: string) {
  const baseUrl = API_URL.replace(/\/$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return `${baseUrl}${path}`;
}

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(buildApiUrl(endpoint), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(buildApiUrl(endpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await fetch(buildApiUrl(endpoint), {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  async put<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(buildApiUrl(endpoint), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(buildApiUrl(endpoint), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
};

// Department endpoints
export const departmentAPI = {
  getAll: () => apiClient.get('/departments'),
  getById: (id: string) => apiClient.get(`/departments/${id}`),
  create: (data: any) => apiClient.post('/departments', data),
  update: (id: string, data: any) => apiClient.put(`/departments/${id}`, data),
  delete: (id: string) => apiClient.delete(`/departments/${id}`),
};

// Service endpoints
export const serviceAPI = {
  getAll: () => apiClient.get('/services'),
  getByDepartment: (departmentId: string) =>
    apiClient.get(`/services?departmentId=${departmentId}`),
  getById: (id: string) => apiClient.get(`/services/${id}`),
  create: (data: any) => apiClient.post('/services', data),
  update: (id: string, data: any) => apiClient.put(`/services/${id}`, data),
  delete: (id: string) => apiClient.delete(`/services/${id}`),
};

// Document endpoints
export const documentAPI = {
  getByUserId: (userId: string) => apiClient.get(`/documents/user/${userId}`),
  getByServiceId: (serviceId: string) =>
    apiClient.get(`/documents/service/${serviceId}`),
  getById: (id: string) => apiClient.get(`/documents/${id}`),
  detect: (fileName: string, mimeType: string) =>
    apiClient.post('/documents/detect', { fileName, mimeType }),
  upload: (formData: FormData) => apiClient.postFormData('/uploads', formData),
  delete: (id: string) => apiClient.post(`/documents/${id}/delete`, {}),
};
