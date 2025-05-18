import ProjectList from "@/app/ui/projectList";
import createClient from "@/app/lib/client";
export const dynamic = 'force-dynamic'

export default async function Home() {
  const client = createClient()

  const reply = await client.projectList({});
  return (
    <main>
      <ProjectList projects={reply} />
    </main>
  )
}
