// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";

// core components/views for Admin layout
import Categories from "views/Categories/Categories.jsx";
import Items from "views/Items/Items.jsx";
import Providers from "views/Providers/Providers.jsx";
import Employees from "views/Employees/Employees.jsx";
import Customers from "views/Customers/Customers.jsx";
import Accounts from "views/Accounts/Accounts.jsx";

import Purchases from "views/Purchases/Purchases.jsx";
import PurchasesReport from "views/Purchases/PurchasesReport.jsx";
import Purchase from "views/Purchases/Purchase.jsx";

import Sales from "views/Sales/Sales.jsx";
import SalesReport from "views/Sales/SalesReport.jsx";
import Sale from "views/Sales/Sale.jsx";

// core components/views for Auth layout
import GraphTop5ItemsSales from "./views/StadisticGraph/GraphTop5ItemsSales";
import GraphSalesForDay from "./views/StadisticGraph/GraphSalesForDay";
import GraphPurchasesForDay from "./views/StadisticGraph/GraphPurchasesForDay";
import GraphTopItemsSales from "./views/StadisticGraph/GraphTopItemsSales";
import GraphSalesAndPurchasesForMonth from "./views/StadisticGraph/GraphSalesAndPurchasesForMonth";
import GraphAccount from "./views/StadisticGraph/GraphAccount";
import AccountsReport from "./views/Accounts/AccountsReport";




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
        path: "/accounts",
        name: "Cuentas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: Accounts,
        layout: "/admin"
    },
    {
        path: "/report_accounts",
        name: "Reporte de Cuentas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: AccountsReport,
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
        path: "/reportCountPurchasesForDay",
        name: "Cantidad de compras por dia",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: GraphPurchasesForDay,
        layout: "/admin"
    },
    {
        path: "/reportTopArt",
        name: "Porcentaje de ventas de  los articulos",
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
    },
    {
        path: "/reportAccount",
        name: "Reporte de estado de cuentas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: GraphAccount,
        layout: "/admin"
    }
];

export default dashboardRoutes;
