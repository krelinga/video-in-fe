import { createClient as connectCreateClient } from "@connectrpc/connect";
import { Service } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb'
import { createConnectTransport } from "@connectrpc/connect-web"; // Ensure you have the correct transport

export default function createClient() {
  const transport = createConnectTransport({
    baseUrl: "http://host.docker.internal:25004", // Replace with your server URL
    // Add any additional transport options here
  });

  return connectCreateClient(Service, transport);
}