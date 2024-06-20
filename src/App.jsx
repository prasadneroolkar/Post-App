import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import "./App.css";
import Siderbar from "./assets/components/Siderbar";
import Createpost from "./assets/components/Createpost";
import Postlist from "./assets/components/Postlist";
import { useState } from "react";
import StoreContext from "./assets/store/post-list-store";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <>
      <StoreContext>
        <div className="app-container">
          <Siderbar selectedTb={selectedTab} setSelectedTb={setSelectedTab} />
          <div className="content">
            <Header />

            {selectedTab === "Home" ? <Postlist /> : <Createpost />}

            <Footer />
          </div>
        </div>
      </StoreContext>
    </>
  );
}

export default App;
