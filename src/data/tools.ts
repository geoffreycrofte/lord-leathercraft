/**
 * "My tools" page. Three tiers, each grouped by task.
 *
 * Taken from the "Tools for beginners" page of the Payhip shop. Affiliate
 * links are detected and marked automatically (see
 * src/lib/remark-affiliate-links.mjs). Photos live in src/assets/tools.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';
import { AMAZON_FR_TAG } from './site';
import cuttingMat from '../assets/tools/cutting-mat.jpg';
import craftKnife from '../assets/tools/craft-knife.jpg';
import ruler from '../assets/tools/ruler.jpg';
import spacingCompass from '../assets/tools/spacing-compass.jpg';
import edgeBeveler from '../assets/tools/edge-beveler.jpg';
import needles from '../assets/tools/needles.jpg';
import prickingIron from '../assets/tools/pricking-iron.jpg';
import mallet from '../assets/tools/mallet.jpg';
import threadPack from '../assets/tools/thread-pack.jpg';
import woodSlicker from '../assets/tools/wood-slicker.jpg';
import tokonole from '../assets/tools/tokonole.jpg';
import glue from '../assets/tools/glue.jpg';
import awl from '../assets/tools/awl.jpg';
import creasingTool from '../assets/tools/creasing-tool.jpg';
import alcoholBurner from '../assets/tools/alcohol-burner.jpg';
import trianglePunch from '../assets/tools/triangle-punch.jpg';
import curvyPunch from '../assets/tools/curvy-punch.jpg';
import boneFolder from '../assets/tools/bone-folder.jpg';
import frenchSkiver from '../assets/tools/french-skiver.jpg';
import groover from '../assets/tools/groover.jpg';
import rougher from '../assets/tools/rougher.jpg';
import sinabroksIrons from '../assets/tools/sinabroks-irons.jpg';
import sinabroksPunches from '../assets/tools/sinabroks-punches.jpg';
import kemovanBeveler from '../assets/tools/kemovan-beveler.jpg';
import kemovanSkivers from '../assets/tools/kemovan-skivers.jpg';
import kemovanGroover from '../assets/tools/kemovan-groover.jpg';

export type Text = Record<Lang, string>;

export interface Offer {
  /** Shop or brand name shown on the button. */
  shop: string;
  /** Button text, when the shop name alone is not enough. */
  label?: Text;
  url: string;
  /** Partner discount code, shown next to the link. */
  code?: string;
  /** Amazon product id, to link to amazon.fr on the French pages. */
  asin?: string;
  /** amazon.fr product id, when the French store sells another reference. */
  asinFr?: string;
}

/**
 * Link of an offer for a language. On the French pages, Amazon products link
 * to amazon.fr with the French Associates tag, once that tag is set.
 */
export function offerUrl(offer: Offer, lang: Lang): string {
  const asin = offer.asinFr ?? offer.asin;
  if (lang === 'fr' && asin && AMAZON_FR_TAG) {
    return `https://www.amazon.fr/dp/${asin}?tag=${AMAZON_FR_TAG}`;
  }
  return offer.url;
}

export interface Tool {
  id: string;
  tier: 'basic' | 'advanced' | 'quality';
  task: 'cutting' | 'marking' | 'stitching' | 'edges' | 'assembly';
  name: Text;
  description: Text;
  image: ImageMetadata;
  /** Alternative text of the photo. */
  alt: Text;
  offers: Offer[];
}

export const tiers = {
  basic: {
    en: { title: 'The basics', intro: 'Enough to make your first cardholder or wallet from a pattern.' },
    fr: { title: 'Les outils de base', intro: 'De quoi fabriquer votre premier porte-cartes ou portefeuille à partir d’un patron.' },
  },
  advanced: {
    en: { title: 'Going further', intro: 'Optional tools for cleaner edges, rounded corners and more professional finishes.' },
    fr: { title: 'Pour aller plus loin', intro: 'Des outils facultatifs pour des tranches plus nettes, des coins arrondis et des finitions plus professionnelles.' },
  },
  quality: {
    en: {
      title: 'Higher quality tools',
      intro: 'When you know which tools you use the most, upgrade them. The difference is in ergonomics, durability, materials and features. I complete this list as I test new tools.',
    },
    fr: {
      title: 'Des outils de meilleure qualité',
      intro: 'Quand vous savez quels outils vous servent le plus, montez en gamme. La différence se joue sur l’ergonomie, la durabilité, les matériaux et les fonctions. Je complète cette liste au fil de mes tests.',
    },
  },
} as const;

