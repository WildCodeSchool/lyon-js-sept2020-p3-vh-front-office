import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Login() {
  return (
    <>
      <div>
        <form>
          <div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </div>
          <div>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
