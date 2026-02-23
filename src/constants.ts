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
    title: "Siri Hadi: Misteri Rumah Tua",
    author: "Abdul Latip Talib",
    country: "Malaysia",
    genre: "Penyiasatan Remaja",
    description: "Hadi dan rakan-rakannya menyiasat sebuah rumah yang dikatakan berhantu di kampung mereka, hanya untuk membongkar sindiket penyeludupan.",
    cover: "https://picsum.photos/seed/malaysia-novel-rumah-tua/800/1200",
    rating: 4.8,
    year: 1995,
    pages: 120
  },
  {
    id: "2",
    title: "Siri Hadi: Penculikan di Langkawi",
    author: "Abdul Latip Talib",
    country: "Malaysia",
    genre: "Penyiasatan Remaja",
    description: "Semasa bercuti di Langkawi, Hadi terserempak dengan plot penculikan dan mesti menggunakan kebijaksanaannya untuk menyelamatkan mangsa.",
    cover: "https://picsum.photos/seed/malaysia-novel-langkawi/800/1200",
    rating: 4.7,
    year: 1996,
    pages: 135
  },
  {
    id: "3",
    title: "Siri Hadi: Rahsia Hutan Simpan",
    author: "Abdul Latip Talib",
    country: "Malaysia",
    genre: "Penyiasatan Remaja",
    description: "Satu trip perkhemahan bertukar menjadi misi apabila Hadi menemui aktiviti pembalakan haram jauh di dalam hutan simpan.",
    cover: "https://picsum.photos/seed/malaysia-novel-hutan/800/1200",
    rating: 4.9,
    year: 1997,
    pages: 140
  },
  {
    id: "4",
    title: "Siri Hadi: Jejak Penjenayah",
    author: "Abdul Latip Talib",
    country: "Malaysia",
    genre: "Penyiasatan Remaja",
    description: "Hadi menjejaki sekumpulan pencuri yang telah mengganas di kawasan perumahan tempatan.",
    cover: "https://picsum.photos/seed/malaysia-novel-detective/800/1200",
    rating: 4.6,
    year: 1998,
    pages: 125
  },
  {
    id: "5",
    title: "Siri Hadi: Misteri Pulau Tioman",
    author: "Abdul Latip Talib",
    country: "Malaysia",
    genre: "Penyiasatan Remaja",
    description: "Kehilangan misteri di Pulau Tioman membawa Hadi ke dalam penyiasatan bawah air yang berbahaya.",
    cover: "https://picsum.photos/seed/malaysia-novel-tioman/800/1200",
    rating: 4.8,
    year: 1999,
    pages: 150
  }
];
