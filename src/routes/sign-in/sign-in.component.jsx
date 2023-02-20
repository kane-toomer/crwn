import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>Sign In</h1>

			{/* Google Popup */}
			<button onClick={logGoogleUser}>Sign In with Google Popup</button>

			{/* Sign Up Form */}
			<SignUpForm />
		</div>
	);
};

export default SignIn;
