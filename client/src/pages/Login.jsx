import AuthContainer from "../components/Auth/AuthContainer";
import LoginForm from "../components/Auth/LoginForm";
import SignUpPrompt from "../components/Auth/SignUpPrompt";
import AuthFooter from "../components/Auth/AuthFooter";

export default function Login() {
  return (
    <AuthContainer
      leftContent={<LoginForm />}
      rightContent={<SignUpPrompt />}
      footerContent={<AuthFooter />}
    />
  );
}
