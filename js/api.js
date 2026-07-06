/* ============================================
   API HANDLER - FRONTEND API CALLS
   ============================================ */

// API Base URL Configuration
const API_CONFIG = {
    BASE_URL: process.env.API_URL || 'http://localhost:3000/api',
    TIMEOUT: 10000, // 10 seconds
};

// API class to handle all HTTP requests
class APIClient {
    constructor(baseURL = API_CONFIG.BASE_URL) {
        this.baseURL = baseURL;
        this.timeout = API_CONFIG.TIMEOUT;
    }

    /**
     * Make a GET request
     * @param {string} endpoint - API endpoint
     * @param {object} options - Request options
     * @returns {Promise} Response data
     */
    async get(endpoint, options = {}) {
        return this.request('GET', endpoint, null, options);
    }

    /**
     * Make a POST request
     * @param {string} endpoint - API endpoint
     * @param {object} data - Request body
     * @param {object} options - Request options
     * @returns {Promise} Response data
     */
    async post(endpoint, data = {}, options = {}) {
        return this.request('POST', endpoint, data, options);
    }

    /**
     * Make a PUT request
     * @param {string} endpoint - API endpoint
     * @param {object} data - Request body
     * @param {object} options - Request options
     * @returns {Promise} Response data
     */
    async put(endpoint, data = {}, options = {}) {
        return this.request('PUT', endpoint, data, options);
    }

    /**
     * Make a DELETE request
     * @param {string} endpoint - API endpoint
     * @param {object} options - Request options
     * @returns {Promise} Response data
     */
    async delete(endpoint, options = {}) {
        return this.request('DELETE', endpoint, null, options);
    }

    /**
     * General request method
     * @param {string} method - HTTP method
     * @param {string} endpoint - API endpoint
     * @param {object} data - Request body
     * @param {object} options - Request options
     * @returns {Promise} Response data
     */
    async request(method, endpoint, data = null, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            config.body = JSON.stringify(data);
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                ...config,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new APIError(
                    errorData.message || `HTTP Error: ${response.status}`,
                    response.status,
                    errorData
                );
            }

            return await response.json();
        } catch (error) {
            if (error instanceof TypeError) {
                throw new APIError('Network error. Please check your connection.', 0, error);
            }
            throw error;
        }
    }
}

// Custom API Error class
class APIError extends Error {
    constructor(message, status = 0, data = {}) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'APIError';
    }

    isNetworkError() {
        return this.status === 0;
    }

    isServerError() {
        return this.status >= 500;
    }

    isClientError() {
        return this.status >= 400 && this.status < 500;
    }
}

// Initialize API client
const api = new APIClient();

// ============================================
// CONTACT API ENDPOINTS
// ============================================

const ContactAPI = {
    /**
     * Submit contact form
     * @param {object} contactData - Contact form data
     * @returns {Promise} Response from server
     */
    submitForm: async (contactData) => {
        return api.post('/contact', contactData);
    },

    /**
     * Get contact form inquiries (admin only)
     * @returns {Promise} List of inquiries
     */
    getInquiries: async () => {
        return api.get('/contact/inquiries');
    },

    /**
     * Get single inquiry (admin only)
     * @param {string} inquiryId - Inquiry ID
     * @returns {Promise} Inquiry details
     */
    getInquiry: async (inquiryId) => {
        return api.get(`/contact/inquiries/${inquiryId}`);
    }
};

// ============================================
// SERVICES API ENDPOINTS
// ============================================

const ServicesAPI = {
    /**
     * Get all services
     * @returns {Promise} List of services
     */
    getAll: async () => {
        return api.get('/services');
    },

    /**
     * Get single service
     * @param {string} serviceId - Service ID
     * @returns {Promise} Service details
     */
    getOne: async (serviceId) => {
        return api.get(`/services/${serviceId}`);
    }
};

// ============================================
// BLOG API ENDPOINTS
// ============================================

const BlogAPI = {
    /**
     * Get all blog posts
     * @param {object} filters - Filter options (pagination, category, etc)
     * @returns {Promise} List of blog posts
     */
    getAll: async (filters = {}) => {
        const queryString = new URLSearchParams(filters).toString();
        return api.get(`/blog${queryString ? '?' + queryString : ''}`);
    },

    /**
     * Get single blog post
     * @param {string} postId - Post ID
     * @returns {Promise} Blog post details
     */
    getOne: async (postId) => {
        return api.get(`/blog/${postId}`);
    }
};

// ============================================
// TEAM API ENDPOINTS
// ============================================

const TeamAPI = {
    /**
     * Get all team members
     * @returns {Promise} List of team members
     */
    getAll: async () => {
        return api.get('/team');
    },

    /**
     * Get single team member
     * @param {string} memberId - Member ID
     * @returns {Promise} Team member details
     */
    getOne: async (memberId) => {
        return api.get(`/team/${memberId}`);
    }
};

// ============================================
// TESTIMONIALS API ENDPOINTS
// ============================================

const TestimonialsAPI = {
    /**
     * Get all testimonials
     * @returns {Promise} List of testimonials
     */
    getAll: async () => {
        return api.get('/testimonials');
    }
};

// ============================================
// AUTH API ENDPOINTS
// ============================================

const AuthAPI = {
    /**
     * User login
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Auth token
     */
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.token) {
            localStorage.setItem('authToken', response.token);
        }
        return response;
    },

    /**
     * User logout
     */
    logout: () => {
        localStorage.removeItem('authToken');
    },

    /**
     * Get current user
     * @returns {Promise} Current user data
     */
    getCurrentUser: async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new APIError('No authentication token found', 401);
        }
        return api.get('/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get auth token from localStorage
 * @returns {string} Auth token or null
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
function isAuthenticated() {
    return !!getAuthToken();
}

/**
 * Get headers with authentication
 * @returns {object} Headers object with auth token
 */
function getAuthHeaders() {
    const token = getAuthToken();
    if (token) {
        return {
            'Authorization': `Bearer ${token}`
        };
    }
    return {};
}

/**
 * Handle API errors uniformly
 * @param {Error} error - Error object
 * @returns {object} Error details
 */
function handleAPIError(error) {
    if (error instanceof APIError) {
        const errorMessage = error.message;
        const errorStatus = error.status;

        if (errorStatus === 401) {
            // Unauthorized - redirect to login
            AuthAPI.logout();
            window.location.href = '/admin-login.html';
        }

        return {
            message: errorMessage,
            status: errorStatus,
            isNetworkError: error.isNetworkError(),
            isServerError: error.isServerError(),
            isClientError: error.isClientError()
        };
    }

    return {
        message: 'An unexpected error occurred',
        status: 0,
        isNetworkError: false,
        isServerError: false,
        isClientError: false
    };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        api,
        APIClient,
        APIError,
        ContactAPI,
        ServicesAPI,
        BlogAPI,
        TeamAPI,
        TestimonialsAPI,
        AuthAPI,
        getAuthToken,
        isAuthenticated,
        getAuthHeaders,
        handleAPIError
    };
}

console.log('API client initialized successfully!');
