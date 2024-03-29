import { useAuth0 } from "@auth0/auth0-react";
import Task from "./Task";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ReactElement, useEffect, useState } from "react";
import { getTasks } from "../api/api";
import { ITask } from "../models/Task";
import { IError } from "../models/Error";
import TaskAdd from "./TaskAdd";
import { Alert } from "@mui/material";

const TaskContainer = (): ReactElement => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [error, setError] = useState<IError>({ error: false, msg: "" });

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      handleGetTasks();
    }
  }, [isAuthenticated]);

  //Get tasks from Database
  const handleGetTasks = async () => {
    let token = "";
    if (isAuthenticated) {
      token = await getAccessTokenSilently();
    }
    const res = await getTasks(token);

    if (res.status != 200) {
      setError({ error: res.error!, msg: res.msg });
    } else {
      setTasks(res?.data);
    }
    return res;
  };

  //Update ONE of the tasks in the [tasks] state once it has been updated in the DB
  const updateOne = (updatedTask: ITask) => {
    const newTaskList = tasks.map((task) => {
      if (task._id != updatedTask._id) {
        return task;
      } else {
        return updatedTask;
      }
    });
    setTasks(newTaskList);
  };

  //Delete ONE of the tasks in the [tasks] state once it has been deleted from the DB
  const deleteOne = (_id: string) => {
    const newTaskList = tasks.filter((task) => task._id != _id);
    setTasks(newTaskList);
  };

  //Add ONE task to [tasks] state once it has been added to the DB
  const addTask = (newTask: ITask) => {
    const newTaskList = [...tasks, newTask];
    setTasks(newTaskList);
  };

  const newError = (e: IError) => {
    setError({ error: e.error, msg: e.msg });
  };

  return (
    <TableContainer component={Paper}>
      {isAuthenticated ? (
        <>
          {error?.error && <Alert severity="error">{error.msg}</Alert>}
          <TaskAdd addTask={addTask} newError={newError} />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks?.map((task: ITask) => {
                return (
                  <Task
                    task={task}
                    updateOne={updateOne}
                    deleteOne={deleteOne}
                    newError={newError}
                    key={task._id}
                  />
                );
              })}
            </TableBody>
          </Table>
        </>
      ) : null}
    </TableContainer>
  );
};

export default TaskContainer;
