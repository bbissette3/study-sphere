import { BsTrash } from "react-icons/bs";

//redux
import { useDispatch } from "react-redux";
import { deleteFocusSession } from "../../store/slice/focusSessionSlice";

const FocusSessionDisplay = ({ session, index }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteFocusSession(id));
  };

  return (
    <div className="w-3/4 m-auto py-5">
      <div className="border-2 border-darkGray rounded-md tracking-wide shadow-lg bg-opacity-80 bg-tan text-darkGray">
        <div className="text-center px-5">
          <div className="flex items-center">
            <div className="w-full text-center">
              <h2 className="text-xl font-bold text-center pl-36">
                {session.topic && session.topic.title} Session {index}
              </h2>
            </div>
            <div>
              <button
                onClick={() => handleDelete(session.id)}
                className="text-darkGray rounded-md p-2"
              >
                <BsTrash />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-8 text-center pb-4">
            <div className="col-span-3 flex justify-center items-center border-2 border-darkGray bg-tan-dark">
              <h3 className="font-semibold">What I Learned:</h3>
            </div>
            <div className="col-span-3 flex justify-center items-center border-t-2 border-b-2 border-darkGray bg-tan-dark">
              <h3 className="font-semibold">What I Need To Learn:</h3>
            </div>
            <div className="col-span-2 flex justify-center items-center border-2 border-darkGray bg-tan-dark">
              <h3 className="font-semibold">Duration:</h3>
            </div>
            <div className="col-span-3 flex justify-center items-center border-2 border-t-0 border-darkGray py-2">
              <p>{session.learned}</p>
            </div>
            <div className="col-span-3 flex justify-center items-center border-t-0 border-b-2 border-darkGray">
              <p>{session.toLearn}</p>
            </div>
            <div className="col-span-2 flex justify-center items-center border-2 border-t-0 border-darkGray">
              <p>
                {session.duration}{" "}
                {session.duration === 1 ? "minute" : "minutes"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusSessionDisplay;
