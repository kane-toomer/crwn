import { useState, useContext } from "react";

// Components
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// Firebase
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// Context
import { UserContext } from "../../context/user.context";

//Assets
import "./sign-up-form.styles.scss";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
	const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password != confirmPassword) {
			alert("passwords do not match");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			setCurrentUser(user);

			await createUserDocumentFromAuth(user, { displayName });

			resetFormFields();
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use.");
			}
			console.log("user creation encountered and error", error);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>

			<form onSubmit={handleSubmit}>
				{/* Display Name */}
				<FormInput
					label="Display Name"
					inputOptions={{
						type: "text",
						required: true,
						onChange: handleChange,
						name: "displayName",
						value: displayName,
					}}
				/>

				{/* Email */}
				<FormInput
					label="Email"
					inputOptions={{
						type: "email",
						required: true,
						onChange: handleChange,
						name: "email",
						value: email,
					}}
				/>

				{/* Password */}
				<FormInput
					label="Password"
					inputOptions={{
						type: "password",
						required: true,
						onChange: handleChange,
						name: "password",
						value: password,
					}}
				/>

				{/* Confirm Password */}
				<FormInput
					label="Confirm Password"
					inputOptions={{
						type: "password",
						required: true,
						onChange: handleChange,
						name: "confirmPassword",
						value: confirmPassword,
					}}
				/>

				{/* Submit Button */}
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
