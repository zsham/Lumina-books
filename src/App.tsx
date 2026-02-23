import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, Book as BookIcon, BookOpen, Info, Star, X, Bookmark, Library } from "lucide-react";
import { useState, useEffect } from "react";
import { GLOBAL_BOOKS, Book } from "./constants";
import { getAIRecommendations, getBookSummary } from "./services/geminiService";
import { cn } from "./lib/utils";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
        <Library className="text-white w-6 h-6" />
      </div>
      <span className="text-2xl font-bold tracking-tighter italic font-serif">Lumina</span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
      <a href="#" className="hover:text-white transition-colors">Library</a>
      <a href="#" className="hover:text-white transition-colors">Authors</a>
      <a href="#" className="hover:text-white transition-colors">Genres</a>
      <a href="#" className="hover:text-white transition-colors">Reading List</a>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <Search className="w-5 h-5" />
      </button>
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-orange-400 border border-white/20" />
    </div>
  </nav>
);

const BookCard = ({ book, onClick }: { book: Book; onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.05, zIndex: 10 }}
    className="relative flex-shrink-0 w-48 aspect-[2/3] rounded-xl overflow-hidden cursor-pointer group shadow-2xl"
    onClick={onClick}
  >
    <img
      src={book.cover}
      alt={book.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] uppercase tracking-widest font-bold bg-brand-primary px-1.5 py-0.5 rounded">
          {book.country}
        </span>
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-3 h-3 fill-current" />
          <span className="text-xs font-bold">{book.rating}</span>
        </div>
      </div>
      <h3 className="font-bold text-sm leading-tight">{book.title}</h3>
      <p className="text-[10px] text-white/60 line-clamp-1 mt-1">{book.author}</p>
    </div>
  </motion.div>
);

const ContentRow = ({ title, books, onBookClick }: { title: string; books: Book[]; onBookClick: (b: Book) => void }) => (
  <div className="space-y-4 py-6">
    <div className="px-12 flex items-center justify-between">
      <h2 className="text-xl font-serif italic font-bold tracking-tight">{title}</h2>
      <button className="text-xs text-white/40 hover:text-white uppercase tracking-widest font-bold transition-colors">
        View All
      </button>
    </div>
    <div className="flex gap-6 overflow-x-auto px-12 pb-8 no-scrollbar mask-fade-x">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={() => onBookClick(book)} />
      ))}
    </div>
  </div>
);

