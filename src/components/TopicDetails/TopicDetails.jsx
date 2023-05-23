// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";

// // //redux
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchTopicById } from "../../store/slice/topicSlice";

// // const TopicDetails = () => {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();

// //   const [comment, setComment] = useState("");

// //   const topic = useSelector((state) => state.topics.selectedTopic);

// //   useEffect(() => {
// //     dispatch(fetchTopicById(id));
// //   }, [dispatch, id]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // handle submit here
// //     setComment("");
// //   };

// //   return (
// //     <div className="container mx-auto py-10 pl-64 pr-8">
// //       <div className="bg-gray-500 p-8">
// //         <h1 className="text-2xl font-bold text-center pr-7 mb-4">
// //           {topic && topic.title}
// //         </h1>
// //         <div className="flex flex-col md:flex-row md:items-start justify-center md:space-x-8">
// //           <div className="w-full md:w-1/2 pr-2 border-r-2 border-gray-200">
// //             <h2 className="text-lg font-bold mb-2 text-center">Description</h2>
// //             <p className="mb-4 text-center">{topic && topic.description}</p>
// //           </div>
// //           <div className="w-full md:w-1/2 pl-2 flex justify-between items-center">
// //             <h2 className="text-lg font-bold mb-2 text-center">
// //               Resources ({topic && topic.resources ? topic.resources.length : 0}
// //               )
// //             </h2>
// //             <button className="bg-blue-500 text-white py-2 px-4 rounded">
// //               Add Resource
// //             </button>
// //           </div>
// //           {topic &&
// //             topic.resources &&
// //             topic.resources.length > 0 &&
// //             topic.resources.map((resource) => (
// //               <div key={resource.id}>
// //                 <h3 className="font-bold">{resource.name}</h3>
// //                 <p>{resource.description}</p>
// //               </div>
// //             ))}
// //         </div>
// //         <div>
// //           <h2 className="text-lg font-bold mt-4 mb-2 text-center">
// //             Comments ({topic && topic.comments ? topic.comments.length : 0})
// //           </h2>
// //           {topic &&
// //             topic.comments &&
// //             topic.comments.length > 0 &&
// //             topic.comments.map((comment) => (
// //               <div key={comment.id} className="mb-4">
// //                 <h3 className="font-bold">
// //                   {comment.user.username}: {comment.createdAt}
// //                 </h3>
// //                 <p>{comment.text}</p>
// //               </div>
// //             ))}
// //         </div>
// //         <form onSubmit={handleSubmit} className="mt-4">
// //           <input
// //             id="comment"
// //             name="comment"
// //             type="text"
// //             onChange={(e) => setComment(e.target.value)}
// //             value={comment}
// //             placeholder="Add comment..."
// //             className="w-full rounded-lg border-gray-300 shadow-lg py-2 px-4"
// //           />
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TopicDetails;
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";

// //redux
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTopicById } from "../../store/slice/topicSlice";

// const TopicDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [comment, setComment] = useState("");

//   const topic = useSelector((state) => state.topics.selectedTopic);

//   useEffect(() => {
//     dispatch(fetchTopicById(id));
//   }, [dispatch, id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // handle submit here
//     setComment("");
//   };

//   return (
//     <div className="container mx-auto py-10 pl-64 pr-8">
//       <div className="bg-gray-500 p-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-4 flex items-center text-blue-500"
//         >
//           <IoIosArrowBack size={24} className="mr-2" />
//         </button>
//         <h1 className="text-2xl font-bold text-center pr-7 mb-4">
//           {topic && topic.title}
//         </h1>
//         <div className="flex flex-col md:flex-row md:items-start justify-center md:space-x-8">
//           <div className="w-full md:w-1/2 pr-2 border-r-2 border-gray-200">
//             <h2 className="text-lg font-bold mb-2 text-center">Description</h2>
//             <p className="mb-4 text-center">{topic && topic.description}</p>
//           </div>
//           <div className="w-full md:w-1/2 pl-2">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold">
//                 Resources (
//                 {topic && topic.resources ? topic.resources.length : 0})
//               </h2>
//               <button className="bg-blue-500 text-white py-2 px-4 rounded">
//                 Add Resource
//               </button>
//             </div>
//             {topic &&
//               topic.resources &&
//               topic.resources.length > 0 &&
//               topic.resources.map((resource) => (
//                 <div key={resource.id}>
//                   <h3 className="font-bold">{resource.name}</h3>
//                   <p>{resource.description}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mt-4 mb-2 text-center">
//             Comments ({topic && topic.comments ? topic.comments.length : 0})
//           </h2>
//           {topic &&
//             topic.comments &&
//             topic.comments.length > 0 &&
//             topic.comments.map((comment) => (
//               <div key={comment.id} className="mb-4">
//                 <h3 className="font-bold">
//                   {comment.user.username}: {comment.createdAt}
//                 </h3>
//                 <p>{comment.text}</p>
//               </div>
//             ))}
//         </div>
//         <form onSubmit={handleSubmit} className="mt-4">
//           <input
//             id="comment"
//             name="comment"
//             type="text"
//             onChange={(e) => setComment(e.target.value)}
//             value={comment}
//             placeholder="Add comment..."
//             className="w-full rounded-lg border-gray-300 shadow-lg py-2 px-4"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TopicDetails;
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicById } from "../../store/slice/topicSlice";

//sub component
import ResourcesList from "./ResourcesList";
import CommentsList from "./CommentsList";
import CommentInputForm from "./CommentInputForm";

const TopicDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topic = useSelector((state) => state.topics.selectedTopic);

  useEffect(() => {
    dispatch(fetchTopicById(id));
  }, [dispatch, id]);

  const handleCommentSubmit = (comment) => {
    // handle comment submit here
  };

  return (
    <div className="container mx-auto py-10 pl-64 pr-8">
      <div className="bg-gray-500 p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-blue-500"
        >
          <IoIosArrowBack size={24} className="mr-2" />
        </button>
        <h1 className="text-2xl font-bold text-center pr-7 mb-4">
          {topic && topic.title}
        </h1>
        <div className="flex flex-col md:flex-row md:items-start justify-center md:space-x-8">
          <div className="w-full md:w-1/2 pr-2 border-r-2 border-gray-200">
            <h2 className="text-lg font-bold mb-2 text-center">Description</h2>
            <p className="mb-4 text-center">{topic && topic.description}</p>
          </div>
          {topic && topic.resources && (
            <ResourcesList resources={topic.resources} />
          )}
        </div>
        {topic && topic.comments && <CommentsList comments={topic.comments} />}
        <CommentInputForm onSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default TopicDetails;
