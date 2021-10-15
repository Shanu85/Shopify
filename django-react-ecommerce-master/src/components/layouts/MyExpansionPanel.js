import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const MyExpansionPanel = ({ children, title, detailClass, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel {...rest}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={detailClass}>
          {children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default MyExpansionPanel;
