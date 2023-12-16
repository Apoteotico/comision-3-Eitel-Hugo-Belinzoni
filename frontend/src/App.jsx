import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { PostsPage } from "./pages/PostsPage";
import PostFormPage from "./pages/PostFormPage";
import ProfilePage from "./pages/ProfilePage";
import {PostDetailPage} from "./pages/PostDetailPage"; // Nuevo componente para el detalle del post
import { PostProvider } from "./context/postsContext";

import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} /> {/* Utiliza el nuevo componente para el detalle del post */}
            <Route element={<ProtectedRoute />}>
              <Route path="/add-post" element={<PostFormPage />} /> 
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
