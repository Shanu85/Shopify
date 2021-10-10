import React from "react";
import Grid from "@material-ui/core/Grid";

import PersonalInfo from "../personalInfo";


const Profile = () => {
  return (
      <Grid container spacing={2}>
        <Grid item md>
          <PersonalInfo />
        </Grid>
        <Grid item md></Grid>
      </Grid>
  );
};

export default Profile;
