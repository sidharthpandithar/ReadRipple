import AuthContainer from "../components/Auth/AuthContainer";
import LoginPrompt from "../components/Auth/LoginPrompt";
import SignupForm from "../components/Auth/SignupForm";
import AuthFooter from "../components/Auth/AuthFooter";

export default function Singup() {
  return (
    <AuthContainer
      rightContent={<SignupForm />}
      leftContent={<LoginPrompt />}
      footerContent={<AuthFooter />}
    />
  );
}
