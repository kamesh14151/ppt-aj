import Link from 'next/link';
import AppHeader from '@/components/layout/app-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus2, MoreVertical } from 'lucide-react';
import Image from 'next/image';

const mockPresentations = [
  {
    id: '1',
    title: 'Q3 Marketing Strategy',
    updatedAt: '2 days ago',
    thumbnailUrl: 'https://picsum.photos/seed/pres1/400/225',
    thumbnailHint: 'marketing chart',
  },
  {
    id: '2',
    title: 'Project Phoenix Kickoff',
    updatedAt: '5 days ago',
    thumbnailUrl: 'https://picsum.photos/seed/pres2/400/225',
    thumbnailHint: 'rocket launch',
  },
  {
    id: '3',
    title: 'Annual Company Review',
    updatedAt: '1 week ago',
    thumbnailUrl: 'https://picsum.photos/seed/pres3/400/225',
    thumbnailHint: 'business team',
  },
  {
    id: '4',
    title: 'New Feature Launch Plan',
    updatedAt: '2 weeks ago',
    thumbnailUrl: 'https://picsum.photos/seed/pres4/400/225',
    thumbnailHint: 'product interface',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1">
        <div className="container max-w-7xl py-8">
          <h1 className="text-3xl font-bold mb-8 font-headline">
            My Presentations
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Link href="/new">
              <Card className="flex flex-col items-center justify-center h-full text-center transition-all border-2 border-dashed hover:border-primary hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-secondary">
                    <FilePlus2 className="w-8 h-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="font-headline">
                    New Presentation
                  </CardTitle>
                  <CardDescription>
                    Create a new presentation from scratch or with AI.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            {mockPresentations.map((p) => (
              <Card key={p.id} className="overflow-hidden group">
                <Link href={`/editor/${p.id}`} className="block">
                  <div className="relative aspect-video">
                    <Image
                      src={p.thumbnailUrl}
                      alt={p.title}
                      data-ai-hint={p.thumbnailHint}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <CardHeader className="flex-row items-start justify-between p-4">
                  <div className="space-y-1">
                    <Link href={`/editor/${p.id}`}>
                      <CardTitle className="text-base transition-colors hover:text-primary font-headline">
                        {p.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="text-xs">
                      Updated {p.updatedAt}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
