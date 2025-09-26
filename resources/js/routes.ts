export const home = {
    url: '/',
    method: 'GET' as const,
};

export const login = {
    url: '/login',
    method: 'GET' as const,
};

export const register = {
    url: '/register',
    method: 'GET' as const,
};

export const dashboard = {
    url: '/dashboard',
    label: 'Dashboard'
};

export const admin = {
    url: '/admin',
    label: 'Admin Dashboard'
};

export const applications = {
    url: '/admin/applications',
    label: 'Applications'
};

export const committees = {
    url: '/admin/committees', 
    label: 'Committees'
};

export const logout = {
    url: '/logout',
    method: 'POST' as const,
};