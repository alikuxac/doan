import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  InputAdornment,
  Link,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
// import Link from "next/link";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useJwtHook } from "../hooks/useJwtHooks";
import { login } from "../reducers/authSlice";
import Image from "next/image";
import Client from "../layout/Client";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PinIcon from "@mui/icons-material/Pin";
import PersonIcon from "@mui/icons-material/Person";

const Register = () => {
  const { handleSubmit, control } = useForm();

  const dispatch = useAppDispatch();

  const handleRegister = async (data: any) => {
    const { email, password, fullname } = data;
    console.log(data);
    try {
      const response = await useJwtHook.register(email, password, fullname);

      const { accessToken, user } = response.data;
      useJwtHook.setToken(accessToken);
      useJwtHook.setUserStorage(user);

      dispatch(login({ user, token: accessToken, isAuthenticated: true }));
    } catch (err: any) {}
  };

  return (
    <Client>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "center",
          padding: "103px 147px",
        }}
      >
        <Card sx={{ padding: "0 120px" }}>
          <CardHeader title="Register" />
          <CardContent>
            <form
              onSubmit={handleSubmit(handleRegister)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  validate: (value) => {
                    return (
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
                      "Email is invalid"
                    );
                  },
                }}
                render={({ field, fieldState, formState }) => (
                  <TextField
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    label="Email"
                    error={fieldState.error ? true : false}
                    helperText={fieldState.error && fieldState.error.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                }}
                render={({ field, fieldState, formState }) => (
                  <TextField
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    label="Password"
                    type="password"
                    error={fieldState.error ? true : false}
                    helperText={fieldState.error && fieldState.error.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="fullname"
                control={control}
                defaultValue=""
                rules={{
                  required: "Fullname is required",
                }}
                render={({ field, fieldState, formState }) => (
                  <TextField
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    label="Full Name"
                    error={fieldState.error ? true : false}
                    helperText={fieldState.error && fieldState.error.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="fullname"
                control={control}
                defaultValue=""
                rules={{
                  required: "Phone is required",
                }}
                render={({ field, fieldState, formState }) => (
                  <TextField
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    label="Phone number"
                    error={fieldState.error ? true : false}
                    helperText={fieldState.error && fieldState.error.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PinIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#faa61a",
                  "&:hover": { backgroundColor: "#000" },
                }}
              >
                Register
              </Button>
            </form>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              Have a account?{" "}
              <Link href={"/login"} style={{ textDecoration: "none" }}>
                Login
              </Link>
            </div>
          </CardActions>
        </Card>
        <Image
          src="https://cdn.alikuxac.xyz/file/doanali/example/registration.jpg"
          alt="register"
          width={650}
          height={561}
        />
      </Box>
    </Client>
  );
};

export default Register;
