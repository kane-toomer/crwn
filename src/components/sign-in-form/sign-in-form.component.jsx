import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from "../../context/user.context";

import {
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			setCurrentUser(user);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Incorrect email or password");
					break;
				case "auth/user-not-found":
					alert("No user associated with this email");
					break;
				default:
					console.log(error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
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

				{/* Submit Button */}
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
