import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bot, Palette, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import LandingHeader from '@/components/layout/landing-header';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');
  const featureAiImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-ai'
  );
  const featureThemesImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-themes'
  );
  const featureCollabImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-collab'
  );

  const features = [
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: 'AI Presentation Generation',
      description:
        'Generate complete presentation drafts from a simple text prompt. Our AI suggests a structured slide flow to get you started.',
      image: featureAiImage,
    },
    {
      icon: <Palette className="w-8 h-8 text-primary" />,
      title: 'Customizable Themes',
      description:
        'Choose from a range of pre-designed themes or customize your own with your brand colors and fonts for a consistent look.',
      image: featureThemesImage,
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Real-time Collaboration',
      description:
        'Work together with your team on the same presentation in real-time, no matter where you are. (Coming soon)',
      image: featureCollabImage,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow">
        <section className="relative w-full pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start justify-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                  Craft Presentations in Minutes, Not Hours
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
                  Welcome to AJS Slides. Leverage the power of AI to transform
                  your ideas into stunning, professional presentations
                  effortlessly.
                </p>
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2">
                    Get Started Free <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    width={1200}
                    height={800}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    className="object-cover w-full h-full rounded-xl shadow-2xl"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-24 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm rounded-lg bg-secondary text-secondary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Everything You Need to Create
                </h2>
                <p className="max-w-3xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From AI-powered content generation to seamless collaboration,
                  we have you covered.
                </p>
              </div>
            </div>
            <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto mt-12 md:grid-cols-2 lg:grid-cols-3 md:gap-12">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-start p-6 space-y-4 transition-all bg-background rounded-xl hover:shadow-lg"
                >
                  <div className="p-3 border rounded-full bg-card">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-headline">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Ready to Revolutionize Your Workflow?
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground md:text-xl/relaxed">
                Sign up today and experience the future of presentation design.
                No credit card required.
              </p>
            </div>
            <div className="mx-auto mt-4">
              <Link href="/signup">
                <Button size="lg" variant="default" className="gap-2">
                  Sign Up Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center w-full h-20 border-t shrink-0">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AJS Slides. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
