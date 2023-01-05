import type { NextPage } from "next";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { login } from "../reducers/authSlice";

import Client from "../layout/Client";
import { Box, Card, CardHeader, CardContent, CardActions, Button, TextField } from "@mui/material";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useJwtHook } from "../hooks/useJwtHooks";
import Link from "next/link";

const Login: NextPage = () => {
  const { handleSubmit, control } = useForm();

  const dispatch = useAppDispatch();

  const handleLogin = async (data: FieldValues) => {
    const { email, password } = data;

    try {
      const response = await useJwtHook.login(email, password);

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
          alignItems: "center",
          justifyContent: "center",
          padding: "103px 147px"
        }}
      >
        <Card sx={{ padding: "0 120px" }}>
          <CardHeader title="Login" />
          <CardContent>
            <form
              onSubmit={handleSubmit(handleLogin)}
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
                render={({ field, fieldState, formState }) => (
                  <TextField
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    label="Email"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field, fieldState, formState }) => (
                  <TextField
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    label="Password"
                    type="password"
                  />
                )}
              />
              <Button type="submit" variant="contained">
                Login
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
              <Link href={"/forgot"} style={{ textDecoration: "none" }}>
                Forgot password
              </Link>
            </div>
            <span></span>
            <div>
              Don&apos;t have an account?{" "}
              <Link href={"/register"} style={{ textDecoration: "none" }}>
                Sign Up
              </Link>
            </div>
          </CardActions>
        </Card>
      </Box>
    </Client>
  );
};

export default Login;
