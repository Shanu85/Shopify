import React from 'react'
import Seller_Sidebar from '../Seller_Sidebar'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Seller_Deposits from './Seller_Deposits';
import { Typography } from '@material-ui/core';
import { makeStyles, Button, Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import SellerInfoEditForm from './EditPersonalInformation/SellerInfoEditForm';
import * as Yup from "yup";
import { Formik } from "formik";
import useReactRouter from "use-react-router";
import { phone_number_reg } from "@pages/authPages/regexes";
import { updateSellerInfo } from "@actions/authActions";

const modal_Style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3)
    },
    padding: {
        padding: theme.spacing(2)
    },
    header: {
        marginTop: theme.spacing(2)
    },
    button: {
        padding: theme.spacing(1.3)
    },
    wrapper: {
        padding: theme.spacing(2)
    },
    iconButton: {
        margin: theme.spacing(1)
    }
}));

function Title(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ marginTop: "10px" }}>
            {props.children}
        </Typography>
    );
}

const validationSchema = Yup.object({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    phone_number: Yup.string()
        .matches(phone_number_reg, "Invalid phone number")
        .required(),
    national_code: Yup.number(),
    email: Yup.string().email()
});

function Seller_Dashboard() {
    const {
        first_name,
        last_name,
        phone_number,
        national_code,
        email,
        pay_balance
    } = useSelector(state => state.auth.user);
    const classes = useStyles();

    const [Editopen, setEditopen] = React.useState(false);
    const handleOpen = () => setEditopen(true);
    const handleClose = () => setEditopen(false);
    const dispatch = useDispatch();
    const { history } = useReactRouter();

    const values = {
        first_name: first_name || "",
        last_name: last_name || "",
        phone_number: phone_number || "",
        national_code: national_code || "",
        email: email || ""
    };

    const handleSubmit = (user, { setErrors, resetForm }) => {
        dispatch(updateSellerInfo(user, setErrors, resetForm, history));
        handleClose();
    };

    return (
        <Seller_Sidebar activeItem="seller_dashboard">
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                {/* <Toolbar /> */}
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} className={classes.root}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 400,
                                    backgroundColor: "pink"
                                }}
                            >
                                <Typography style={{ margin: "30px 0px 0px 20px" }} variant="h6">
                                    Personal Info
                                </Typography>
                                <Paper >
                                    <Grid container spacing={2} className={classes.padding}>
                                        <Grid item md={6} xs={12}>
                                            <Typography variant="body1">First name:</Typography>
                                            <Typography variant="h8">{first_name || "-"}</Typography>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Typography variant="body1">Phone number:</Typography>
                                            <Typography variant="h8">{phone_number || "-"}</Typography>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Typography variant="body1">Last name:</Typography>
                                            <Typography variant="h8">{last_name || "-"}</Typography>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Typography variant="body1">National code:</Typography>
                                            <Typography variant="h8">{national_code || "-"}</Typography>
                                        </Grid>
                                        <Grid item md={12}>
                                            <Typography variant="body1">Email:</Typography>
                                            <Typography variant="h8">{email || "-"}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Button onClick={handleOpen} color="primary" fullWidth size="large" className={classes.button}>
                                        Edit
                                    </Button>

                                    <Modal open={Editopen} onClose={handleClose} aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description">
                                        <Box sx={modal_Style}>
                                            <Title>Edit Information</Title>

                                            <Formik
                                                initialValues={values}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSubmit}
                                            >
                                                {props => <SellerInfoEditForm classes={classes} {...props} />}
                                            </Formik>

                                        </Box>
                                    </Modal>
                                </Paper>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 170,
                                }}
                            >
                                <Seller_Deposits pay_balance={pay_balance} />
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </Box>

        </Seller_Sidebar>
    )
}

export default Seller_Dashboard
