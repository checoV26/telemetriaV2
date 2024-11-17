const listImages = {
  contolV: "../assets/images/soplador.JPG",
  automaticControl: "../assets/images/contolA.JPG",
};

let spinner = () => {
  $.blockUI({
    message: '<div class="spinner"></div>',
    css: {
      border: "none",
      backgroundColor: "transparent",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)" /* Centrado */,
      textAlign: "center",
      width: "100%" /* Asegura que ocupe todo el ancho */,
      zIndex: 1060,
    },
    overlayCSS: {
      backgroundColor: "#000",
      opacity: 0.6,
      cursor: "wait",
      zIndex: 1060,
    },
  });
};

let newCardHtml = (contentCard, dataC, img) => {
  const card = `
        <div class="col-12 col-sm-6 col-md-6 mb-3">
              <div class="card ">
                  <div class="card-body">
                      <div class="row justify-content-start">
        
                          <div class="col-12 col-md-12">
                              <div class="col-md-12">
                                  <img src="${img}" class="custom-img soplador-img"
                                      alt="imagen">
                              </div>
                              <div class="col-md-6  row justify-content-start d-flex mt-3">
                                  <div class="col-md-4">
                                      <button type="button" class="btn btn-secondary btn-sm">Auto</button>
                                  </div>
                                  <div class="col-md-4">
                                      <button type="button" class="btn btn-danger btn-sm">Fuera</button>
                                  </div>
                                  <div class="col-md-4">
                                      <button type="button" class="btn btn-secondary btn-sm">Auto</button>
                                  </div>
                              </div>
                          </div>
                          <div class="col-12 col-md-12 mt-3">
                              <div class="col-12 col-md-12 row justify-content-center d-flex">
                                  ${contentCard}
                              </div>
                               <div class="col-12 col-md-12 row justify-content-center d-flex">
                                  ${dataC}
                               </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
  `;

  return card;
};

let contentCard = (name, value, simbolo) => {
  return `
        <div class="col-md-6">
            <p class="h5 font-weight-bold">${name}</p>
        </div>
        <div class="col-md-6">
            <p class="digital-font h5">${value} ${simbolo}</p>
        </div>
  `;
};

let titleD = (title) => {
  return `
        <div class="col-md-12">
            <p class=" h5"><b>${title}</b></p>
        </div>
  `;
};
let obtenerValores = (data, img) => {
  var newCard = "";
  var dataC = "";
  try {
    data.forEach((bomba, index) => {
      var contentC = "";
      try {
        Object.entries(bomba).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((element) => {
              dataC += contentCard(
                element.name,
                element.value,
                element.simbolo
              );
            });
          }
        });
      } catch (error) {
        dataC += contentCard("", "", "");
      }
      newCard += newCardHtml(contentC, dataC, img);
      dataC = "";
    });
  } catch (error) {
    newCard = "";
  }
  return newCard;
};

let mostrarColunas = (data) => {
  var columnas = "";
  data.forEach((element) => {
    columnas += `<th class="text-center">${element}</th>`; // 9
  });
  return `<tr class="text-center">${columnas}</tr>`;
};

let tableA = (data) => {
  var filas = "";
  data.forEach((item) => {
    filas += `<tr>`;
    filas += `<td>${item.name}</td>`;
    filas += `<td>${item.value}</td>`;
    filas += `<td>${item.simbolo}</td>`;
    filas += `</tr>`;
  });
  return filas;
};
function generarNumeroRandom(min, max) {
  const numeroAleatorio = Math.random() * (max - min) + min;
  return parseFloat(numeroAleatorio.toFixed(2)); // Aplicamos toFixed al número generado
}

// panel de  control

let controlData = (data, img) => {
  var newCard = "";
  var dataC = "";
  var countD = 0;
  try {
    data.forEach((bomba, index) => {
      var contentC = "";
      try {
        Object.entries(bomba).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // validamos si es un valor para un para un barometro
            value.forEach((element) => {
              dataC += contentCard(
                element.name,
                element.value,
                element.simbolo
              );
            });
          }
        });
      } catch (error) {
        dataC += contentCard("", "", "");
      }
      newCard += newCardControl(dataC, img);
      dataC = "";
    });
  } catch (error) {
    newCard = "";
  }
  return newCard;
};

let newCardControl = (dataC, img) => {
  const card = `
        <div class="col-12 col-sm-6 col-md-6 mb-3">
              <div class="card ">
                  <div class="card-body">
                      <div class="row justify-content-start">
        
                          <div class="col-12 col-md-12">
                              <div class="col-md-12">
                                  <img src="${img}" class="custom-img soplador-img"
                                      alt="imagen">
                              </div>
                          </div>
                          <div class="col-12 col-md-12 mt-3">
                               <div class="col-12 col-md-12 row justify-content-center d-flex">
                                  ${dataC}
                               </div>
                               <div class="col-12 col-md-12 row justify-content-center d-flex">
                                     <div id="gauge"></div>
                               </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
  `;
  return card;
};

let dataTable = (data) => {
  var contentTable = "";
  try {
    data.forEach((element) => {
      contentTable += `
       <tr>
          <td>${element.id}</td>
          <td>${element.description}</td>
          <td>${element.date}</td>
      </tr>
      `;
    });
  } catch (error) {}
  return contentTable;
};
let deleteData = () => {
  localStorage.clear();
  window.location = "../index.html";
};
