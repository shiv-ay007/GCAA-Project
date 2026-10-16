import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <h1 className="text-8xl font-black text-neutral-800 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold text-white mt-4">Page Not Found</h2>
      <p className="text-neutral-400 mt-2 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="mt-8">
        <Button size="md">
          <Home className="w-4 h-4 mr-1.5" /> Back to Home
        </Button>
      </Link>
    </div>
  );
};
