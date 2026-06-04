import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'

const companyLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Catalogue Matériaux', href: '/catalog' },
  { label: 'À Propos', href: '/about' },
  { label: 'Demander un Devis', href: '/quote' },
]

const materialLinks = [
  { label: 'Panneaux MDF Standard', href: '/catalog' },
  { label: 'MDF Hydrofuge', href: '/catalog' },
  { label: 'Mélamine Premier Matt', href: '/catalog' },
  { label: 'Mélamine Super Matt', href: '/catalog' },
  { label: 'Collection High Gloss', href: '/catalog' },
  { label: 'Slimline Ultra-Fin', href: '/catalog' },
  { label: 'Plans de Travail', href: '/catalog' },
]

const customLinks = [
  { label: 'Cuisines sur Mesure', href: '/quote' },
  { label: 'Dressings & Placards', href: '/quote' },
  { label: 'Bureaux & Espaces Pro', href: '/quote' },
  { label: 'Agencement Commercial', href: '/quote' },
  { label: 'Façades & Cloisons', href: '/quote' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1A1C20] text-white/40" role="contentinfo">
      {/* Gold top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D9A05B]/60 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">

          {/* Brand — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <div className="mb-7">
              <h2
                className="text-white tracking-[0.42em] text-sm font-light uppercase mb-1.5"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                WOOD BOARD
              </h2>
              <p className="text-[8px] tracking-[0.38em] uppercase text-[#D9A05B]/70">
                Interior Design Panel
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/35 mb-8 max-w-xs">
              Importateur et distributeur de panneaux haute performance d'origine européenne. Partenaire de confiance des professionnels algériens de l'architecture et du design intérieur.
            </p>

            {/* Gold divider motif */}
            <div className="flex items-center gap-2 mb-8">
              <div className="h-px w-10 bg-[#D9A05B]/40" />
              <div className="h-px w-4 bg-[#D9A05B]/20" />
            </div>

            {/* Custom fit-out highlight */}
            <div className="border border-white/8 p-5">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#D9A05B]/70 mb-2">
                Service Premium
              </p>
              <p className="text-white/70 text-sm font-medium mb-1 leading-snug">
                Aménagement et Fabrication sur Mesure
              </p>
              <p className="text-white/30 text-xs leading-relaxed">
                Conception et réalisation de cuisines, dressings, bureaux et espaces commerciaux personnalisés avec nos matériaux premium.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-1.5 mt-4 text-[#D9A05B]/70 hover:text-[#D9A05B] text-[10px] tracking-[0.2em] uppercase transition-colors group"
              >
                Nous contacter
                <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white/20 text-[8px] font-bold tracking-[0.3em] uppercase mb-7">
              Entreprise
            </h3>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/35 hover:text-white/80 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={10}
                      className="text-[#D9A05B]/50 opacity-0 group-hover:opacity-100 -ml-1 transition-all duration-200 group-hover:translate-x-0.5"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h3 className="text-white/20 text-[8px] font-bold tracking-[0.3em] uppercase mb-7">
              Matériaux
            </h3>
            <ul className="space-y-3.5">
              {materialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/35 hover:text-white/80 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={10}
                      className="text-[#D9A05B]/50 opacity-0 group-hover:opacity-100 -ml-1 transition-all duration-200 group-hover:translate-x-0.5"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Sur mesure */}
          <div>
            <h3 className="text-white/20 text-[8px] font-bold tracking-[0.3em] uppercase mb-7">
              Contact
            </h3>
            <address className="not-italic space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={12} className="text-[#D9A05B]/50 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/35 leading-relaxed">
                  Zone Industrielle<br />
                  Beni Merad, Blida<br />
                  <span className="text-white/20">Algérie</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={12} className="text-[#D9A05B]/50 flex-shrink-0" />
                <a href="tel:+213000000000" className="text-sm text-white/35 hover:text-white/70 transition-colors">
                  +213 (0) 00 00 00 00
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={12} className="text-[#D9A05B]/50 flex-shrink-0" />
                <a href="mailto:contact@woodboard.dz" className="text-sm text-white/35 hover:text-white/70 transition-colors">
                  contact@woodboard.dz
                </a>
              </div>
            </address>

            <div className="pt-5 border-t border-white/6">
              <p className="text-[9px] text-white/20 uppercase tracking-widest mb-3.5">
                Fabrication sur mesure
              </p>
              <ul className="space-y-2.5">
                {customLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/30 hover:text-[#D9A05B]/80 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20">
            © {new Date().getFullYear()} Wood Board — Interior Design Panel. Tous droits réservés.
          </p>
          <p className="text-[11px] text-white/15 tracking-wide">
            Qualité Européenne · Distribution Algérie · Beni Merad, Blida
          </p>
        </div>
      </div>
    </footer>
  )
}
