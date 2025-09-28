'use client';

import { useState, useEffect, useCallback, useActionState } from 'react';
import {
  FileDown,
  Plus,
  Trash2,
  Image as ImageIcon,
  Palette,
  Download,
} from 'lucide-react';
import type { Presentation, Slide, GeneratedPresentation } from '@/lib/definitions';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { suggestImagesAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for initial state if sessionStorage is empty
const mockPresentation: Presentation = {
  id: 'mock-pres',
  title: 'My Awesome Presentation',
  slides: [
    {
      id: 's1',
      title: 'Introduction',
      content: 'This is the first slide. Welcome!',
    },
    {
      id: 's2',
      title: 'Key Points',
      content:
        'Here we discuss the main topics. It is very important to pay attention to this slide.',
    },
    { id: 's3', title: 'Conclusion', content: 'Thank you for your time.' },
  ],
};

function SlidePreviewList({
  slides,
  activeSlideId,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
}: {
  slides: Slide[];
  activeSlideId: string | null;
  onSelectSlide: (id: string) => void;
  onAddSlide: () => void;
  onDeleteSlide: (id: string) => void;
}) {
  return (
    <aside className="flex flex-col bg-card border-r">
      <div className="p-2 border-b">
        <Button onClick={onAddSlide} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Slide
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`relative group border rounded-md aspect-video p-2 cursor-pointer transition-all ${
                activeSlideId === slide.id
                  ? 'border-primary ring-2 ring-primary'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onSelectSlide(slide.id)}
            >
              <div className="flex flex-col items-start justify-start w-full h-full text-xs">
                <span className="text-muted-foreground">{index + 1}</span>
                <h3 className="mt-1 font-semibold truncate">{slide.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {slide.content}
                </p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute w-6 h-6 transition-opacity opacity-0 top-1 right-1 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSlide(slide.id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}

function SlideCanvas({
  slide,
  onUpdate,
}: {
  slide: Slide | null;
  onUpdate: (field: keyof Slide, value: string) => void;
}) {
  if (!slide)
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        Select a slide to edit
      </div>
    );

  return (
    <div className="flex-1 p-4 overflow-auto md:p-8 lg:p-12">
      <div className="mx-auto bg-card shadow-lg aspect-video max-w-7xl">
        <div className="flex flex-col w-full h-full p-8 md:p-16">
          <Input
            value={slide.title}
            onChange={(e) => onUpdate('title', e.target.value)}
            className="text-2xl font-bold border-none shadow-none md:text-4xl lg:text-5xl h-auto p-0 focus-visible:ring-0 font-headline"
            placeholder="Slide Title"
          />
          <Textarea
            value={slide.content}
            onChange={(e) => onUpdate('content', e.target.value)}
            className="flex-1 w-full p-0 mt-4 text-base border-none shadow-none md:text-lg lg:text-xl focus-visible:ring-0 resize-none"
            placeholder="Slide content..."
          />
          {slide.image && (
            <div className="relative w-full mt-4 h-1/3">
              <Image
                src={slide.image.url}
                alt={slide.image.alt}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ImageSearch({
  topic,
  onSelectImage,
}: {
  topic: string;
  onSelectImage: (url: string, alt: string) => void;
}) {
  const { toast } = useToast();
  const [state, formAction] = useActionState(suggestImagesAction, {
    data: null,
    error: null,
  });

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Image Suggestion Failed',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="p-4 space-y-4">
      <form action={formAction}>
        <input type="hidden" name="topic" value={topic} />
        <Button type="submit" className="w-full">
          <ImageIcon className="w-4 h-4 mr-2" />
          Suggest Images with AI
        </Button>
      </form>
      {state.data && (
        <ScrollArea className="h-96">
          <div className="grid grid-cols-2 gap-2">
            {state.data.map((img, index) => (
              <div
                key={index}
                className="relative overflow-hidden border rounded-md cursor-pointer aspect-video group"
                onClick={() => onSelectImage(img.imageUrl, img.imageDescription)}
              >
                <Image
                  src={img.imageUrl}
                  alt={img.imageDescription}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

function ToolsSidebar({
  activeSlide,
  onUpdateImage,
}: {
  activeSlide: Slide | null;
  onUpdateImage: (url: string, alt: string) => void;
}) {
  return (
    <aside className="bg-card border-l w-80">
      <Tabs defaultValue="image" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="style"><Palette className="w-4 h-4 mr-2" /> Style</TabsTrigger>
          <TabsTrigger value="image"><ImageIcon className="w-4 h-4 mr-2" /> Image</TabsTrigger>
        </TabsList>
        <TabsContent value="style">
           <div className="p-4 text-sm text-center text-muted-foreground">
            Theme customization options coming soon.
           </div>
        </TabsContent>
        <TabsContent value="image">
          {activeSlide && (
            <ImageSearch
              topic={activeSlide.title || activeSlide.content}
              onSelectImage={onUpdateImage}
            />
          )}
        </TabsContent>
      </Tabs>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-card">
        <Button variant="accent" className="w-full">
          <Download className="w-4 h-4 mr-2" /> Download
        </Button>
      </div>
    </aside>
  );
}

export default function EditorClient({
  presentationId,
}: {
  presentationId: string;
}) {
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (presentationId === 'new') {
        const data = sessionStorage.getItem('presentationData');
        if (data) {
          const parsedData: GeneratedPresentation = JSON.parse(data);
          const newPresentation: Presentation = {
            id: 'new',
            title: parsedData.title,
            slides: parsedData.sections.map((sec, i) => ({
              id: `slide-${Date.now()}-${i}`,
              title: sec.title,
              content: sec.content,
            })),
          };
          setPresentation(newPresentation);
          setActiveSlideId(newPresentation.slides[0]?.id || null);
        } else {
          setPresentation(mockPresentation);
          setActiveSlideId(mockPresentation.slides[0]?.id || null);
        }
      } else {
        // Here you would fetch the presentation by ID
        setPresentation(mockPresentation);
        setActiveSlideId(mockPresentation.slides[0]?.id || null);
      }
    } catch (error) {
      console.error('Failed to load presentation data:', error);
      setPresentation(mockPresentation);
      setActiveSlideId(mockPresentation.slides[0]?.id || null);
    }
  }, [presentationId]);

  const handleUpdateSlide = useCallback(
    (field: keyof Slide, value: any) => {
      if (!presentation || !activeSlideId) return;

      const updatedSlides = presentation.slides.map((slide) =>
        slide.id === activeSlideId ? { ...slide, [field]: value } : slide
      );
      setPresentation({ ...presentation, slides: updatedSlides });
    },
    [presentation, activeSlideId]
  );
  
  const handleUpdateImage = useCallback(
    (url: string, alt: string) => {
       if (!presentation || !activeSlideId) return;
       const updatedSlides = presentation.slides.map((slide) =>
        slide.id === activeSlideId ? { ...slide, image: { url, alt } } : slide
      );
      setPresentation({ ...presentation, slides: updatedSlides });
    },
    [presentation, activeSlideId]
  );

  const handleAddSlide = () => {
    if (!presentation) return;
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: 'New Slide',
      content: '',
    };
    const updatedSlides = [...presentation.slides, newSlide];
    setPresentation({ ...presentation, slides: updatedSlides });
    setActiveSlideId(newSlide.id);
  };

  const handleDeleteSlide = (id: string) => {
    if (!presentation || presentation.slides.length <= 1) return;
    const slideIndex = presentation.slides.findIndex((s) => s.id === id);
    const updatedSlides = presentation.slides.filter((s) => s.id !== id);
    setPresentation({ ...presentation, slides: updatedSlides });
    if (activeSlideId === id) {
      const newActiveIndex = Math.max(0, slideIndex - 1);
      setActiveSlideId(updatedSlides[newActiveIndex]?.id || null);
    }
  };

  if (!presentation) {
    return (
      <div className="flex items-center justify-center flex-1">
        Loading presentation...
      </div>
    );
  }

  const activeSlide = presentation.slides.find(
    (slide) => slide.id === activeSlideId
  );

  return (
    <main className="flex-1 grid grid-cols-[280px_1fr_320px] overflow-hidden">
      <SlidePreviewList
        slides={presentation.slides}
        activeSlideId={activeSlideId}
        onSelectSlide={setActiveSlideId}
        onAddSlide={handleAddSlide}
        onDeleteSlide={handleDeleteSlide}
      />
      <SlideCanvas slide={activeSlide || null} onUpdate={handleUpdateSlide} />
      <ToolsSidebar activeSlide={activeSlide || null} onUpdateImage={handleUpdateImage} />
    </main>
  );
}
