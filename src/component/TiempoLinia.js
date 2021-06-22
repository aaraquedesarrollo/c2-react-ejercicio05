export const TiempoLinia = (props) => {

  const {linia,respuestaLinea}=props;
  return (
<h2>Tiempo para la línea {linia}: {respuestaLinea.data.ibus[0]["text-ca"]}</h2>

  );
};
