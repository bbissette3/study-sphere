import { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics } from "../../store/slice/topicSlice";
import TopicCard from "../Dashboard/TopicCard";

const Forum = () => {
  const dispatch = useDispatch();

  const topics = useSelector((state) => state.topics.topics);

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  return (
    <div className="pl-64 pr-5">
      <h1 className="text-4xl font-bold text-center mb-10">
        Subscribe To Other Topics!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default Forum;
