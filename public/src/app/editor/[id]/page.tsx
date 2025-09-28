import AppHeader from '@/components/layout/app-header';
import EditorClient from '@/components/editor-client';

export default function EditorPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col h-screen bg-muted/40">
      <AppHeader />
      <EditorClient presentationId={params.id} />
    </div>
  );
}
