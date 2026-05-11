import axios from "axios";

/* =========================================================
   AXIOS INSTANCE
========================================================= */

const api = axios.create({
  baseURL: "/api",
});

/* =========================================================
   REQUEST INTERCEPTOR
========================================================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* =========================================================
   RESPONSE INTERCEPTOR
========================================================= */

api.interceptors.response.use(
  (response) => response.data,

  (error) => {
    const status = error.response?.status;

    // Auto logout on unauthorized
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(
      new Error(error.response?.data?.message || "Something went wrong"),
    );
  },
);

/* =========================================================
   AUTH API
========================================================= */

export const register = async (body) => {
  return await api.post("/auth/register", body);
};

export const login = async (body) => {
  return await api.post("/auth/login", body);
};

export const getMe = async () => {
  return await api.get("/auth/me");
};

export const updateProfile = async (formData) => {
  return await api.put("/auth/update-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const changePassword = async (body) => {
  return await api.put("/auth/change-password", body);
};

/* =========================================================
   MATERIALS API
========================================================= */

export const getMaterials = async (params = "") => {
  return await api.get(`/materials?${params}`);
};

export const getMaterial = async (id) => {
  return await api.get(`/materials/${id}`);
};

export const getMyMaterials = async () => {
  return await api.get("/materials/my");
};

export const uploadMaterial = async (formData) => {
  return await api.post("/materials/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const trackDownload = async (id) => {
  return await api.put(`/materials/${id}/download`);
};

export const deleteMaterial = async (id) => {
  return await api.delete(`/materials/${id}`);
};

export const getStats = async () => {
  return await api.get("/materials/stats");
};

/* =========================================================
   ADMIN API
========================================================= */

export const getDashboard = async () => {
  return await api.get("/admin/dashboard");
};

export const getPending = async (params = "") => {
  return await api.get(`/admin/pending?${params}`);
};

export const getAllMaterials = async (params = "") => {
  return await api.get(`/admin/all-materials?${params}`);
};

export const approveMaterial = async (id) => {
  return await api.put(`/admin/approve/${id}`);
};

export const rejectMaterial = async (id, reason) => {
  return await api.put(`/admin/reject/${id}`, { reason });
};

export const getAdminUsers = async (params = "") => {
  return await api.get(`/admin/users?${params}`);
};

export const toggleUser = async (id) => {
  return await api.put(`/admin/users/${id}/toggle`);
};

/* =========================================================
   RATINGS API
========================================================= */

export const getRatings = async (materialId) => {
  return await api.get(`/ratings/${materialId}`);
};

export const addRating = async (materialId, body) => {
  return await api.post(`/ratings/${materialId}`, body);
};

/* =========================================================
   COMMENTS API
========================================================= */

export const getComments = async (materialId) => {
  return await api.get(`/comments/${materialId}`);
};

export const addComment = async (materialId, body) => {
  return await api.post(`/comments/${materialId}`, body);
};

export const deleteComment = async (commentId) => {
  return await api.delete(`/comments/${commentId}`);
};

/* =========================================================
   BOOKMARKS API
========================================================= */

export const getBookmarks = async () => {
  return await api.get("/bookmarks");
};

export const toggleBookmark = async (materialId) => {
  return await api.put(`/bookmarks/${materialId}`);
};

/* =========================================================
   NOTIFICATIONS API
========================================================= */

export const getNotifications = async () => {
  return await api.get("/notifications");
};

export const markAllRead = async () => {
  return await api.put("/notifications/mark-read");
};

/* =========================================================
   USERS / LEADERBOARD
========================================================= */

export const getLeaderboard = async () => {
  return await api.get("/users/leaderboard");
};

/* =========================================================
   CATEGORIES
========================================================= */

export const getCategories = async () => {
  return await api.get("/categories");
};

/* =========================================================
   FILE URL HELPER
========================================================= */

export const resolveFileUrl = (url) => {
  if (!url) return "#";

  if (url.startsWith("http")) {
    return url;
  }

  return `https://srms-backend-hsko.onrender.com${url}`;
};

export default api;
