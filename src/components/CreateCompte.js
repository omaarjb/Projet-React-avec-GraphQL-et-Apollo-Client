import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations';

const CreateCompte = () => {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState('COURANT');

  const [saveCompte] = useMutation(SAVE_COMPTE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveCompte({
        variables: {
          compte: {
            solde: parseFloat(solde),
            type,
          },
        },
      });
      setSolde('');
      setType('COURANT');
    } catch (error) {
      console.error('Erreur lors de la création du compte :', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Créer un compte</h2>

      {/* Solde */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Solde :</label>
        <input
          type="number"
          value={solde}
          onChange={(e) => setSolde(e.target.value)}
          required
          placeholder="Entrez le solde initial"
          className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Type :</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
        >
          <option value="COURANT">Courant</option>
          <option value="EPARGNE">Épargne</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
      >
        Créer un compte
      </button>
    </form>
  );
};

export default CreateCompte;
