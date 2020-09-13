import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import TextField from '@material-ui/core/TextField';

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Snackbar from "components/Snackbar/Snackbar.jsx";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";
import CustomInputNumber from "components/CustomInput/CustomInputNumber.jsx";

const {REACT_APP_SERVER_URL} = process.env;
const date = new Date();
const dateNow = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');



class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            categoriesData: [],
            alertColor: 'success',
            alertOpen: false,
            alertMsg: '',
            admission_date: dateNow,
            birthdate: dateNow

        };
        console.log(this.state.admission_date);
        this.insertObject = this.insertObject.bind(this);
        this.fillTable = this.fillTable.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.fillTable(this);
    }

    fillTable(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/employees`)
            .then(res => {
                const cat = res.data.employees;
                this.setState({categoriesData: cat.map(c => Object.values(c))});
            })
    }

    showAlert(e, msg, success) {
        if (msg) {
            this.setState({alertOpen: true});
            this.setState({alertMsg: msg});
            this.setState({alertColor: success ? 'success' : 'danger'});
            setTimeout(
                () => {
                    this.setState({alertOpen: false});
                },
                3000
            );
        }
    }

    async insertObject(e) {
        e.preventDefault();
        this.setState({errors: {}});

        const fields = ["name", "last_name", "cuil", "admission_date", "identification", "birthdate", "address"];
        const formElements = e.target.elements;
        const formValues = fields
            .map(field => ({
                [field]: formElements.namedItem(field).value
            }))
            .reduce((current, next) => ({...current, ...next}));

        formValues.identification = formValues.identification.trim();

        let insertRequest;
        try {
            insertRequest = await axios.post(
                `http://${REACT_APP_SERVER_URL}/employees`,
                {
                    ...formValues
                }
            );
        } catch ({response}) {
            insertRequest = response;
        }

        const {data: insertRequestData} = insertRequest;

        console.log(insertRequestData);
        console.log(insertRequest);

        var msg = '';

        if (!insertRequestData.success) {
            this.setState({
                errors:
                    insertRequestData.messages && insertRequestData.messages.errors
            });
            if (insertRequestData.messages.errors.databaseError) {
                msg = insertRequestData.messages.errors.databaseError;
            }
        } else {
            msg = insertRequestData.messages.success;
            window.location.reload(false);
        }

        this.fillTable(this);
        this.showAlert(this, msg, insertRequestData.success);
    }

    render() {
        const {classes, name} = this.props;
        const {errors, alertColor, alertMsg, alertOpen} = this.state;

        console.log(errors.name);
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <form onSubmit={this.insertObject}>
                            <Card>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Empleados</h4>
                                    <p className={classes.cardCategoryWhite}>Administración</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Nombre"
                                                id="name"
                                                error={errors.name}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    defaultValue: name,
                                                    name: "name"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Apellido"
                                                id="last_name"
                                                error={errors.last_name}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "last_name"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInputNumber
                                                labelText="Cuil"
                                                id="cuil"
                                                error={errors.cuil}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "cuil"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <TextField
                                                id="admission_date"
                                                label="Fecha de Ingreso"
                                                type="date"
                                                defaultValue={this.state.admission_date}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    required: true,
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInputNumber
                                                labelText="DNI"
                                                id="identification"
                                                error={errors.identification}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "identification"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <TextField
                                                id="birthdate"
                                                label="Fecha de Nacimiento"
                                                type="date"
                                                defaultValue={this.state.birthdate}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    required: true,
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Dirección"
                                                id="address"
                                                error={errors.address}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "address"
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <Button type="submit" color="info" size="xs">
                                                Guardar
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                    <Snackbar
                                        place="br"
                                        color={alertColor}
                                        message={alertMsg}
                                        open={alertOpen}
                                    />

                                    <div className={classes.tableResponsive}>
                                        <Table className={classes.table}>
                                            <TableHead className={classes["primaryTableHeader"]}>
                                                <TableRow>
                                                    {["ID", "Nombre", "Apellido", "CUIL", "DNI", "Fecha de Nacimiento", "Dirección", "Fecha de Ingreso"].map((prop, key) => {
                                                        return (
                                                            <TableCell
                                                                className={classes.tableCell + " " + classes.tableHeadCell}
                                                                key={key}
                                                            >
                                                                {prop}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.categoriesData.map((prop, key) => {
                                                    return (
                                                        <TableRow key={key}>
                                                            {prop.map((prop, key) => {
                                                                return (
                                                                    <TableCell className={classes.tableCell} key={key}>
                                                                        {prop}
                                                                    </TableCell>
                                                                );
                                                            })}

                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </form>
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
