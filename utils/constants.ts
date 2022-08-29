export const DIR_PATHS = {
  account: '/account',
  cart: '/cart',
  dashboard: '/dashboard',
}

export const NAV_LINKS = [
  {title: 'Products', path: '/shop'},
  {title: 'About Us', path: '/about-us'},
  {title: 'Contact', path: '/contact'},
]

export const GUEST_LINKS = [
  {title: 'Register', path: `${DIR_PATHS.account}/register`},
  {title: 'Login', path: `${DIR_PATHS.account}/login`},
]

export const USER_LINKS = [
  {title: 'My Account', path: '/account'},
  {title: 'My Orders', path: '/orders'},
  {title: 'Logout', path: '/logout'},
]

export const ADMIN_LINKS = [{title: 'Dashboard', path: DIR_PATHS.dashboard}, ...USER_LINKS]

export const DASHBOARD_LINKS = [
  {title: 'Dashboard', path: DIR_PATHS.dashboard},
  {title: 'Products', path: `${DIR_PATHS.dashboard}/products`},
  {title: 'Orders', path: `${DIR_PATHS.dashboard}/orders`},
  {title: 'Users', path: `${DIR_PATHS.dashboard}/users`},
  {title: 'Reviews', path: `${DIR_PATHS.dashboard}/reviews`},
]

export const PRODUCT_CATEGORIES = ['Chair', 'Lamp', 'Drawer', 'Table', 'Clock']

export const PRODUCT_SELLERS = ['IKEA']

export const USER_ROLES = ['user', 'admin']

export const ORDER_STATUS_LIST = ['Delivered', 'Processing']
