export enum Role {
  administrator,
  poljoprivrednik,
  preduzece,
}

export interface Korisnik {
  email: string;
  phone: string;
  username: string;
  password: string;
  role: Role;
}

export interface Administrator extends Korisnik {
  firstName: string;
  lastName: string;
  birthPlace: string;
  birthDate: Date;
}

export interface Poljoprivrednik extends Korisnik {
  firstName: string;
  lastName: string;
  birthPlace: string;
  birthDate: Date;
}

export interface Preduzece extends Korisnik {
  name: string;
  location: string;
  dateOfCreation: Date;
}
