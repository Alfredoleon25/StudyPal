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
import ProtectedRoute from "./services/ProtectedRoute";

export default App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/my-requests" element={<ProtectedRoute><LearnerRequests /></ProtectedRoute>} />
        <Route path="/registration" element={<ProtectedRoute><Registration /></ProtectedRoute>} />
        <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/edit-subjects" element={<ProtectedRoute><EditSubjects /></ProtectedRoute>} />
        <Route path="/tutors" element={<ProtectedRoute><Tutors /></ProtectedRoute>} />
        <Route path="/tutor-requests" element={<ProtectedRoute><TutorRequests /></ProtectedRoute>} />
        <Route path="/chats" element={<ProtectedRoute><ChatList /></ProtectedRoute>} />
        <Route path="/chat/:chatId" element={<ProtectedRoute><ChatWindow /></ProtectedRoute>} />
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

