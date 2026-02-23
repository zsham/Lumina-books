export interface Book {
  id: string;
  title: string;
  author: string;
  country: string;
  genre: string;
  description: string;
  cover: string;
  rating: number;
  year: number;
  pages: number;
}

export const GLOBAL_BOOKS: Book[] = [
  {
    id: "1",
    title: "The Shadow of the Wind",
    author: "Carlos Ruiz Zafón",
    country: "Spain",
    genre: "Gothic Mystery",
    description: "A young boy is taken to the Cemetery of Forgotten Books and chooses a book that will change his life forever.",
    cover: "https://picsum.photos/seed/book1/800/1200",
    rating: 4.9,
    year: 2001,
    pages: 487
  },
  {
    id: "2",
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
    country: "Japan",
    genre: "Magical Realism",
    description: "Two remarkable characters' fates are intertwined: a teenage runaway and an elderly man who can talk to cats.",
    cover: "https://picsum.photos/seed/book2/800/1200",
    rating: 4.7,
    year: 2002,
    pages: 505
  },
  {
    id: "3",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    country: "Colombia",
    genre: "Epic Saga",
    description: "The multi-generational story of the Buendía family, whose patriarch founded the town of Macondo.",
    cover: "https://picsum.photos/seed/book3/800/1200",
    rating: 4.8,
    year: 1967,
    pages: 417
  },
  {
    id: "4",
    title: "The Alchemist",
    author: "Paulo Coelho",
    country: "Brazil",
    genre: "Philosophical Fiction",
    description: "A shepherd boy travels from Andalusia to the Egyptian pyramids in search of a treasure buried near them.",
    cover: "https://picsum.photos/seed/book4/800/1200",
    rating: 4.6,
    year: 1988,
    pages: 208
  },
  {
    id: "5",
    title: "Americanah",
    author: "Chimamanda Ngozi Adichie",
    country: "Nigeria",
    genre: "Contemporary Fiction",
    description: "A young Nigerian woman emigrates to the United States for a university education and faces the complexities of race and identity.",
    cover: "https://picsum.photos/seed/book5/800/1200",
    rating: 4.5,
    year: 2013,
    pages: 477
  },
  {
    id: "6",
    title: "The Name of the Rose",
    author: "Umberto Eco",
    country: "Italy",
    genre: "Historical Mystery",
    description: "A friar investigates a series of mysterious deaths in a 14th-century Italian monastery.",
    cover: "https://picsum.photos/seed/book6/800/1200",
    rating: 4.4,
    year: 1980,
    pages: 512
  },
  {
    id: "7",
    title: "The God of Small Things",
    author: "Arundhati Roy",
    country: "India",
    genre: "Family Drama",
    description: "The story of twins whose lives are destroyed by the 'Love Laws' that lay down who should be loved, and how.",
    cover: "https://picsum.photos/seed/book7/800/1200",
    rating: 4.6,
    year: 1997,
    pages: 340
  },
  {
    id: "8",
    title: "The Unbearable Lightness of Being",
    author: "Milan Kundera",
    country: "Czech Republic",
    genre: "Philosophical Romance",
    description: "A story of love and fate in the Prague Spring of 1968.",
    cover: "https://picsum.photos/seed/book8/800/1200",
    rating: 4.3,
    year: 1984,
    pages: 314
  }
];
