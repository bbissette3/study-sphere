import { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { addTopic, fetchUserTopics } from "../../store/slice/topicSlice";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTopic = ({ handleToggleForm }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || subject === "" || description === "") {
      toast.warn("Please fill in all fields!");
    }

    await dispatch(
      addTopic({ title: toTitleCase(title), subject, description })
    );
    dispatch(fetchUserTopics());
    setTitle("");
    setSubject("");
    setDescription("");
    handleToggleForm();
  };

  return (
    <>
      <button
        className="absolute top-4 right-4 text-lg font-bold text-darkGray"
        onClick={handleToggleForm}
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4 text-darkGray">Create a topic</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 bg-white"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border rounded p-2 bg-white"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 h-32 bg-white"
        />
        <button
          type="submit"
          className="bg-darkBlue opacity-75 hover:bg-darkBlue hover:opacity-100 text-white px-4 py-2 rounded transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddTopic;
