import { createClient as connectCreateClient } from "@connectrpc/connect";
import { Service } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb'
import { createConnectTransport } from "@connectrpc/connect-web"; // Ensure you have the correct transport

// Interceptor to log all RPC requests, replies, and error codes
import type { Interceptor } from "@connectrpc/connect";

const loggingInterceptor: Interceptor = (next) => async (req) => {
  // req.service.typeName and req.method.name are always available
  console.log(`[Connect RPC] Request: ${req.service.typeName}.${req.method.name}`, req);
  try {
    const res = await next(req);
    console.log(`[Connect RPC] Response: ${req.service.typeName}.${req.method.name}`, res);
    return res;
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
      console.error(`[Connect RPC] Error: ${req.service.typeName}.${req.method.name}`, (err as { message: string }).message);
    } else {
      console.error(`[Connect RPC] Error: ${req.service.typeName}.${req.method.name}`, err);
    }
    throw err;
  }
};

export default function createClient() {
  const transport = createConnectTransport({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL!,
    interceptors: [loggingInterceptor],
    // Add any additional transport options here
  });

  return connectCreateClient(Service, transport);
}