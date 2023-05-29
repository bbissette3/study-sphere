import { useState, useEffect } from "react";

const TopicResources = ({ selectedTopic }) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (selectedTopic) {
      setResources(selectedTopic.resources);
    } else {
      setResources([]);
    }
  }, [selectedTopic]);

  return (
    <div className="resource-list">
      <h3 className="pb-4 text-darkGray font-semibold">
        Resources for Selected Topic
      </h3>
      {resources.map((resource) => (
        <div key={resource.id}>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-darkGray font-semibold"
          >
            {resource.url}
          </a>
        </div>
      ))}
    </div>
  );
};

export default TopicResources;
