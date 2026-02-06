import { getAllDocs } from '@/lib/docs';
import Link from 'next/link';
import { Book, FileText } from 'lucide-react';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAllDocs();

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-[#00ff9d] selection:text-black font-mono">
      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="pt-32 pb-20 container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-[#0a0a0a] border border-[#333] sticky top-24">
              <div className="p-3 bg-[#111] border-b border-[#333] flex items-center gap-2">
                <Book size={16} className="text-[#00ff9d]" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Documentation</span>
              </div>
              <nav className="p-2 space-y-1">
                {docs.map((doc) => (
                  <SidebarItem key={doc.slug} doc={doc} />
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 max-w-4xl">
            <div className="border border-[#333] bg-[#0a0a0a] min-h-[800px] relative">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SidebarItem({ doc }: { doc: { slug: string, title: string } }) {
  return (
    <Link href={`/docs/${doc.slug}`} className="flex items-center gap-2 px-3 py-2 text-xs font-mono transition-colors group text-slate-500 hover:text-white hover:bg-[#111]">
      <FileText size={14} className="text-slate-600 group-hover:text-slate-400" />
      <span>{doc.title}</span>
    </Link>
  )
}
