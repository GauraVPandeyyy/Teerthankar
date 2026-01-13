import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Gem } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
      <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-lg mb-8 rotate-12">
        <Gem className="w-10 h-10 text-amber-500" />
      </div>
      
      <h1 className="font-serif text-6xl font-bold text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-serif text-slate-800 mb-4">A Rare Find?</h2>
      <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
        The page you are looking for seems to be as elusive as a flawless diamond. Let's get you back to our collection.
      </p>

      <Link to="/">
        <Button size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8 h-12">
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;