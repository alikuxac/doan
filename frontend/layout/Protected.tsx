import { FC, useEffect } from "react";
import { useRouter } from "next/router";

import { useAppSelector } from "../hooks/reduxHooks";
import { selectAuth } from "../reducers/authSlice";
import Client from "./Client";

const ProtectedLayout: FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, []);
  return (
    <Client>
      {children}
    </Client>
  );
};

export default ProtectedLayout;
