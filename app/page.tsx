'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Shield, Droplets, Zap, Truck, Award, Leaf } from 'lucide-react'
import { BrandRibbon } from '@/components/BrandRibbon'

/* ─── Data ─────────────────────────────────────────────────────── */

const features = [
  { icon: Shield,   title: 'Résistant aux chocs',  desc: 'Haute densité pour usage intensif professionnel.' },
  { icon: Droplets, title: "Résistant à l'eau",     desc: 'Traitement HMR pour espaces humides et cuisines.' },
  { icon: Zap,      title: 'Entretien minimal',     desc: 'Surface lisse anti-traces, rendu impeccable.' },
  { icon: Award,    title: 'Certifié E1 / CE',      desc: 'Conformité aux normes européennes les plus strictes.' },
  { icon: Truck,    title: 'Livraison nationale',   desc: 'Distribution B2B depuis Beni Merad, toute l\'Algérie.' },
  { icon: Leaf,     title: 'Éco-responsable',       desc: 'Bois sourcé durablement, production certifiée.' },
]

const swatchGradient = 'linear-gradient(145deg, #A0855C 0%, #7A5C3E 55%, #4A3020 100%)'

const textureLines = [
  {
    name: 'Bois Naturel', subtitle: 'Collection Wood',
    desc: 'Chêne, noyer, frêne, érable — essences précieuses reproduites avec fidélité.',
    count: '24 références',
    gradient: 'linear-gradient(145deg, #8B7355 0%, #6B5A3E 50%, #4A3728 100%)',
  },
  {
    name: 'Décor', subtitle: 'Collection Decor',
    desc: 'Motifs graphiques contemporains pour intérieurs à forte personnalité.',
    count: '18 références',
    gradient: 'linear-gradient(145deg, #C4B09A 0%, #A09080 50%, #7A7060 100%)',
  },
  {
    name: 'High Gloss', subtitle: 'Collection Brillant',
    desc: 'Ultra-brillant effet laqué pour cuisines et mobilier haut de gamme.',
    count: '15 références',
    gradient: 'linear-gradient(145deg, #E8E8E8 0%, #D0D0D0 50%, #B8C0C8 100%)',
  },
  {
    name: 'Premier Matt', subtitle: 'Collection Mat',
    desc: 'Surface veloutée mate, toucher doux — résidentiel et contract.',
    count: '20 références',
    gradient: 'linear-gradient(145deg, #D4C9BA 0%, #B5A898 50%, #907E6E 100%)',
  },
  {
    name: 'Super Matt', subtitle: 'Collection Ultra-Mat',
    desc: 'Anti-empreintes, résistance exceptionnelle — le prestige absolu.',
    count: '12 références',
    gradient: 'linear-gradient(145deg, #4A4A4A 0%, #303030 50%, #181818 100%)',
  },
]

