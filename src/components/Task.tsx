import { EditOutlined } from "@mui/icons-material";
import { Button, TableCell, TableRow, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { ITask } from "../models/Task";
import { useState } from "react";
import { deleteTask, updateTask } from "../api/api";

const Task = ({
  task,
  updateOne,
  deleteOne,
}: {
  task: ITask;
  updateOne: Function;
  deleteOne: Function;
}) => {
  const [editToggle, setEditToggle] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [newName, setNewName] = useState("");
  const [uploading, setUploading] = useState(false);

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
  const handleEdit = (): void => setEditToggle(true);
  const handleDelete = async () => {
    setUploading(true);
    let res = await deleteTask(task);
    if (res?.status == 200) {
      setUploading(false);
      deleteOne(task._id);
    }
  };
  const handleDeleteToggle = (bool: boolean) => setDeleteConfirmation(bool);

  const handleCheck = async () => {
    setUploading(true);
    const res = await updateTask({ ...task, checked: !task.checked });
    if (res?.status == 200) {
      updateOne({ ...task, checked: !task.checked });
      setUploading(false);
    }
  };

  return (
    <TableRow
    //sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {editToggle ? (
          <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            disabled={uploading}
            onChange={(e) => setNewName(e.currentTarget.value)}
          />
        ) : (
          <span>{task.name}</span>
        )}
      </TableCell>
      {/* Done / Not-Done */}
      <TableCell align="right">
        {task.checked ? (
          <CheckCircleOutlineIcon onClick={handleCheck} />
        ) : (
          <RadioButtonUncheckedIcon onClick={handleCheck} />
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
          <EditOutlined onClick={handleEdit} />
        )}
      </TableCell>
      {/* Delete */}
      <TableCell align="right">
        {deleteConfirmation ? null : (
          <DeleteOutlineIcon onClick={() => handleDeleteToggle(true)} />
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
