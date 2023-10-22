import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./components/Home";
import ListingsPage from "./components/ListingsPage";
import {useAuthContext} from "./context/AuthContext";
import {ToastContainer, toast} from "react-toastify";
import {useEffect} from "react";
import "react-toastify/dist/ReactToastify.css";
import AddListingForm from "./components/AddListingForm";

function App() {
    const {error} = useAuthContext();
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);
    return (
        <>
            <ToastContainer autoClose={1500} />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/listings/" element={<ListingsPage />}></Route>
                <Route path="/listings/add" element={<AddListingForm />}></Route>
            </Routes>
        </>
    );
}

export default App;
