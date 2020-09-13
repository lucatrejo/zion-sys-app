import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';

// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import customInputDateStyle from "assets/jss/material-dashboard-react/components/customInputDateStyle.jsx";

function CustomInputDate({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    onChange,
    value
  } = props;

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      { error ? (
        <InputLabel
          className={classes.labelRootError}
          htmlFor={id}
          {...labelProps}
        >
        {error}
      </InputLabel>
      ) : labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <TextField
        classes={{
          disabled: classes.disabled,
        }}
        id={id}
        defaultValue="2017-05-24"
        type="date"
        value={value}
        onChange={onChange}
        {...inputProps}
        InputLabelProps={{
            shrink: true,
        }}
      />
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInputDate.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  value: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  onChange: PropTypes.func
};

export default withStyles(customInputDateStyle)(CustomInputDate);
