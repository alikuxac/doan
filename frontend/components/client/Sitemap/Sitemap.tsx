import { FC } from "react";

import { Typography, Container } from "@mui/material";

const Sitemap: FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        paddingTop: "30px",
        alignItems: "center",
        paddingBottom: "30px",
        backgroundColor: "#231f20",
      }}
    >
      <Typography fontSize={"sx"} color="white" sx={{ marginBottom: 0 }}>
        Copyright &copy; 2022 Booking&trade;. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Sitemap;
