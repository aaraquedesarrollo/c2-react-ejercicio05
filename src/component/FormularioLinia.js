import { useState } from "react";

export const FormularioLinia = (props) => {
  const { comprobarParada, parada, setParada } = props;

  return (
    <form onSubmit={(e) => comprobarParada(e, parada)}>
      <label htmlFor="num-parada">Parada nº: </label>
      <input
        type="number"
        id="num-parada"
        onChange={(e) => setParada(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};
