export const Role = {
  admin: 'admin',
  poljoprivrednik: 'poljoprivrednik',
  preduzece: 'preduzece',
};

export const Status = {
  naCekanju: 'naCekanju',
  odbijen: 'odbijen',
  odobren: 'odobren',
};

export const OrderStatus = {
  naCekanju: 'naCekanju',
  odbijena: 'odbijena',
  odobrena: 'odobrena',
};

export const TipProizvoda = {
  sadnica: 'sadnica',
  preparat: 'preparat',
};

export interface Korisnik {
  id?: string;
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
