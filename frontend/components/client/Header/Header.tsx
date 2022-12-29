import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/router";

export interface HeaderProps {}

const Header: FC<HeaderProps> = (prop) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#003580",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        height: "20px",
      }}
    >
      <Container
        sx={{
          width: "full",
          maxWidth: "5xl",
          marginTop: "5px",
          marginBottom: "24px",
        }}
      >
        aaa
      </Container>
    </Container>
  );
};

export default Header;
