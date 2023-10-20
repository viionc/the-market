import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./components/Home";
import DataContextProvider from "./context/DataContext";
import ListingsPage from "./components/ListingsPage";

function App() {
    return (
        <BrowserRouter>
            <DataContextProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/listings/" element={<ListingsPage />}></Route>
                </Routes>
            </DataContextProvider>
        </BrowserRouter>
    );
}

export default App;
