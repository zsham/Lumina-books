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
    title: "The Mystery of the Old Shophouse",
    author: "Zainal Abidin",
    country: "Malaysia",
    genre: "Teen Mystery",
    description: "In the heart of Melaka, three teenagers discover a hidden compartment in an ancestral shophouse that leads to a decades-old secret.",
    cover: "https://picsum.photos/seed/melaka/800/1200",
    rating: 4.7,
    year: 2023,
    pages: 210
  },
  {
    id: "2",
    title: "Shadows of Mount Kinabalu",
    author: "Siti Nurhaliza",
    country: "Malaysia",
    genre: "Adventure Mystery",
    description: "A group of students on a hiking trip in Sabah find themselves investigating the disappearance of a local guide and a legendary treasure.",
    cover: "https://picsum.photos/seed/kinabalu/800/1200",
    rating: 4.8,
    year: 2024,
    pages: 245
  },
  {
    id: "3",
    title: "The KL Tower Code",
    author: "Adam Malik",
    country: "Malaysia",
    genre: "Cyber Investigation",
    description: "A teenage tech prodigy in Kuala Lumpur uncovers a series of encrypted messages hidden in the city's digital infrastructure.",
    cover: "https://picsum.photos/seed/kltower/800/1200",
    rating: 4.6,
    year: 2022,
    pages: 190
  },
  {
    id: "4",
    title: "Whispers in the Cameron Highlands",
    author: "Mei Ling",
    country: "Malaysia",
    genre: "Supernatural Investigation",
    description: "During a school break, a group of friends investigates strange occurrences at an old tea plantation that locals refuse to talk about.",
    cover: "https://picsum.photos/seed/cameron/800/1200",
    rating: 4.5,
    year: 2023,
    pages: 220
  },
  {
    id: "5",
    title: "The Penang Ferry Disappearance",
    author: "Ravi Chandran",
    country: "Malaysia",
    genre: "Cold Case",
    description: "Two high school students in George Town reopen a case from the 90s when they find a discarded diary near the ferry terminal.",
    cover: "https://picsum.photos/seed/penang/800/1200",
    rating: 4.9,
    year: 2024,
    pages: 260
  }
];
