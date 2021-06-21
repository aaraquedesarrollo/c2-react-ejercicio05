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
      setListaLineas(datos.data.ibus);
      setBuscarLinia(true);
    } else {
      setListaLineas([{}]);
      setBuscarLinia(false);
    }
  };

  const consultarLinea = async (parada, linea) => {
    if (linea !== "") {
      const response = await fetch(
        ` ${urlsAPI.urlLinea + linea}/stops/${
          parada + autorizacionApi.app_id + autorizacionApi.app_key
        }`
      );
      const respuestaLiniaApi = await response.json();
      setRespuestaLinea(respuestaLiniaApi);
      setBuscarLinia(false);
    }
  };

  return (
    <div className="contenedor">
      <header className="cabecera">
        {!!linea && <NumeroParada parada={parada} />}
        {!!respuestaLinea && <Display listaLineas={listaLineas} />}
        {!!respuestaLinea && <TiempoLinia />}
      </header>
      <section className="forms">
        <FormularioLinia
          comprobarParada={comprobarParada}
          parada={parada}
          setParada={setParada}
        />
        {buscarLinia && (
          <FormularioTiempoParada
            linias={listaLineas}
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
