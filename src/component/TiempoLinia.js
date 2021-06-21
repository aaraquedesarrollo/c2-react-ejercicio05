export const TiempoLinia = (props) => {
  const { linea, respuestaLinea } = props;
  return (
    <h2>
      Tiempo para la línea {linea}: {respuestaLinea.data.ibus[0]["text-ca"]}
    </h2>
  );
};
