// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Register from "@material-ui/icons/GroupAdd";

// core components/views for Admin layout
import Categories from "views/Categories/Categories.jsx";
import Items from "views/Items/Items.jsx";
import Providers from "views/Providers/Providers.jsx";
import Employees from "views/Employees/Employees.jsx";
import Customers from "views/Customers/Customers.jsx";
import Accounts from "views/Accounts/Accounts.jsx";
import AccountsReport from "views/Accounts/AccountsReport.jsx";
import AccountsReport1 from "views/Accounts/AccountsReport_1.jsx";
import AccountsReport2 from "views/Accounts/AccountsReport_2.jsx";
import AccountsReport3 from "views/Accounts/AccountsReport_3.jsx";

import Purchases from "views/Purchases/Purchases.jsx";
import PurchasesReport from "views/Purchases/PurchasesReport.jsx";
import PurchasesReport1 from "views/Purchases/PurchasesReport_1.jsx";
import PurchasesReport2 from "views/Purchases/PurchasesReport_2.jsx";
import PurchasesReport3 from "views/Purchases/PurchasesReport_3.jsx";
import PurchasesReport4 from "views/Purchases/PurchasesReport_4.jsx";
import PurchasesReport5 from "views/Purchases/PurchasesReport_5.jsx";
import Purchase from "views/Purchases/Purchase.jsx";
import PurchaseDetails from "views/Purchases/PurchaseDetails.jsx";

import Sales from "views/Sales/Sales.jsx";
import SalesReport from "views/Sales/SalesReport.jsx";
import SalesReport1 from "views/Sales/SalesReport_1.jsx";
import SalesReport2 from "views/Sales/SalesReport_2.jsx";
import SalesReport3 from "views/Sales/SalesReport_3.jsx";
import SalesReport4 from "views/Sales/SalesReport_4.jsx";
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
import GraphAccount from "./views/StadisticGraph/GraphAccount";




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
        path: "/report_purchases_1",
        name: "Reporte de Compras",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: PurchasesReport1,
        layout: "/admin"
    },
    {
        path: "/report_purchases_2",
        name: "Reporte de Compras",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: PurchasesReport2,
        layout: "/admin"
    },
    {
        path: "/report_purchases_3",
        name: "Reporte de Compras",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: PurchasesReport3,
        layout: "/admin"
    },
    {
        path: "/report_accounts_1",
        name: "Reporte de Cuenta",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: AccountsReport1,
        layout: "/admin"
    },
    {
        path: "/report_accounts_2",
        name: "Reporte de Cuenta",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: AccountsReport2,
        layout: "/admin"
    },
    {
        path: "/report_accounts_3",
        name: "Reporte de Cuenta",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: AccountsReport3,
        layout: "/admin"
    },
    {
        path: "/report_purchases_4",
        name: "Reporte de Compras",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: PurchasesReport4,
        layout: "/admin"
    },
    {
        path: "/report_purchases_5",
        name: "Reporte de Compras",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: PurchasesReport5,
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
        path: "/report_sales_1",
        name: "Reporte de Ventas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: SalesReport1,
        layout: "/admin"
    },
    {
        path: "/report_sales_2",
        name: "Reporte de Ventas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: SalesReport2,
        layout: "/admin"
    },
    {
        path: "/report_sales_3",
        name: "Reporte de Ventas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: SalesReport3,
        layout: "/admin"
    },
    {
        path: "/report_sales_4",
        name: "Reporte de Ventas",
        rtlName: "ملف تعريفي للمستخدم",
        icon: LibraryBooks,
        component: SalesReport4,
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
