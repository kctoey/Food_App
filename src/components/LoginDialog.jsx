import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8B4513",
    },
  },
});
export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button color="primary" variant="outlined" onClick={handleClickOpen}>
          Add to Cart
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Login to continue shopping.
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You must be logged in to add items to your cart
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cancel</Button>
            <Link to="/login">
              <Button onClick={handleClose} autoFocus>
                login
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
