export const FormularioTiempoParada = (props) => {
  const {
    respuestaParadaFake: {
      data: { ibus: linias },
    },
    respuestaLineaFake: {
      data: { ibus: paradas },
    },
  } = props;
  return (
    <form>
      <label htmlFor="tiempo-linea">
        Tiempo para que llegue la línea: {paradas["text-ca"]}{" "}
      </label>
      <select id="tiempo-linea">
        {linias.map((linias) => (
          <option value="">{linias.line}</option>
        ))}
      </select>
    </form>
  );
};
