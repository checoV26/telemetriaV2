// mqtt-client.js

let mqttClient = null;

// Función para conectar al servidor MQTT
function connectToMQTT(brokerUrl, options = {}) {
  return new Promise((resolve, reject) => {
    mqttClient = mqtt.connect(brokerUrl, {
      ...options,
      reconnectPeriod: 3000, // Reintento de reconexión cada 3 segundos
    });

    mqttClient.on("connect", () => {
      resolve(mqttClient);
    });

    mqttClient.on("error", (err) => {
      console.error("Error en la conexión MQTT: ", err);
      reject(err);
    });

    // Manejando el evento de desconexión
    mqttClient.on("offline", () => {
      console.warn("El cliente MQTT está desconectado.");
      $("#statusConnected").html(
        '<i class="fa-solid fa-circle text-danger"></i> Desconectado...'
      );
    });

    // Manejando el evento de reconexión
    mqttClient.on("reconnect", () => {
      $("#statusConnected").html(
        '<i class="fa-solid fa-circle text-warning"></i> Reconcectando...'
      );
    });

    // Manejando el evento de cierre
    mqttClient.on("close", () => {
      console.warn("La conexión con el servidor MQTT se ha cerrado.");
    });
  });
}

// Función para suscribirse a un tópico
function subscribeToTopic(topic) {
  return new Promise((resolve, reject) => {
    if (mqttClient) {
      mqttClient.subscribe(topic, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      reject("Cliente MQTT no conectado.");
    }
  });
}

// Función para escuchar los mensajes de un tópico
function listenToMessages(callback) {
  if (mqttClient) {
    mqttClient.on("message", (topic, message) => {
      if (callback) {
        callback(topic, message.toString());
      }
    });
  } else {
    console.error("Cliente MQTT no conectado.");
  }
}

// Función para publicar un mensaje en un tópico
function publishMessage(topic, message) {
  return new Promise((resolve, reject) => {
    if (mqttClient) {
      mqttClient.publish(topic, message, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      reject("Cliente MQTT no conectado.");
    }
  });
}
