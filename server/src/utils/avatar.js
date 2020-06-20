const tops = [
  'NoHair',
  'Eyepatch',
  'Hat',
  'Hijab',
  'Turban',
  'WinterHat1',
  'WinterHat2',
  'WinterHat3',
  'WinterHat4',
  'LongHairBigHair',
  'LongHairBob',
  'LongHairBun',
  'LongHairCurly',
  'LongHairCurvy',
  'LongHairDreads',
  'LongHairFrida',
  'LongHairFro',
  'LongHairFroBand',
  'LongHairNotTooLong',
  'LongHairShavedSides',
  'LongHairMiaWallace',
  'LongHairStraight',
  'LongHairStraight2',
  'LongHairStraightStrand',
  'ShortHairDreads01',
  'ShortHairDreads02',
  'ShortHairFrizzle',
  'ShortHairShaggyMullet',
  'ShortHairShortCurly',
  'ShortHairShortFlat',
  'ShortHairShortRound',
  'ShortHairShortWaved',
  'ShortHairSides',
  'ShortHairTheCaesar',
  'ShortHairTheCaesarSidePart',
];

const hairColors = [
  'Black',
  'Blue01',
  'Blue02',
  'Blue03',
  'Gray01',
  'Gray02',
  'Heather',
  'PastelBlue',
  'PastelGreen',
  'PastelOrange',
  'PastelRed',
  'PastelYellow',
  'Pink',
  'Red',
  'White',
];

const accessories = [
  'Blank',
  'Kurt',
  'Prescription01',
  'Prescription02',
  'Round',
  'Sunglasses',
  'Wayfarers',
];

const facials = [
  'Blank',
  'BeardMedium',
  'BeardLight',
  'BeardMagestic',
  'MoustacheFancy',
  'MoustacheMagnum',
];

const facialColors = [
  'Auburn',
  'Black',
  'Blonde',
  'BlondeGolden',
  'Brown',
  'BrownDark',
  'Platinum',
  'Red',
];

const clothings = [
  'BlazerShirt',
  'BlazerSweater',
  'CollarSweater',
  'GraphicShirt',
  'Hoodie',
  'Overall',
  'ShirtCrewNeck',
  'ShirtScoopNeck',
  'ShirtVNeck',
];

const clothingColors = [
  'Black',
  'Blue01',
  'Blue02',
  'Blue03',
  'Gray01',
  'Gray02',
  'Heather',
  'PastelBlue',
  'PastelGreen',
  'PastelOrange',
  'PastelRed',
  'PastelYellow',
  'Pink',
  'Red',
  'White',
];

const eyes = [
  'Close',
  'Cry',
  'Default',
  'Dizzy',
  'EyeRoll',
  'Happy',
  'Hearts',
  'Side',
  'Squint',
  'Surprised',
  'Wink',
  'WinkWacky',
];

const eyebrows = [
  'Angry',
  'AngryNatural',
  'Default',
  'DefaultNatural',
  'FlatNatural',
  'RaisedExcited',
  'RaisedExcitedNatural',
  'SadConcerned',
  'SadConcernedNatural',
  'UnibrowNatural',
  'UpDown',
  'UpDownNatural',
];

const mouths = [
  'Concerned',
  'Default',
  'Disbelief',
  'Eating',
  'Grimace',
  'Sad',
  'ScreamOpen',
  'Serious',
  'Smile',
  'Tongue',
  'Twinkle',
  'Vomit',
];

const skins = [
  'Tanned',
  'Yellow',
  'Pale',
  'Light',
  'Brown',
  'DarkBrown',
  'Black',
];

const randomize = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export default function () {
  const top = randomize(tops);
  const accessory = randomize(accessories);
  const hairColor = randomize(hairColors);
  const facial = randomize(facials);
  const facialColor = randomize(facialColors);
  const clothing = randomize(clothings);
  const clothingColor = randomize(clothingColors);
  const eye = randomize(eyes);
  const eyebrow = randomize(eyebrows);
  const mouth = randomize(mouths);
  const skin = randomize(skins);

  return `https://avataaars.io/?avatarStyle=Circle&topType=${top}&accessoriesType=${accessory}&hairColor=${hairColor}&facialHairType=${facial}&facialHairColor=${facialColor}&clotheType=${clothing}&clotheColor=${clothingColor}&eyeType=${eye}&eyebrowType=${eyebrow}&mouthType=${mouth}&skinColor=${skin}`;
}
