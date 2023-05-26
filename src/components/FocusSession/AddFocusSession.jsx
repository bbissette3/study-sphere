import React, { useState } from "react";

const AddFocusSession = () => {
  const [learned, setLearned] = useState("");
  const [toLearn, setToLearn] = useState("");

  const handleLearnedChange = (e) => {
    setLearned(e.target.value);
  };

  const handleToLearnChange = (e) => {
    setToLearn(e.target.value);
  };

  const handleSubmitFocusSession = (e) => {
    e.preventDefault();
    // Your code for what to do after the user submits the form
  };

  return (
    <form onSubmit={handleSubmitFocusSession}>
      <label>
        What did you learn?
        <input type="text" value={learned} onChange={handleLearnedChange} />
      </label>
      <label>
        What do you want to learn next?
        <input type="text" value={toLearn} onChange={handleToLearnChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddFocusSession;
