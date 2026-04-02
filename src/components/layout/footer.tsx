import Link from 'next/link';
import { Film, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Browse</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/movies" className="hover:text-gold">Movies</Link></li>
              <li><Link href="/tv" className="hover:text-gold">TV Shows</Link></li>
              <li><Link href="/watchlist" className="hover:text-gold">Watchlist</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Genres</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/search?q=Action" className="hover:text-gold">Action</Link></li>
              <li><Link href="/search?q=Comedy" className="hover:text-gold">Comedy</Link></li>
              <li><Link href="/search?q=Drama" className="hover:text-gold">Drama</Link></li>
              <li><Link href="/search?q=Horror" className="hover:text-gold">Horror</Link></li>
              <li><Link href="/search?q=Sci-Fi" className="hover:text-gold">Sci-Fi</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-gold">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-gold" />
            <span className="font-semibold">Movie<span className="text-gold">Adda</span></span>
            <span className="text-sm text-muted-foreground ml-2">© 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-gold" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Data provided by OMDB API
          </p>
        </div>
      </div>
    </footer>
  );
}
