const clientId = `brokerAsb:${Math.floor(Math.random() * (10000 - 1 + 1) + 1)}`;

const config = {
  clientId: clientId,
  mqttUrl: `ws://localhost:8083/mqtt`,
  opcionesMqtt: {
    clientId: clientId,
    clean: true,
  }
};
