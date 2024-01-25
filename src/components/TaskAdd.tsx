import { Button, Checkbox, TextField } from "@mui/material";
import { ReactElement, useState } from "react";
import { uploadTask } from "../api/api";

const TaskAdd = ({ addTask }: { addTask: Function }): ReactElement => {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    //Disable edit and buttons
    setUploading(true);

    //Upload to the DB
    let res = await uploadTask({ name, checked });

    if (res?.status === 200) {
      // Add to the [tasks] states in <TaskContainer> using addTask()
      const newTaskId = res.data.insertedId;
      addTask({ _id: newTaskId, name, checked });

      //Clean and enable fields
      setUploading(false);
      setName("");
      setChecked(false);
    }
  };

  return (
    <>
      <h3>Add New Task</h3>
      <TextField
        id="standard-basic"
        label="Task Name"
        variant="standard"
        disabled={uploading}
        inputProps={{ maxLength: 20 }}
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Checkbox
        checked={checked}
        disabled={uploading}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Button variant="contained" disabled={uploading} onClick={handleSave}>
        Save
      </Button>
    </>
  );
};

export default TaskAdd;
