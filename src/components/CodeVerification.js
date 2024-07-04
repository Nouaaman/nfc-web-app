import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const API_URL = process.env.REACT_APP_API_URL;
const PATH = API_URL + "auth/verify-code";

export default function CodeVerification(props) {
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState(props.codes);
  const [identityToken, setIdentityToken] = useState(props.token);

  const handleCodeSubmit = (e, code) => {
    e.preventDefault();

    fetch(`${PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${identityToken}`,
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        // setCodes(results.codes);
        if (results.data) {
          localStorage.setItem("sessionToken", results.data.sessionToken);
          window.location.href = "/dashboard";
        } else {
          toast.warning(results.message);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mt-10 w-full ">
      <form className="space-y-6" action="#" method="POST">
        <h3 className="block text-center text-2xl font-semibold text-gray-900">
          Code de vérification
        </h3>

        <div className="flex w-full justify-center items-center gap-6">
          {codes.map((code, index) => (
            <button
              key={index}
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
      {/* Spinner */}
      {loading && <Spinner />}
    </div>
  );
}
