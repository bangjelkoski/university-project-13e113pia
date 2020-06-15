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
  birthPlace: string;
  birthDate: Date;
  role: Role.poljoprivrednik;
}

export interface Preduzece extends Korisnik {
  location: string;
  dateOfCreation: Date;
  role: Role.preduzece;
}
