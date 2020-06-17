export const Role = {
  admin: 'admin',
  poljoprivrednik: 'poljoprivrednik',
  preduzece: 'preduzece',
};

export const Status = {
  naCekanju: 'na-cekanju',
  odbijen: 'odbijen',
  odobren: 'odobren',
};

export interface Korisnik {
  email: string;
  phone: string;
  username: string;
  password: string;
}

export interface Administrator extends Korisnik {
  firstName: string;
  lastName: string;
  birthPlace: string;
  birthDate: Date;
  role: string;
}

export interface Poljoprivrednik extends Korisnik {
  firstName: string;
  lastName: string;
  birthPlace: string;
  birthDate: Date;
  role: string;
}

export interface Preduzece extends Korisnik {
  name: string;
  location: string;
  dateOfCreation: Date;
  role: string;
}
