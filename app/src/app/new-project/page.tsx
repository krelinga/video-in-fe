import Form from 'next/form'
import createClient from "@/app/lib/client";
import { redirect } from 'next/navigation'


export default async function NewProject() {
  const submit = async (formData: FormData) => {
    "use server";
    const client = createClient()
    const name = formData.get('name') as string
    await client.projectNew({
      name: name,
    })
    // Redirect to the project list page after submission
    redirect('/')
  }
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">New Project</h1>
        <Form action={submit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
          </div>
        </Form>
      </div>
    </main>
  )
}