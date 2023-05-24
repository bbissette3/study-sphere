// import AddResource from "./AddResource";
// import DeleteResource from "./DeleteResource";

// const ResourcesList = ({ resources, topicId }) => {
//   return (
//     <div className="w-full md:w-1/2 pl-2">
//       <div className="flex justify-center gap-5 items-center mb-4">
//         <h2 className="text-lg font-bold">Resources</h2>
//         <AddResource topicId={topicId} />
//       </div>
//       <ul className="list-disc pl-5">
//         {resources.map((resource) => (
//           <li
//             key={resource.id}
//             className="flex justify-between items-center pb-2"
//           >
//             <a
//               href={resource.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline"
//             >
//               {resource.url}
//             </a>
//             <DeleteResource resourceId={resource.id} topicId={topicId} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ResourcesList;
import AddResource from "./AddResource";
import DeleteResource from "./DeleteResource";

const ResourcesList = ({ resources, topicId }) => {
  return (
    <div className="w-full md:w-1/2 pl-2">
      <div className="flex justify-center gap-5 items-center mb-4">
        <h2 className="text-lg font-bold">Resources</h2>
        <AddResource topicId={topicId} />
      </div>
      <div className="max-h-80 overflow-y-auto">
        <ul className="list-disc pl-5">
          {resources.map((resource) => (
            <li
              key={resource.id}
              className="flex justify-between items-center pb-2"
            >
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {resource.url}
              </a>
              <DeleteResource resourceId={resource.id} topicId={topicId} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResourcesList;
