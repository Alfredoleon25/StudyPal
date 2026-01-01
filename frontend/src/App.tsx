import { BrowserRouter, Routes, Route } from "react-router-dom";
import LearnerRequests from "./pages/LearnerRequests";
import Registration from "./pages/Registration";
import Subjects from "./pages/Subjects";
import Dashboard from "./pages/Dashboard";
import EditSubjects from "./pages/EditSubjects";
import Tutors from "./pages/Tutors";
import TutorRequests from "./pages/TutorRequests";
import ChatWindow from "./pages/chat/:chatId";
import ChatList from "./pages/chats";
import LandingPage from "./pages/LandingPage";

export default App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/my-requests" element={<LearnerRequests />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-subjects" element={<EditSubjects />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/tutor-requests" element={<TutorRequests />} />
        <Route path="/chats" element={<ChatList />} />
        <Route path="/chat/:chatId" element={<ChatWindow />} />
      </Routes>
    </BrowserRouter>
  );
}


// In your Routes:

// export default App;
// import { BrowserRouter, Routes, Route ,useParams} from "react-router-dom";
// import Role from "./pages/Role";
// import Subjects from "./pages/Subjects";
// import Tutors from "./pages/Tutors";
// import TutorRequests from "./pages/tutor-requests"
// import ChatWindow from "./pages/chat/:chatId"
// import ChatList from "./pages/chats";
// import EditSubjects from "./pages/EditSubjects";

// function ChatWindowWrapper() {
//   const { chatId } = useParams();
//   return <ChatWindow chatId={chatId!} />;
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//          <Route path="/edit-subjects" element={<EditSubjects />} />
//         <Route path="/" element={<Role />} />
//         <Route path="/subjects" element={<Subjects />} />
//         <Route path="/tutors" element={<Tutors />} />
//         <Route path="/tutor-requests" element={< TutorRequests/>}/>
//         <Route path="/chat/:chatId" element={< ChatWindowWrapper/>}/>
//         <Route path="/chats" element={<ChatList/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

