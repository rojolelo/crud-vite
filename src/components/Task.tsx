import { EditOutlined } from "@mui/icons-material";
import { Button, TableCell, TableRow, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { ITask } from "../models/Task";
import { ReactElement, useState } from "react";
import { deleteTask, updateTask } from "../api/api";

const Task = ({
  task,
  updateOne,
  deleteOne,
}: {
  task: ITask;
  updateOne: Function;
  deleteOne: Function;
}): ReactElement => {
  const [editToggle, setEditToggle] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [newName, setNewName] = useState("");
  const [uploading, setUploading] = useState(false);

  // Save button when editing
  const handleSave = async () => {
    setUploading(true);
    let res;
    if (newName.length > 0 && newName != task.name) {
      res = await updateTask({ ...task, name: newName });
    }
    if (res?.status === 200) {
      let taskToUpdate = {
        _id: task._id,
        name: newName,
        checked: task.checked,
      };
      updateOne(taskToUpdate);
    }
    setUploading(false);
    setNewName("");
    setEditToggle(false);
  };

  // Show Edit field
  const handleEdit = (): void => setEditToggle(true);

  // Delete task
  const handleDelete = async () => {
    setUploading(true);
    let res = await deleteTask(task);
    if (res?.status == 200) {
      setUploading(false);
      deleteOne(task._id);
    }
  };

  // Show Delete Buttons (Cancel & Delete)
  const handleDeleteToggle = (bool: boolean) => setDeleteConfirmation(bool);

  // Checks the status
  const handleCheck = async () => {
    setUploading(true);
    const res = await updateTask({ ...task, checked: !task.checked });
    if (res?.status == 200) {
      updateOne({ ...task, checked: !task.checked });
      setUploading(false);
    }
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {editToggle ? (
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            disabled={uploading}
            inputProps={{ maxLength: 20 }}
            defaultValue={task.name}
            onChange={(e) => setNewName(e.currentTarget.value)}
          />
        ) : (
          <span>{task.name}</span>
        )}
      </TableCell>
      {/* Done / Not-Done Icon*/}
      <TableCell align="right">
        {task.checked ? (
          <CheckCircleOutlineIcon
            onClick={handleCheck}
            sx={{ cursor: "pointer" }}
          />
        ) : (
          <RadioButtonUncheckedIcon
            onClick={handleCheck}
            sx={{ cursor: "pointer" }}
          />
        )}
      </TableCell>
      {/* Save */}
      <TableCell align="right">
        {editToggle ? (
          <>
            <Button
              variant="outlined"
              disabled={uploading}
              onClick={handleSave}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={uploading}
              onClick={handleSave}
            >
              Save
            </Button>
          </>
        ) : (
          <EditOutlined onClick={handleEdit} sx={{ cursor: "pointer" }} />
        )}
      </TableCell>
      {/* Delete */}
      <TableCell align="right">
        {deleteConfirmation ? null : (
          <DeleteOutlineIcon
            onClick={() => handleDeleteToggle(true)}
            sx={{ cursor: "pointer" }}
          />
        )}
        {deleteConfirmation ? (
          <>
            <Button
              variant="outlined"
              onClick={() => handleDeleteToggle(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </>
        ) : null}
      </TableCell>
    </TableRow>
  );
};

export default Task;
