import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TRANSACTION } from "../graphql/mutations";

const TransactionForm = () => {
  const [type, setType] = useState("DEPOT");
  const [montant, setMontant] = useState("");
  const [compteId, setCompteId] = useState("");

  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction({
        variables: {
          transactionRequest: {
            type,
            montant: parseFloat(montant),
            compteId,
          },
        },
      });

      setType("DEPOT");
      setMontant("");
      setCompteId("");
    } catch (error) {
      console.error("Erreur lors de l’ajout de la transaction :", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Ajouter une Transaction
      </h2>

      {/* TYPE */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Type :</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
        >
          <option value="DEPOT">Dépôt</option>
          <option value="RETRAIT">Retrait</option>
        </select>
      </div>

      {/* MONTANT */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Montant :</label>
        <input
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
        />
      </div>

      {/* COMPTE ID */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">ID du Compte :</label>
        <input
          type="text"
          value={compteId}
          onChange={(e) => setCompteId(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition"
      >
        Ajouter
      </button>
    </form>
  );
};

export default TransactionForm;
