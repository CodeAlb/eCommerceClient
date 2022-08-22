export const GUEST_LINKS = [
  {title: 'Register', path: '/auth/register'},
  {title: 'Login', path: '/auth/login'},
]

export const USER_LINKS = [
  {title: 'My Account', path: '/account'},
  {title: 'My Orders', path: '/orders'},
  {title: 'Logout', path: '/logout'},
]

export const ADMIN_LINKS = [{title: 'Dashboard', path: '/dashboard'}, ...USER_LINKS]

export const DASHBOARD_LINKS = [
  {title: 'Dashboard', path: '/dashboard'},
  {title: 'Products', path: '/dashboard/products'},
  {title: 'Orders', path: '/dashboard/orders'},
  {title: 'Users', path: '/dashboard/users'},
  {title: 'Reviews', path: '/dashboard/reviews'},
]

export const PRODUCT_CATEGORIES = ['Chair', 'Lamp', 'Drawer', 'Table', 'Clock']

export const PRODUCT_SELLERS = ['eBay']