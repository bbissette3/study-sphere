import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTopic } from "../../store/slice/topicSlice";

const AddTopic = ({ handleToggleForm }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || subject === "" || description === "") {
      alert("Please fill in all fields!");
    }

    await dispatch(addTopic({ title, subject, description }));
    setTitle("");
    setSubject("");
    setDescription("");
    handleToggleForm();
  };

  return (
    <>
      <div className="bg-blue-300 rounded-lg shadow-lg p-10 w-full">
        <h2 className="text-2xl font-bold mb-4">Create a new topic</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border-2 rounded px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 rounded px-3 py-2 h-32" // Add a height here
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleToggleForm}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTopic;
