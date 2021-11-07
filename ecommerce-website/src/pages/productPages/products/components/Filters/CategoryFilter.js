import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { appendQuery } from "./utils";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(0.5)
    }
}));

const CategoryFilter = ({ location }) => {

    const classes = useStyles();
    const [category, setCategory] = useState("");

    return (
        <Paper className={classes.paper}>
            <Button
                size="small"
                component={Link}
                to={appendQuery(location, { search: "topwear" })}
                onClick={() => setCategory("topwear")}
                className={classes.button}
                color="secondary"
                variant={category === "topwear" ? "contained" : "outlined"}
            >
                Topwear
            </Button>
            <Button
                size="small"
                component={Link}
                to={appendQuery(location, { search: "bottomwear" })}
                onClick={() => setCategory("bottomwear")}
                className={classes.button}
                color="secondary"
                variant={category === "bottomwear" ? "contained" : "outlined"}
            >
                Bottomwear

            </Button>
            <Button
                size="small"
                component={Link}
                to={appendQuery(location, { search: "footwear" })}
                onClick={() => setCategory("footwear")}
                className={classes.button}
                color="secondary"
                variant={category === "footwear" ? "contained" : "outlined"}
            >
                Footwear

            </Button>

        </Paper>
    );
};

export default CategoryFilter;