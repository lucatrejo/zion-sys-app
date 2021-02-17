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
import Link from '@material-ui/core/Link';


import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";

const {REACT_APP_SERVER_URL} = process.env;

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

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
                                        <Link href={"report_purchases_1"}>
                                            <Button type="button" color="info" size="xs" >
                                                Generar Reporte de Artículos mas Comprados
                                            </Button>
                                        </Link>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Link href={"report_purchases_2"}>
                                            <Button type="submit" color="info" size="xs">
                                                Generar Reporte de Artículos con Stock Crítico
                                            </Button>
                                        </Link>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Link href={"report_purchases_3"}>
                                            <Button type="submit" color="info" size="xs">
                                                Generar Listado de Proveedores
                                            </Button>
                                        </Link>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Link href={"report_purchases_4"}>
                                            <Button type="submit" color="info" size="xs">
                                                Generar Reporte de Compras del mes
                                            </Button>
                                        </Link>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Link href={"report_purchases_5"}>
                                            <Button type="submit" color="info" size="xs">
                                                Generar Reporte de Compras por Empleado
                                            </Button>
                                        </Link>
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
