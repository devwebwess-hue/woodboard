'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Send, MapPin, Phone, Mail, Trash2, ArrowRight, Layers, Ruler } from 'lucide-react'
import { isSupabaseConfigured } from '@/lib/supabase'
import { createClient } from '@/utils/supabase/client'
import { BackButton } from '@/components/BackButton'
import Link from 'next/link'
import { useQuote } from '@/context/QuoteContext'

const MATERIAL_OPTIONS = [
  'Panneaux MDF Standard',
  'Panneaux MDF Hydrofuge (HMR)',
  'Mélamine Premier Matt',
  'Mélamine Super Matt',
  'Mélamine High Gloss',
  'Mélamine Décor Bois',
  'Plans de Travail',
  'Slimline Ultra-Fin',
  'Mixte / Plusieurs catégories',
]

interface FormData {
  company_name: string
  contact_name: string
  email: string
  phone: string
  material_type: string
  project_specs: string
}

const INITIAL_FORM: FormData = {
  company_name: '',
  contact_name: '',
  email: '',
  phone: '',
  material_type: '',
  project_specs: '',
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const flushed =
  'w-full border-0 border-b border-zinc-200 bg-transparent pb-3 pt-1 text-base text-[#1A1C20] placeholder:text-zinc-300 focus:outline-none focus:border-[#D9A05B] transition-colors duration-250 rounded-none px-0'

const label =
  'block text-[8.5px] font-black text-zinc-400 tracking-[0.32em] uppercase mb-3'

export default function QuotePage() {
  const supabase = createClient()
  const { items, removeFromQuote, clearQuote } = useQuote()
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (status === 'error') setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    try {
      if (!isSupabaseConfigured) {
        throw new Error(
          "Le service de devis en ligne n'est pas encore configuré. Veuillez nous contacter directement par téléphone au +213 (0) 00 00 00 00 ou par email à devis@woodboard.dz."
        )
      }

      const payload = {
        company_name: form.company_name,
        contact_name: form.contact_name,
        email: form.email,
        phone: form.phone,
        material_type: form.material_type || (items.length > 0 ? items[0].category : 'Non spécifié'),
        project_specs: form.project_specs,
        items: items.map(i => `${i.name} (${i.category} - ${i.finish})`).join(', '),
        items_json: items.map(i => ({ id: i.id, name: i.name, category: i.category, finish: i.finish, thicknesses: i.thicknesses })),
        created_at: new Date().toISOString()
      }

      const { error } = await supabase.from('quote_requests').insert([payload])
      if (error) throw error
      
      setStatus('success')
      setForm(INITIAL_FORM)
      clearQuote() // Clear global cart on successful submission
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Une erreur est survenue. Contactez-nous directement.'
      )
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F9F6] pt-[68px]">

      {/* Page header */}
      <div className="bg-[#1A1C20] text-white py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <BackButton className="text-white/45 hover:text-white" />
          </div>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#D9A05B]/60" aria-hidden="true" />
            <span className="text-[#D9A05B]/70 text-[9px] font-semibold tracking-[0.4em] uppercase">
              Demande B2B
            </span>
          </div>
          <h1 className="font-sans font-black text-4xl md:text-5xl tracking-tight mb-4">
            Demander un Devis
          </h1>
          <p className="text-white/40 text-lg max-w-2xl leading-relaxed font-light">
            Remplissez le formulaire ci-dessous pour recevoir une offre personnalisée sous 24h.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── COLUMN 1: Material Selection Summary ── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-zinc-100 p-8 shadow-sm">
              <div className="flex items-center justify-between pb-5 border-b border-zinc-100 mb-6">
                <h2 className="text-[10px] font-black text-[#1A1C20] tracking-[0.35em] uppercase">
                  Sélection de Matériaux
                </h2>
                <span className="bg-[#D9A05B]/15 text-[#D9A05B] text-[9px] font-black tracking-[0.2em] px-2.5 py-1">
                  {items.length} PRODUIT{items.length !== 1 ? 'S' : ''}
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                      Aucun matériau sélectionné. Visitez notre catalogue pour ajouter des échantillons à votre demande de devis.
                    </p>
                    <Link
                      href="/catalog"
                      id="quote-catalog-link"
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A1C20] border-b border-[#1A1C20] pb-0.5 hover:border-[#D9A05B] hover:text-[#D9A05B] transition-colors"
                    >
                      Parcourir le Catalogue
                      <ArrowRight size={10} />
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex gap-4 p-4 border border-zinc-100 bg-[#F9F9F6] group relative"
                      >
                        {/* Swatch gradient preview */}
                        <div
                          className="w-14 h-14 flex-shrink-0 border border-zinc-200 relative overflow-hidden"
                          style={{ background: item.gradient }}
                          role="img"
                          aria-label={`Aperçu ${item.name}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                        </div>

                        {/* Text info */}
                        <div className="flex-1 min-w-0 pr-6">
                          <h3 className="font-sans font-bold text-xs text-[#1A1C20] truncate mb-0.5">
                            {item.name}
                          </h3>
                          <p className="text-zinc-400 text-[10px] tracking-wide mb-1.5 uppercase font-medium">
                            {item.category === 'Worktop' ? 'Plan de Travail' : item.category} · {item.finish}
                          </p>
                          <div className="flex flex-wrap gap-2 text-[9px] text-zinc-500 font-light">
                            <span className="flex items-center gap-1">
                              <Ruler size={8} className="text-[#D9A05B]" />
                              {item.dimensions}
                            </span>
                            <span className="flex items-center gap-1">
                              <Layers size={8} className="text-[#D9A05B]" />
                              {item.thicknesses.join(', ')}
                            </span>
                          </div>
                        </div>

                        {/* Remove item trigger */}
                        <button
                          onClick={() => removeFromQuote(item.id)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-500 transition-colors p-1.5"
                          title="Supprimer la sélection"
                          aria-label={`Supprimer ${item.name} du devis`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* B2B Services checklist */}
            <div className="bg-[#1A1C20] p-8 text-white">
              <p className="text-[8px] font-bold tracking-[0.35em] uppercase text-[#D9A05B]/60 mb-7">
                Garanties Professionnelles Wood Board
              </p>
              <ul className="space-y-5">
                {[
                  { title: 'Stock permanent', desc: 'Livraison nationale rapide depuis Beni Merad, Blida.' },
                  { title: 'Tarifs B2B dégressifs', desc: 'Prix négociés selon les volumes de votre commande.' },
                  { title: 'Certifications EU', desc: 'E1, CE, ISO 9001 — conformité maximale garantie.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="w-px bg-[#D9A05B]/30 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-white/80 text-xs font-semibold mb-0.5">{item.title}</p>
                      <p className="text-white/35 text-[11px] leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── COLUMN 2: Inquiry Form ── */}
          <div className="lg:col-span-7 bg-white p-8 border border-zinc-100 shadow-sm">
            <p className="text-[10px] font-black text-[#1A1C20] tracking-[0.35em] uppercase pb-5 border-b border-zinc-100 mb-8">
              Informations de l'Acheteur B2B
            </p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-16"
                  role="alert"
                  aria-live="polite"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', bounce: 0.4 }}
                    className="mb-7"
                  >
                    <CheckCircle size={48} className="text-[#D9A05B] mx-auto" strokeWidth={1.2} />
                  </motion.div>
                  <h3 className="font-sans font-black text-3xl tracking-tight text-[#1A1C20] mb-3">
                    Demande reçue.
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-10">
                    Notre équipe commerciale analysera vos besoins et vous contactera avec un devis sous 24h ouvrées (Dimanche — Jeudi).
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-zinc-300 pb-0.5 text-zinc-500 hover:border-[#D9A05B] hover:text-[#D9A05B] transition-colors"
                    >
                      Nouvelle demande
                    </button>
                    <Link
                      href="/catalog"
                      className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A1C20] border-b border-[#1A1C20] pb-0.5 hover:border-[#D9A05B] hover:text-[#D9A05B] transition-colors"
                    >
                      Retour au Catalogue
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-10"
                  aria-label="Formulaire de demande de devis"
                >
                  {/* Error display */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        key="err"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start gap-3 border-l-2 border-red-400 pl-4 py-1 text-sm text-red-500 overflow-hidden"
                        role="alert"
                      >
                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Row 1: Company + Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="company_name" className={label}>
                        Nom de l'entreprise *
                      </label>
                      <input
                        id="company_name" type="text" name="company_name"
                        value={form.company_name} onChange={handleChange}
                        required autoComplete="organization"
                        placeholder="Raison sociale"
                        className={flushed}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact_name" className={label}>
                        Nom du contact *
                      </label>
                      <input
                        id="contact_name" type="text" name="contact_name"
                        value={form.contact_name} onChange={handleChange}
                        required autoComplete="name"
                        placeholder="Prénom et Nom"
                        className={flushed}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="email" className={label}>
                        Email professionnel *
                      </label>
                      <input
                        id="email" type="email" name="email"
                        value={form.email} onChange={handleChange}
                        required autoComplete="email"
                        placeholder="email@entreprise.dz"
                        className={flushed}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={label}>
                        Téléphone *
                      </label>
                      <input
                        id="phone" type="tel" name="phone"
                        value={form.phone} onChange={handleChange}
                        required autoComplete="tel"
                        placeholder="+213 0X XX XX XX XX"
                        className={flushed}
                      />
                    </div>
                  </div>

                  {/* Material type selection */}
                  <div>
                    <label htmlFor="material_type" className={label}>
                      Type de matériau désiré
                    </label>
                    <div className="relative">
                      <select
                        id="material_type" name="material_type"
                        value={form.material_type} onChange={handleChange}
                        className={`${flushed} pr-6 appearance-none cursor-pointer`}
                      >
                        <option value="">
                          {items.length > 0
                            ? `Déduit de la sélection (${items[0].category})`
                            : 'Sélectionnez un type de matériau (optionnel)'}
                        </option>
                        {MATERIAL_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                        width="10" height="6" viewBox="0 0 10 6" fill="none"
                        aria-hidden="true"
                      >
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Specs / volumes textarea */}
                  <div>
                    <label htmlFor="project_specs" className={label}>
                      Volume estimé / Spécifications du projet *
                    </label>
                    <textarea
                      id="project_specs" name="project_specs"
                      value={form.project_specs} onChange={handleChange}
                      required rows={4}
                      placeholder="Décrivez votre projet : dimensions personnalisées, quantité en palettes, délais, wilaya de livraison..."
                      className={`${flushed} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      id="quote-submit-btn"
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-3 bg-[#1A1C20] hover:bg-[#D9A05B] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white text-[10px] font-bold tracking-[0.25em] uppercase py-5 transition-all duration-300"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="h-3.5 w-3.5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          Envoyer ma Demande de Devis
                        </>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-zinc-300 mt-4 tracking-wide">
                      * Champs obligatoires — Devis personnalisé sous 24h
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Direct Contact address box */}
      <section className="py-12 bg-white border-t border-zinc-100" aria-label="Nos Coordonnées">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center bg-[#F9F9F6] text-[#D9A05B] flex-shrink-0">
                <Phone size={14} />
              </div>
              <div>
                <p className="text-[8.5px] font-black text-zinc-400 tracking-wider uppercase">Téléphone</p>
                <a href="tel:+213000000000" className="text-sm font-semibold text-[#1A1C20] hover:text-[#D9A05B] transition-colors">
                  +213 (0) 00 00 00 00
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center bg-[#F9F9F6] text-[#D9A05B] flex-shrink-0">
                <Mail size={14} />
              </div>
              <div>
                <p className="text-[8.5px] font-black text-zinc-400 tracking-wider uppercase">Email commercial</p>
                <a href="mailto:devis@woodboard.dz" className="text-sm font-semibold text-[#1A1C20] hover:text-[#D9A05B] transition-colors">
                  devis@woodboard.dz
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center bg-[#F9F9F6] text-[#D9A05B] flex-shrink-0">
                <MapPin size={14} />
              </div>
              <div>
                <p className="text-[8.5px] font-black text-zinc-400 tracking-wider uppercase">Dépôt central</p>
                <p className="text-sm font-semibold text-[#1A1C20]">
                  Beni Merad, Blida — Algérie
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
