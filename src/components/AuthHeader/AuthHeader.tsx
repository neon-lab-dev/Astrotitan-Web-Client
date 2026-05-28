import { useLocation } from "react-router-dom";

const AuthHeader = () => {
  const pathname = useLocation().pathname;

  const authContent: Record<
    string,
    {
      heading: string;
      description: string;
    }
  > = {
    "/auth/signup": {
      heading: "Create Account",
      description: "Personalized insights designed for real-life decisions.",
    },

    "/auth/login": {
      heading: "Welcome Back",
      description: "Log in to continue accessing your personalized dashboard.",
    },

    "/auth/otp": {
      heading: "Verify OTP",
      description: "Enter the verification code sent to your email or phone.",
    },
  };

  const currentContent = authContent[pathname] || authContent["/auth/signup"];

  return (
    <div className="px-3 lg:px-6 py-6 shadow-auth-header bg-primary-25 border-b border-primary-30">
      <h1 className="text-2xl font-semibold font-Satoshi">
        {currentContent.heading}
      </h1>

      <p className="font-GeneralSans mt-2">{currentContent.description}</p>
    </div>
  );
};

export default AuthHeader;
