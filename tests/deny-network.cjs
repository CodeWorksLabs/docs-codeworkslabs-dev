const blocked = () => {
  throw new Error("Network access is denied by the Brand Navigation offline-build test.");
};

globalThis.fetch = async () => blocked();

for (const moduleName of ["node:http", "node:https"]) {
  const module = require(moduleName);
  module.request = blocked;
  module.get = blocked;
}

const net = require("node:net");
net.connect = blocked;
net.createConnection = blocked;
net.Socket.prototype.connect = blocked;

const tls = require("node:tls");
tls.connect = blocked;
