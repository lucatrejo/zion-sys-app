import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.jsx";

const {REACT_APP_SERVER_URL} = process.env;

class LoginPage extends React.Component {
    login = async e => {
        e.preventDefault();

        const {history} = this.props;

        const fields = ["username", "password"];
        const formElements = e.target.elements;

        const formValues = fields
            .map(field => ({
                [field]: formElements.namedItem(field).value
            }))
            .reduce((current, next) => ({...current, ...next}));

        let loginRequest;
        try {
            console.log('initrequest');
            loginRequest = await axios.post(
                `http://${REACT_APP_SERVER_URL}/login`,
                {
                    ...formValues
                },
                {
                    withCredentials: true
                }
            );

            console.log(loginRequest);
        } catch ({response}) {
            loginRequest = response;
        }
        const {data: loginRequestData} = loginRequest;
        console.log('validate');
        if (loginRequestData.success) {
            console.log('success');
            localStorage.setItem("user_id", loginRequestData.userInfo.id);
            localStorage.setItem("role", loginRequestData.userInfo.role);

            if(loginRequestData.userInfo.role === "Compras") {
                return history.push("/admin/add_purchase");
            }

            if(loginRequestData.userInfo.role === "Ventas") {
                return history.push("/admin/add_sale");
            }

            if(loginRequestData.userInfo.role === "Administrador") {
                return history.push("/admin/sales");
            }

        }

        this.setState({
            errors: loginRequestData.messages && loginRequestData.messages.errors
        });
    };
    handleToggle = value => {
        const {checked} = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            errors: {}
        };
    }

    render() {
        const {classes} = this.props;
        const {errors} = this.state;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>
                        <form onSubmit={this.login}>
                            <Card className={classes[this.state.cardAnimaton]}>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="primary"
                                >
                                    <h4 className={classes.cardTitle}>Inicio de Sesión</h4>

                                </CardHeader>
                                <CardBody>
                                    <CustomInput
                                        labelText="Email..."
                                        id="email"
                                        error={errors.username || errors.invalidEmailOrPassword}
                                        formControlProps={{
                                            fullWidth: true,
                                            className: classes.formControlClassName
                                        }}
                                        inputProps={{
                                            required: true,
                                            name: "username",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email className={classes.inputAdornmentIcon}/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Contraseña"
                                        id="password"
                                        error={errors.password || errors.invalidEmailOrPassword}
                                        formControlProps={{
                                            fullWidth: true,
                                            className: classes.formControlClassName
                                        }}
                                        inputProps={{
                                            type: "password",
                                            required: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className={classes.inputAdornmentIcon}>
                                                        lock_outline
                                                    </Icon>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>
                                    <Button type="submit" color="primary" simple size="lg" block>
                                        Ingresar
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object,
    errors: PropTypes.object
};

export default withStyles(loginPageStyle)(LoginPage);
