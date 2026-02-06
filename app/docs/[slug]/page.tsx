import { getDocData } from '@/lib/docs';
import { Folder, ChevronRight, FileText } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const doc = await getDocData(slug);

    return (
      <>
        {/* Doc Header */}
        <div className="border-b border-[#333] bg-[#111] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Folder size={14} />
            <span>docs</span>
            <ChevronRight size={14} />
            <FileText size={14} className="text-[#00ff9d]" />
            <span className="text-white">{doc.title}.md</span>
          </div>
          <div className="text-[10px] text-[#00ff9d] uppercase tracking-widest border border-[#00ff9d]/30 px-2 py-1 bg-[#00ff9d]/10 rounded">
            Read Only
          </div>
        </div>

        {/* Doc Body */}
        <div className="p-8 md:p-12 doc-content max-w-none">
          {/* Title rendered from markdown or we can add it here if needed */}
          {/* <h1 className="text-4xl font-bold text-white mb-6 uppercase tracking-tight flex items-center gap-3">
             <span className="text-[#00ff9d]">#</span> {doc.title}
          </h1> */}

          <div dangerouslySetInnerHTML={{ __html: doc.contentHtml || '' }} />
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
}
