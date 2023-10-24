import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useDataContext} from "../../context/DataContext";
import {useAuthContext} from "../../context/AuthContext";
import {Categories} from "../../types/types";
import {toast} from "react-toastify";
import {categories} from "../../types/constants";

interface ListingFormProps {
    title: string;
    category: Categories;
    description: string;
    durationInDays: number;
    originalPrice: number;
}

function AddListingForm() {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const {addListing} = useDataContext();

    const initialValues: ListingFormProps = {
        title: "",
        category: "" as Categories,
        description: "",
        durationInDays: 3,
        originalPrice: 0,
    };

    const handleSubmit = async (values: ListingFormProps) => {
        if (!user) return;
        const response = await addListing(
            {...values, username: user.username, promoPrice: values.originalPrice, image: "asd", createdAt: "", updatedAt: ""},
            user
        );
        if (response) {
            toast.success("Listing added successfully.");
            navigate("/listings");
        } else {
            toast.error("Something went wrong.");
        }
    };

    const cancel = () => {
        navigate("/listings");
    };

    return (
        <main className="container">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    handleSubmit(values);
                    actions.setSubmitting(false);
                }}
                validate={handleValidate}>
                {(props) => (
                    <Form className="flex flex-col gap-6 w-full px-2 justify-normal py-24">
                        <div>
                            <label htmlFor="title" className="text-2xl mb-2">
                                Title:{" "}
                            </label>
                            <Field
                                className={`w-1/2 focus:ring-primary-600 focus:border-primary-600 block  rounded-lg border  bg-gray-50 p-2.5 text-gray-900 0 sm:text-sm ${
                                    props.errors.title ? "border-red-400 border-2" : "border-gray-300 border-2"
                                }`}
                                id="title"
                                name="title"
                                placeholder="Title of your listing."
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="text-2xl mb-2">
                                Select Category:{" "}
                            </label>
                            <Field
                                className={`w-1/5 focus:ring-primary-600 focus:border-primary-600 block  rounded-lg border  bg-gray-50 p-2.5 text-gray-900 0 sm:text-sm ${
                                    props.errors.category ? "border-red-400 border-2" : "border-gray-300 border-2"
                                }`}
                                id="category"
                                name="category"
                                as="select">
                                <option value="choose">--Choose category--</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <div className="w-full">
                            <label htmlFor="description" className="text-2xl mb-2">
                                Description:{" "}
                            </label>
                            <Field
                                as="textarea"
                                rows="20"
                                className={`w-full focus:ring-primary-600 focus:border-primary-600 block  rounded-lg border  bg-gray-50 p-2.5 text-gray-900 0 sm:text-sm ${
                                    props.errors.description ? "border-red-400 border-2" : "border-gray-300 border-2"
                                }`}
                                id="description"
                                name="description"
                                type="text"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="text-2xl mb-2">
                                Price:{" "}
                            </label>
                            <Field
                                className={`w-[10%] focus:ring-primary-600 focus:border-primary-600 block  rounded-lg border  bg-gray-50 p-2.5 text-gray-900 0 sm:text-sm ${
                                    props.errors.originalPrice ? "border-red-400 border-2" : "border-gray-300 border-2"
                                }`}
                                id="originalPrice"
                                name="originalPrice"
                                type="number"
                                placeholder="Price"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="text-2xl mb-2">
                                Select Duration:{" "}
                            </label>
                            <Field
                                className={`w-[10%] focus:ring-primary-600 focus:border-primary-600 block  rounded-lg border  bg-gray-50 p-2.5 text-gray-900 0 sm:text-sm ${
                                    props.errors.durationInDays ? "border-red-400 border-2" : "border-gray-300 border-2"
                                }`}
                                id="durationInDays"
                                name="durationInDays"
                                as="select">
                                <option value={3}>3 days</option>
                                <option value={5}>5 days</option>
                                <option value={7}>7 days</option>
                            </Field>
                        </div>
                        <div className="flex flex-col">
                            {props.errors.title && <p className="text-red-500 text-sm">{props.errors.title}</p>}
                            {props.errors.category && <p className="text-red-500 text-sm">{props.errors.category}</p>}
                            {props.errors.description && <p className="text-red-500 text-sm">{props.errors.description}</p>}
                            {props.errors.originalPrice && <p className="text-red-500 text-sm">{props.errors.originalPrice}</p>}
                            {props.errors.durationInDays && <p className="text-red-500 text-sm">{props.errors.durationInDays}</p>}
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="w-[10%] bg-mainGreen py-1 text-xl rounded-md hover:scale-105 active:ring-2 font-semibold"
                                type="submit">
                                Add
                            </button>
                            <button
                                onClick={cancel}
                                className="w-[10%] bg-orange-300 py-1 text-xl rounded-md hover:scale-105 active:ring-2 font-semibold">
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
}

export default AddListingForm;

interface ListingFormPropsErrors {
    title: string;
    category: string;
    description: string;
    originalPrice: string;
    durationInDays: string;
}
const handleValidate = (values: ListingFormProps) => {
    const errors: ListingFormPropsErrors = {
        title: "",
        category: "",
        description: "",
        originalPrice: "",
        durationInDays: "",
    };
    const {title, category, description, originalPrice, durationInDays} = values;
    if (!title) {
        errors.title = "Provide a title.";
    } else if (title.length < 10) {
        errors.title = "Title has to be at least 10 characters";
    } else if (title.length > 40) {
        errors.title = "Title has to be less than 40 characters";
    }
    if (!category || category === ("choose" as Categories)) {
        errors.category = "Select a category.";
    }
    if (!description) {
        errors.description = "Provide a description";
    }
    if (!originalPrice) {
        errors.originalPrice = "You can't list an item for free.";
    }
    if (!durationInDays) {
        errors.durationInDays = "Have to provide a duration.";
    }
    if (errors.title !== "" || errors.category !== "" || errors.description !== "" || errors.originalPrice !== "") return errors;
    return {};
};
