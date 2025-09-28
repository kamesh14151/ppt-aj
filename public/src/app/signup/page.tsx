import Link from 'next/link';
import { AuthForms } from '@/components/auth-forms';
import { Logo } from '@/components/icons/logo';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <Logo className="w-8 h-8" />
            <span className="text-2xl font-semibold font-headline">
              AJS Slides
            </span>
          </Link>
        </div>
        <AuthForms defaultTab="signup" />
      </div>
    </div>
  );
}
