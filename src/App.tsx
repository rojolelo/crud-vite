import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import TaskContainer from "./components/TaskContainer";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <h1>To-Do</h1>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <TaskContainer />
    </>
  );
}

export default App;
