import AppHeader from '@/components/layout/app-header';
import NewPresentationClient from '@/components/new-presentation-client';

export default function NewPresentationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex items-center justify-center flex-1 py-12">
        <div className="w-full max-w-2xl px-4">
          <NewPresentationClient />
        </div>
      </main>
    </div>
  );
}
