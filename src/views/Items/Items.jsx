import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomInputNumber from "components/CustomInput/CustomInputNumber.jsx";


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
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import Link from '@material-ui/core/Link';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const createHistory = require("history").createBrowserHistory;
let history = createHistory();


const {REACT_APP_SERVER_URL} = process.env;

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            id: query.get('id'),
            nameVal: query.get('name'),
            descriptionVal: query.get('description'),
            priceVal: query.get('price'),
            stockVal: query.get('stock'),
            stockCritVal: query.get('stock_crit'),
            categoryVal: query.get('category'),
            errors: {},
            itemsData: [],
            categoriesData: [],
            alertColor: '',
            alertOpen: false,
            categoryComboVal: query.get('category') ? query.get('category') : '',
            actionButton: query.get('id') ? 'Actualizar' : 'Guardar',
            alertMsg: '',
        };
        this.insertObject = this.insertObject.bind(this);
        this.fillTable = this.fillTable.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.fillTable(this);
        this.fillCombo(this);
    }

    fillTable(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/items/`)
            .then(res => {
                const cat = res.data.items;
                this.setState({itemsData: cat.map(c => Object.values(c))});
            })

    }


    fillCombo(e) {
        axios.get(`http://${REACT_APP_SERVER_URL}/categories`)
            .then(res => {
                const cat = res.data.categories;
                console.log(cat);
                console.log(cat.map(c => Object.values(c)));
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

    updateCategory(e) {
        this.setState({categoryComboVal: e.target.value});
    }


    async handleRemove(e) {

        this.setState({errors: {}});


        let deleteRequest;
        try {
            deleteRequest = await axios.delete(
                `http://${REACT_APP_SERVER_URL}/items/`+e,

            );
        } catch ({response}) {
            console.log("GUARDA"+response.data.messages)
            deleteRequest = response;
            this.showAlert(this, response.data.messages, deleteRequest.danger);
            return;

        }
        console.log("hay un problema"+deleteRequest)

        const {data: deleteRequestData} = deleteRequest;



        var msg = 'Se eliminó el item correctamente';
        this.showAlert(this, msg, deleteRequestData.success);
        window.location.reload();
    }
    async insertObject(e) {
        e.preventDefault();
        this.setState({errors: {}});

        const fields = ["name", "description", "price", "stock", "critical_stock", "category_id"];
        const formElements = e.target.elements;
        const formValues = fields
            .map(field => ({
                [field]: formElements.namedItem(field).value
            }))
            .reduce((current, next) => ({...current, ...next}));

        formValues.name = formValues.name.trim();

        if (formValues.category_id === "") {
            this.showAlert(this, "Debe seleccionar una categoría", false)
        } else {
            formValues.category = parseInt(formValues.category);
            console.log(formValues.price);
            formValues.price = parseFloat(formValues.price);
            formValues.stock = parseInt(formValues.stock);
            formValues.critical_stock = parseInt(formValues.critical_stock);
            if (!formValues.stock) {
                formValues.stock = 0;
            }
            if (!formValues.critical_stock) {
                formValues.critical_stock = null;
            }


            console.log('values');
            console.log(formValues);
            let insertRequest;

            try {
                if (this.state.id) {
                    insertRequest = await axios.put(
                        `http://${REACT_APP_SERVER_URL}/items/` + this.state.id,
                        {
                            ...formValues
                        }
                    );
                } else {
                    insertRequest = await axios.post(
                        `http://${REACT_APP_SERVER_URL}/items`,
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
                history.push("/admin/items");
                window.location.reload(false);
            }

            this.fillTable(this);
            this.showAlert(this, msg, insertRequestData.success);
        }
    }
    async searchItems(e) {
        this.setState({errors: {}});





            let insertRequest;

            try {

                    insertRequest= await axios.get(`http://${REACT_APP_SERVER_URL}/items/`+1)



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
                history.push("/admin/items");
            }

            this.fillTable(this);
            this.showAlert(this, msg, insertRequestData.success);

    }

    render() {
        const {classes} = this.props;
        const {errors, alertColor, alertMsg, alertOpen} = this.state;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={24} sm={24} md={24}>
                        <form onSubmit={this.insertObject}>
                            <Card>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Artículos</h4>
                                    <p className={classes.cardCategoryWhite}>Administración</p>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>

                                        <GridItem xs={3} sm={3} md={3}>
                                            <CustomInput
                                                labelText="Nombre"
                                                id="name"
                                                error={(errors)?errors.name:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "name"
                                                }}
                                                defaultValue={this.state.nameVal}
                                            />

                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <CustomInput
                                                labelText="Descripción"
                                                id="description"
                                                error={(errors)?errors.description:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "description"
                                                }}
                                                defaultValue={this.state.descriptionVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={2}>
                                            <CustomInputNumber
                                                labelText="Precio"
                                                id="price"
                                                error={(errors)?errors.price:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "price"
                                                }}
                                                defaultValue={this.state.priceVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={2}>
                                            <CustomInputNumber
                                                labelText="Stock"
                                                id="stock"
                                                error={(errors)?errors.stock:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: false,
                                                    name: "stock"
                                                }}
                                                defaultValue={this.state.stockVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={2}>
                                            <CustomInputNumber
                                                labelText="Stock Crítico"
                                                id="critical_stock"
                                                error={(errors)?errors.critical_stock:""}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: false,
                                                    name: "critical_stock"
                                                }}
                                                defaultValue={this.state.stockCritVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <CustomSelect
                                                labelText="Categoría"
                                                id="category_id"
                                                error={(errors)?errors.category:""}
                                                value={this.state.categoryComboVal}
                                                onChange={this.updateCategory}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    required: true,
                                                    name: "category_id"
                                                }}
                                                items={this.state.categoriesData}
                                                defaultValue={this.state.categoryVal}
                                            />
                                        </GridItem>
                                        <GridItem xs={0} sm={0} md={0}>
                                            <Button type="submit" color="info" size="xs">
                                                {this.state.actionButton}
                                            </Button>
                                        </GridItem>
                                        <GridItem xs={0} sm={0} md={0}>
                                            <Button  color="info" size="xs">
                                                <SearchOutlinedIcon onClick={() => this.searchItems(1)} fontSize={"small"}></SearchOutlinedIcon>

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
                                                    {["ID", "Nombre", "Descripción", "Precio", "Stock", "Stock Crítico", "Categoría", "Acciones"].map((prop, key) => {
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
                                                {this.state.itemsData.map((prop, key) => {
                                                    return (
                                                        <TableRow key={key}>
                                                            {prop.map((prop, key) => {
                                                                console.log(key);
                                                                if(key !== 7) {
                                                                return (
                                                                    <TableCell className={classes.tableCell} key={key}>
                                                                        {prop}
                                                                    </TableCell>
                                                                );
                                                            }})}
                                                            <TableCell className={classes.tableCell} key={key}>
                                                                <Link href={"items?id=" + prop[0] +
                                                                "&name=" + prop[1] +
                                                                "&description=" + prop[2] +
                                                                "&price=" + prop[3] +
                                                                "&stock=" + prop[4] +
                                                                "&stock_crit=" + prop[5] +
                                                                "&category=" + prop[7]
                                                                }
                                                                      className={classes.tableCell}>
                                                                    <EditIcon icon={EditIcon} size="2x"/>

                                                                </Link>

                                                                <DeleteIcon onClick={() => this.handleRemove(prop[0])} />
                                                            </TableCell>
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
