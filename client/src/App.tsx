import {Route, Routes} from "react-router-dom";
import Navbar from "./components/heading/Navbar";
import "./index.css";
import Home from "./components/Home";
import ListingsPage from "./components/listing/ListingsPage";
import {useAuthContext} from "./context/AuthContext";
import {ToastContainer, toast} from "react-toastify";
import {useEffect} from "react";
import "react-toastify/dist/ReactToastify.css";
import AddListingForm from "./components/listing/AddListingForm";
import ListingOverview from "./components/listing/ListingOverview";
import {useDataContext} from "./context/DataContext";

function App() {
    const {error} = useAuthContext();
    const {listingsToShow, userListingsToShow} = useDataContext();
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
                <Route path="/listings/" element={<ListingsPage data={listingsToShow} />}></Route>
                <Route path="/listings/add" element={<AddListingForm />}></Route>
                <Route path="/listings/:id" element={<ListingOverview />} />
                <Route path="/listings/user/:id" element={<ListingsPage data={userListingsToShow} />} />
                <Route path="/user/:id" element={<></>} />
            </Routes>
        </>
    );
}

export default App;
