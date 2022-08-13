export const guestNavLinks = [
  {title: 'Register', path: '/auth/register'},
  {title: 'Login', path: '/auth/login'},
]
export const userNavLinks = [
  {title: 'My Account', path: '/account'},
  {title: 'My Orders', path: '/account/orders'},
  {title: 'Logout', path: '/logout'},
]
export const adminNavLinks = [{title: 'Dashboard', path: '/admin'}, ...userNavLinks]
