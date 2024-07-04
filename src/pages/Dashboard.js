import React, { useContext, useEffect, useState } from "react";
import { User, Clock, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const API_URL = process.env.REACT_APP_API_URL;
const PATH = API_URL + "user/data";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const sessionToken = localStorage.getItem("sessionToken");

  console.log(sessionToken);

  useEffect(() => {
    if (!sessionToken) {
      navigate("/login");
      return null;
    }

    // get user data if token exists
    fetch(`${PATH}`, {
      method: "GET",
      cors: "no-cors",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        if (results.data) {
          setUser(results.data);
          console.log(results.data);
        } else {
          toast.error(results.message);
          navigate("/login");
          return;
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sessionToken]);

  if (!sessionToken) {
    return navigate("/login");
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");

    navigate("/");
  };

  return (
    // {loading ? <Spinner />}
    <>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-gray-800">
                      NFC Auth Dashboard
                    </h1>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se deconnecter
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* User Info Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <User
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Utilisateur
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {user.userData.name}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <p className="font-medium text-cyan-700 truncate">
                        {user.userData.email}
                      </p>
                      <p className="text-gray-500">{user.role}</p>
                    </div>
                  </div>
                </div>

                {/* Last Login Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Clock
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Derniere connexion
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {formatDate(
                                user.sessionDocument.session[
                                  user.sessionDocument.session.length - 1
                                ].date
                              )}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Status Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Shield
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Statut de sécurité
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-green-600">
                              sécurisé
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8 ">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Activité récente
                </h2>
                <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md overflow-y-scroll max-h-80">
                  <ul role="list" className="divide-y divide-gray-200">
                    {user.sessionDocument.session
                      .slice()
                      .reverse()
                      .map((activity, index) => (
                        <li key={index}>
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-indigo-600 truncate">
                                Authentification
                              </p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {formatDate(activity.date)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Dashboard;