const inspirations = [
  {
    title: 'Cuisine Contemporaine', category: 'Cuisine', location: 'Alger Centre',
    material: 'Mélamine High Gloss Blanc',
    gradient: 'linear-gradient(145deg, #D0C5B2 0%, #B8A888 40%, #9A8A6E 100%)',
    span: 'col-span-1 row-span-2',
  },
  {
    title: 'Dressing avec Éclairage LED', category: 'Dressing', location: 'Hydra, Alger',
    material: 'Super Matt Anthracite',
    gradient: 'linear-gradient(145deg, #2A2825 0%, #1E1C1A 60%, #0D0D0B 100%)',
    span: 'col-span-2 row-span-1',
  },
  {
    title: 'Bureau Exécutif', category: 'Bureau', location: 'Oran',
    material: 'Noyer Américain Premier Matt',
    gradient: 'linear-gradient(145deg, #5C4535 0%, #3E2E22 60%, #2A1E15 100%)',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Cuisine en U', category: 'Cuisine', location: 'Constantine',
    material: 'MDF Laqué Blanc Perle',
    gradient: 'linear-gradient(145deg, #EDEBE6 0%, #D8D4CC 55%, #C4BEAE 100%)',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Dressing XL Lumineux', category: 'Dressing', location: 'Blida',
    material: 'Chêne Naturel Premier Matt',
    gradient: 'linear-gradient(145deg, #9E7B5A 0%, #7A5C3E 50%, #5C4030 100%)',
    span: 'col-span-2 row-span-1',
  },
  {
    title: 'Comptoir Signature', category: 'Aménagement', location: 'Beni Merad',
    material: 'Plan de Travail Marbre',
    gradient: 'linear-gradient(145deg, #EAE5DF 0%, #D4CCC0 50%, #BEB5A8 100%)',
    span: 'col-span-1 row-span-1',
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.11, duration: 0.6, ease: 'easeOut' as const },
  }),
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ═══ HERO ════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen bg-[#1A1C20] flex items-end pb-16 md:pb-24 overflow-hidden"
        aria-label="Présentation principale"
      >
        {/* Architectural grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />

        {/* Ambient gold glow */}
        <div
          className="absolute top-[-15%] right-[-8%] w-[550px] h-[550px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#D9A05B 0%,transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-36 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 items-end">

            {/* Left — Typography */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 mb-10">
                <div className="h-px w-12 bg-[#D9A05B]/60" aria-hidden="true" />
                <span className="text-[#D9A05B]/75 text-[9px] font-semibold tracking-[0.4em] uppercase">
                  Importateur Européen Certifié — Beni Merad, Blida
                </span>
              </motion.div>

              {/* Headline — large clean sans-serif */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="font-black text-white leading-[1.02] tracking-tight mb-8"
                style={{ fontSize: 'clamp(2.0rem, 6.5vw, 5.2rem)' }}
              >
                L'Excellence du<br />
                <span className="text-[#D9A05B]">Panneau</span><br />
                Décoratif.
              </motion.h1>

              {/* Sub */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-white/38 text-lg leading-relaxed mb-12 max-w-xl font-light"
              >
                Panneaux MDF, Mélamine et plans de travail d'origine européenne. Qualité architecturale pour les professionnels de l'aménagement intérieur en Algérie.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 mb-16">
                <Link
                  href="/catalog"
                  id="hero-cta-catalogue"
                  className="inline-flex items-center gap-3 bg-white text-[#1A1C20] hover:bg-[#D9A05B] hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
                >
                  Voir le Catalogue
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="/quote"
                  id="hero-cta-devis"
                  className="inline-flex items-center gap-3 border border-white/18 hover:border-[#D9A05B]/60 text-white/55 hover:text-[#D9A05B] text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
                >
                  Demander un Devis
                  <ChevronRight size={13} />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-white/8 max-w-lg"
              >
                {[
                  { value: '15+', label: "Années d'expertise" },
                  { value: '500+', label: 'Références stock' },
                  { value: '1 000+', label: 'Clients B2B' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</p>
                    <p className="text-white/22 text-[9.5px] tracking-widest uppercase font-medium">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Material swatch panel + feature grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="hidden lg:flex flex-col gap-2"
            >
              {/* Material swatch — IMAGE CONTAINER for BrandRibbon */}
              <div
                className="relative h-44 overflow-hidden flex-shrink-0"
                style={{ background: swatchGradient }}
                aria-label="Aperçu matériau — Noyer Premium"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20" />

                {/* BrandRibbon — on image container top-left */}
                <div className="absolute top-0 left-0 z-10">
                  <BrandRibbon width={34} height={54} />
                </div>

                {/* Label */}
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-white/40 text-[8.5px] font-semibold tracking-[0.3em] uppercase mb-0.5">
                    Mélamine
                  </p>
                  <p className="text-white font-bold text-sm tracking-tight">
                    Noyer Américain Premier Matt
                  </p>
                </div>

                {/* Finish chip */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-black/30 backdrop-blur-md text-white text-[8px] font-semibold tracking-[0.22em] uppercase px-2.5 py-1.5 border border-white/10">
                    2800 × 2070 mm
                  </span>
                </div>
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-2">
                {features.map((feat) => {
                  const Icon = feat.icon
                  return (
                    <motion.div
                      key={feat.title}
                      whileHover={{ backgroundColor: 'rgba(217,160,91,0.07)' }}
                      className="p-4 border border-white/6 flex flex-col gap-2.5 cursor-default transition-colors duration-300"
                    >
                      <div className="w-6 h-6 flex items-center justify-center border border-[#D9A05B]/20">
                        <Icon size={12} className="text-[#D9A05B]/65" />
                      </div>
                      <div>
                        <h3 className="text-white/75 text-[11px] font-bold mb-0.5 tracking-tight">{feat.title}</h3>
                        <p className="text-white/22 text-[9.5px] leading-relaxed">{feat.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-white/18 text-[7.5px] tracking-[0.4em] uppercase">Découvrir</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/18 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══ INSPIRATIONS — Masonry showroom gallery ═══════════════ */}
      <section className="py-28 bg-[#F9F9F6]" aria-label="Inspirations et réalisations">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end mb-14"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-10 bg-[#D9A05B]/60" aria-hidden="true" />
                <span className="text-[#D9A05B]/70 text-[9px] font-semibold tracking-[0.4em] uppercase">
                  Réalisations
                </span>
              </div>
              <h2 className="font-black text-[#1A1C20] tracking-tight leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Inspirations &<br />
                <span className="text-[#1A1C20]/35 font-light tracking-wide">Aménagement</span>
              </h2>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A1C20]/45 hover:text-[#D9A05B] transition-colors group pb-1 border-b border-transparent hover:border-[#D9A05B]/40"
            >
              Voir le catalogue
              <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Masonry */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
            style={{ gridAutoRows: '220px' }}
          >
            {inspirations.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`relative overflow-hidden group cursor-pointer ${project.span}`}
              >
                {/* Background */}
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ background: project.gradient }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/18 transition-colors duration-500" />

                {/* Text */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    <span className="text-white/45 text-[8.5px] font-bold tracking-[0.3em] uppercase block mb-1">
                      {project.category} · {project.location}
                    </span>
                    <h3 className="text-white font-bold text-base leading-tight tracking-tight drop-shadow mb-0.5">
                      {project.title}
                    </h3>
                    <p className="text-white/45 text-[10px] tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {project.material}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-zinc-300 text-[10px] tracking-[0.22em] uppercase mt-8"
          >
            Réalisations à titre indicatif — Visuels disponibles sur demande
          </motion.p>
        </div>
      </section>

      {/* ═══ TEXTURES — Collections ═════════════════════════════════ */}
      <section className="py-24 bg-white" aria-label="Collections de matériaux">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-[#D9A05B]/60" aria-hidden="true" />
              <span className="text-[#D9A05B]/70 text-[9px] font-semibold tracking-[0.4em] uppercase">
                Nos Collections
              </span>
            </div>
            <h2 className="font-black text-[#1A1C20] tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              Lignes de Matériaux
            </h2>
            <p className="text-zinc-400 text-base max-w-xl leading-relaxed font-light">
              Cinq collections distinctes pour répondre à chaque projet architectural.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-100">
            {textureLines.map((texture, i) => (
              <motion.div
                key={texture.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                className="group bg-white overflow-hidden"
              >
                <div
                  className="h-32 relative overflow-hidden"
                  style={{ background: texture.gradient }}
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-500"
                    style={{ background: texture.gradient }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-400" />
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/35 backdrop-blur-sm text-white/65 text-[8px] tracking-[0.2em] uppercase px-2 py-1">
                      {texture.count}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[#D9A05B]/65 text-[8px] font-bold tracking-[0.3em] uppercase">
                    {texture.subtitle}
                  </span>
                  <h3 className="font-bold text-[#1A1C20] text-lg mt-1.5 mb-2 tracking-tight">
                    {texture.name}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5 font-light">{texture.desc}</p>
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[#1A1C20]/45 hover:text-[#D9A05B] transition-colors group/link"
                  >
                    Explorer
                    <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Dark CTA tile */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-[#1A1C20] p-8 flex flex-col justify-between min-h-[270px]"
            >
              <div>
                <span className="text-[#D9A05B]/55 text-[8px] font-bold tracking-[0.38em] uppercase block mb-6">
                  Commande B2B
                </span>
                <h3 className="font-black text-white text-xl mb-3 tracking-tight leading-tight">
                  Un projet en cours ?
                </h3>
                <p className="text-white/28 text-sm leading-relaxed font-light">
                  Devis personnalisé sous 24h ouvrées. Tarifs professionnels dégressifs.
                </p>
              </div>
              <Link
                href="/quote"
                id="textures-cta-devis"
                className="inline-flex items-center gap-2.5 border border-[#D9A05B]/38 hover:border-[#D9A05B] hover:bg-[#D9A05B]/10 text-[#D9A05B]/75 hover:text-[#D9A05B] text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3.5 mt-8 transition-all duration-300 w-fit"
              >
                Demander un Devis
                <ArrowRight size={11} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═════════════════════════════════════════════ */}
      <section className="py-20 bg-[#F9F9F6] border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="font-black text-[#1A1C20] tracking-tight mb-3"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
              >
                Prêt à passer commande ?
              </h2>
              <p className="text-zinc-400 text-base font-light">
                Notre équipe commerciale vous accompagne sur mesure.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 border border-[#1A1C20] text-[#1A1C20] hover:bg-[#1A1C20] hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase px-7 py-4 transition-all duration-300"
              >
                Voir le Catalogue
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-[#1A1C20] hover:bg-[#D9A05B] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-7 py-4 transition-all duration-300"
              >
                Demander un Devis
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
