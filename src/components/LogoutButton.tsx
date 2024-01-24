import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button color="warning" onClick={() => logout()}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
