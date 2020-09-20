import React, { useState } from "react";
import { Fab, Modal } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import NuevaMeta from "./NuevaMeta";

function AddMeta() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Fab color="primary" onClick={() => setIsOpen(!isOpen)}>
        <AddIcon />
      </Fab>
      <Modal open={isOpen}>
        <NuevaMeta handleClose={() => setIsOpen()} />
      </Modal>
    </div>
  );
}

export default AddMeta;
