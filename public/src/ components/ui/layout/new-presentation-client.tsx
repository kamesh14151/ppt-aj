'use client';

import { useEffect, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { generatePresentationAction } from '@/lib/actions';
import type { GeneratedPresentation } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bot, Loader2 } from 'lucide-react';

const initialState = {
  error: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full"
      size="lg"
      variant="accent"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Bot className="w-5 h-5 mr-2" />
          Generate with AI
        </>
      )}
    </Button>
  );
}

export default function NewPresentationClient() {
  const [state, formAction] = useActionState(generatePresentationAction, initialState);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (state.data) {
      toast({
        title: 'Success!',
        description: 'Your presentation has been generated.',
      });
      const presentationData = state.data as GeneratedPresentation;
      sessionStorage.setItem('presentationData', JSON.stringify(presentationData));
      router.push('/editor/new');
    }
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: typeof state.error === 'string' ? state.error : 'Please check your input and try again.',
      });
    }
  }, [state, router, toast]);

  return (
    <Card className="w-full">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            Create a New Presentation
          </CardTitle>
          <CardDescription>
            Describe your topic, and let our AI craft the first draft for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-2">
            <Label htmlFor="topic" className="text-base font-medium">
              Presentation Topic
            </Label>
            <Textarea
              id="topic"
              name="topic"
              placeholder="e.g., 'The future of renewable energy' or 'A marketing plan for a new coffee shop'"
              className="min-h-[120px] text-base"
              required
            />
            {state?.error?.topic && (
              <p className="text-sm text-destructive">{state.error.topic[0]}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
