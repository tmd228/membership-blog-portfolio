import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/SignUp/SignUp"
import JoinGroup from "./pages/JoinGroup/JoinGroup"
import CreateGroup from "./pages/CreateGroup/CreateGroup"
import Test from "./pages/Test/Test"
import GroupPage from "./pages/GroupPage/GroupPage"
import NewGroupPost from "./pages/NewGroupPost/NewGroupPost"
import GroupPostDetail from "./pages/GroupPostDetail/GroupPostDetail"
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebaseConfig/firebase"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

function App() {

  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => { unsubscribe() }
  }, [])

  return <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route element={<ProtectedRoute loading={loading} user={user} />}>
        <Route path="/joinGroup" element={<JoinGroup />} />
        <Route path="/createGroup" element={<CreateGroup />} />
        <Route path="/group/:groupId" element={<GroupPage />} />
        <Route path="/group/:groupId/newPost" element={<NewGroupPost />} />
        <Route path="/group/:groupId/post/:postId" element={<GroupPostDetail />} />
      </Route>
      <Route path="/test" element={<Test />} />
    </Routes>
  </div>
}

export default App