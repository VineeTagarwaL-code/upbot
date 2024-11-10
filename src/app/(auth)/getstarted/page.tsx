"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Zap, Rocket, Bell } from "lucide-react";
import { signIn } from "next-auth/react";

export default function ProductSignIn() {
  const [isHovering, setIsHovering] = useState(false);

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1 flex flex-col items-center pb-10">
          <div
            className="relative w-20 h-20 mb-6 transition-transform duration-300 ease-in-out transform hover:scale-110"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Zap
              size={80}
              className={`text-white absolute top-0 left-0 transition-all duration-300 ${
                isHovering
                  ? "opacity-0 rotate-180 scale-50"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <Zap
              size={80}
              className={`text-white absolute top-0 left-0 transition-all duration-300 ${
                isHovering
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-180 scale-50"
              }`}
            />
          </div>
          <CardTitle className="text-4xl font-bold text-center text-white">
            Upbot
          </CardTitle>
          <CardDescription className="text-center text-gray-400 text-lg max-w-md mt-2">
            Jumpstart your project with instant user engagement as there is no
            more downtime
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Features */}
            <div className="space-y-4">
              <Card className="bg-white rounded-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Rocket className="h-5 w-5 text-blue-500" />
                    <h3 className="text-base font-semibold text-gray-900">
                      Cold Start Solved
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Instantly wake up your serverless functions with Upbot.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Bell className="h-5 w-5 text-green-500" />
                    <h3 className="text-base font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Built-in notification system to keep you updated about your
                    project's status.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Welcome</CardTitle>
                <CardDescription className="text-gray-400">
                  Get started with Upbot by signing in with your Google account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4transition duration-200 ease-in-out flex items-center justify-center"
                  onClick={handleGoogleSignIn}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_13183_10121)">
                      <path
                        d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_13183_10121">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Get started with Google
                </Button>
              </CardContent>
              <CardFooter className="text-center text-gray-400 text-sm">
                Upbot is free to use and open-source
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
