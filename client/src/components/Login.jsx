import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { CheckSquare, Sparkles, Zap, Shield } from "lucide-react";
import axios from "axios";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id";

  const handleSuccess = async (credentialResponse) => {
    console.log("Credential received:", credentialResponse.credential);
    setIsLoading(true);

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
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/";
    } catch (err) {
      console.error(
        "❌ Login failed:",
        err?.response?.data || err.message || err
      );
      alert("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: CheckSquare,
      title: "Smart Task Management",
      description: "Organize your tasks with intelligent prioritization and deadline tracking"
    },
    {
      icon: Sparkles,
      title: "Beautiful Interface",
      description: "Enjoy a clean, modern design that makes productivity feel effortless"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing-fast performance with real-time synchronization"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    }
  ];

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-300 to-indigo-400 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="hidden lg:block space-y-8">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold">TaskMesh</h1>
              </div>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Transform your productivity with our beautifully designed task management platform
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-white">TaskMesh</h1>
                </div>
                <p className="text-white/90">Welcome back! Please sign in to continue</p>
              </div>

              {/* Login Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                  <div className="hidden lg:block">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to access your workspace</p>
                  </div>
                  <div className="lg:hidden">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
                    <p className="text-gray-600">Continue to your workspace</p>
                  </div>
                </div>

                {/* Google Login Button */}
                <div className="space-y-6">
                  <div className="w-full">
                    {clientId === "your-google-client-id" ? (
                      <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-200">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-orange-800 font-semibold mb-2">Configuration Required</h3>
                        <p className="text-orange-700 text-sm">
                          Please configure your Google Client ID in the environment variables to enable sign-in.
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        {isLoading && (
                          <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center z-10">
                            <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        <div className="w-full [&>div]:w-full [&>div>div]:w-full [&>div>div>div]:w-full [&>div>div>div>div]:w-full [&_iframe]:w-full">
                          <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => console.log("Login Failed")}
                            theme="outline"
                            size="large"
                            shape="rectangular"
                            text="signin_with"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      By signing in, you agree to our{" "}
                      <a href="#" className="text-pink-600 hover:text-pink-700 font-medium">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-pink-600 hover:text-pink-700 font-medium">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Features */}
              <div className="lg:hidden mt-8 space-y-4">
                {features.slice(0, 2).map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20"
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm">{feature.title}</h3>
                        <p className="text-white/80 text-xs">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
