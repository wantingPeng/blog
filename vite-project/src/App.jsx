import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Newpost from "./Newpost";
import About from "./About";
import PostPage from "./PostPage";
import Edit from "./Edit";
import Missing from "./Missing";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./dataContext/dataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about1" element={<About />} />
          <Route path="/post" element={<Newpost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="*" element={<Missing />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>

        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
