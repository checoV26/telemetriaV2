$(document).ready(() => {
  // guardar topico base
  queryData();
});

let queryData = () => {
  // Validamos si ya existe en cache el campo
  var selectOpcionHome = localStorage.getItem("selectOpcionHome");
  var baseTopic = localStorage.getItem("baseTopic");
  if (selectOpcionHome != "" && selectOpcionHome != null) {
    $("#idProyect").val(selectOpcionHome);
    var topic = `${baseTopic}/CONTROLSV`;
    conecctedMqtt(topic);
  }

  /*if (baseTopic == "" || baseTopic == null) {
    localStorage.setItem("baseTopic", "ASBOMBEO/DEMO/DATOS/");
  }*/
};

$("#idProyect").on("change", function () {
  // validar el equipamiento del cliente
  localStorage.setItem("selectOpcionHome", $(this).val());
  localStorage.setItem("baseTopic", "ASBOMBEO/DEMO/DATOS/" + $(this).val());
  var topic = `${localStorage.getItem("baseTopic")}/CONTROLSV`;
  if (topic != "" && topic != null) {
    conecctedMqtt(topic);
  } else {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "¡No se encontraron datos que consultar!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

let conecctedMqtt = (topico) => {
  try {
    // Conexión al servidor MQTT
    connectToMQTT(config.mqttUrl, config.opcionesMqtt)
      .then(() => {
        $("#statusConnected").html(
          '<i class="fa-solid fa-circle text-success"></i> Conectado...'
        );
        // Después de la conexión, suscríbete a un tópico
        return subscribeToTopic(topico);
      })
      .then(() => {
        // Escucha los mensajes del tópico
        listenToMessages((topic, message) => {
          var mensajeJon = JSON.parse(message);
          var arrayData = mensajeJon.data;
          if (Array.isArray(arrayData)) {
            $("#viewCard").html(obtenerValores(arrayData, listImages.contolV));
          }
        });
      })
      .catch((err) => {
        $("#viewCard").html("")
        $("#statusConnected").html(
          '<i class="fa-solid fa-circle text-danger"></i>Desconectado.....'
        );
      });
  } catch (error) {
    console.log(error);
  }
};
