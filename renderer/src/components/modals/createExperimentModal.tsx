import React, { useState } from "react";

const CreateExperimentModal = () => {
  const [title, setTitle] = useState("");

  const onSubmit = () => {
    window.ipc.send("createExperiment", { title, name: "test" });
  };

  return <div>createExperimentModal</div>;
};

export default CreateExperimentModal;
