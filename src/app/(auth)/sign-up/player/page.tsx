import React from "react";
import SignUpForm from "../_components/sign-up-form";

const page = () => {
  return (
    <div className="bg-[#ffffff7e] p-5 rounded-lg w-[400px] lg:w-[600px]">
      <div className="text-center">
        <h1 className="text-2xl font-medium">Register</h1>
        <p className="text-sm text-gray-700">
          Join the competitive golf community
        </p>
      </div>

      <div className="mt-10">
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
