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
import GraphTopItemsSales from "./views/StadisticGraph/GraphTopItemsSales";
import GraphSalesAndPurchasesForMonth from "./views/StadisticGraph/GraphSalesAndPurchasesForMonth";




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
        path: "/customers",
        name: "Clientes",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Customers,
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
        path: "/reportTop5",
        name: "TOP 5 de Articulos mas vendidos",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: GraphTop5ItemsSales,
        layout: "/admin"
    },
    {
        path: "/reportCountSaleForDay",
        name: "Cantidad de ventas por dia",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: GraphSalesForDay,
        layout: "/admin"
    },
    {
        path: "/reportTopArt",
        name: "Porcentaje de ventas de los articulos",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: GraphTopItemsSales,
        layout: "/admin"
    },
    {
        path: "/reportComparation",
        name: "Comparación de cantidad de ventas y compras por mes",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: GraphSalesAndPurchasesForMonth,
        layout: "/admin"
    }
];

export default dashboardRoutes;
