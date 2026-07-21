// app/_lib/data.ts

export type EffectType = 'float' | 'rotate' | 'drag' | 'wobble' | 'rise'
export type ImagePosition = 'left' | 'right'

export interface Service {
  id: string
  title: string
  subtitle?: string
  description: string
  imageSrc: string
  bgImageSrc: string // <-- Added dynamic background image
  effect: EffectType
  imagePosition: ImagePosition
}

export interface Value {
  id: string
  icon: string
  label: string
}

export interface MetierIcon {
  id: string
  icon: string
  label: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
  website: string
}

// ─── Services ──────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: 'marketing-strategy',
    title: 'Conseil en Marketing',
    subtitle: 'et Stratégie',
    description:
      "Notre équipe de professionnels offre toute son expérience pour élaborer un plan sur le long terme, orienté vers la consolidation qui identifie et définit à la fois actions et tactiques de manière immédiate, pour détecter et favoriser la valeur de vos produits et services. Nous définissons la stratégie de l'entreprise, et le positionnement de chaque branche d'activités, afin d'élaborer une feuille de route qui permettra aux entreprises, de grandir rapidement et de manière stable.",
    imageSrc: '/images/main-mask.png',
    bgImageSrc: '/images/bg-marketing.png', // Replace with your actual background asset
    effect: 'float',
    imagePosition: 'left',
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    description:
      "Nous vous accompagnons dans la construction d'une marque forte, cohérente et distinctive. De l'architecture de marque à l'identité visuelle, en passant par le positionnement et le discours de marque, nous développons des stratégies qui créent un lien émotionnel durable avec vos audiences et génèrent une valeur de marque tangible sur le long terme.",
    imageSrc: '/images/drum-art.png',
    bgImageSrc: '/images/bg-brand.png', // Replace with your umbrella background asset
    effect: 'rotate',
    imagePosition: 'right',
  },
  {
    id: 'communication-crise',
    title: 'Communication de Crise',
    description:
      "L'imprévision est toujours possible dans la gestion de toute entreprise. La communication de crise, c'est la capacité à faire face à l'adversité, à gérer des situations difficiles, et à maintenir la confiance de vos parties prenantes. MARKHENTY CONSULTING vous prépare en amont et vous accompagne en temps réel pour protéger votre réputation.",
    imageSrc: '/images/pot-art.png',
    bgImageSrc: '/images/bg-crisis.png', // Replace with your textured background asset
    effect: 'wobble',
    imagePosition: 'left',
  },
  {
    id: 'strategie-media',
    title: "Stratégie Média et Achats",
    subtitle: "d'Espaces Publicitaires",
    description:
      "Nous parlons votre langage et celui de vos clients. Notre approche data-driven nous permet de définir le mix média le plus efficace pour votre marque, d'optimiser vos investissements publicitaires et de maximiser votre visibilité sur tous les canaux — digitaux, print, audiovisuels et outdoor.",
    imageSrc: '/images/art.png',
    bgImageSrc: '/images/bg-media.png', // Replace with your vintage TV background asset
    effect: 'drag',
    imagePosition: 'right',
  },
  {
    id: 'training',
    title: 'Training',
    description:
      "Nous accompagnons vos équipes dans le développement de leurs compétences marketing et stratégiques. Nos programmes de formation sur mesure couvrent la stratégie de marque, le marketing digital, la communication de crise, et la gestion des espaces publicitaires. Investissez dans votre capital humain pour une croissance durable.",
    imageSrc: '/images/jar-art.png',
    bgImageSrc: '/images/bg-training.png', // Replace with your pottery wheel background asset
    effect: 'rise',
    imagePosition: 'left',
  },
]

// ─── Values ─────────────────────────────────────────────────────────────────

export const values: Value[] = [
  { id: 'integrite', icon: '/images/drummer-icon.png', label: 'INTÉGRITÉ' },
  { id: 'audace', icon: '/images/mascot-icon.png', label: 'AUDACE' },
  { id: 'impact', icon: '/images/warrior-icon.png', label: 'IMPACT' },
]

// ─── Métier Icons ─────────────────────────────────────────────────────────────

export const metierIcons: MetierIcon[] = [
  { id: 'conseil-marketing', icon: '/images/drummer-icon.png', label: 'Conseil en stratégie marketing' },
  { id: 'brand-management', icon: '/images/mask-icon.png', label: 'Conseil en brand managment' },
  { id: 'communication', icon: '/images/mascot-icon.png', label: 'Communication de crise' },
  { id: 'strategie-media', icon: '/images/warrior-icon.png', label: "Stratégie média et achats d'espaces publicitaires" },
  { id: 'formations', icon: '/images/drum-icon.png', label: 'Formations marketing' },
]

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactInfo: ContactInfo = {
  email: 'contact@markhenty.com',
  phone: '(+237) 691 635 799 / 658 026 280',
  address: 'Bastos, face résidence Ambassadeur Arabie Saoudite, Yaoundé, Cameroun',
  website: 'www.markhenty.com',
}