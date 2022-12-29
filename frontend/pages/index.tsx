import type { NextPage } from "next";
import { use, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { selectGlobal, setStep } from "../reducers/globalSlice";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import Navbar from "../components/client/Navbar/Navbar";
import SearchBar from "../components/client/SearchBar";
import RoomView from "../components/client/RoomView/RoomView";
import StyledStep from "../components/client/Step/Step";

const steps = ["Hotel & Date", "Room Type & View", "Preview & Payment"];

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { step } = useAppSelector(selectGlobal);

  const [activeStep, setActiveStep] = useState(step);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => {
    dispatch(setStep({ step }))
  };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  //   setCompleted({});
  // };

  return (
    <>
      <Navbar />
      <Box
        // border={2}
        maxWidth="lg"
        sx={{
          width: "100%",
          margin: "1rem auto",
          padding: "25px 0 0",
        }}
      >
        <StyledStep />
        {/* <Stepper nonLinear activeStep={step} alternativeLabel> */}
          {/* <Step key={1}>
            <StepButton color="inherit"></StepButton>
          </Step> */}
          {/* {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))} */}
        {/* </Stepper> */}
        {step === 0 && <SearchBar />}
        {step === 1 && <RoomView />}
      </Box>
    </>
  );
};

export default Home;
