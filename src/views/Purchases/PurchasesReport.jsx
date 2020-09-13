import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";

import generatePDF from "components/Reports/reportGenerator";
import generatePDFCriticalStock from "components/Reports/reportCriticalStock";
import generatePDFProviders from "components/Reports/reportProviders";
import generatePDFPurchases from "components/Reports/reportPurchases";
import generatePDFPurchasesEmployee from "components/Reports/reportPurchasesEmployee";

const {REACT_APP_SERVER_URL} = process.env;

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportData: [],
            reportCriticalStock: [],
            reportProviders: [],
            reportPurchases: [],
            reportPurchasesEmployee: []
        };

        this.fillReportData = this.fillReportData.bind(this);
        this.fillReportCriticalStock = this.fillReportCriticalStock.bind(this);
        this.fillReportProviders = this.fillReportProviders.bind(this);
        this.fillReportPurchases = this.fillReportPurchases.bind(this);
        this.fillReportPurchasesEmployee = this.fillReportPurchasesEmployee.bind(this);
        this.fillReportData(this);
        this.fillReportCriticalStock(this);
        this.fillReportProviders(this);
        this.fillReportPurchases(this);
        this.fillReportPurchasesEmployee(this);
    };

    fillReportData(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/purchases/top_items`)
            .then(res => {
                const top_items = res.data.top_items;
                this.setState({reportData: top_items});
            })
    }

    fillReportCriticalStock(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/purchases/items_critical_stock`)
            .then(res => {
                const items = res.data.items;
                this.setState({reportCriticalStock: items});
            })
    }

    fillReportProviders(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/providers`)
            .then(res => {
                const items = res.data.providers;
                this.setState({reportProviders: items});
            })
    }

    fillReportPurchases(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/purchases/purchases_month`)
            .then(res => {
                const items = res.data.purchases;
                this.setState({reportPurchases: items});
            })
    }

    fillReportPurchasesEmployee(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/purchases/purchases_employee`)
            .then(res => {
                const items = res.data.purchases;
                this.setState({reportPurchasesEmployee: items});
            })
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={24} sm={24} md={12}>
                        <Card>
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>Compras</h4>
                                <p className={classes.cardCategoryWhite}>Reportes</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>

                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button type="submit" color="info" size="xs"
                                                onClick={() => generatePDF(this.state.reportData)}>
                                            Generar Reporte de Artículos mas Comprados
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button type="submit" color="info" size="xs"
                                                onClick={() => generatePDFCriticalStock(this.state.reportCriticalStock)}>
                                            Generar Reporte de Artículos con Stock Crítico
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button type="submit" color="info" size="xs"
                                                onClick={() => generatePDFProviders(this.state.reportProviders)}>
                                            Generar Listado de Proveedores
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button type="submit" color="info" size="xs"
                                                onClick={() => generatePDFPurchases(this.state.reportPurchases)}>
                                            Generar Reporte de Compras del mes
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button type="submit" color="info" size="xs"
                                                onClick={() => generatePDFPurchasesEmployee(this.state.reportPurchasesEmployee)}>
                                            Generar Reporte de Compras por Empleado
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>

            </div>
        );
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string,
    email: PropTypes.string
};

export default withStyles(formStyle)(UserProfile);
