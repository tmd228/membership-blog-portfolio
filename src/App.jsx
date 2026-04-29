import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/SignUp/SignUp"
import JoinGroup from "./pages/JoinGroup/JoinGroup"
import CreateGroup from "./pages/CreateGroup/CreateGroup"
import Test from "./pages/Test/Test"
import { Routes, Route } from "react-router-dom"

function App() {

  return <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/joinGroup" element={<JoinGroup />} />
      <Route path="/createGroup" element={<CreateGroup />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </div>
}

export default App