export const tasks: Record<Tool['task'], Text> = {
  cutting: { en: 'Cutting', fr: 'Découpe' },
  marking: { en: 'Marking', fr: 'Traçage' },
  stitching: { en: 'Stitching', fr: 'Couture' },
  edges: { en: 'Edges', fr: 'Tranches' },
  assembly: { en: 'Assembly', fr: 'Assemblage' },
};

const amazon = (url: string, asin: string): Offer => ({ shop: 'Amazon', url, asin });

export const tools: Tool[] = [
  // Basic
  {
    id: 'cutting-mat',
    tier: 'basic',
    task: 'cutting',
    name: { en: 'Cutting mat', fr: 'Tapis de découpe' },
    description: {
      en: 'Cut anything without damaging your desk, table or workbench. I suggest the A3 size if you can.',
      fr: 'Pour découper sans abîmer votre bureau, votre table ou votre établi. Je conseille le format A3 si vous pouvez.',
    },
    image: cuttingMat,
    alt: { en: 'A green A3 cutting mat with a printed grid.', fr: 'Un tapis de découpe vert au format A3, avec une grille imprimée.' },
    offers: [amazon('https://amzn.to/40xez1H', 'B088M48Z3G')],
  },
  {
    id: 'craft-knife',
    tier: 'basic',
    task: 'cutting',
    name: { en: 'SDI 3006 precision knife', fr: 'Cutter de précision SDI 3006' },
    description: {
      en: 'The only knife you will need for years: it comes with several replaceable blades that you snap off as you go, and the blades do not bend easily.',
      fr: 'Le seul cutter dont vous aurez besoin pendant des années : il est livré avec plusieurs lames sécables et remplaçables, qui ne plient pas facilement.',
    },
    image: craftKnife,
    alt: { en: 'A slim SDI precision knife next to packs of spare blades, on brown leather.', fr: 'Un cutter de précision SDI fin, à côté de boîtes de lames de rechange, sur du cuir marron.' },
    offers: [{ shop: 'AliExpress', url: 'https://s.click.aliexpress.com/e/_omQJdNO' }],
  },
  {
    id: 'ruler',
    tier: 'basic',
    task: 'cutting',
    name: { en: 'Anti-slip safety ruler', fr: 'Règle de sécurité antidérapante' },
    description: {
      en: 'It protects your fingers while you cut, protects your leather, and does not slip.',
      fr: 'Elle protège vos doigts pendant la découpe, protège votre cuir et ne glisse pas.',
    },
    image: ruler,
    alt: { en: 'A black aluminium safety ruler on a piece of tan leather.', fr: 'Une règle de sécurité en aluminium noir posée sur un morceau de cuir naturel.' },
    offers: [amazon('https://amzn.to/3RIdO1F', 'B0BKZ4KS9J')],
  },
  {
    id: 'spacing-compass',
    tier: 'basic',
    task: 'marking',
    name: { en: 'Spacing compass', fr: 'Compas d’écartement' },
    description: {
      en: 'Draws accurate stitching or trimming lines on all your leather goods. The rounded legs are really handy.',
      fr: 'Trace des lignes de couture ou de coupe précises sur toutes vos pièces. Les pointes arrondies sont très pratiques.',
    },
    image: spacingCompass,
    alt: { en: 'A hand holding a steel spacing compass with a locking screw.', fr: 'Une main tenant un compas d’écartement en acier, avec sa vis de blocage.' },
    offers: [amazon('https://amzn.to/3Yuzel1', 'B076FRHDNM')],
  },
  {
    id: 'edge-beveler',
    tier: 'basic',
    task: 'edges',
    name: { en: 'Edge beveler', fr: 'Abat-carre' },
    description: {
      en: 'Essential for smooth, clean edges. I recommend sizes 1 and 2, for leathers from 1 to 8 mm thick.',
      fr: 'Indispensable pour des tranches lisses et nettes. Je recommande les tailles 1 et 2, pour des cuirs de 1 à 8 mm d’épaisseur.',
    },
    image: edgeBeveler,
    alt: { en: 'An edge beveler taking a thin strip off the edge of a piece of leather.', fr: 'Un abat-carre qui enlève une fine lanière sur l’arête d’un morceau de cuir.' },
    offers: [amazon('https://amzn.to/3I6FoTa', 'B07CJH77HB')],
  },
  {
    id: 'needles',
    tier: 'basic',
    task: 'stitching',
    name: { en: 'John James needles', fr: 'Aiguilles John James' },
    description: {
      en: 'My favourite brand. These needles are almost indestructible, and saddle makers use them. I usually take sizes 002 or 004.',
      fr: 'Ma marque préférée. Ces aiguilles sont presque indestructibles, et les selliers les utilisent. Je prends en général les tailles 002 ou 004.',
    },
    image: needles,
    alt: { en: 'Packs of John James harness needles, with loose needles beside them.', fr: 'Des sachets d’aiguilles de sellier John James, avec des aiguilles posées à côté.' },
    offers: [amazon('https://amzn.to/3DQGos1', 'B07477V1LG')],
  },
  {
    id: 'pricking-iron',
    tier: 'basic',
    task: 'stitching',
    name: { en: 'French-style pricking irons', fr: 'Griffes à frapper, style français' },
    description: {
      en: 'You need to punch holes in the leather before stitching, and these give a French-style stitch. I recommend a set of 2 and 8 prongs at 3.85 mm spacing, the most common.',
      fr: 'Il faut percer le cuir avant de le coudre, et ces griffes donnent une couture à la française. Je recommande un jeu de 2 et 8 dents, au pas de 3,85 mm, le plus courant.',
    },
    image: prickingIron,
    alt: { en: 'Two steel pricking irons, with 2 and 8 prongs, on a dark background.', fr: 'Deux griffes à frapper en acier, à 2 et 8 dents, sur un fond sombre.' },
    offers: [amazon('https://amzn.to/3XepZ7i', 'B07SL9QX45')],
  },
  {
    id: 'mallet',
    tier: 'basic',
    task: 'stitching',
    name: { en: 'A proper mallet', fr: 'Un vrai maillet' },
    description: {
      en: 'Made for striking steel tools. It is heavy, so it punches holes without much effort and without damaging your tools.',
      fr: 'Fait pour frapper les outils en acier. Il est lourd, donc il perce le cuir sans trop d’effort et sans abîmer vos outils.',
    },
    image: mallet,
    alt: { en: 'A mallet with a white nylon head and a wooden handle.', fr: 'Un maillet à tête en nylon blanc et manche en bois.' },
    offers: [amazon('https://amzn.to/3NUN6Bm', 'B09JSDCZQM')],
  },
  {
    id: 'thread-pack',
    tier: 'basic',
    task: 'stitching',
    name: { en: 'Pack of waxed threads', fr: 'Coffret de fils cirés' },
    description: {
      en: 'Start with this pack to play with coloured threads on your leather goods, then buy longer spools when you need them. I recommend 0.45 or 0.55 mm.',
      fr: 'Commencez avec ce coffret pour jouer avec les couleurs de fil sur vos pièces, puis achetez des bobines plus longues quand vous en avez besoin. Je conseille 0,45 ou 0,55 mm.',
    },
    image: threadPack,
    alt: { en: 'A clear box of small spools of waxed thread in many colours.', fr: 'Une boîte transparente remplie de petites bobines de fil ciré de toutes les couleurs.' },
    offers: [amazon('https://amzn.to/3XebTD1', 'B0B93TL1C2')],
  },
  {
    id: 'wood-slicker',
    tier: 'basic',
    task: 'edges',
    name: { en: 'Wooden edge slickers', fr: 'Lissoirs en bois' },
    description: {
      en: 'For shiny edges: you burnish them with slickers of different sizes and uses. I recommend the set.',
      fr: 'Pour des tranches brillantes : vous les lissez avec des lissoirs de tailles et d’usages différents. Je recommande le kit.',
    },
    image: woodSlicker,
    alt: { en: 'A set of three dark wooden edge slickers of different shapes.', fr: 'Un kit de trois lissoirs en bois foncé de formes différentes.' },
    offers: [amazon('https://amzn.to/40BHS33', 'B07SGR7H6G')],
  },
  {
    id: 'tokonole',
    tier: 'basic',
    task: 'edges',
    name: { en: 'Tokonole burnishing gum', fr: 'Tokonole, gomme de lissage' },
    description: {
      en: 'If you want shiny edges, you cannot do without it: it is the best burnishing gum I know. Start with the white one, which dries clear.',
      fr: 'Si vous voulez des tranches brillantes, vous ne pourrez pas vous en passer : c’est la meilleure gomme de lissage que je connaisse. Commencez par la blanche, qui sèche transparente.',
    },
    image: tokonole,
    alt: { en: 'A jar of Tokonole and a small applicator bottle on a cutting mat.', fr: 'Un pot de Tokonole et un petit flacon applicateur sur un tapis de découpe.' },
    offers: [amazon('https://amzn.to/3I7UQyq', 'B017X8GL9A')],
  },
  {
    id: 'glue',
    tier: 'basic',
    task: 'assembly',
    name: { en: 'Water-based glue', fr: 'Colle à l’eau' },
    description: {
      en: 'Many glues work well. Aquilim 315 is one of the best, but it is not available everywhere. I am also happy with the Leather & Suede glue and with Fiebing’s.',
      fr: 'Beaucoup de colles fonctionnent bien. L’Aquilim 315 est l’une des meilleures, mais on ne la trouve pas partout. Je suis aussi content de la Leather & Suede et de la Fiebing’s.',
    },
    image: glue,
    alt: { en: 'Three glue bottles: Fiebing’s Leathercraft Cement, Aquilim 315 and Leather & Suede glue.', fr: 'Trois colles : Fiebing’s Leathercraft Cement, Aquilim 315 et Leather & Suede.' },
    offers: [
      { shop: 'Aquilim 315', url: 'https://amzn.to/3pRb097', asin: 'B08CF3QT85' },
      { shop: 'Leather & Suede', url: 'https://amzn.to/44WaiGh', asin: 'B00178RING' },
      { shop: 'Fiebing’s', url: 'https://amzn.to/3Y4IgWW', asin: 'B003W0GFTU' },
    ],
  },

  // Going further
  {
    id: 'awl',
    tier: 'advanced',
    task: 'stitching',
    name: { en: 'Craft awl', fr: 'Alène' },
    description: {
      en: 'Not essential, but recommended: an awl with a handle widens holes, scratches the leather or guides the thread. Cheap but useful.',
      fr: 'Pas indispensable, mais conseillée : une alène avec un manche agrandit les trous, marque le cuir ou guide le fil. Pas chère et bien utile.',
    },
    image: awl,
    alt: { en: 'Three awls with light wooden handles.', fr: 'Trois alènes à manche en bois clair.' },
    offers: [amazon('https://amzn.to/3JNVWAs', 'B01F2Z63R6')],
  },
  {
    id: 'creasing-tool',
    tier: 'advanced',
    task: 'edges',
    name: { en: 'Creasing tool', fr: 'Fileteuse' },
    description: {
      en: 'Optional, but recommended for a professional look: it draws a decorative line along the edges. I use a 2 mm spacing.',
      fr: 'Facultative, mais conseillée pour un rendu professionnel : elle trace un filet décoratif le long des tranches. J’utilise un écartement de 2 mm.',
    },
    image: creasingTool,
    alt: { en: 'Three creasing tools with brass ferrules, resting on a strip of orange leather.', fr: 'Trois fileteuses à virole en laiton, posées sur une bande de cuir orange.' },
    offers: [amazon('https://amzn.to/3HHVFfJ', 'B07SMRKJ8G')],
  },
  {
    id: 'alcohol-burner',
    tier: 'advanced',
    task: 'edges',
    name: { en: 'Alcohol burner', fr: 'Lampe à alcool' },
    description: {
      en: 'For neat decorative lines, warm the creasing tool on this burner before running it on the leather.',
      fr: 'Pour des filets bien nets, faites chauffer la fileteuse sur cette lampe avant de la passer sur le cuir.',
    },
    image: alcoholBurner,
    alt: { en: 'A small lit stainless steel alcohol burner next to its cap.', fr: 'Une petite lampe à alcool en inox allumée, à côté de son capuchon.' },
    offers: [amazon('https://amzn.to/3YvkOkK', 'B0897VSS1D')],
  },
  {
    id: 'triangle-punch',
    tier: 'advanced',
    task: 'cutting',
    name: { en: 'Triangle-shaped punch set', fr: 'Emporte-pièces triangulaires' },
    description: {
      en: 'If you make belts or straps, or want rounded corners on your wallets, I recommend this set. And a mallet!',
      fr: 'Si vous faites des ceintures ou des bracelets, ou si vous voulez des coins arrondis sur vos portefeuilles, je recommande ce jeu. Et un maillet !',
    },
    image: trianglePunch,
    alt: { en: 'A hand pressing a punch on the end of a leather strap.', fr: 'Une main appuyant un emporte-pièce sur le bout d’une lanière de cuir.' },
    offers: [amazon('https://amzn.to/3Xg0EKp', 'B07SMVDDPP')],
  },
  {
    id: 'curvy-punch',
    tier: 'advanced',
    task: 'cutting',
    name: { en: 'Curved punch set', fr: 'Emporte-pièces arrondis' },
    description: {
      en: 'An optional set I use for curved ends or curved pocket tops, instead of flat ones. You can also cut them by hand.',
      fr: 'Un jeu facultatif que j’utilise pour des bouts arrondis ou des hauts de poche courbes, au lieu de bords droits. Vous pouvez aussi les découper à la main.',
    },
    image: curvyPunch,
    alt: { en: 'A row of steel punches with curved blades of different widths.', fr: 'Une rangée d’emporte-pièces en acier à lames courbes de différentes largeurs.' },
    offers: [amazon('https://amzn.to/40H5uTN', 'B088FNS1H4')],
  },
  {
    id: 'bone-folder',
    tier: 'advanced',
    task: 'assembly',
    name: { en: 'Bone folder and shaping tool', fr: 'Plioir et outil de mise en forme' },
    description: {
      en: 'Helps you fold leather, make padded pieces or shape the pockets of a wallet, for instance.',
      fr: 'Pour plier le cuir, faire des pièces rembourrées ou mettre en forme les poches d’un portefeuille, par exemple.',
    },
    image: boneFolder,
    alt: { en: 'A hand holding a white bone folder.', fr: 'Une main tenant un plioir blanc.' },
    offers: [amazon('https://amzn.to/3jFClb8', 'B094YHDS41')],
  },
  {
    id: 'french-skiver',
    tier: 'advanced',
    task: 'cutting',
    name: { en: 'French skiving tool', fr: 'Couteau à parer français' },
    description: {
      en: 'Great to prepare folds, skive pocket layers or sometimes bevel. I bought a 4 mm and an 8 mm, and I am happy with them.',
      fr: 'Idéal pour préparer les plis, parer les sous-poches ou parfois abattre les arêtes. J’ai pris un 4 mm et un 8 mm, et j’en suis content.',
    },
    image: frenchSkiver,
    alt: { en: 'A French skiving tool taking a thin curl off the surface of the leather.', fr: 'Un couteau à parer français qui enlève un fin copeau à la surface du cuir.' },
    offers: [amazon('https://amzn.to/3XnVhc4', 'B07CVVRS1C')],
  },
  {
    id: 'groover',
    tier: 'advanced',
    task: 'stitching',
    name: { en: 'Grooving tool', fr: 'Abaisse-couture' },
    description: {
      en: 'Hides part of the stitching in the thickness of the leather, or draws decorative lines. I also use it to fold thin pieces.',
      fr: 'Pour cacher une partie de la couture dans l’épaisseur du cuir, ou tracer des lignes décoratives. Je m’en sers aussi pour plier les pièces fines.',
    },
    image: groover,
    alt: { en: 'A groover with an adjustable guide cutting a channel near the edge of the leather.', fr: 'Un abaisse-couture à guide réglable qui creuse un sillon près du bord du cuir.' },
    offers: [amazon('https://amzn.to/3HU6cEB', 'B081LZZYBH')],
  },
  {
    id: 'rougher',
    tier: 'advanced',
    task: 'assembly',
    name: { en: 'Rougher', fr: 'Grattoir' },
    description: {
      en: 'Roughens both sides of the leather before gluing, so contact glue holds much better. Coarse sandpaper also works.',
      fr: 'Il gratte le cuir des deux côtés avant l’encollage, pour que la colle contact tienne bien mieux. Un papier de verre à gros grain fonctionne aussi.',
    },
    image: rougher,
    alt: { en: 'A metal rougher scratching the surface of a dark leather.', fr: 'Un grattoir en métal qui griffe la surface d’un cuir foncé.' },
    offers: [amazon('https://amzn.to/3E2DSPw', 'B09YCT632J')],
  },

  // Higher quality
  {
    id: 'sinabroks-irons',
    tier: 'quality',
    task: 'stitching',
    name: { en: 'Sinabroks French-style irons', fr: 'Griffes à la française Sinabroks' },
    description: {
      en: 'Both the ergonomics and the function won me over. The prongs are long, thin, sharp and rounded: they go deep into the leather and come out effortlessly.',
      fr: 'L’ergonomie comme le fonctionnement m’ont séduit. Les dents sont longues, fines, affûtées et arrondies : elles entrent profondément dans le cuir et ressortent sans effort.',
    },
    image: sinabroksIrons,
    alt: { en: 'A Sinabroks pricking iron with long, thin prongs.', fr: 'Une griffe Sinabroks aux dents longues et fines.' },
    offers: [{ shop: 'Sinabroks', url: 'https://sinabroks.com/products/prickingirons-twv?sca_ref=4575682.PUcv2uufjz&variant=41873221157061' }],
  },
  {
    id: 'sinabroks-punches',
    tier: 'quality',
    task: 'stitching',
    name: { en: 'Sinabroks round hole punches', fr: 'Emporte-pièces ronds Sinabroks' },
    description: {
      en: 'Every round hole iron I used ended up clogged. These are designed to clear the leather while you punch.',
      fr: 'Toutes les griffes à trous ronds que j’ai utilisées finissaient bouchées. Celles-ci sont conçues pour évacuer le cuir pendant la frappe.',
    },
    image: sinabroksPunches,
    alt: { en: 'A hand holding a Sinabroks round hole punch on leather.', fr: 'Une main tenant un emporte-pièce à trous ronds Sinabroks sur du cuir.' },
    offers: [{ shop: 'Sinabroks', url: 'https://sinabroks.com/collections/all/products/stitchingpunch?sca_ref=4575682.PUcv2uufjz&variant=41357995278533' }],
  },
  {
    id: 'kemovan-beveler',
    tier: 'quality',
    task: 'edges',
    name: { en: 'KemovanCraft edge beveler', fr: 'Abat-carre KemovanCraft' },
    description: {
      en: 'In my experience, not every KemovanCraft tool is worth it. But some are beautiful, well made, pre-sharpened and handy, like this beveler, available with several wooden handles.',
      fr: 'D’après mon expérience, tous les outils KemovanCraft ne se valent pas. Mais certains sont beaux, bien faits, livrés affûtés et pratiques, comme cet abat-carre, proposé avec plusieurs manches en bois.',
    },
    image: kemovanBeveler,
    alt: { en: 'Three KemovanCraft edge bevelers with dark wooden handles.', fr: 'Trois abat-carres KemovanCraft à manche en bois foncé.' },
    offers: [{ shop: 'KemovanCraft', url: 'https://tidd.ly/44dEAof' }],
  },
  {
    id: 'kemovan-skivers',
    tier: 'quality',
    task: 'cutting',
    name: { en: 'KemovanCraft French skivers', fr: 'Couteaux à parer KemovanCraft' },
    description: {
      en: 'Well designed again, and they arrive sharpened. I took a size 4 and a size 8, but the 4 no longer seems to be available.',
      fr: 'Encore un beau dessin, et ils arrivent affûtés. J’ai pris une taille 4 et une taille 8, mais la 4 ne semble plus disponible.',
    },
    image: kemovanSkivers,
    alt: { en: 'Four KemovanCraft skiving knives with wooden handles on a walnut board.', fr: 'Quatre couteaux à parer KemovanCraft à manche en bois sur une planche en noyer.' },
    offers: [{ shop: 'KemovanCraft', url: 'https://tidd.ly/3LjD8br' }],
  },
  {
    id: 'kemovan-groover',
    tier: 'quality',
    task: 'stitching',
    name: { en: 'KemovanCraft groover', fr: 'Abaisse-couture KemovanCraft' },
    description: {
      en: 'I do not own this one, but a friend swears by it: “good feeling in hand, cuts like a warm knife in butter, and really beautiful”.',
      fr: 'Je ne l’ai pas, mais un ami le recommande vivement : « bonne prise en main, coupe comme un couteau chaud dans du beurre, et vraiment beau ».',
    },
    image: kemovanGroover,
    alt: { en: 'Several KemovanCraft groovers with brass guides and wooden handles.', fr: 'Plusieurs abaisse-coutures KemovanCraft à guide en laiton et manche en bois.' },
    offers: [{ shop: 'KemovanCraft', url: 'https://tidd.ly/3FrDWsd' }],
  },
];
