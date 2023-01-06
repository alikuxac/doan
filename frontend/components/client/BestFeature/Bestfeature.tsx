import { FC, Component } from "react";

import { Container, Stack, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LockIcon from "@mui/icons-material/Lock";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DehazeIcon from "@mui/icons-material/Dehaze";

const StyledContainer = styled(Container)({
  margin: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignContent: "center",
  alignItems: "center",
  // backgroundColor: "#232323",
  textAlign: "center",
});

const StyledIconButton = styled(IconButton)({
  border: "3px solid #faa61a",
});

const StyledTypography = styled(Typography)({
  fontSize: "30px",
  color: "white",
});

interface BestFeatureProp {
  array: Array<{ name: string; count: number }>;
}

const BestFeature: FC<BestFeatureProp> = ({ array }) => {
  return (
    <Container maxWidth={false} sx={{ backgroundColor: "#232323" }}>
      <Stack direction={"row"} justifyContent="space-around">
        <StyledContainer>
          <StyledIconButton
            size="large"
            sx={{
              "&:hover": {
                border: "3px solid #000",
                backgroundColor: "#faa61a",
              },
            }}
          >
            <AttachMoneyIcon
              sx={{ color: "#faa61a", "&:hover": { color: "black" } }}
            />
          </StyledIconButton>
          <StyledTypography>Best Price Guarantee</StyledTypography>
        </StyledContainer>
        <StyledContainer>
          <StyledIconButton
            size="large"
            sx={{
              "&:hover": {
                border: "3px solid #000",
                backgroundColor: "#faa61a",
              },
            }}
          >
            <LockIcon
              sx={{ color: "#faa61a", "&:hover": { color: "black" } }}
            />
          </StyledIconButton>
          <StyledTypography>Safe and Secure</StyledTypography>
        </StyledContainer>
        <StyledContainer>
          <StyledIconButton
            size="large"
            sx={{
              "&:hover": {
                border: "3px solid #000",
                backgroundColor: "#faa61a",
              },
            }}
          >
            <ThumbUpIcon
              sx={{ color: "#faa61a", "&:hover": { color: "black" } }}
            />
          </StyledIconButton>
          <StyledTypography>Best Travel Agents</StyledTypography>
        </StyledContainer>
        <StyledContainer>
          <StyledIconButton
            size="large"
            sx={{
              "&:hover": {
                border: "3px solid #000",
                backgroundColor: "#faa61a",
              },
            }}
          >
            <DehazeIcon
              sx={{ color: "#faa61a", "&:hover": { color: "black" } }}
            />
          </StyledIconButton>
          <StyledTypography>Travel Guidelines</StyledTypography>
        </StyledContainer>
      </Stack>
    </Container>
  );
};

// BestFeature.defaultProps = () => {};+

export default BestFeature;
