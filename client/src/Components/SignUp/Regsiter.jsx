import React, { useState } from "react";
import InputField from "../InputField";
function Regsiter() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleForm = async () => {
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      }),
    });

    const json = response.json();
    if (json.status === "FAILED") {
      setMessage(json.message);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <div className="flex h-full flex-col items-end justify-evenly">
        <div className="grid px-2 py-6 rounded grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            type={"text"}
            name={"Fname"}
            label={"First Name"}
            icon={"person"}
            onChange={(e) => setFname(e.target.value)}
          />
          <InputField
            type={"text"}
            name={"Lname"}
            label={"Last Name"}
            icon={"person"}
            onChange={(e) => setLname(e.target.value)}
          />
          <InputField
            type={"email"}
            name={"Email"}
            label={"Email Address"}
            icon={"mail"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type={"password"}
            name={"Password"}
            label={"Password"}
            icon={"lock"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {message && <p className="text-red-500 text-xs">{message}</p>}

        <button
          type="submit"
          className="bg-blue-600 mt-3 px-3 w-fit py-2 text-sm rounded-md text-slate-300 hover:bg-blue-700"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}

export default Regsiter;
