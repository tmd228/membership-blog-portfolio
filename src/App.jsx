import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/SignUp/SignUp"
import { Routes, Route } from "react-router-dom"

function App() {

  return <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  </div>
}

export default App
