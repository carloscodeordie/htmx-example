export interface Note {
  id: number;
  value: string;
}

export interface Image {
  src: string;
  alt: string;
}

export interface Location {
  id: string;
  title: string;
  image: Image;
  lat: number;
  lon: number;
}

export interface LoginError {
  email?: string;
  password?: string;
}
