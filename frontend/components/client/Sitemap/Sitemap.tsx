import { FC } from 'react';

import { Typography, Container } from '@mui/material';

const Sitemap: FC = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignContent: "center", position: "fixed", bottom: 0, left: 0 }}
    >
      <Typography fontSize={"sx"} color="black">
        Copyright &copy; 2022 Booking&trade;. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Sitemap;