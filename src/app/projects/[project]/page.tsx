import { use } from 'react';
import FileCategorize from '@/app/ui/fileCategorize'

export default function ProjectPage({ params }: { params: Promise<{ project: string }> }) {
    const { project } = use(params);
    return (
        <FileCategorize project={project} imgUrlPrefix={process.env.NEXT_PUBLIC_IMG_URL_PREFIX!}/>
    )
};