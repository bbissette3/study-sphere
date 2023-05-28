const FocusSessionDisplay = ({ session, index }) => {
  return (
    <div className="w-3/4 m-auto py-5">
      <div className="border-2 border-gray-300 rounded-md tracking-wide shadow-lg bg-opacity-80 bg-gray-900 text-white">
        {" "}
        <div className="text-center px-5">
          <h2 className="text-xl font-bold py-2 pl-28">
            {session.topic.title} Session {index}
          </h2>
          <div className="grid grid-cols-8 text-center pb-4">
            <div className="col-span-3 flex justify-center items-center border-2 border-gray-300 bg-gray-800">
              {" "}
              <h3 className="font-semibold">What I Learned:</h3>
            </div>
            <div className="col-span-3 flex justify-center items-center border-t-2 border-b-2 border-gray-300 bg-gray-800">
              {" "}
              <h3 className="font-semibold">What I Need To Learn:</h3>
            </div>
            <div className="col-span-2 flex justify-center items-center border-2 border-gray-300 bg-gray-800">
              {" "}
              <h3 className="font-semibold">Duration:</h3>
            </div>
            <div className="col-span-3 flex justify-center items-center border-2 border-t-0 border-gray-300 py-2">
              <p>{session.learned}</p>
            </div>
            <div className="col-span-3 flex justify-center items-center border-t-0 border-b-2 border-gray-300">
              <p>{session.toLearn}</p>
            </div>
            <div className="col-span-2 flex justify-center items-center border-2 border-t-0 border-gray-300">
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
