import { useEffect, useState } from "react";
import { debounce } from "lodash";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics } from "../../store/slice/topicSlice";

//sub component
import TopicCard from "../Dashboard/TopicCard";

const Forum = () => {
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.topics.topics);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debouncedFetchTopics = debounce(
      (searchTerm) => dispatch(fetchTopics(searchTerm)),
      1000
    );

    if (searchTerm) {
      debouncedFetchTopics(searchTerm);
    } else {
      dispatch(fetchTopics());
    }
  }, [dispatch, searchTerm]);

  return (
    <div className="pl-64 pr-5">
      <h1 className="text-4xl font-bold text-center mb-10">
        Subscribe To Other Topics!
      </h1>
      <div className="flex justify-center mb-4">
        <input
          type="search"
          placeholder="Search for a topic..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full lg:w-1/2 xl:w-1/3 h-10 px-3 mx-auto rounded-full border-2 border-gray-300"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default Forum;
