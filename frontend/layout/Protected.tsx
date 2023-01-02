import { FC } from "react";
import { useRouter } from "next/router";

import { useAppSelector } from "../hooks/reduxHooks";
import { selectAuth } from "../reducers/authSlice";
import Client from "./Client";

const ProtectedLayout: FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const router = useRouter();
  return isAuthenticated ? (
    <Client>
      {children}
    </Client>
  ) : (
    <>{router.push("/login", undefined)}</>
  );
};

export default ProtectedLayout;
