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
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';

import FormGroup from '@material-ui/core/FormGroup';


const createHistory = require("history").createBrowserHistory;
let history = createHistory();

const {REACT_APP_SERVER_URL} = process.env;
const date = new Date();
const dateNow = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        const query = new URLSearchParams(this.props.location.search);
        let saleDate;
        if (query.get('date')) {
            var date1 = query.get('date').split('/');
            var newDate = date1[1] + '/' +date1[0] +'/' +date1[2];
            let date = new Date(newDate);
            saleDate = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
        }

        this.state = {
            id: query.get('id'),
            employeeId: query.get('employeeId') ? query.get('employeeId') : localStorage.getItem('user_id'),
            customerId: query.get('customerId'),
            errors: {},
            tableData: [],
            employeesData: [],
            customersData: [],
            itemsData: [],
            credit: false,
            clientStatus: false,
            detailsData: [],
            detailForm: [],
            item: '',
            itemComboVal: '',
            employeeComboVal: query.get('employeeId') ? query.get('employeeId') : '',
            customerComboVal: query.get('customerId') ? query.get('customerId') : '',
            unitPrice: '',
            quantity: '',
            alertColor: 'success',
            alertOpen: false,
            alertMsg: '',
            date: dateNow,
            actionButton: query.get('id') ? 'Modificar' : 'Registrar',
            saleDate: saleDate ? saleDate : dateNow,
            totalAmount: 0
        };
        this.insertObject = this.insertObject.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.fillComboEmployee(this);
        this.fillComboCustomer(this);
        this.fillComboItem(this);
        this.addDetail = this.addDetail.bind(this);
        this.updateUnitPrice = this.updateUnitPrice.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.updateCredit = this.updateCredit.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
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

    fillComboCustomer(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/customers`)
            .then(res => {
                const cat = res.data.customers;
                cat.forEach(e => {
                    e.name = e.name + " " + e.last_name;
                });
                this.setState({customersData: cat});

                this.setState({customerComboVal: this.state.customersData.find(v => v.id === parseInt(this.state.customerId))});

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

            this.setState({totalAmount: this.state.totalAmount + (this.state.unitPrice * this.state.quantity)});
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

    updateCredit(e) {
        if(this.state.credit) {
            this.setState({credit: false});
        } else {
            this.setState({credit: true});
        }
    }

    updateItem(e, value) {
            var val = this.state.itemsData.find(v => v.id === value.id);
            this.setState({itemComboVal: val});

            this.setState({item: value.name});
            this.setState({unitPrice: value.price});
    }

    updateEmployee(e, value) {
            this.setState({employeeComboVal: value.id});

            var val = this.state.employeesData.find(v => v.id === value.id);
            this.setState({employeeComboVal: val});
    }

    updateCustomer(e, value) {
            this.setState({customerComboVal: value.id});

            var val = this.state.customersData.find(v => v.id === value.id);
            this.setState({customerComboVal: val});


            if (val.first_debt_date == null) {
                this.setState({clientStatus: "up_to_date"});
            } else {
                console.log(val.first_debt_date);
                var date1 = val.first_debt_date.split('/');
                var newDate = date1[1] + '/' +date1[0] +'/' +date1[2];
                let date = new Date(newDate);

                console.log(date);
                console.log(new Date());

                var dateDiff = new Date().getTime() - date.getTime();
                var daysDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
                console.log(daysDiff);

                if (daysDiff >= 45) {
                    this.setState({clientStatus: "defaulter"});
                } else {
                    this.setState({clientStatus: "debtor"});
                }


            }
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
        formValues.customer_id = this.state.customerComboVal.id;
        formValues.credit = this.state.credit;

        console.log(formValues);

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
            console.log('formValues');
            console.log(formValues);


            let insertRequest;
            try {
                if (this.state.id) {
                    insertRequest = await axios.put(
                        `http://${REACT_APP_SERVER_URL}/sales/` + this.state.id,
                        {
                            ...formValues
                        }
                    );
                } else {
                    insertRequest = await axios.post(
                        `http://${REACT_APP_SERVER_URL}/sales`,
                        {
                            ...formValues
                        }
                    );
                }
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
                history.push("/admin/sales");
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
                                    <h4 className={classes.cardTitleWhite}>Ventas</h4>
                                    <p className={classes.cardCategoryWhite}>{this.state.id ? 'Actualizar Venta' : 'Nueva Venta'}</p>
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
                                                labelText="Cliente"
                                                id="customer_id"
                                                value={this.state.customerComboVal}
                                                onChange={this.updateCustomer}
                                                error={errors.username}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "customer_id"
                                                }}
                                                items={this.state.customersData}
                                            />
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <TextField
                                                id="date"
                                                label="Fecha"
                                                type="date"
                                                defaultValue={this.state.saleDate}
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
                                                            name: "unit_price",
                                                            disabled: true,
                                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                                                <GridItem xs={1} sm={1} md={1}>
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
                                                        return (
                                                            <TableRow key={key}>
                                                                {prop.map((prop, key) => {
                                                                    if( key===1){
                                                                        return (
                                                                            <TableCell className={classes.tableCell}
                                                                                       key={key}>
                                                                                ${prop}
                                                                            </TableCell>
                                                                        );
                                                                    }

                                                                    if( key===2){
                                                                        return (
                                                                            <TableCell className={classes.tableCell}
                                                                                       key={key}>
                                                                                {prop} U.
                                                                            </TableCell>
                                                                        );
                                                                    }

                                                                    if( key!==1){
                                                                        return (
                                                                            <TableCell className={classes.tableCell}
                                                                                       key={key}>
                                                                                {prop}
                                                                            </TableCell>
                                                                        );
                                                                    }
                                                                })}

                                                                <TableCell className={classes.tableCell}>
                                                                    ${Math.round(prop[1] * prop[2] * 100) / 100}
                                                                </TableCell>

                                                            </TableRow>
                                                        );
                                                    })}

                                                    <TableRow>
                                                        <TableCell className={classes.tableCell}>
                                                            Monto Total
                                                        </TableCell>

                                                        <TableCell className={classes.tableCell}></TableCell>
                                                        <TableCell className={classes.tableCell}></TableCell>

                                                        <TableCell className={classes.tableCell}>
                                                            $    {this.state.totalAmount}
                                                        </TableCell>

                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            }
                                            <br/>



                                                <FormGroup row>
                                                    <FormControlLabel
                                                        value="start"
                                                        control={<Checkbox color="primary" />}
                                                        onChange={this.updateCredit}
                                                        disabled={this.state.clientStatus === "defaulter"}
                                                        label="A Crédito:"
                                                        labelPlacement="Start"
                                                    />
                                                    <GridItem xs={1} sm={1} md={1}>
                                                    </GridItem>
                                                    {
                                                        this.state.clientStatus === "up_to_date" ?
                                                            <Alert severity="success">Cliente al día</Alert> :
                                                            this.state.clientStatus === "debtor" ?
                                                                <Alert severity="warning">Cliente en deuda</Alert> :
                                                                this.state.clientStatus === "defaulter" ?
                                                                    <Alert severity="error">Cliente moroso</Alert> :
                                                                    ''
                                                    }
                                                </FormGroup>

                                            <GridItem xs={3} sm={3} md={3}>
                                            </GridItem>



                                            <GridItem xs={3} sm={3} md={2}>
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
