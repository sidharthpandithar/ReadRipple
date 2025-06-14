import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import MyLibrary from "./pages/MyLibrary";
import ViewBook from "./pages/ViewBook";
import AddBook from "./pages/AddBook";
import AuthRoute from "./components/Auth/AuthRoute";
import SearchResults from "./components/Required/SearchResults";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/library" element={<MyLibrary />}></Route>
          <Route path="/book/:id" element={<ViewBook />} />
          <Route path="/search-results" element={<SearchResults />} />

          <Route
            path="/add-book"
            element={
              <AuthRoute adminOnly={true}>
                <AddBook />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
