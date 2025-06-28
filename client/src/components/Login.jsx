import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  // Debug: Check if environment variables are loaded
  console.log("VITE_GOOGLE_CLIENT_ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
  console.log(
    "VITE_BACKEND_USER_SERVICE_URL:",
    import.meta.env.VITE_BACKEND_USER_SERVICE_URL
  );

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Check if clientId exists
  if (!clientId) {
    return (
      <div className="login-container">
        <h2>Configuration Error</h2>
        <p>Google Client ID is not configured. Please check your .env file.</p>
      </div>
    );
  }

  const handleSuccess = async (credentialResponse) => {
    console.log("Credential received:", credentialResponse.credential);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_USER_SERVICE_URL}/auth/google`,
        {
          id_token: credentialResponse.credential,
        }
      );

      console.log("✅ Server Response:", res.data);

      if (res.status !== 200) {
        throw new Error("Non-200 status code");
      }

      localStorage.setItem("token", res.data.token);
      alert(`Welcome ${res.data.user.name}`);
    } catch (err) {
      console.error(
        "❌ Login failed:",
        err?.response?.data || err.message || err
      );
      alert("Login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-[400px] p-6 border-2 border-gray-400 rounded-md shadow-md flex flex-col gap-10 items-center bg-white">
          <img className="w-[300px] " src="/public/todo.webp" alt="" />
          <h1 className="text-2xl ">Welcome. Please sign in</h1>
          <div className="pb-5" style={{ width: '300px' }}>
  <GoogleLogin
    onSuccess={handleSuccess}
    onError={() => console.log('Login Failed')}
    theme="outline"
    size="large"
    shape="rectangular"
    text="signin_with"
  />
</div>

        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
