import { ProjectListResponse } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb'
import Link from 'next/link'

export default function ProjectList({ projects }: { projects: ProjectListResponse }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Project List</h1>
            <ul className="list-disc">
                {projects.projects.map((name, index) => (
                    <li key={index} className="mb-2">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">{name}</span>
                            <Link href={`/projects/${name}`} className="mt-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Categorize
                            </Link>
                            <Link href={`/projects/${name}/claim`} className="mt-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Claim Discs
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            
            <Link href="/new-project" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Project
            </Link>
        </div>
    )
}