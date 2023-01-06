import { FC, useEffect, useState } from "react";
import { IMAGE } from "../../../constants/imageUrl";
import {
  Typography,
  Stack,
  Container,
  Card,
  CardMedia,
  Box,
} from "@mui/material";

import { useJwtHook } from "../../../hooks/useJwtHooks";

const Properties: FC = () => {
  const [type, setType] = useState<Array<{ count: string, type: string}>>([]);
  useEffect(() => {
    const getType = async () => {
      const response = await useJwtHook.countByType();
      setType(response.data as Array<{ count: string; type: string }>)
    };
    getType();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Stack direction={"row"} spacing={2}>
        {type.map((value) => (
          <Container key={value.type}>
            <Card>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  height={"300"}
                  sx={{ height: 350, width: 250 }}
                  component="img"
                  image={IMAGE[value.type]}
                  alt={value.type}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    // bgcolor: "rgba(0, 0, 0, 0.54)",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h5" fontWeight={100}>
                    {value.type}
                  </Typography>
                  <Typography variant="body2" fontWeight={100}>
                    {value.count}{" "}
                    {Number(value.count) > 1 ? `properties` : "property"}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Container>
        ))}
      </Stack>
    </Container>
  );
};

export default Properties;
