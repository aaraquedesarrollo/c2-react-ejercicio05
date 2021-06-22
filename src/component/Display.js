import { useEffect, useState } from "react";

export const Display = (props) => {
  const { listaLineas } = props;
  const [posicion, setPosicion] = useState("0px");
  const maxPosition = listaLineas.length -1;
  const [contador, setContador] = useState(0);
  useEffect(
    () =>
      listaLineas.map(() => {
       if (contador === maxPosition) {
          setContador(0);
          setPosicion("0px");
        } else {
          setPosicion(`${posicion - 30}px`);
          setContador(contador + 1);
        }
      }),
    [contador, listaLineas, maxPosition, posicion]
  );

  return (
    <div className="display">
      <div className="carousel" style={{ top: posicion }}>
        {listaLineas.map((linea) => (
          <div key={linea.line} className="bus">
            <span className="linea">{linea.line}</span>
            <span className="destino">{linea.destination}</span>
            <span className="tiempo">{linea["text-ca"]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
