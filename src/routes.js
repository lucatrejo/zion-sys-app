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

import Sales from "views/Sales/Sales.jsx";
import SalesReport from "views/Sales/SalesReport.jsx";
import Sale from "views/Sales/Sale.jsx";
import SaleDetails from "views/Sales/SaleDetails.jsx";

import Login from "@material-ui/icons/LockOpen";
import Person from "@material-ui/icons/Person";

// core components/views for Auth layout
import RegisterPage from "views/Pages/RegisterPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import GraphTop5ItemsSales from "./views/StadisticGraph/GraphTop5ItemsSales";
import GraphSalesForDay from "./views/StadisticGraph/GraphSalesForDay";
import GraphPurchasesForDay from "./views/StadisticGraph/GraphPurchasesForDay";




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
        path: "/add_sale",
        name: "Ventas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Sale,
        layout: "/admin"
    },
    {
        path: "/sales",
        name: "Listado de Ventas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Sales,
        layout: "/admin"
    },
    {
        path: "/report_sales",
        name: "Reporte de Ventas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: SalesReport,
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
        path: "/sale_detail",
        name: "Ver Venta",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: SaleDetails,
        layout: "/admin"
    },
    {
        path: "/reportTop5",
        name: "TOP 5 de Articulos mas vendidos",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: GraphTop5ItemsSales,
        layout: "/admin"
    },
    {
        path: "/reportCountSaleForDay",
        name: "Cantidad de ventas por dia del mes",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: GraphSalesForDay,
        layout: "/admin"
    },
    {
        path: "/reportCountPurchasesForDay",
        name: "Cantidad de compras por Dia/Mes",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: GraphPurchasesForDay,
        layout: "/admin"
    }
];

export default dashboardRoutes;
