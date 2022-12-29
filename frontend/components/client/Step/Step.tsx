import { FC, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { selectGlobal, setStep } from "../../../reducers/globalSlice";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

// const steps = ["Hotel & Date", "Room Type & View", "Preview & Payment"];

const StyledStep: FC = () => {
  const dispatch = useAppDispatch();

  const { step: currentStep } = useAppSelector(selectGlobal);

  const [secondDisable, setSecondDisabled] = useState(true);
  const [thirdDisable, setThirdDisable] = useState(true);

  const handleStep = (step: number) => {
    dispatch(setStep({ step }));
    switch (step) {
      case 0:
        setSecondDisabled(true);
        setThirdDisable(true);
        return;
      case 1:
        setSecondDisabled(false);
        return;
      case 2:
        setSecondDisabled(false);
        return;
      default:
        return true;
    }
    
  };

  return (
    <Stepper nonLinear activeStep={currentStep} alternativeLabel>
      <Step key={"Hotel & Date"}>
        <StepButton color="inherit" onClick={() => handleStep(0)}>
          Hotel & Date
        </StepButton>
      </Step>
      <Step key={"Room Type & View"}>
        <StepButton
          color="inherit"
          disabled={secondDisable}
          onClick={() => handleStep(1)}
        >
          Room Type & View
        </StepButton>
      </Step>
      <Step key={"Preview & Payment"}>
        <StepButton color="inherit" disabled={thirdDisable}>
          Preview & Payment
        </StepButton>
      </Step>
    </Stepper>
  );
};

export default StyledStep