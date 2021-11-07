import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import LoadingButton from "@components/loading/LoadingButton";

const EditAddressForm = props => {
  const {
    values: {
      receiver_full_name,
      receiver_phone_number,
      state,
      city,
      postal_address,
      postal_code
    },
    errors,
    handleSubmit,
    handleChange,
    handleClose,
    dirty,
    isValid
  } = props;

  return (
    <React.Fragment>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              label="receiver full name"
              placeholder="Enter receiver full name"
              variant="outlined"
              margin="normal"
              name="receiver_full_name"
              autoComplete="receiver_full_name"
              helperText={errors.receiver_full_name}
              error={Boolean(errors.receiver_full_name)}
              value={receiver_full_name}
              onChange={handleChange}
              required
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="receiver phone number"
              placeholder="Enter receiver phone number"
              variant="outlined"
              margin="normal"
              name="receiver_phone_number"
              autoComplete="receiver_phone_number"
              helperText={errors.receiver_phone_number}
              error={Boolean(errors.receiver_phone_number)}
              value={receiver_phone_number}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="State"
              placeholder="Enter state"
              variant="outlined"
              margin="normal"
              name="state"
              autoComplete="state"
              helperText={errors.state}
              error={Boolean(errors.state)}
              value={state}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="City"
              placeholder="Enter city"
              variant="outlined"
              margin="normal"
              name="city"
              autoComplete="city"
              helperText={errors.city}
              error={Boolean(errors.city)}
              value={city}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              label="Postal address"
              placeholder="Enter postal address"
              variant="outlined"
              margin="normal"
              name="postal_address"
              autoComplete="postal_address"
              rows="3"
              helperText={errors.postal_address}
              error={Boolean(errors.postal_address)}
              value={postal_address}
              onChange={handleChange}
              required
              fullWidth
              multiline
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Postal code"
              placeholder="Enter postal code with out dash"
              variant="outlined"
              margin="normal"
              name="postal_code"
              autoComplete="postal_code"
              helperText={errors.postal_code}
              error={Boolean(errors.postal_code)}
              value={postal_code}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size="large" variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          size="large"
          variant="outlined"
          color="primary"
          disabled={!dirty || !isValid}
        >
          Edit
        </LoadingButton>
      </DialogActions>
    </React.Fragment>
  );
};

export default EditAddressForm;
