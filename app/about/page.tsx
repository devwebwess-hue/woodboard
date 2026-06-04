'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Award, Shield, Package, Truck, Zap, Leaf, MapPin, Phone, Mail } from 'lucide-react'
import { BackButton } from '@/components/BackButton'

/* ─── Data ─────────────────────────────────────────────────────── */

const stats = [
  { value: '15+',    label: "Années d'expertise",     desc: 'Importation et distribution depuis 2010' },
  { value: '500+',   label: 'Références en stock',    desc: 'Disponibilité permanente sur tout le catalogue' },
  { value: '1 000+', label: 'Clients professionnels', desc: 'Architectes, designers, entreprises de construction' },
  { value: '4',      label: 'Lignes de produits',     desc: 'MDF, Mélamine, High Gloss, Plans de travail' },
  { value: '12+',    label: 'Pays fournisseurs',      desc: 'Sourcing exclusif Allemagne, Italie, Autriche, Pologne' },
  { value: '3 000m²', label: 'Espace de stockage',   desc: 'Zone industrielle Beni Merad, Blida' },
]

const values = [
  { icon: Award,   title: 'Qualité Premium',         desc: 'Chaque produit répond aux normes E1, CE, ISO 9001.' },
  { icon: Shield,  title: 'Importateur Européen',    desc: 'Approvisionnement direct auprès de fabricants certifiés.' },
  { icon: Package, title: 'Stock Permanent',         desc: 'Disponibilité garantie pour chaque urgence chantier.' },
  { icon: Truck,   title: 'Livraison Nationale',     desc: 'Distribution B2B rapide vers toutes les wilayas.' },
  { icon: Zap,     title: 'Innovation Continue',     desc: 'Nouvelles collections introduites chaque saison.' },
  { icon: Leaf,    title: 'Éco-responsable',         desc: 'Bois sourcé durablement, production certifiée.' },
]

