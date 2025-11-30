import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";

const CompteList = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  if (loading) return <p className="text-gray-500">Chargement...</p>;
  if (error)
    return (
      <p className="text-red-600">
        Erreur : {error.message}
      </p>
    );

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Liste des Comptes
      </h2>

      <div className="grid gap-4">
        {data.allComptes.map((compte) => (
          <div
            key={compte.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500">ID : {compte.id}</p>

            <p className="text-lg font-medium text-gray-800">
              Solde : {compte.solde} DH
            </p>

            <p className="text-gray-600">
              Date de création :
              <span className="font-medium ml-1">
                {new Date(compte.dateCreation).toLocaleDateString("fr-FR")}
              </span>
            </p>

            <p className="text-gray-600">
              Type :
              <span className="ml-1 font-semibold text-blue-600">
                {compte.type}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompteList;
