import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MUILink from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../../../AuthFromsStyles";
import LoadingButton from "@components/loading/LoadingButton";
import KeyboardedInput from 'react-touch-screen-keyboard';
import 'react-touch-screen-keyboard/lib/Keyboard.css';

const OTPForm = props => {
  const {
    values: { otp },
    errors,
    handleSubmit,
    handleChange,
    isValid,
    setFieldValue,
  } = props;
  const classes = useStyles();

  const CustomKeyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.com']
  ];

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <KeyboardedInput
                enabled
                type="text"
                placeholder="OTP"
                name="OTP"
                value={otp}
                onChange={(input) => setFieldValue('otp', input)}
                defaultKeyboard={CustomKeyboard}
              />
            </Grid>

            {errors.non_field_errors && (
              <Typography
                variant="body1"
                className={classes.customError}
                color="error"
              >
                {errors.non_field_errors}
              </Typography>
            )}
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid}
          >
            Register
          </LoadingButton>
          <MUILink component={Link} to="/login" variant="body2">
            {"You already have an account? Log In"}
          </MUILink>
        </form>
      </div>
    </Container>
  );
};

export default OTPForm;