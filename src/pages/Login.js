import React, { useState, useContext } from "react";
import { LayoutDashboard } from "lucide-react";
import CodeVerification from "../components/CodeVerification";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const API_URL = process.env.REACT_APP_API_URL;
const PATH = API_URL + "auth/verify-identity";

export default function Login() {
  // const userData = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const [identityToken, setItentityToken] = useState("");
  const [codes, setCodes] = useState([]);

  const [codeVerificationVisivile, setCodeVerificationVisivile] =
    useState(false);

  const handleusernameSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("username", username);

    fetch(`${PATH}/${username}`, {
      method: "GET",
      cors: "no-cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        if (results.codes) {
          setCodes(results.codes);
        } else {
          toast.warning(results.message);
          return;
        }

        setItentityToken(results.identityToken);
        console.log(results);
        setCodeVerificationVisivile(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full  flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center flex-col gap-2">
        <LayoutDashboard size={80} color="#0e7490" />

        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Connectez-vous à votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block  font-medium leading-6 text-gray-900"
            >
              Nom d'utilisateur
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full  rounded-lg border-1 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600"
              />
            </div>
          </div>

          <div>
            <button
              className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-3 font-semibold leading-6 text-lg text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              onClick={(e) => {
                handleusernameSubmit(e);
              }}
            >
              Continuer
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Pas encore membre?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
          >
            Contactez l'administrattion
          </a>
        </p>
      </div>

      {/* spinner */}
      {loading && <Spinner />}

      {/* auth verification */}
      {codeVerificationVisivile && (
        <CodeVerification codes={codes} token={identityToken} />
      )}
    </div>
  );
}
