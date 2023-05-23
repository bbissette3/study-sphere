const ResourcesList = ({ resources }) => {
  return (
    <div className="w-full md:w-1/2 pl-2">
      <div className="flex justify-center gap-5 items-center mb-4">
        <h2 className="text-lg font-bold">Resources</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Resource
        </button>
      </div>
      {resources.map((resource) => (
        <div key={resource.id}>
          <p>{resource.url}</p>
        </div>
      ))}
    </div>
  );
};

export default ResourcesList;
