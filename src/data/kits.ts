/**
 * Product lists of the beginner guides (belts, wallets), taken from the
 * former Payhip guide pages. Products shared with the "My tools" page reuse
 * its entries, so links and French amazon.fr links stay in one place.
 *
 * Each product is shown as a card (see ProductList.astro): photo, name,
 * description, optional secondary links, then the shop buttons.
 */
import type { ImageMetadata } from 'astro';
import { tools, type Offer, type Text } from './tools';
import handPerforator from '../assets/tools/hand-perforator.jpg';
import holePunchSet from '../assets/tools/hole-punch-set.jpg';
import ovalPunch from '../assets/tools/oval-punch.jpg';
import matAndPad from '../assets/tools/mat-and-pad.jpg';
import craftKnife from '../assets/tools/craft-knife.jpg';
import edgeBevelerPhoto from '../assets/tools/edge-beveler.jpg';
import tokonolePhoto from '../assets/tools/tokonole.jpg';
import sandingPaperPhoto from '../assets/tools/sanding-paper.jpg';
import strapCutterMetal from '../assets/tools/strap-cutter-metal.jpg';
import strapCutterWood from '../assets/tools/strap-cutter-wood.jpg';
import fixedStrapCutter from '../assets/tools/fixed-strap-cutter.jpg';
import centeringGig from '../assets/tools/centering-gig.jpg';
import sandingMachine from '../assets/tools/sanding-machine.jpg';
import skivingMachine from '../assets/tools/skiving-machine.jpg';
import vPunch from '../assets/tools/v-punch.jpg';
import uPunch from '../assets/tools/u-punch.jpg';
import dieCutSet from '../assets/tools/die-cut-set.jpg';
import weaverStrapEdger from '../assets/tools/weaver-strap-edger.jpg';
import weaverRotaryPunch from '../assets/tools/weaver-rotary-punch.jpg';
import weaverCenteringPunch from '../assets/tools/weaver-centering-punch.jpg';
import dyeApplicators from '../assets/tools/dye-applicators.jpg';
import fiebingsDye from '../assets/tools/fiebings-dye.jpg';
import chicagoScrews from '../assets/tools/chicago-screws.jpg';
import buckleArdillon from '../assets/tools/buckle-ardillon.jpg';
import buckleClaw from '../assets/tools/buckle-claw.jpg';
import buckleDRing from '../assets/tools/buckle-d-ring.jpg';
import stitchingPony from '../assets/tools/stitching-pony.jpg';
import burnishingCloth from '../assets/tools/burnishing-cloth.jpg';
import craftClamps from '../assets/tools/craft-clamps.jpg';
import leatherClamps from '../assets/tools/leather-clamps.jpg';
import cornerBlades from '../assets/tools/corner-blades.jpg';
import strapsDyed from '../assets/kits/belt-straps-dyed.jpg';
import strapsNeck from '../assets/kits/belt-straps-neck.jpg';
import blankNatural from '../assets/kits/belt-blank-natural.jpg';
import strapNatural from '../assets/kits/belt-strap-natural.jpg';
import doubleButt from '../assets/kits/veg-tan-double-butt.jpg';
import shoulder from '../assets/kits/veg-tan-shoulder.jpg';
import brushOffButts from '../assets/kits/brush-off-butts.jpg';
import playlistBurnish from '../assets/kits/playlist-burnish.jpg';
import playlistStitch from '../assets/kits/playlist-stitch.jpg';
import playlistTips from '../assets/kits/playlist-tips.jpg';

export interface Product {
  id: string;
  name: Text;
  description: Text;
  image: ImageMetadata;
  alt: Text;
  offers: Offer[];
  /** Secondary links mentioned in the description (other stores, tutorials…). */
  links?: { label: Text; url: string; asin?: string }[];
}

