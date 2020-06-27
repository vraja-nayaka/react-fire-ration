export const redirect = {
    root: '/',
    login: '/login',
    signup: '/signup',
    profile: (id?: string) => id ? `/profile/${id}` : '/profile',
    collections: '/collections',
    friends: '/friends',
};
