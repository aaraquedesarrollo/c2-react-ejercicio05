export const FormularioTiempoParada = (props) => {
  const {
    listaLineas: {
      data: { ibus: linias },
    },
    parada,
    setLinea,
    consultarLinea,
  } = props;
  const submitLinea = (e) => {
    setLinea(e.target.value);
    consultarLinea(parada, e.target.value);
  };
  return (
    <form>
      <label htmlFor="tiempo-linea">
        Tiempo para que llegue la línea: {parada}
      </label>
      <select id="tiempo-linea" onChange={submitLinea}>
        <option hidden>Linea</option>
        {linias.map((linias) => (
          <option value={linias.line} key={linias.line}>
            {linias.line}
          </option>
        ))}
      </select>
    </form>
  );
};
