import { useState } from "react";
import { FormularioNumeroParada } from "./component/FormularioNumeroParada";
import { FormularioTiempoParada } from "./component/FormularioTiempoParada";

function App() {
  const autorizacionApi = {
    app_id: "?app_id=20424e8e",
    app_key: "&app_key=18e4b21c8c5499c1c448a48cb949da5d",
  };
  const urlsAPI = {
    //A este url le pasamos despues del / el codigo de parada y la autorizacion de la api
    urlParada: "https://api.tmb.cat/v1/ibus/stops/",
    //A esta url le tenemos que pasar el codigo de linea, despues /stops/, el codigo de parada y luego al autorizacion
    urlLinea: "https://api.tmb.cat/v1/ibus/lines/",
  };
  const respuestaParadaFake = {
    status: "success",
    data: {
      ibus: [
        {
          routeId: "0590",
          line: "59",
          "text-ca": "1 min",
          "t-in-s": 81,
          destination: "Pl. Reina Maria Cristina",
          "t-in-min": 1,
        },
        {
          routeId: "2271",
          line: "V27",
          "text-ca": "4 min",
          "t-in-s": 279,
          destination: "Pg. Marítim",
          "t-in-min": 4,
        },
        {
          routeId: "2161",
          line: "H16",
          "text-ca": "7 min",
          "t-in-s": 479,
          destination: "Pg. Zona Franca",
          "t-in-min": 7,
        },
      ],
    },
  };
  const respuestaLineaFake = {
    status: "success",
    data: {
      ibus: [
        {
          routeId: "2271",
          "text-ca": "3 min",
          "t-in-s": 219,
          destination: "Pg. Marítim",
          "t-in-min": 3,
        },
      ],
    },
  };

  const [listaLineas, setListaLineas] = useState([]);

  const consultaParada = async (codigoParada) => {
    codigoParada = 3;
    const response = await fetch(
      urlsAPI.urlParada +
        codigoParada +
        autorizacionApi.app_id +
        autorizacionApi.app_key
    );
    const datos = await response.json();
    setListaLineas(datos.data.ibus.map((linea) => linea.line));
  };

  return (
    <div className="contenedor">
      <header className="cabecera">
        <h1>Parada nº 15</h1>
        <div className="display">
          <div className="bus">
            <span className="linea">V16</span>
            <span className="destino">Universitat</span>
            <span className="tiempo">10min</span>
          </div>
          <div className="bus">
            <span className="linea">H12</span>
            <span className="destino">Pla de Palau</span>
            <span className="tiempo">1min</span>
          </div>
          <div className="bus">
            <span className="linea">32</span>
            <span className="destino">Barceloneta</span>
            <span className="tiempo">4min</span>
          </div>
        </div>
        <h2>Tiempo para la línea 60: 2 minutos</h2>
      </header>
      <section className="forms">
        <FormularioNumeroParada />
        <FormularioTiempoParada />
      </section>
    </div>
  );
}

export default App;
