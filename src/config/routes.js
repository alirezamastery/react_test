import ProductsMainView from '../products/ProductsMainView'
import Logout from '../auth/Logout';
import Search from "../components/search";
import ProductDetail from '../products/ProductDetail'
import RegisterForm from '../auth/Register'
import LoginForm from '../auth/LoginForm'
import Profile from '../profile/Profile';
import Cart from '../cart/Cart';
import FinalCheck from '../cart/finalCheck'


const routes = [
    {
        path: '/',
        component: ProductsMainView,
        isPrivate: false,
    }, {
        path: '/login',
        component: LoginForm,
        isPrivate: false,
    }, {
        path: '/logout',
        component: Logout,
        isPrivate: false,
    }, {
        path: '/register',
        component: RegisterForm,
        isPrivate: false,
    }, {
        path: '/user/profile',
        component: Profile,
        isPrivate: true,
    }, {
        path: '/products/:slug',
        component: ProductDetail,
        isPrivate: false,
    }, {
        path: '/olagh/search/',
        component: Search,
        isPrivate: false,
    }, {
        path: '/user/cart',
        component: Cart,
        isPrivate: false,
    }, {
        path: '/user/cart/payment-final',
        component: FinalCheck,
        isPrivate: false,
    }
]

export default routes