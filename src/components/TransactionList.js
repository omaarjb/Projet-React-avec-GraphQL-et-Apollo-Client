import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";

const TransactionList = () => {
  const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading)
    return <p className="text-gray-500">Chargement...</p>;
  if (error)
    return <p className="text-red-600">Erreur : {error.message}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Liste des Transactions
      </h2>

      <div className="grid gap-4">
        {data.allTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white border border-gray-200 shadow-sm rounded-lg p-5 hover:shadow-lg transition"
          >
            <div className="mb-3">
              <p className="text-sm text-gray-500">
                ID : {transaction.id}
              </p>

              <p className="text-lg font-semibold text-gray-800">
                {transaction.type === "DEPOT" ? (
                  <span className="text-green-600">Dépôt</span>
                ) : (
                  <span className="text-red-600">Retrait</span>
                )}
              </p>

              <p className="text-gray-700">
                Montant :
                <span className="ml-1 font-medium">
                  {transaction.montant} €
                </span>
              </p>

              <p className="text-gray-700">
                Date :
                <span className="ml-1 font-medium">
                  {new Date(transaction.date).toLocaleDateString("fr-FR")}
                </span>
              </p>
            </div>

            <div className="border-t pt-3">
              <h4 className="text-md font-semibold text-gray-800 mb-1">
                Compte associé
              </h4>
              <p className="text-gray-600">ID : {transaction.compte.id}</p>
              <p className="text-gray-600">
                Solde : {transaction.compte.solde} DH
              </p>
              <p className="text-gray-600">
                Type :
                <span className="ml-1 font-semibold text-blue-600">
                  {transaction.compte.type}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
