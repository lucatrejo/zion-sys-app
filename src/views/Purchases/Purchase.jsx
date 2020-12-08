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
import CustomInputNumber from "components/CustomInput/CustomInputNumber.jsx";

import Snackbar from "components/Snackbar/Snackbar.jsx";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";
import CustomAutoSelect from "../../components/CustomSelect/CustomAutoSelect";
import TextField from "@material-ui/core/TextField";

const createHistory = require("history").createBrowserHistory;
let history = createHistory();

const {REACT_APP_SERVER_URL} = process.env;
const date = new Date();
const dateNow = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        const query = new URLSearchParams(this.props.location.search);
        let purchaseDate;
        if (query.get('date')) {
            var date1 = query.get('date').split('/');
            var newDate = date1[1] + '/' +date1[0] +'/' +date1[2];
            let date = new Date(newDate);
            purchaseDate = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
        }

        this.state = {
            id: query.get('id'),
            employeeId: query.get('employeeId'),
            providerId: query.get('providerId'),
            errors: {},
            categoriesData: [],
            employeesData: [],
            providersData: [],
            itemsData: [],
            detailsData: [],
            detailForm: [],
            item: '',
            itemComboVal: '',
            employeeComboVal: query.get('employeeId') ? query.get('employeeId') : '',
            providerComboVal: query.get('providerId') ? query.get('providerId') : '',
            unitPrice: '',
            quantity: '',
            alertColor: 'success',
            alertOpen: false,
            alertMsg: '',
            date: dateNow,
            actionButton: query.get('id') ? 'Actualizar' : 'Registrar',
            purchaseDate: purchaseDate ? purchaseDate : dateNow
        };
        this.insertObject = this.insertObject.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.fillComboEmployee(this);
        this.fillComboProvider(this);
        this.fillComboItem(this);
        this.addDetail = this.addDetail.bind(this);
        this.updateUnitPrice = this.updateUnitPrice.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.updateProvider = this.updateProvider.bind(this);
    }

    fillComboEmployee(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/employees`)
            .then(res => {
                const cat = res.data.employees;
                cat.forEach(e => {
                    e.name = e.name + " " + e.last_name;
                });
                this.setState({employeesData: cat});

                this.setState({employeeComboVal: this.state.employeesData.find(v => v.id === parseInt(this.state.employeeId))});
            })
    }

    fillComboProvider(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/providers`)
            .then(res => {
                const cat = res.data.providers;
                this.setState({providersData: cat});

                this.setState({providerComboVal: this.state.providersData.find(v => v.id === parseInt(this.state.providerId))});
            })
    }

    fillComboItem(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/items`)
            .then(res => {
                const cat = res.data.items;
                cat.forEach(e => {
                    e.code = e.code + " " + e.name;
                });
                this.setState({itemsData: cat});

            })
    }

    addDetail(e) {
        if (this.state.item !== '' && this.state.unitPrice !== '' && this.state.quantity !== '') {
            const fields = [this.state.item, this.state.unitPrice, this.state.quantity];
            const fieldsForm = [this.state.itemComboVal.id, this.state.unitPrice, this.state.quantity];

            this.state.detailsData.push(fields);
            this.setState({detailsData: this.state.detailsData});

            this.state.detailForm.push(fieldsForm);

            this.setState({item: ''});
            this.setState({unitPrice: ''});
            this.setState({quantity: ''});
            this.setState({itemComboVal: ''});
        } else {
            this.showAlert(this, "Debe completar todos los campos del Artículo", false);
        }
    }

    updateUnitPrice(e) {
        this.setState({unitPrice: e.target.value});
    }

    updateQuantity(e) {
        this.setState({quantity: e.target.value});
    }

    updateItem(e, value) {
        this.setState({itemComboVal: value.id});
        this.setState({item: value.name});

        var val =  this.state.itemsData.find(v => v.id === value.id);
        this.setState({itemComboVal: val});
    }

    updateEmployee(e, value) {
        this.setState({employeeComboVal: value.id});

        var val =  this.state.employeesData.find(v => v.id === value.id);
        this.setState({employeeComboVal: val});
    }

    updateProvider(e, value) {
        this.setState({providerComboVal: value.id});

        var val =  this.state.providersData.find(v => v.id === value.id);
        this.setState({providerComboVal: val});
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

        const fields = ["date"];
        const formElements = e.target.elements;
        const formValues = fields
            .map(field => ({
                [field]: formElements.namedItem(field).value
            }))
            .reduce((current, next) => ({...current, ...next}));

        formValues.employee_id = this.state.employeeComboVal.id;
        formValues.provider_id = this.state.providerComboVal.id;

        let details = [];

        this.state.detailForm.forEach(d => {
            let detail = {};
            detail.item_id = parseInt(d[0]);
            detail.unit_price = parseFloat(d[1]);
            detail.quantity = parseInt(d[2]);

            details.push(detail);
        });

        if (details.length === 0 && !this.state.id) {
            this.showAlert(this, "Debe agregar artículos a la lista", false);
        } else {

            formValues.details = details;

            console.log(formValues);

            let insertRequest;
            try {
                if (this.state.id) {
                    insertRequest = await axios.put(
                        `http://${REACT_APP_SERVER_URL}/purchases/` + this.state.id,
                        {
                            ...formValues
                        }
                    );
                } else {
                    insertRequest = await axios.post(
                        `http://${REACT_APP_SERVER_URL}/purchases`,
                        {
                            ...formValues
                        }
                    );
                }
            } catch ({response}) {
                insertRequest = response;
            }

            const {data: insertRequestData} = insertRequest;

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
                history.push("/admin/purchases");
                window.location.reload(false);
            }
            this.showAlert(this, msg, insertRequestData.success);
        }
    }

    render() {
        const {classes} = this.props;
        const {errors, alertColor, alertMsg, alertOpen} = this.state;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={24} sm={24} md={12}>
                        <form onSubmit={this.insertObject}>
                            <Card>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Compras</h4>
                                    <p className={classes.cardCategoryWhite}>{this.state.id ? 'Actualizar Compra' : 'Nueva Compra'}</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={3} sm={3} md={4}>
                                            <CustomAutoSelect
                                                labelText="Empleado"
                                                id="employee_id"
                                                error={errors.username}
                                                value={this.state.employeeComboVal}
                                                onChange={this.updateEmployee}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "employee_id"
                                                }}
                                                items={this.state.employeesData}
                                            />
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={4}>
                                            <CustomAutoSelect
                                                labelText="Proveedor"
                                                id="provider_id"
                                                value={this.state.providerComboVal}
                                                onChange={this.updateProvider}
                                                error={errors.username}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "provider_id"
                                                }}
                                                items={this.state.providersData}
                                            />
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <TextField
                                                id="date"
                                                label="Fecha"
                                                type="date"
                                                defaultValue={this.state.purchaseDate}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </GridItem>
                                        {
                                            this.state.id ? '' :
                                                <GridItem xs={3} sm={3} md={4}>
                                                    <CustomAutoSelect
                                                        labelText="Artículo"
                                                        id="item_id"
                                                        error={errors.username}
                                                        value={this.state.itemComboVal}
                                                        onChange={this.updateItem}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            required: true,
                                                            name: "item_id"
                                                        }}
                                                        items={this.state.itemsData}
                                                    />
                                                </GridItem>
                                        }

                                        {
                                            this.state.id ? '' :
                                                <GridItem xs={3} sm={3} md={2}>
                                                    <CustomInputNumber
                                                        labelText="Precio Unitario"
                                                        id="unit_price"
                                                        error={errors.username}
                                                        value={this.state.unitPrice}
                                                        onChange={this.updateUnitPrice}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: "unit_price"
                                                        }}
                                                    />
                                                </GridItem>
                                        }

                                        {
                                            this.state.id ? '' :
                                                <GridItem xs={3} sm={3} md={2}>
                                                    <CustomInputNumber
                                                        labelText="Cantidad"
                                                        id="quantity"
                                                        error={errors.username}
                                                        value={this.state.quantity}
                                                        onChange={this.updateQuantity}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: "quantity"
                                                        }}
                                                    />
                                                </GridItem>
                                        }
                                        {
                                            this.state.id ? '' :
                                                <GridItem xs={3} sm={3} md={3}>
                                                    <Button type="button"
                                                            color="info"
                                                            size="xs"
                                                            onClick={this.addDetail}
                                                    >
                                                        Agregar
                                                    </Button>
                                                </GridItem>
                                        }

                                        <div className={classes.tableResponsive}>
                                            {
                                                this.state.id ? '' :
                                            <Table className={classes.table}>
                                                <TableHead className={classes["primaryTableHeader"]}>
                                                    <TableRow>
                                                        {["Artículo", "Precio Unitario", "Cantidad", "Monto Parcial"].map((prop, key) => {
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
                                                    {this.state.detailsData.map((prop, key) => {
                                                        console.log(prop);
                                                        return (
                                                            <TableRow key={key}>
                                                                {prop.map((prop, key) => {
                                                                    console.log(prop);
                                                                    return (
                                                                        <TableCell className={classes.tableCell}
                                                                                   key={key}>
                                                                            {prop}
                                                                        </TableCell>
                                                                    );
                                                                })}

                                                                <TableCell className={classes.tableCell}>
                                                                    {Math.round(prop[1] * prop[2] * 100) / 100}
                                                                </TableCell>

                                                            </TableRow>
                                                        );

                                                    })}
                                                </TableBody>
                                            </Table>
                                            }

                                            <GridItem xs={3} sm={3} md={3}>
                                                <Button type="submit" color="info" size="xs">
                                                    {this.state.actionButton}
                                                </Button>
                                            </GridItem>
                                        </div>


                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </form>
                        <Snackbar
                            place="br"
                            color={alertColor}
                            message={alertMsg}
                            open={alertOpen}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(formStyle)(UserProfile);
