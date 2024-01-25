import { Button, Checkbox, TextField } from "@mui/material";
import { ReactElement, useState } from "react";
import { uploadTask } from "../api/api";

const TaskAdd = ({ addTask }: { addTask: Function }): ReactElement => {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    setUploading(true);
    let res = await uploadTask({ name, checked });
    if (res?.status === 200) {
      const newTaskId = res.data.insertedId;
      addTask({ _id: newTaskId, name, checked });
      setUploading(false);
      setName("");
      setChecked(false);
    }
  };

  //TODO - Update or force new getTasks

  return (
    <>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        disabled={uploading}
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
