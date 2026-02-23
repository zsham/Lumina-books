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
    title: "The Murders in the Rue Morgue",
    author: "Edgar Allan Poe",
    country: "USA",
    genre: "Detective Mystery",
    description: "C. Auguste Dupin investigates the brutal and seemingly impossible murder of two women in a locked room in Paris.",
    cover: "https://picsum.photos/seed/poe/800/1200",
    rating: 4.8,
    year: 1841,
    pages: 45
  },
  {
    id: "2",
    title: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    country: "UK",
    genre: "Investigation",
    description: "The first appearance of Sherlock Holmes and Dr. Watson, as they investigate a mysterious death in an abandoned house.",
    cover: "https://picsum.photos/seed/holmes/800/1200",
    rating: 4.9,
    year: 1887,
    pages: 150
  },
  {
    id: "3",
    title: "The Big Sleep",
    author: "Raymond Chandler",
    country: "USA",
    genre: "Hardboiled Noir",
    description: "Private investigator Philip Marlowe is hired by a dying general to handle a blackmail case involving his daughter.",
    cover: "https://picsum.photos/seed/marlowe/800/1200",
    rating: 4.7,
    year: 1939,
    pages: 230
  },
  {
    id: "4",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    country: "Sweden",
    genre: "Crime Thriller",
    description: "A journalist and a computer hacker investigate the decades-old disappearance of a wealthy industrialist's niece.",
    cover: "https://picsum.photos/seed/larsson/800/1200",
    rating: 4.6,
    year: 2005,
    pages: 465
  },
  {
    id: "5",
    title: "The Tokyo Zodiac Murders",
    author: "Soji Shimada",
    country: "Japan",
    genre: "Honkaku Mystery",
    description: "An astrologer and his friend attempt to solve a 40-year-old cold case involving a series of ritualistic murders.",
    cover: "https://picsum.photos/seed/shimada/800/1200",
    rating: 4.5,
    year: 1981,
    pages: 300
  },
  {
    id: "6",
    title: "The Devotion of Suspect X",
    author: "Keigo Higashino",
    country: "Japan",
    genre: "Psychological Mystery",
    description: "A brilliant mathematician helps a neighbor cover up a murder, leading to a battle of wits with a police consultant.",
    cover: "https://picsum.photos/seed/higashino/800/1200",
    rating: 4.8,
    year: 2005,
    pages: 300
  }
];
