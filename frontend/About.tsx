import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Globe2,
  PackagePlus,
  ShieldCheck,
  Store,
  Trash2,
  Wallet,
} from 'lucide-react';
import { categories } from '../data/catalog';
import { Button } from '../components/ui/Button';
import { ImageUpload } from '../components/uploads/ImageUpload';
import { StoredImage } from '../components/uploads/StoredImage';
import { useMarketplace } from '../context/MarketplaceContext';
import { money } from '../lib/utils';
import type { Category } from '../types';

interface ProductForm {
  sellerName: string;
  location: string;
  phone: string;
  name: string;
  category: Category;
  price: string;
  description: string;
}

const initialForm: ProductForm = {
  sellerName: '',
  location: '',
  phone: '',
  name: '',
  category: 'Atizana',
  price: '',
  description: '',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#405A4B]">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Dashboard() {
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [photo, setPhoto] = useState<File | null>(null);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { addListing, customProducts, removeListing, favorites } = useMarketplace();
  const navigate = useNavigate();

  function update<K extends keyof ProductForm>(key: K, value: ProductForm[K]) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!photo) {
      setError('Tanpri chwazi yon foto pwodwi a nan galri ou.');
      return;
    }

    if (Number(form.price) <= 0) {
      setError('Pri pwodwi a dwe pi gran pase zewo.');
      return;
    }

    setSaving(true);

    try {
      await addListing(
        {
          name: form.name,
          category: form.category,
          price: Number(form.price),
          description: form.description,
        },
        form.sellerName,
        form.location,
        form.phone,
        photo
      );
      setDone(true);
      setPhoto(null);
    } catch {
      setError(
        'Nou pa kapab anrejistre foto a sou aparèy sa a. Tcheke espas navigatè a oswa eseye yon lòt foto.'
      );
    } finally {
      setSaving(false);
    }
  }

  const totalValue = customProducts.reduce((sum, product) => sum + product.price, 0);
  const savedCount = customProducts.filter((product) => favorites.includes(product.id)).length;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <section className="relative overflow-hidden rounded-[32px] bg-forest px-7 py-12 text-white sm:px-12 lg:py-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/10 blur-2xl" />
        <div className="relative">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.2em] text-lime">
            <Store size={16} /> KONEKTA · Espas machann
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Biznis ou merite plis vizibilite.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            Pibliye pwodwi ou ak foto ki soti dirèkteman nan telefòn ou.
            Prezante biznis ou bay kliyan ann Ayiti ak nan dyaspora a.
          </p>
        </div>
      </section>

      <section aria-label="Rezime anons yo" className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Anons demo pa ou', value: String(customProducts.length), icon: PackagePlus },
          { label: 'Valè pwodwi yo', value: money(totalValue), icon: Wallet },
          { label: 'Favori resevwa', value: String(savedCount), icon: Store },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-[#e7ede5] bg-white p-5 shadow-sm">
            <Icon className="text-[#3F9167]" size={21} />
            <p className="mt-4 font-display text-2xl font-extrabold text-forest">{value}</p>
            <p className="mt-1 text-xs font-semibold text-muted">{label}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
        {done ? (
          <div className="rounded-3xl border border-[#d6ebdf] bg-white px-8 py-16 text-center shadow-soft">
            <CheckCircle2 className="mx-auto text-[#2F9B6B]" size={58} />
            <h2 className="mt-6 font-display text-3xl font-extrabold text-forest">
              Bravo! Pwodwi a pibliye nan demo a.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
              Foto a ak anons la sove nan navigatè sa a. Yo pa vizib sou lòt aparèy,
              e yo poko konekte ak yon sèvè.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button onClick={() => navigate('/marketplace')}>
                Wè sou mache a <ArrowRight size={18} />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setDone(false);
                  setForm(initialForm);
                }}
              >
                Ajoute yon lòt
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-soft sm:p-9">
            <div className="flex items-start gap-3">
              <Store className="mt-1 text-[#48966B]" size={24} />
              <div>
                <h2 className="font-display text-xl font-extrabold">Enfòmasyon machann</h2>
                <p className="mt-1 text-sm text-muted">Kiyès ki ap vann pwodwi a?</p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Non biznis ou *">
                <input
                  required
                  maxLength={60}
                  value={form.sellerName}
                  onChange={(event) => update('sellerName', event.target.value)}
                  placeholder="Eg. Atizana Lakay"
                  className="field"
                />
              </Field>
              <Field label="Vil / zòn *">
                <input
                  required
                  maxLength={60}
                  value={form.location}
                  onChange={(event) => update('location', event.target.value)}
                  placeholder="Eg. Jakmèl"
                  className="field"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Nimewo WhatsApp (opsyonèl)">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    placeholder="Eg. +509XXXXXXXX"
                    className="field"
                  />
                </Field>
                <p className="mt-1.5 text-xs text-muted">Ajoute kòd peyi a pou kliyan yo kapab ekri ou.</p>
              </div>
            </div>

            <div className="my-8 border-t border-gray-100" />

            <div className="flex items-start gap-3">
              <PackagePlus className="mt-1 text-[#48966B]" size={25} />
              <div>
                <h2 className="font-display text-xl font-extrabold">Nouvo pwodwi</h2>
                <p className="mt-1 text-sm text-muted">Bay kliyan yo yon bon premye enpresyon.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Non pwodwi a *">
                  <input
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(event) => update('name', event.target.value)}
                    placeholder="Eg. Kafe peyi natirèl"
                    className="field"
                  />
                </Field>
              </div>

              <Field label="Kategori *">
                <select
                  value={form.category}
                  onChange={(event) => update('category', event.target.value as Category)}
                  className="field"
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Pri an dola USD *">
                <input
                  required
                  min="0.01"
                  step="0.01"
                  type="number"
                  value={form.price}
                  onChange={(event) => update('price', event.target.value)}
                  placeholder="25.00"
                  className="field"
                />
              </Field>

              <div className="sm:col-span-2">
                <ImageUpload file={photo} onChange={setPhoto} required />
              </div>

              <div className="sm:col-span-2">
                <Field label="Deskripsyon pwodwi a *">
                  <textarea
                    required
                    maxLength={600}
                    rows={5}
                    className="field resize-y"
                    value={form.description}
                    onChange={(event) => update('description', event.target.value)}
                    placeholder="Pale de kalite pwodwi a, orijin li, sa ki fè li espesyal..."
                  />
                </Field>
                <p className="mt-1 text-right text-xs text-muted">{form.description.length}/600</p>
              </div>
            </div>

            {error && (
              <div role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <Button type="submit" disabled={saving} className="mt-8 w-full sm:w-auto">
              {saving ? 'N ap sove foto a...' : 'Pibliye pwodwi demo a'}
              {!saving && <ArrowRight size={18} />}
            </Button>
          </form>
        )}

        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-mint p-7">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-forest">
              <CircleHelp size={21} /> Kijan li mache?
            </h3>
            <div className="mt-5 space-y-5">
              {[
                { n: '01', title: 'Prezante biznis ou', desc: 'Ekri non biznis, vil, ak WhatsApp ou.' },
                { n: '02', title: 'Chwazi foto nan galri', desc: 'Pa bezwen okenn lyen entènèt pou foto a.' },
                { n: '03', title: 'Pibliye epi teste', desc: 'Gade anons ou sou Marketplace ak paj machann nan.' },
              ].map((step) => (
                <div key={step.n} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-xs font-extrabold text-forest">
                    {step.n}
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold">{step.title}</h4>
                    <p className="mt-1 text-xs leading-5 text-muted">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#e7ede5] bg-white p-7">
            <h3 className="flex items-center gap-2 font-extrabold text-forest">
              <ShieldCheck size={20} /> Sa ou dwe konnen
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Foto yo sove nan depo lokal navigatè ou (IndexedDB). Anons yo sove
              lokalman tou. Si ou efase done sit la, ou ka pèdi yo. Peman,
              kont ak verifikasyon vandè ap vini pita.
            </p>
            <Link to="/roadmap" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-forest">
              <Globe2 size={16} /> Gade vizyon KONEKTA <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </div>

      <section className="mt-12 rounded-3xl border border-[#e7ede5] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-forest">Anons mwen yo</h2>
            <p className="mt-1 text-sm text-muted">Jere pwodwi ou te ajoute sou aparèy sa a.</p>
          </div>
          <span className="rounded-full bg-mint px-4 py-2 text-sm font-bold text-forest">
            {customProducts.length} pwodwi
          </span>
        </div>

        {customProducts.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-[#f5f8f3] p-8 text-center text-sm text-muted">
            Ou poko ajoute okenn pwodwi. Ranpli fòm anlè a pou kòmanse.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {customProducts.map((product) => (
              <article key={product.id} className="flex min-w-0 gap-4 rounded-2xl border border-[#e8eee7] p-3">
                <StoredImage
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-extrabold">{product.name}</h3>
                  <p className="mt-1 text-xs text-muted">{product.category}</p>
                  <p className="mt-2 font-extrabold text-forest">{money(product.price)}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <Link to={`/product/${product.id}`} className="text-xs font-bold text-forest underline">
                      Wè anons
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Ou vle retire anons demo sa a?')) {
                          removeListing(product.id);
                        }
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-700"
                    >
                      <Trash2 size={14} /> Retire
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
