import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Registration() {
  const [data, setData] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [error, setError] = useState({
    name_error: "",
    mobile_error: "",
    password_error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Create a copy of the current error state
    let newError = { ...error };

    // Update the data state
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Real-time validation
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (name === "name") {
      if (value.trim() === "") {
        newError.name_error = "Name cannot be empty.";
      } else {
        newError.name_error = ""; // Clear error if valid
      }
    } else if (name === "mobile") {
      if (value && (!/^[0-9]*$/.test(value) || value.length > 10)) {
        newError.mobile_error = "Invalid phone number. Only digits are allowed and max 10 digits.";
      } else if (value.length !== 10 && value.length > 0) {
        newError.mobile_error = "Phone number must be exactly 10 digits.";
      } else {
        newError.mobile_error = ""; // Clear error if valid
      }
    } else if (name === "password") {
      if (!regex.test(value)) {
        newError.password_error = "Password must contain uppercase, lowercase, digit, and special character.";
      } else if (value.length < 6) {
        newError.password_error = "Password must be at least 6 characters.";
      } else {
        newError.password_error = ""; // Clear error if valid
      }
    }

    // Update the error state
    setError(newError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const length1 = error.name_error.length;
    const length2 = error.mobile_error.length;
    const length3 = error.password_error.length;

    if (length1 === 0 && length2 === 0 && length3 === 0) {
      // Basic validation
      if (!data.name || !data.mobile || !data.password) {
        setError({ ...error, global_error: "Please fill in all fields" });
        return;
      }

      if (!/^[0-9]{10}$/.test(data.mobile)) {
        setError({ ...error, global_error: "Invalid phone number. It should be 10 digits." });
        return;
      }

      // Clear error and log the data (replace this with your registration logic)
      setError({});
      console.log("Registration Data:", data);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex">
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
          <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[35%] h-[60%] sm:h-[55%]  bg-white shadow-lg shadow-gray-400 flex flex-col rounded-xl relative ">
            {/* Title */}
            <div className="w-full flex justify-center mt-4">
              <span className="text-3xl font-bold">REGISTRATION</span>
            </div>

            {/* Registration Form */}
            <div className="mt-8 w-full h-full flex items-center justify-center">
              <form className="w-[80%] mx-auto flex flex-col gap-y-2" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="flex items-center gap-x-3 flex-col">
                  <div className="w-full h-12 flex items-center justify-center text-xl border border-gray-200 rounded gap-x-2">
                    <div className="w-12 flex h-12 justify-center items-center text-xl border border-gray-200 rounded">
                      <IoPerson />
                    </div>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="flex-1 bg-gray-200 h-12 pl-3 text-base outline-none rounded focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-[100%] flex justify-end h-12">
                    {error.name_error && (
                      <p className="text-red-500 text-sm mt-1 w-[90%] pl-4 pt-1 text-start justify-start flex">
                        {error.name_error}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="flex items-center gap-x-3 flex-col">
                  <div className="w-full h-12 flex items-center justify-center text-xl border border-gray-200 rounded gap-x-2">
                    <div className="w-12 flex h-12 justify-center items-center text-xl border border-gray-200 rounded">
                      <MdOutlineLocalPhone />
                    </div>
                    <input
                      name="mobile"
                      type="text"
                      placeholder="07xxxxxxxxx"
                      className="flex-1 bg-gray-200 h-12 pl-3 text-base outline-none rounded focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-[100%] flex justify-end h-12">
                    {error.mobile_error && (
                      <p className="text-red-500 text-sm mt-1 w-[90%] pl-4 pt-1 text-start justify-start flex">
                        {error.mobile_error}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex items-center gap-x-3 flex-col">
                  <div className="w-full h-12 flex items-center justify-center text-xl border border-gray-200 rounded gap-x-2">
                    <div className="w-12 flex h-12 justify-center items-center text-xl border border-gray-200 rounded">
                      <RiLock2Fill />
                    </div>
                    <input
                      name="password"
                      type="password"
                      placeholder="Your Password"
                      className="flex-1 bg-gray-200 h-12 pl-3 text-base outline-none rounded focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-[100%] flex justify-end h-12">
                    {error.password_error && (
                      <p className="text-red-500 text-sm mt-1 w-[90%] pl-4 text-start justify-start flex">
                        {error.password_error}
                      </p>
                    )}
                  </div>
                </div>

                {/* Register Button */}
                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full text-xl text-white h-12 bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 capitalize"
                  >
                    REGISTER
                  </button>
                <div className="w-full text-center mt-2 mb-4">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login">
                      <span className="text-blue-800 underline cursor-pointer hover:text-blue-600">
                        Login here
                      </span>
                    </Link>
                  </p>
                </div>

                {/* Login Link */}
                </div>

                {/* Global Error Message */}
                {error.global_error && (
                  <div className="w-full text-center mt-2">
                    <p className="text-red-500 text-sm">{error.global_error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
