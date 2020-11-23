// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Register from "@material-ui/icons/GroupAdd";

// core components/views for Admin layout
import Categories from "views/Categories/Categories.jsx";
import Items from "views/Items/Items.jsx";
import Providers from "views/Providers/Providers.jsx";
import Employees from "views/Employees/Employees.jsx";
import Customers from "views/Customers/Customers.jsx";
import Purchases from "views/Purchases/Purchases.jsx";
import PurchasesReport from "views/Purchases/PurchasesReport.jsx";
import Purchase from "views/Purchases/Purchase.jsx";
import PurchaseDetails from "views/Purchases/PurchaseDetails.jsx";

import Login from "@material-ui/icons/LockOpen";
import Person from "@material-ui/icons/Person";

// core components/views for Auth layout
import RegisterPage from "views/Pages/RegisterPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";


const dashboardRoutes = [
    {
        path: "/categories",
        name: "Categorías",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Categories,
        layout: "/admin"
    },
    {
        path: "/items",
        name: "Artículos",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Items,
        layout: "/admin"
    },
    {
        path: "/providers",
        name: "Proveedores",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Providers,
        layout: "/admin"
    },
    {
        path: "/employees",
        name: "Empleados",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Employees,
        layout: "/admin"
    },
    {
        path: "/customers",
        name: "Clientes",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Customers,
        layout: "/admin"
    },
    {
        path: "/add_purchase",
        name: "Compras",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Purchase,
        layout: "/admin"
    },
    {
        path: "/purchases",
        name: "Listado de Compras",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Purchases,
        layout: "/admin"
    },
    {
        path: "/report_purchases",
        name: "Reporte de Compras",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: PurchasesReport,
        layout: "/admin"
    },
    {
        path: "/register-page",
        name: "Registro de Usuarios",
        rtlName: "پشتیبانی از راست به چپ",
        icon: Register,
        component: RegisterPage,
        layout: "/auth"
    },
    {
        path: "/purchase_detail",
        name: "Ver Compra",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: PurchaseDetails,
        layout: "/admin"
    },
    {
        path: "/user",
        name: "Perfil de Usuario",
        rtlName: "ملف تعريفي للمستخدم",
        icon: Person,
        component: UserProfile,
        layout: "/admin"
    },
    {
        path: "/login-page",
            name: "Inicio de Sesión",
        rtlName: "پشتیبانی از راست به چپ",
        icon: Login,
        component: LoginPage,
        layout: "/auth"
    }
];

export default dashboardRoutes;
