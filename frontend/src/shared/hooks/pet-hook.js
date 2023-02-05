import { useState, useEffect } from "react";

import { useHttpClient } from "../hooks/http-hook";

export const usePetData = (props) => {
  const [pets, setPets] = useState();

  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  console.log(process.env);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "https://amused-cyan-shrimp.cyclic.app/api/pet/allPets"
        );
        setPets(responseData.pets);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return { pets, isLoading, error, clearError };
};
