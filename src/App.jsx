import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/home'
import PublicRoute from './routes/public'
import Features from './pages/features'
import About from './pages/about'
import Contact from './pages/contact'
import Auth from './pages/auth'
import ProtectedRoute from './routes/protected'
import ChatPage from './pages/chatpage'
import Chatsection from './components/chatsection'
import UserProfile from './pages/profilepage'
import UserSettings from './pages/setting'
import NewChatPage from './pages/newChatPage'

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path='features' element={<Features />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
        </Route>

        <Route path='/' element={<ProtectedRoute />}>
          <Route path='c' element={<ChatPage />} >
            <Route path='new-chat' element={<NewChatPage />} />
            <Route path='chat/:userId' element={<Chatsection />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='setting' element={<UserSettings />} />
          </Route>
        </Route>

        <Route path='login' element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
