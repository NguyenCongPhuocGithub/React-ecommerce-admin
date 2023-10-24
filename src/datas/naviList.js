export const naviList = [
    {id: 1, label: 'Home', path:  '/'},
    {id: 2, label: 'Product', path: '/products', childs: [
        {id: 1, label: 'Add Product', path: '/products/add'}
    ]},
    {id: 3, label: 'Category', path: '/categories', childs: [
        {id: 1, label: 'Add Category', path: '/categories/add'}
    ]},
    {id: 4, label: 'Supplier', path: '/suppliers', childs: [
        {id: 1, label: 'Add Supplier', path: '/suppliers/add'}
    ]},
    {id: 5, label: 'Order', path: '/orders', childs: [
        {id: 1, label: 'Add Order', path: '/orders/add'}
    ]},
    {id: 6, label: 'Employee', path: '/employees', childs: [
        {id: 1, label: 'My Profile', path: '/employees/Profile'}
    ]},
    {id: 7, label: 'Login', path: '/login'},
    {id: 8, label: 'Logout', path: '/logout', type: 'logout'}
];