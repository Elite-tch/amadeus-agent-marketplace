import { getAllDocs } from '@/lib/docs';
import { redirect } from 'next/navigation';

export default function DocsIndex() {
    const docs = getAllDocs();

    if (docs.length > 0) {
        redirect(`/docs/${docs[0].slug}`);
    }

    return (
        <div className="p-12 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">No Documentation Found</h1>
            <p className="text-slate-400">Please add markdown files to the /docs directory.</p>
        </div>
    );
}