const tool = (id: string): Product => {
  const found = tools.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown tool: ${id}`);
  return found;
};
const ali = (url: string): Offer => ({ shop: 'AliExpress', url });
const amazon = (url: string, asin: string): Offer => ({ shop: 'Amazon', url, asin });
const blo = (url: string): Offer => ({ shop: 'Buy Leather Online', url, code: 'LORD7' });
const SANDING_TUTORIAL = 'https://youtube.com/shorts/Emih74vXB1I';
const BURNISH_PLAYLIST = 'https://www.youtube.com/watch?v=nrC8kHJTLZ4&list=PLyC9UPLTekcUzhRmC4IBS_TbBw2RdOgcz';
const STITCH_PLAYLIST = 'https://www.youtube.com/watch?v=1aoioAgvfyw&list=PLyC9UPLTekcUASeOAI2F3hY01SKdt1Vg9';

/* ---------- Shared by both guides ---------- */

const matPad: Product = {
  id: 'mat-and-pad',
  name: { en: 'Cutting mat and punching pad', fr: 'Tapis de découpe et plaque de frappe' },
  description: {
    en: 'If you punch or cut, you need them, period: you do not want to break your tools or blades. Punch on the pad, cut on the mat. I recommend the A3 size if you have the room.',
    fr: 'Si vous percez ou découpez, il vous les faut, point : vous ne voulez pas casser vos outils ni vos lames. On frappe sur la plaque, on coupe sur le tapis. Je conseille le format A3 si vous avez la place.',
  },
  image: matAndPad,
  alt: { en: 'A green cutting mat with a translucent yellow punching pad.', fr: 'Un tapis de découpe vert avec une plaque de frappe jaune translucide.' },
  offers: [ali('https://s.click.aliexpress.com/e/_DDWSpct')],
};

const sdiKnife: Product = {
  id: 'sdi-knife',
  name: { en: 'SDI 3006 precision knife', fr: 'Cutter de précision SDI 3006' },
  description: {
    en: 'To cut straps or shape an end by hand. After two years of practice, I finally found a knife that is sharp, precise and solid. The blades snap off and are replaceable.',
    fr: 'Pour couper les lanières ou former un bout à la main. Après deux ans de pratique, j’ai enfin trouvé un cutter affûté, précis et solide. Les lames sont sécables et remplaçables.',
  },
  image: craftKnife,
  alt: { en: 'A slim SDI precision knife next to packs of spare blades, on brown leather.', fr: 'Un cutter de précision SDI fin, à côté de boîtes de lames de rechange, sur du cuir marron.' },
  offers: [ali('https://s.click.aliexpress.com/e/_omQJdNO')],
};

const edgeBeveler: Product = {
  id: 'edge-beveler-aliexpress',
  name: { en: 'Edge beveler', fr: 'Abat-carre' },
  description: {
    en: 'Essential for smooth, clean and durable edges. I recommend the 0.7 mm and 1.3 mm sizes, but start with the first one if you are on a budget.',
    fr: 'Indispensable pour des tranches lisses, nettes et durables. Je recommande les tailles 0,7 mm et 1,3 mm, mais commencez par la première si votre budget est serré.',
  },
  image: edgeBevelerPhoto,
  alt: { en: 'An edge beveler taking a thin strip off the edge of a piece of leather.', fr: 'Un abat-carre qui enlève une fine lanière sur l’arête d’un morceau de cuir.' },
  offers: [ali('https://s.click.aliexpress.com/e/_DebvYDn')],
};

const tokonole: Product = {
  id: 'tokonole-colours',
  name: { en: 'Tokonole burnishing gum', fr: 'Tokonole, gomme de lissage' },
  description: {
    en: 'For shiny edges, you cannot do without it: it is the best burnishing gum I know. Start with the white one, which dries clear; it also exists in brown and black.',
    fr: 'Pour des tranches brillantes, impossible de s’en passer : c’est la meilleure gomme de lissage que je connaisse. Commencez par la blanche, qui sèche transparente ; elle existe aussi en marron et en noir.',
  },
  image: tokonolePhoto,
  alt: { en: 'A jar of Tokonole and a small applicator bottle on a cutting mat.', fr: 'Un pot de Tokonole et un petit flacon applicateur sur un tapis de découpe.' },
  offers: [
    { shop: 'Amazon', label: { en: 'Amazon · white', fr: 'Amazon · blanche' }, url: 'https://amzn.to/3Kyhhwo', asin: 'B017X8GL9A' },
    { shop: 'Amazon', label: { en: 'Brown', fr: 'Marron' }, url: 'https://amzn.to/41txDNR', asin: 'B017X8GKZA' },
    { shop: 'Amazon', label: { en: 'Black', fr: 'Noire' }, url: 'https://amzn.to/3MIJlA9', asin: 'B017X8GL8Q' },
  ],
};

const sandingPaper: Product = {
  id: 'sanding-paper',
  name: { en: 'Sanding paper set', fr: 'Assortiment de papiers de verre' },
  description: {
    en: 'No need for every grit: take at least 300, 900 and 2000. They harden and smooth your edges.',
    fr: 'Inutile de prendre tous les grains : au minimum 300, 900 et 2000. Ils durcissent et lissent vos tranches.',
  },
  image: sandingPaperPhoto,
  alt: { en: 'A fan of sanding sheets, from dark to light grits.', fr: 'Un éventail de feuilles de papier de verre, des grains foncés aux grains clairs.' },
  offers: [ali('https://s.click.aliexpress.com/e/_DnsyEWD')],
  links: [{ label: { en: 'Short sanding tutorial', fr: 'Petit tutoriel de ponçage' }, url: SANDING_TUTORIAL }],
};

/* ---------- Belt guide ---------- */

export const beltStarter: Product[] = [
  {
    id: 'hand-perforator',
    name: { en: 'Hand perforator', fr: 'Pince à trouer' },
    description: {
      en: 'It comes with several hole shapes, for the buckle hole as well as the prong holes. If you prefer hole punches, see the next tools.',
      fr: 'Elle est livrée avec plusieurs formes de trous, pour le trou de la boucle comme pour ceux de l’ardillon. Si vous préférez les emporte-pièces, voyez les outils suivants.',
    },
    image: handPerforator,
    alt: { en: 'A rotary hand perforator with spare punch tubes and the hole sizes it makes.', fr: 'Une pince à trouer revolver, avec ses tubes de rechange et les tailles de trous qu’elle fait.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DkLmlWH')],
  },
  {
    id: 'hole-punch-set',
    name: { en: 'Hole punch set', fr: 'Jeu d’emporte-pièces ronds' },
    description: {
      en: 'More freedom to place your holes, where a hand perforator limits the distance from the edge. Both work for belts. I use the 4.5 mm a lot.',
      fr: 'Plus de liberté pour placer vos trous, là où la pince limite la distance au bord. Les deux conviennent pour une ceinture. J’utilise beaucoup le 4,5 mm.',
    },
    image: holePunchSet,
    alt: { en: 'Round hole punches of several sizes with a mallet, on a punching pad.', fr: 'Des emporte-pièces ronds de plusieurs tailles avec un maillet, sur une plaque de frappe.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DCjJAIt')],
  },
  {
    id: 'oval-punch',
    name: { en: 'Oval hole punch', fr: 'Emporte-pièce ovale' },
    description: {
      en: 'For the slot of the prong, the metal part of the buckle that holds the belt. There is no one-size-fits-all, but 4 × 8 mm is a good start.',
      fr: 'Pour la fente de l’ardillon, la partie métallique de la boucle qui bloque la ceinture. Pas de taille unique, mais 4 × 8 mm est un bon début.',
    },
    image: ovalPunch,
    alt: { en: 'An oval punch cutting slots into a brown leather strap.', fr: 'Un emporte-pièce ovale qui découpe des fentes dans une lanière de cuir marron.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DFEDgoz')],
  },
  matPad,
  sdiKnife,
  edgeBeveler,
  tokonole,
  sandingPaper,
];

export const beltAdvanced: Product[] = [
  {
    id: 'strap-cutter-metal',
    name: { en: 'Hand strap cutter, metal', fr: 'Coupe-lanières à main, en métal' },
    description: {
      en: 'To cut your own straps from a large hide. This one from Wuta comes with replaceable blades and a simple guide ruler.',
      fr: 'Pour découper vous-même vos lanières dans une grande peau. Celui de Wuta est livré avec des lames remplaçables et une règle de guidage simple.',
    },
    image: strapCutterMetal,
    alt: { en: 'A metal strap cutter slicing a strip off an orange leather.', fr: 'Un coupe-lanières en métal qui découpe une bande dans un cuir orange.' },
    offers: [{ shop: 'Wuta · AliExpress', url: 'https://s.click.aliexpress.com/e/_DDxQOPX' }],
  },
  {
    id: 'strap-cutter-wood',
    name: { en: 'Hand strap cutter, wood', fr: 'Coupe-lanières à main, en bois' },
    description: {
      en: 'The same tool in wood, if you prefer wooden tools. Not necessarily cheaper, and it also comes with several blades.',
      fr: 'Le même outil en bois, si vous préférez. Pas forcément moins cher, et lui aussi livré avec plusieurs lames.',
    },
    image: strapCutterWood,
    alt: { en: 'A wooden strap cutter with a graduated bar and a black knob.', fr: 'Un coupe-lanières en bois avec une barre graduée et une molette noire.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DeTwK3P')],
  },
  {
    id: 'fixed-strap-cutter',
    name: { en: 'Fixed strap cutter', fr: 'Coupe-lanières fixe' },
    description: {
      en: 'Same idea, but the tool stays fixed and you pull the leather. It can be harder to handle with large pieces.',
      fr: 'Même principe, mais l’outil reste fixe et c’est le cuir que vous tirez. Moins pratique avec de grandes pièces.',
    },
    image: fixedStrapCutter,
    alt: { en: 'A bench-mounted strap cutter with a wheel guide, cutting an orange strap.', fr: 'Un coupe-lanières fixé à l’établi, avec un guide à roulette, qui coupe une lanière orange.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DdsPJ8D')],
  },
  {
    id: 'centering-gig',
    name: { en: 'Centering ruler', fr: 'Gabarit de centrage' },
    description: {
      en: 'You can center the holes one by one without it, but it was a game changer for me, even for a dozen belts. Useful for other leather goods too.',
      fr: 'On peut centrer les trous un par un sans lui, mais il a tout changé pour moi, même pour une douzaine de ceintures. Utile aussi pour d’autres pièces.',
    },
    image: centeringGig,
    alt: { en: 'A steel centering ruler with hole guides, placed on a dark leather strap.', fr: 'Un gabarit de centrage en acier, percé de guides, posé sur une lanière de cuir foncé.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DeMCwoz')],
  },
  {
    id: 'sanding-machine',
    name: { en: 'Sanding and burnishing machine', fr: 'Machine à poncer et lisser' },
    description: {
      en: 'Most of my time on a belt goes into sanding and burnishing, because the edges are so long. A good investment that saves a lot of time.',
      fr: 'L’essentiel de mon temps sur une ceinture passe dans le ponçage et le lissage, parce que les tranches sont très longues. Un bon investissement, qui fait gagner beaucoup de temps.',
    },
    image: sandingMachine,
    alt: { en: 'A small white bench machine with sanding and burnishing heads.', fr: 'Une petite machine d’établi blanche avec des têtes de ponçage et de lissage.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DFqp2xx')],
  },
  {
    id: 'skiving-machine',
    name: { en: 'Splitting machine', fr: 'Refendeuse manuelle' },
    description: {
      en: 'For thinner belts, or to layer different leathers, you need a clean split. I use one to thin the back where the buckle end folds.',
      fr: 'Pour des ceintures plus fines, ou pour superposer plusieurs cuirs, il faut une refente nette. Je m’en sers pour affiner le dos là où le côté boucle se replie.',
    },
    image: skivingMachine,
    alt: { en: 'A manual splitting machine with a spring-loaded blade, splitting a piece of leather.', fr: 'Une refendeuse manuelle à lame sur ressort, qui refend un morceau de cuir.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DBLbnrR')],
  },
  {
    id: 'v-punch',
    name: { en: 'V-shaped end punch', fr: 'Emporte-pièce de bout en V' },
    description: {
      en: 'Cuts the tip of your belt in one strike. Not expensive, a clean end, and a lot of time saved. The handle is a nice addition.',
      fr: 'Coupe le bout de votre ceinture d’un seul coup. Pas cher, un bout net, et beaucoup de temps gagné. Le manche est un vrai plus.',
    },
    image: vPunch,
    alt: { en: 'A row of V-shaped end punches of several widths, next to a cut leather sample.', fr: 'Une rangée d’emporte-pièces en V de plusieurs largeurs, à côté d’un échantillon de cuir découpé.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DDAYNup')],
  },
  {
    id: 'u-punch',
    name: { en: 'U-shaped end punch', fr: 'Emporte-pièce de bout en U' },
    description: {
      en: 'Same use, rounded. I use both: a U for the buckle end and a V for the tip. It also comes with a handle.',
      fr: 'Même usage, en arrondi. J’utilise les deux : un U côté boucle et un V pour la pointe. Lui aussi est livré avec un manche.',
    },
    image: uPunch,
    alt: { en: 'Two U-shaped punches next to a leather strap with a rounded end.', fr: 'Deux emporte-pièces en U à côté d’une lanière au bout arrondi.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DlGYz25')],
  },
  {
    id: 'die-cut-set',
    name: { en: 'Multi-shape end punch set', fr: 'Jeu d’emporte-pièces de bout' },
    description: {
      en: 'More affordable if you are on a budget: 6 sizes in 3 shapes for belts and straps. No handle, but I have used them since the beginning.',
      fr: 'Plus abordable si votre budget est serré : 6 tailles en 3 formes pour ceintures et bracelets. Pas de manche, mais je les utilise depuis le début.',
    },
    image: dieCutSet,
    alt: { en: 'A set of small steel end punches in pointed, rounded and straight shapes.', fr: 'Un jeu de petits emporte-pièces en acier, en pointe, arrondis et droits.' },
    offers: [ali('https://s.click.aliexpress.com/e/_Dl6rrlh')],
  },
];

export const beltPro: Product[] = [
  {
    id: 'weaver-strap-edger',
    name: { en: 'Weaver strap edger', fr: 'Abat-carre double Weaver' },
    description: {
      en: 'Weaver is known for machines that speed up your work. This one bevels both edges at once: insert the belt, pull, done. I have not tested it myself.',
      fr: 'Weaver est connu pour ses machines qui accélèrent le travail. Celle-ci abat les deux arêtes d’un coup : on insère la ceinture, on tire, c’est fini. Je ne l’ai pas testée moi-même.',
    },
    image: weaverStrapEdger,
    alt: { en: 'A Weaver Master Tool strap edger fixed to a bench, with a belt passing through.', fr: 'Un abat-carre double Weaver Master Tool fixé à l’établi, traversé par une ceinture.' },
    offers: [amazon('https://amzn.to/3KGg1Yr', 'B01ECHXCHY')],
  },
  {
    id: 'weaver-rotary-punch',
    name: { en: 'Rotary hole punch', fr: 'Perforatrice rotative' },
    description: {
      en: 'Like a sewing machine for holes: it moves the belt and punches at a regular spacing, centred. A real time saver. I have not tested it myself.',
      fr: 'Comme une machine à coudre pour les trous : elle fait avancer la ceinture et perce à intervalle régulier, centré. Un vrai gain de temps. Je ne l’ai pas testée moi-même.',
    },
    image: weaverRotaryPunch,
    alt: { en: 'A red Weaver rotary punch with a belt being fed through it.', fr: 'Une perforatrice rotative Weaver rouge, avec une ceinture engagée dedans.' },
    offers: [{ shop: 'Weaver Leather Supply', url: 'https://www.weaverleathersupply.com/products/master-tool-rotary-punch' }],
  },
  {
    id: 'weaver-centering-punch',
    name: { en: 'Weaver self-centering punch', fr: 'Presse à centrage automatique Weaver' },
    description: {
      en: 'Overkill for me, but it exists: it centres the belt end, cuts it and punches the five holes in one go. If you make belts for a living, I understand. I have not tested it myself.',
      fr: 'Trop pour moi, mais ça existe : elle centre le bout de la ceinture, le découpe et perce les cinq trous d’un coup. Si vous en vivez, je comprends. Je ne l’ai pas testée moi-même.',
    },
    image: weaverCenteringPunch,
    alt: { en: 'A press punching a row of holes into a black belt.', fr: 'Une presse qui perce une rangée de trous dans une ceinture noire.' },
    offers: [{ shop: 'Weaver Leather Supply', url: 'https://www.weaverleathersupply.com/products/master-tool-self-centering-punch' }],
  },
];

export const beltLeatherDyed: Product[] = [
  {
    id: 'belt-straps-dyed',
    name: { en: 'Dyed vegetable-tanned straps', fr: 'Lanières au tannage végétal teintes' },
    description: {
      en: 'Vegetable-tanned bull butts, premium Italian leather. 4 mm straps are 130 to 145 cm long on average, in several widths, 2 or 4 mm thick.',
      fr: 'Croupons de taureau au tannage végétal, cuir italien de qualité. Les lanières de 4 mm font en moyenne 130 à 145 cm, en plusieurs largeurs, en 2 ou 4 mm d’épaisseur.',
    },
    image: strapsDyed,
    alt: { en: 'Rolled tan and navy leather straps.', fr: 'Des lanières de cuir enroulées, naturel foncé et bleu marine.' },
    offers: [blo('https://buyleatheronline.com/en/home/489-4862-leather-strips.html')],
  },
  {
    id: 'belt-straps-neck',
    name: { en: 'Dyed neck leather straps', fr: 'Lanières de collet teintes' },
    description: {
      en: 'Vegetable-tanned cow neck leather, in beautiful colours with slight wrinkles, in several lengths and widths. More colours under “lanière cuir de collet” in their search.',
      fr: 'Cuir de collet de vache au tannage végétal, aux belles couleurs et aux légers plis, en plusieurs longueurs et largeurs. D’autres couleurs en cherchant « lanière cuir de collet ».',
    },
    image: strapsNeck,
    alt: { en: 'Rolled leather straps in green, burgundy, blue and brown.', fr: 'Des lanières de cuir enroulées, vertes, bordeaux, bleues et marron.' },
    offers: [{ shop: 'Decocuir', url: 'https://www.decocuir.com/laniere-cuir-collet-tannage-vegetal-ceinture-c102x1632006' }],
    links: [
      { label: { en: 'Natural', fr: 'Naturel' }, url: 'https://www.decocuir.com/laniere-cuir-collet-tannage-vegetal-naturel-34mm-120cm-c2x37982849' },
      { label: { en: 'Green', fr: 'Vert' }, url: 'https://www.decocuir.com/laniere-cuir-collet-nourri-lisse-tannage-vegetal-vert-34mm-120cm-c2x38187451' },
      { label: { en: 'Burgundy', fr: 'Bordeaux' }, url: 'https://www.decocuir.com/laniere-cuir-collet-nourri-lisse-tannage-vegetal-bordeaux-34mm-120cm-c2x38187417' },
      { label: { en: 'Navy', fr: 'Bleu marine' }, url: 'https://www.decocuir.com/laniere-cuir-collet-tannage-vegetal-bleu-marine-34mm-120cm-c2x38646823' },
      { label: { en: 'Cognac', fr: 'Cognac' }, url: 'https://www.decocuir.com/laniere-cuir-collet-tannage-vegetal-cognac-34mm-140cm-c2x38646689' },
      { label: { en: 'Chocolate', fr: 'Chocolat' }, url: 'https://www.decocuir.com/laniere-cuir-collet-nourri-lisse-tannage-vegetal-chocolat-34mm-120cm-c2x37982901' },
      { label: { en: 'Brown', fr: 'Marron' }, url: 'https://www.decocuir.com/laniere-cuir-collet-nourri-lisse-tannage-vegetal-marron-34mm-120cm-c2x37979441' },
      { label: { en: 'Black', fr: 'Noir' }, url: 'https://www.decocuir.com/laniere-cuir-collet-nourri-lisse-tannage-vegetal-noir-34mm-120cm-c2x37983006' },
    ],
  },
];

export const beltLeatherNatural: Product[] = [
  {
    id: 'belt-blank-natural',
    name: { en: 'Pre-shaped natural belt blank', fr: 'Ébauche de ceinture naturelle' },
    description: {
      en: 'Vegetable-tanned bull leather, made in Italy: 130 to 145 cm long, 3.5 cm wide, 3.8 mm thick. It comes with 5 holes and a blunt end, ready to dye or engrave.',
      fr: 'Cuir de taureau au tannage végétal, fait en Italie : 130 à 145 cm de long, 3,5 cm de large, 3,8 mm d’épaisseur. Livrée avec 5 trous et un bout arrondi, prête à teindre ou à graver.',
    },
    image: blankNatural,
    alt: { en: 'Two rolled natural leather belt blanks with punched holes.', fr: 'Deux ébauches de ceinture en cuir naturel enroulées, déjà percées.' },
    offers: [blo('https://buyleatheronline.com/en/leather-strips/487-4428-leather-strap-belt-blanks.html')],
  },
  {
    id: 'belt-strap-natural',
    name: { en: 'Natural belt strap', fr: 'Lanière de ceinture naturelle' },
    description: {
      en: 'Vegetable-tanned bull butts, premium Italian leather, 130 to 145 cm long, 2 or 4 mm thick, in several widths. No holes and no shaped end: dye or engrave it as you like.',
      fr: 'Croupons de taureau au tannage végétal, cuir italien de qualité, de 130 à 145 cm, en 2 ou 4 mm, en plusieurs largeurs. Sans trous ni bout formé : teignez-la ou gravez-la à votre goût.',
    },
    image: strapNatural,
    alt: { en: 'A rolled natural leather strap tied with a thin lace.', fr: 'Une lanière de cuir naturel enroulée, nouée par un fin lacet.' },
    offers: [blo('https://buyleatheronline.com/en/home/489-4461-leather-strips.html')],
  },
  {
    id: 'dye-applicators',
    name: { en: 'Wool dye applicators', fr: 'Applicateurs de teinture en laine' },
    description: {
      en: 'With natural leather, you dye it yourself. These daubers are good for small amounts of dye. Classic sponges also work.',
      fr: 'Avec un cuir naturel, c’est vous qui teignez. Ces applicateurs conviennent aux petites quantités de teinture. Des éponges classiques fonctionnent aussi.',
    },
    image: dyeApplicators,
    alt: { en: 'Wool daubers on long wire handles.', fr: 'Des applicateurs en laine montés sur de longues tiges.' },
    offers: [ali('https://s.click.aliexpress.com/e/_Dm4j0mv')],
    links: [{ label: { en: 'Sponges in bulk', fr: 'Des éponges en lot' }, url: 'https://amzn.to/43AU3i0', asin: 'B08HNBC2Z3' }],
  },
  {
    id: 'fiebings-dye',
    name: { en: 'Fiebing’s leather dye', fr: 'Teinture Fiebing’s' },
    description: {
      en: 'The best known alcohol-based penetrating leather dye. For vegetable-tanned or unfinished leather. It dries evenly and mixes easily for in-between shades.',
      fr: 'La teinture pénétrante à l’alcool la plus connue. Pour les cuirs au tannage végétal ou sans finition. Elle sèche uniformément et se mélange facilement pour des nuances intermédiaires.',
    },
    image: fiebingsDye,
    alt: { en: 'A row of Fiebing’s dye bottles above leather swatches in many colours.', fr: 'Une rangée de flacons de teinture Fiebing’s au-dessus d’échantillons de cuir de toutes les couleurs.' },
    offers: [amazon('https://amzn.to/3GL3bqo', 'B000HHM20M')],
  },
];

export const beltLeatherHide: Product[] = [
  {
    id: 'veg-tan-double-butt',
    name: { en: 'Natural veg-tan double butt, 4 mm', fr: 'Double croupon naturel, 4 mm' },
    description: {
      en: 'Vegetable-tanned bull double butt (bend), B or C grade, with a very good quality to price ratio. Keep it natural or dye it the colour you need.',
      fr: 'Double croupon de taureau au tannage végétal, en choix B ou C, au très bon rapport qualité-prix. Gardez-le naturel ou teignez-le de la couleur voulue.',
    },
    image: doubleButt,
    alt: { en: 'A large natural vegetable-tanned leather hide, folded at one corner.', fr: 'Une grande peau de cuir naturel au tannage végétal, repliée dans un coin.' },
    offers: [blo('https://buyleatheronline.com/en/vegetable-tanned-leather/236-2556-b-grade-veg-tan-double-butts.html')],
  },
  {
    id: 'veg-tan-shoulder',
    name: { en: 'Natural veg-tan shoulder, 3.5 mm', fr: 'Collet naturel, 3,5 mm' },
    description: {
      en: 'European bull leather, natural square shoulder, first grade, with a very good quality to price ratio. Keep it natural or dye it.',
      fr: 'Cuir de taureau européen, collet carré naturel, premier choix, au très bon rapport qualité-prix. Gardez-le naturel ou teignez-le.',
    },
    image: shoulder,
    alt: { en: 'A natural leather shoulder rolled at one end.', fr: 'Un collet de cuir naturel roulé à une extrémité.' },
    offers: [blo('https://buyleatheronline.com/en/home/72-135-heavy-natural-vegetable-shoulder.html')],
  },
  {
    id: 'brush-off-butts',
    name: { en: 'Luxury brush-off aniline butts', fr: 'Croupons aniline brush-off de luxe' },
    description: {
      en: 'Single butts with a brush-off aniline effect, belt-sized, used by Italian fashion brands. Three colours.',
      fr: 'Croupons simples à effet aniline brush-off, taillés pour les ceintures, utilisés par des marques de mode italiennes. Trois couleurs.',
    },
    image: brushOffButts,
    alt: { en: 'A glossy black leather butt, rolled at one side.', fr: 'Un croupon de cuir noir brillant, roulé sur un côté.' },
    offers: [blo('https://buyleatheronline.com/en/brush-off-leather/146-329-luxury-brush-off-aniline-effect-single-butt-belt-size.html')],
  },
];

export const beltHardware: Product[] = [
  {
    id: 'chicago-screws',
    name: { en: 'Chicago screws', fr: 'Vis Chicago' },
    description: {
      en: 'I love them: easy to install, almost unbreakable, with a clean professional look. Most stock comes from China; for larger quantities, try these two stores.',
      fr: 'Je les adore : faciles à poser, presque incassables, avec un rendu net et professionnel. La plupart viennent de Chine ; pour de plus grandes quantités, essayez ces deux boutiques.',
    },
    image: chicagoScrews,
    alt: { en: 'Brass Chicago screws holding a belt end, next to loose screws.', fr: 'Des vis Chicago en laiton qui tiennent un bout de ceinture, à côté de vis en vrac.' },
    offers: [amazon('https://amzn.to/3zzpI5H', 'B08PYW9KVY')],
    links: [
      { label: { en: 'Store 1 (AliExpress)', fr: 'Boutique 1 (AliExpress)' }, url: 'https://s.click.aliexpress.com/e/_DeGBsOH' },
      { label: { en: 'Store 2 (AliExpress)', fr: 'Boutique 2 (AliExpress)' }, url: 'https://s.click.aliexpress.com/e/_DdWnrEh' },
    ],
  },
  {
    id: 'buckle-ardillon',
    name: { en: 'Prong buckle', fr: 'Boucle à ardillon' },
    description: {
      en: 'The classic. Many shops sell them; I tried these two stores and they were good.',
      fr: 'La grande classique. Beaucoup de boutiques en vendent ; j’ai essayé ces deux-là et elles étaient bien.',
    },
    image: buckleArdillon,
    alt: { en: 'A brass prong buckle on a belt, next to a silver one.', fr: 'Une boucle à ardillon laiton sur une ceinture, à côté d’une boucle argentée.' },
    offers: [amazon('https://amzn.to/3KC8Qld', 'B0B7TBRJ4D')],
    links: [
      { label: { en: 'Store 1 (AliExpress)', fr: 'Boutique 1 (AliExpress)' }, url: 'https://s.click.aliexpress.com/e/_DEXfdAp' },
      { label: { en: 'Store 2 (AliExpress)', fr: 'Boutique 2 (AliExpress)' }, url: 'https://s.click.aliexpress.com/e/_DDajefR' },
    ],
  },
  {
    id: 'buckle-claw',
    name: { en: 'Claw buckle', fr: 'Boucle à griffe' },
    description: {
      en: 'A small metal tip goes into a hole, often with a clamp that bites the leather. Plain or decorated front.',
      fr: 'Une petite pointe métallique entre dans un trou, souvent avec une pince qui mord le cuir. Façade lisse ou décorée.',
    },
    image: buckleClaw,
    alt: { en: 'A brushed steel claw buckle on a black belt, next to other claw buckles.', fr: 'Une boucle à griffe en acier brossé sur une ceinture noire, à côté d’autres modèles.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DF1NDZX')],
    links: [{ label: { en: 'Another store', fr: 'Une autre boutique' }, url: 'https://s.click.aliexpress.com/e/_DBfaCQz' }],
  },
  {
    id: 'buckle-d-ring',
    name: { en: 'Belt loop', fr: 'Passant de ceinture' },
    description: {
      en: 'The long loop keeps the tip of the belt flat along the strap, without a bump at the front.',
      fr: 'Le passant long garde la pointe de la ceinture à plat contre la lanière, sans bosse sur le devant.',
    },
    image: buckleDRing,
    alt: { en: 'A brass belt loop on a brown belt, next to loops in several finishes.', fr: 'Un passant en laiton sur une ceinture marron, à côté de passants de plusieurs finitions.' },
    offers: [amazon('https://amzn.to/3zwts89', 'B09NDLZNVZ')],
    links: [
      { label: { en: 'More colours', fr: 'Plus de couleurs' }, url: 'https://s.click.aliexpress.com/e/_DDBKK6l' },
      { label: { en: 'Thin, more sizes', fr: 'Fins, plus de tailles' }, url: 'https://s.click.aliexpress.com/e/_DCcoktb' },
    ],
  },
];

/* ---------- Wallet guide ---------- */

export const walletEssentials: Product[] = [
  matPad,
  sdiKnife,
  tool('ruler'),
  tool('spacing-compass'),
  tool('pricking-iron'),
  tool('thread-pack'),
  tool('needles'),
  tool('mallet'),
  tool('glue'),
  {
    id: 'stitching-pony',
    name: { en: 'Stitching pony (optional)', fr: 'Pince de sellier (facultative)' },
    description: {
      en: 'I started with one and only later learned to stitch without. I prefer it, but if you are on a budget, try without first.',
      fr: 'J’ai commencé avec, et j’ai appris à coudre sans seulement après. Je la préfère, mais si votre budget est serré, essayez d’abord sans.',
    },
    image: stitchingPony,
    alt: { en: 'A wooden stitching pony with red-tipped jaws and a clamp screw.', fr: 'Une pince de sellier en bois, aux mâchoires à embouts rouges et à vis de serrage.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DDeqHGR')],
    links: [{ label: { en: 'Stitching playlist', fr: 'Playlist sur la couture' }, url: STITCH_PLAYLIST }],
  },
];

export const walletEdges: Product[] = [
  edgeBeveler,
  sandingPaper,
  tokonole,
  tool('wood-slicker'),
  tool('creasing-tool'),
  tool('alcohol-burner'),
  {
    id: 'burnishing-cloth',
    name: { en: 'Burnishing cloth', fr: 'Chiffon de lissage' },
    description: {
      en: 'Nothing to buy: an old pair of jeans or a cotton cloth makes a great burnishing cloth.',
      fr: 'Rien à acheter : un vieux jean ou un chiffon en coton fait un très bon chiffon de lissage.',
    },
    image: burnishingCloth,
    alt: { en: 'A pile of cut denim scraps.', fr: 'Un tas de chutes de jean découpées.' },
    offers: [],
    links: [{ label: { en: 'Short tutorial', fr: 'Petit tutoriel' }, url: SANDING_TUTORIAL }],
  },
  {
    id: 'craft-clamps',
    name: { en: 'Clamps', fr: 'Pinces de serrage' },
    description: {
      en: 'They help a lot with clean edges and stronger gluing. Cover the jaws with leather to protect your pieces.',
      fr: 'Elles aident beaucoup pour des tranches nettes et un collage plus solide. Recouvrez les mâchoires de cuir pour protéger vos pièces.',
    },
    image: craftClamps,
    alt: { en: 'Black binder clips holding the edge of a piece of leather.', fr: 'Des pinces double clip noires qui tiennent le bord d’un morceau de cuir.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DBSZHHt')],
  },
  {
    id: 'leather-clamps',
    name: { en: 'Leather-covered clamps', fr: 'Pinces gainées de cuir' },
    description: {
      en: 'Covering clamps with leather takes time. If you would rather not, this shop sells them ready-made. I have three sizes and use them all.',
      fr: 'Gainer des pinces de cuir prend du temps. Si vous préférez éviter, cette boutique les vend toutes faites. J’en ai trois tailles et je les utilise toutes.',
    },
    image: leatherClamps,
    alt: { en: 'Six binder clips covered with natural leather.', fr: 'Six pinces double clip gainées de cuir naturel.' },
    offers: [ali('https://s.click.aliexpress.com/e/_DCVu82P')],
  },
  {
    id: 'corner-blades',
    name: { en: 'Corner radius blades', fr: 'Emporte-pièces d’angle' },
    description: {
      en: 'For clean rounded corners. You can cut them with a knife, but these small curved blades are really handy.',
      fr: 'Pour des coins arrondis nets. On peut les couper au cutter, mais ces petites lames courbes sont vraiment pratiques.',
    },
    image: cornerBlades,
    alt: { en: 'Two rows of curved corner punches of several radii.', fr: 'Deux rangées d’emporte-pièces d’angle de plusieurs rayons.' },
    offers: [amazon('https://amzn.to/3O75GHJ', 'B07YZFMFF4'), { shop: 'Etsy', url: 'https://tidd.ly/3JSkrvv' }],
  },
];

const youtube = (url: string): Offer => ({
  shop: 'YouTube',
  label: { en: 'Watch the playlist', fr: 'Voir la playlist' },
  url,
});

export const walletPlaylists: Product[] = [
  {
    id: 'playlist-burnish',
    name: { en: 'How to burnish edges', fr: 'Lisser les tranches' },
    description: {
      en: 'Videos on burnishing leather edges, with several techniques, so you can adopt the one that suits your tools and taste. Image by William Cambridge.',
      fr: 'Des vidéos sur le lissage des tranches, avec plusieurs techniques, pour adopter celle qui convient à vos outils et à vos goûts. Image de William Cambridge.',
    },
    image: playlistBurnish,
    alt: { en: 'A slicker burnishing the edge of a brown leather piece, with the words “How to burnish”.', fr: 'Un lissoir qui lisse la tranche d’une pièce de cuir marron, avec la mention « How to burnish ».' },
    offers: [youtube(BURNISH_PLAYLIST)],
  },
  {
    id: 'playlist-stitch',
    name: { en: 'How to stitch leather', fr: 'Coudre le cuir' },
    description: {
      en: 'If you have a sewing machine, I have nothing to teach you. Otherwise, here are several hand-stitching techniques: try them all. Image by William.',
      fr: 'Si vous avez une machine à coudre, je n’ai rien à vous apprendre. Sinon, voici plusieurs techniques de couture main : essayez-les toutes. Image de William.',
    },
    image: playlistStitch,
    alt: { en: 'A saddle stitch in yellow thread on black leather, with the words “How to stitch leather”.', fr: 'Une couture sellier en fil jaune sur du cuir noir, avec la mention « How to stitch leather ».' },
    offers: [youtube(STITCH_PLAYLIST)],
  },
  {
    id: 'playlist-tips',
    name: { en: 'Tips and tricks', fr: 'Trucs et astuces' },
    description: {
      en: 'Tips from other crafters: techniques that usually take years of experience to understand. Well worth watching. Image by Corter.',
      fr: 'Des astuces d’autres artisans : des techniques qu’on met souvent des années à comprendre. À regarder sans hésiter. Image de Corter.',
    },
    image: playlistTips,
    alt: { en: 'Skiving knives with wooden handles among leather offcuts, with the words “Tips & tricks”.', fr: 'Des couteaux à parer à manche en bois parmi des chutes de cuir, avec la mention « Tips & tricks ».' },
    offers: [youtube('https://www.youtube.com/watch?v=IsctD86GGoI&list=PLyC9UPLTekcV0wno2ySCekian6oVRc7GV')],
  },
];
