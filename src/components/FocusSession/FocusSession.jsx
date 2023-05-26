import TopicSelector from "./TopicSelector";
import FocusTimer from "./FocusTimer";

const FocusSession = () => {
  return (
    <div className="pl-64">
      <h2 className="text-center">Focus Session</h2>
      <TopicSelector />
      <FocusTimer />
    </div>
  );
};

export default FocusSession;
