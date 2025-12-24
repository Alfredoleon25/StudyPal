// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Role from "./pages/Role";
//import Subjects from "./pages/Subjects";
import Tutors from "./pages/Tutors";
import TutorRequests from "./pages/tutor-requests"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Role />} />
        {/* <Route path="/subjects" element={<Subjects />} /> */}
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/tutor-requests" element={< TutorRequests/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