const Modal = ({ book, onClose, onRead }: { book: Book | null; onClose: () => void; onRead: () => void }) => {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) {
      setLoading(true);
      getBookSummary(book).then(res => {
        setSummary(res);
        setLoading(false);
      });
    } else {
      setSummary("");
    }
  }, [book]);

  if (!book) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="glass w-full max-w-4xl rounded-3xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[2/3] md:aspect-auto h-full max-h-[80vh]">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>
          <div className="p-10 flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                  {book.country} • {book.year}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{book.rating}</span>
                </div>
              </div>
              <h2 className="text-4xl font-serif italic font-bold leading-tight">{book.title}</h2>
              <p className="text-white/80 font-medium text-lg mt-1 italic">{book.author}</p>
              <p className="text-white/60 font-mono text-xs mt-2 uppercase tracking-widest">{book.genre} • {book.pages} Pages</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2 text-brand-primary">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">AI Literary Insight</span>
                </div>
                <p className="text-sm leading-relaxed italic text-white/90">
                  {loading ? "Analyzing prose..." : summary}
                </p>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={onRead}
                className="flex-1 bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Start Reading
              </button>
              <button className="px-6 border border-white/20 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AIRecommender = ({ onBookClick }: { onBookClick: (b: Book) => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    const res = await getAIRecommendations(query);
    setResults(res);
    setIsSearching(false);
  };

  return (
    <div className="px-12 py-12">
      <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[100px] -mr-48 -mt-48 rounded-full" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-3 text-brand-primary">
            <Sparkles className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">AI Librarian</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic font-bold leading-tight">
            What story calls to you?
          </h2>
          <p className="text-white/60 text-lg">
            Describe a mood, a historical period, or a philosophical question, and our AI will find your next great read.
          </p>

          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'A haunting mystery set in a library' or 'A sweeping family saga from Africa'"
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all placeholder:text-white/20"
            />
            <button
              disabled={isSearching}
              className="bg-brand-primary hover:bg-orange-600 disabled:opacity-50 text-white font-bold px-8 rounded-2xl transition-all flex items-center gap-2"
            >
              {isSearching ? "Searching..." : "Discover"}
            </button>
          </form>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 space-y-4"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">Curated for you</p>
                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                  {results.map((book) => (
                    <BookCard key={book.id} book={book} onClick={() => onBookClick(book)} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const heroBook = GLOBAL_BOOKS[0];

  return (
    <div className="min-h-screen relative">
      <div className="atmosphere fixed inset-0" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={heroBook.cover}
          alt={heroBook.title}
          className="w-full h-full object-cover scale-105 blur-sm opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502] via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex items-center px-12 md:px-24">
          <div className="grid md:grid-cols-[auto_1fr] gap-12 items-center max-w-6xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-64 md:w-80 aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,78,0,0.3)] border border-white/10"
            >
              <img src={heroBook.cover} alt={heroBook.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                    Featured Work • {heroBook.country}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">{heroBook.rating}</span>
                  </div>
                </div>
                <h1 className="text-6xl md:text-8xl font-serif italic font-bold leading-[0.9] tracking-tighter">
                  {heroBook.title}
                </h1>
                <p className="text-2xl text-white/80 italic font-serif">by {heroBook.author}</p>
                <p className="text-lg text-white/60 max-w-xl leading-relaxed">
                  {heroBook.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <button 
                  onClick={() => setReadingBook(heroBook)}
                  className="bg-white text-black font-bold px-10 py-4 rounded-2xl flex items-center gap-3 hover:bg-brand-primary hover:text-white transition-all group"
                >
                  <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Read Now
                </button>
                <button
                  onClick={() => setSelectedBook(heroBook)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-10 py-4 rounded-2xl flex items-center gap-3 hover:bg-white/20 transition-all"
                >
                  <Info className="w-6 h-6" />
                  Details
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 -mt-20 space-y-12 pb-24">
        <ContentRow
          title="Modern Classics"
          books={GLOBAL_BOOKS.slice(0, 4)}
          onBookClick={setSelectedBook}
        />
        
        <AIRecommender onBookClick={setSelectedBook} />

        <ContentRow
          title="Philosophical Journeys"
          books={GLOBAL_BOOKS.slice(4)}
          onBookClick={setSelectedBook}
        />
      </div>

      <AnimatePresence>
        {selectedBook && (
          <Modal book={selectedBook} onClose={() => setSelectedBook(null)} onRead={() => {
            setReadingBook(selectedBook);
            setSelectedBook(null);
          }} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {readingBook && (
          <ReadingView book={readingBook} onClose={() => setReadingBook(null)} />
        )}
      </AnimatePresence>

      <footer className="relative z-10 px-12 py-12 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Library className="text-brand-primary w-6 h-6" />
            <span className="text-xl font-bold tracking-tighter italic font-serif">Lumina</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-white transition-colors">Archive</a>
            <a href="#" className="hover:text-white transition-colors">Catalog</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-[10px] text-white/20 uppercase tracking-widest">
            © 2026 Lumina Literary. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const ReadingView = ({ book, onClose }: { book: Book; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed inset-0 z-[200] bg-[#f5f2ed] text-[#1a1a1a] overflow-y-auto"
  >
    <div className="max-w-3xl mx-auto px-8 py-24 space-y-12">
      <button 
        onClick={onClose}
        className="fixed top-8 left-8 p-3 hover:bg-black/5 rounded-full transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
      >
        <X className="w-5 h-5" />
        Close Reader
      </button>

      <header className="text-center space-y-4 border-b border-black/10 pb-12">
        <h1 className="text-5xl font-serif italic font-bold">{book.title}</h1>
        <p className="text-xl font-serif text-black/60">by {book.author}</p>
      </header>

      <article className="prose prose-lg max-w-none font-serif leading-relaxed text-xl space-y-8">
        <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
          {book.description}
        </p>
        <p>
          The air in the library was thick with the scent of old paper and forgotten dreams. As the sun dipped below the horizon, casting long, golden shadows across the mahogany shelves, the silence was broken only by the soft rustle of pages.
        </p>
        <p>
          In this corner of the world, time seemed to slow down. Every book held a universe, and every reader was a traveler. The journey through {book.title} was just beginning, a path paved with words that echoed through the halls of history and the chambers of the heart.
        </p>
        <div className="py-12 flex justify-center">
          <div className="w-24 h-px bg-black/20" />
        </div>
        <p className="text-center italic text-black/40">
          (This is a preview mode. The full text of this global masterpiece is available in your digital collection.)
        </p>
      </article>
    </div>
  </motion.div>
);
