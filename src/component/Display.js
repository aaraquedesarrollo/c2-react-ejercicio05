export const Display = (props) => {
  const { listaLineas } = props;

  return (
    <div className="display">
      {listaLineas.map((linea) => (
        <div key={linea.line} className="bus">
          <span className="linea">{linea.line}</span>
          <span className="destino">{linea.destination}</span>
          <span className="tiempo">{linea["text-ca"]}</span>
        </div>
      ))}
    </div>
  );
};