const milestones = [
  { year: '2010', label: 'Fondation', desc: 'Création de Wood Board à Beni Merad, Blida.' },
  { year: '2014', label: 'Expansion', desc: 'Ouverture du showroom de 1 200m² et agrandissement du stock.' },
  { year: '2018', label: 'Certification', desc: 'Obtention des certifications E1 et ISO 9001 pour tous les produits.' },
  { year: '2022', label: 'Innovation', desc: 'Lancement des collections Super Matt et High Gloss premium.' },
  { year: '2024', label: 'Distribution', desc: 'Couverture nationale — livraison B2B vers toutes les wilayas.' },
]

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ═══ HERO ════════════════════════════════════════════════════ */}
      <section
        className="relative bg-[#1A1C20] pt-[68px] pb-24 overflow-hidden"
        aria-label="En-tête À Propos"
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />

        {/* Gold glow */}
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#D9A05B 0%,transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-20">
          <div className="mb-6">
            <BackButton className="text-white/45 hover:text-white" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-10 bg-[#D9A05B]/60" aria-hidden="true" />
              <span className="text-[#D9A05B]/70 text-[9px] font-semibold tracking-[0.4em] uppercase">
                Notre Histoire
              </span>
            </div>
            <h1
              className="font-black text-white tracking-tight leading-[1.02] mb-7"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)' }}
            >
              L'Innovation au Service<br />
              de l'Aménagement.
            </h1>
            <p className="text-white/38 text-lg max-w-2xl leading-relaxed font-light">
              Wood Board est le partenaire de confiance des architectes, designers et professionnels algériens de l'aménagement intérieur depuis plus de 15 ans. Nous importons et distribuons exclusivement des panneaux de haute performance d'origine européenne.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 1 — Notre Vision ══════════════════════════════ */}
      <section className="py-28 bg-[#F9F9F6]" aria-label="Notre vision">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-7">
                <div className="h-px w-10 bg-[#D9A05B]/60" aria-hidden="true" />
                <span className="text-[#D9A05B]/70 text-[9px] font-semibold tracking-[0.4em] uppercase">
                  Notre Vision
                </span>
              </div>
              <h2
                className="font-black text-[#1A1C20] tracking-tight leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
              >
                La Qualité Européenne,<br />
                Accessible en Algérie.
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed font-light mb-6">
                Depuis notre création, notre mission est simple : offrir aux professionnels algériens de l'architecture et du design l'accès aux panneaux MDF, Mélamine, High Gloss et plans de travail les plus performants d'Europe.
              </p>
              <p className="text-zinc-500 text-base leading-relaxed font-light mb-10">
                Chaque produit de notre catalogue est sélectionné selon des critères stricts de qualité — conformité aux normes européennes E1, CE et ISO 9001 — pour garantir des réalisations durables, esthétiques et techniquement irréprochables.
              </p>

              {/* Value propositions */}
              <div className="space-y-5">
                {[
                  { title: 'Pour les architectes', desc: 'Des matériaux de précision qui respectent vos cahiers des charges les plus exigeants.' },
                  { title: 'Pour les designers', desc: 'Des collections renouvelées chaque saison pour rester à la pointe des tendances décoratives.' },
                  { title: 'Pour les entreprises', desc: 'Des tarifs B2B dégressifs, stock permanent et livraison rapide pour vos chantiers.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-px bg-[#D9A05B]/35 flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-[#1A1C20] text-sm mb-0.5">{item.title}</p>
                      <p className="text-zinc-400 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Values grid */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-2 gap-3"
            >
              {values.map((val, i) => {
                const Icon = val.icon
                return (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i, duration: 0.5 }}
                    className="bg-white p-6 border border-zinc-100 hover:border-[#D9A05B]/25 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 border border-zinc-100 group-hover:border-[#D9A05B]/30 flex items-center justify-center mb-4 transition-colors duration-300">
                      <Icon size={14} className="text-[#D9A05B]" />
                    </div>
                    <h3 className="font-bold text-[#1A1C20] text-sm mb-1.5 tracking-tight">{val.title}</h3>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">{val.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — Nos Installations (Stats grid) ══════════════ */}
      <section className="py-28 bg-[#1A1C20]" aria-label="Nos installations">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end mb-16"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-[#D9A05B]/60" aria-hidden="true" />
                <span className="text-[#D9A05B]/65 text-[9px] font-semibold tracking-[0.4em] uppercase">
                  Nos Installations
                </span>
              </div>
              <h2
                className="font-black text-white tracking-tight leading-tight mb-5"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
              >
                Capacité Industrielle<br />
                & Showroom
              </h2>
              <p className="text-white/35 text-base font-light max-w-xl leading-relaxed">
                Situé en zone industrielle à Beni Merad, Blida, notre entrepôt de 3 000m² et notre showroom sont la vitrine de l'excellence europénne en Algérie.
              </p>
            </div>
            <div className="flex items-center gap-3 text-white/30 text-sm">
              <MapPin size={14} className="text-[#D9A05B]/60" />
              <span>Zone Industrielle, Beni Merad, Blida</span>
            </div>
          </motion.div>

          {/* Stats grid — structural CSS grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-[#1A1C20] p-8 group hover:bg-[#222428] transition-colors duration-300"
              >
                <p
                  className="font-black text-[#D9A05B] tracking-tight mb-2 leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  {stat.value}
                </p>
                <p className="text-white font-bold text-sm tracking-tight mb-2">{stat.label}</p>
                <p className="text-white/28 text-xs font-light leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-16 pt-16 border-t border-white/8"
          >
            <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/25 mb-10">
              Chronologie
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative">
                  {/* Connector line */}
                  {i < milestones.length - 1 && (
                    <div className="hidden lg:block absolute top-3 left-[calc(100%+8px)] w-full h-px bg-white/8" aria-hidden="true" />
                  )}
                  <div className="w-6 h-6 border border-[#D9A05B]/35 flex items-center justify-center mb-4">
                    <div className="w-1.5 h-1.5 bg-[#D9A05B]/60 rounded-full" />
                  </div>
                  <p className="text-[#D9A05B]/65 text-[10px] font-black tracking-[0.22em] mb-1">{m.year}</p>
                  <p className="text-white font-bold text-sm mb-1.5 tracking-tight">{m.label}</p>
                  <p className="text-white/28 text-xs font-light leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 3 — Contact / CTA ══════════════════════════════ */}
      <section className="py-24 bg-[#F9F9F6]" aria-label="Contact et localisation">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">

            {/* Left: CTA block */}
            <div>
              <div className="flex items-center gap-4 mb-7">
                <div className="h-px w-10 bg-[#D9A05B]/60" aria-hidden="true" />
                <span className="text-[#D9A05B]/70 text-[9px] font-semibold tracking-[0.4em] uppercase">
                  Commençons
                </span>
              </div>
              <h2
                className="font-black text-[#1A1C20] tracking-tight leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
              >
                Votre prochain projet<br />
                mérite le meilleur.
              </h2>
              <p className="text-zinc-400 text-base font-light leading-relaxed mb-10 max-w-lg">
                Contactez notre équipe commerciale pour un devis personnalisé ou visitez notre showroom à Beni Merad, Blida pour découvrir l'ensemble de nos collections en situation réelle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  id="about-cta-devis"
                  className="inline-flex items-center gap-2.5 bg-[#1A1C20] hover:bg-[#D9A05B] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
                >
                  Demander un Devis
                  <ArrowRight size={12} />
                </Link>
                <Link
                  href="/catalog"
                  id="about-cta-catalogue"
                  className="inline-flex items-center gap-2.5 border border-[#1A1C20] text-[#1A1C20] hover:border-[#D9A05B] hover:text-[#D9A05B] text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
                >
                  Voir le Catalogue
                </Link>
              </div>
            </div>

            {/* Right: Contact card */}
            <div className="bg-[#1A1C20] p-8">
              <p className="text-[8.5px] font-bold tracking-[0.35em] uppercase text-[#D9A05B]/55 mb-7">
                Nos Coordonnées
              </p>
              <address className="not-italic space-y-5 mb-8">
                <div className="flex items-start gap-3.5">
                  <MapPin size={13} className="text-[#D9A05B]/55 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/65 text-sm leading-relaxed">Zone Industrielle</p>
                    <p className="text-white/65 text-sm">Beni Merad, Blida — Algérie</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <Phone size={13} className="text-[#D9A05B]/55 flex-shrink-0" />
                  <a href="tel:+213000000000" className="text-white/65 hover:text-[#D9A05B]/90 text-sm transition-colors">
                    +213 (0) 00 00 00 00
                  </a>
                </div>
                <div className="flex items-center gap-3.5">
                  <Mail size={13} className="text-[#D9A05B]/55 flex-shrink-0" />
                  <a href="mailto:contact@woodboard.dz" className="text-white/65 hover:text-[#D9A05B]/90 text-sm transition-colors">
                    contact@woodboard.dz
                  </a>
                </div>
              </address>
              <div className="pt-6 border-t border-white/8">
                <p className="text-[9px] text-white/22 uppercase tracking-[0.3em] mb-1">Horaires</p>
                <p className="text-white/40 text-sm">Dimanche — Jeudi</p>
                <p className="text-white/40 text-sm">08h00 – 17h00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
