import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CodeVerification() {
  const [codes, setCodes] = useState(["34", "95", "16"]);

  const handleCodeSubmit = (e, code) => {
    e.preventDefault();
    toast.error(code + " Code incorrete, veuillez réessayer. ");
    toast.success("Vous êtes connecté.");
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <h3 className="block text-center text-2xl font-semibold text-gray-900">
          Code de vérification
        </h3>

        <div className="flex justify-center items-center gap-6">
          {codes.map((code, index) => (
            <button
              className="flex justify-center items-center w-24 h-24 rounded-full bg-cyan-200  font-semibold leading-6 text-2xl text-black shadow-sm hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 "
              onClick={(e) => {
                handleCodeSubmit(e, code);
              }}
            >
              {code}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
