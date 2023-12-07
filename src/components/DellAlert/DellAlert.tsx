import { FC } from "react";

interface DellAlertProps {
  children: string;
}

export const DellAlert: FC<DellAlertProps> = ({ children }) => {
  return (
    <div className="alert alert-danger" role="alert">
      Contact: {children} - deleted!
    </div>
  );
};
