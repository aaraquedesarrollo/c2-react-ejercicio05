import { useCallback, useEffect, useState } from "react";

import { FormularioLinia } from "./component/FormularioLinia";

import { FormularioTiempoParada } from "./component/FormularioTiempoParada";
import { Display } from "./component/Display";
import { NumeroParada } from "./component/NumeroParada";
import { TiempoLinia } from "./component/TiempoLinia";
function App() {
  const autorizacionApi = {
    app_id: "?app_id=20424e8e",
    app_key: "&app_key=18e4b21c8c5499c1c448a48cb949da5d",
  };

  const urlsAPI = {
    urlTransit: "https://api.tmb.cat/v1/transit/parades/",
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
  const [parada, setParada] = useState("");
  const [listaLineas, setListaLineas] = useState([]);
  const [buscarLinia, setBuscarLinia] = useState(false);
  const [existeParada, setExisteParada] = useState(true);
  const [linea, setLinea] = useState("");
  const [respuestaLinea, setRespuestaLinea] = useState([]);

  const comprobarParada = async (e, codigoParada) => {
    e.preventDefault();
    const response = await fetch(
      urlsAPI.urlTransit +
        codigoParada +
        autorizacionApi.app_id +
        autorizacionApi.app_key
    );
    const datos = await response.json();
    if (datos.totalFeatures !== 0) {
      setExisteParada(true);
      consultarParada(codigoParada);
    } else {
      setExisteParada(false);
      setBuscarLinia(false);
    }
  };

  const consultarParada = async (codigoParada) => {
    const response = await fetch(
      urlsAPI.urlParada +
        codigoParada +
        autorizacionApi.app_id +
        autorizacionApi.app_key
    );
    const datos = await response.json();
    if (datos.data.ibus[0] !== {}) {
      setListaLineas(datos);
      setLinea(datos.data.ibus[0].line);
      setBuscarLinia(true);
    } else {
      setBuscarLinia(false);
    }
  };

  const consultarLinea = useCallback(
    async (parada, linea) => {
      if (linea !== "") {
        const response = await fetch(
          ` ${urlsAPI.urlLinea + linea}/stops/${
            parada + autorizacionApi.app_id + autorizacionApi.app_key
          }`
        );
        const respuestaLiniaApi = await response.json();
        setRespuestaLinea(respuestaLiniaApi);
      }
    },
    [autorizacionApi.app_id, autorizacionApi.app_key, urlsAPI.urlLinea]
  );
  /* useEffect(
    () => consultarLinea(parada, linea),
    [consultarLinea, linea, parada]
  ); */
  return (
    <div className="contenedor">
      <header className="cabecera">
        <NumeroParada />
        <Display />
        <TiempoLinia />
      </header>
      <section className="forms">
        <FormularioLinia
          comprobarParada={comprobarParada}
          parada={parada}
          setParada={setParada}
        />
        {buscarLinia && (
          <FormularioTiempoParada
            listaLineas={listaLineas}
            parada={parada}
            setLinea={setLinea}
            consultarLinea={consultarLinea}
          />
        )}
      </section>
    </div>
  );
}

export default App;
