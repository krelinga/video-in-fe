import { createClient } from "@connectrpc/connect";
import { Service } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb'
import { createConnectTransport } from "@connectrpc/connect-web"; // Ensure you have the correct transport
import ProjectList from "@/app/ui/projectList";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const transport = createConnectTransport({
        baseUrl: "http://kind_lovelace:25004", // Replace with your server URL
        // Add any additional transport options here
      });
  const client = createClient(Service, transport);

  const reply = await client.projectList({});
  return (
    <main>
      <ProjectList projects={reply} />
    </main>
  )
}
