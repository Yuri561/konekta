import { useMemo, useState, type FormEvent } from 'react';
import {
  BriefcaseBusiness,
  CheckCircle2,
  Info,
  Plus,
  Search,
} from 'lucide-react';
import {
  seedServices,
  serviceCategories,
  type Service,
  type ServiceCategory,
} from '../data/services';
import { ServiceCard } from '../components/services/ServiceCard';
import { ImageUpload } from '../components/uploads/ImageUpload';
import { saveImage } from '../lib/imageStore';

const STORAGE_KEY = 'konekta-demo-services-v1';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80';

interface ServiceForm {
  title: string;
  provider: string;
  city: string;
  category: ServiceCategory;
  detail: string;
  whatsapp: string;
}

const initialForm: ServiceForm = {
  title: '',
  provider: '',
  city: '',
  category: 'Teknoloji',
  detail: '',
  whatsapp: '',
};

function readServices(): Service[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Service[];
  } catch {
    return [];
  }
}

export function Services() {
  const [added, setAdded] = useState<Service[]>(readServices);
  const [category, setCategory] = useState('Tout');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ServiceForm>(initialForm);
  const [photo, setPhoto] = useState<File | null>(null);
  const [created, setCreated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const services = useMemo(() => {
    return [...added, ...seedServices].filter((service) => {
      const matchCategory = category === 'Tout' || service.category === category;
      const searchable = [
        service.title,
        service.city,
        service.provider,
        service.detail,
      ]
        .join(' ')
        .toLowerCase();
      return matchCategory && searchable.includes(query.toLowerCase());
    });
  }, [added, category, query]);

  function update<K extends keyof ServiceForm>(key: K, value: ServiceForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      const image = photo ? await saveImage(photo) : DEFAULT_IMAGE;
      const service: Service = {
        ...form,
        id: `demo-service-${crypto.randomUUID()}`,
        image,
      };
      const next = [service, ...added];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setAdded(next);
      setForm(initialForm);
      setPhoto(null);
      setCreated(true);
      setShowForm(false);
    } catch {
      setError('Foto a oswa anons la pa t kapab sove. Tanpri eseye ankò.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8">
      <section className="relative overflow-hidden rounded-[32px] bg-deep px-7 py-12 text-white sm:px-12">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-lime/10 blur-2xl" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-lime">
            KONEKTA SÈVIS
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Bon sèvis. Bon koneksyon.
          </h1>
          <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
            Dekouvri teknisyen, atizan, moun kreyatif ak pwofesyonèl endepandan.
            Kontakte yo dirèkteman atravè WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => {
              setShowForm((value) => !value);
              setCreated(false);
            }}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-extrabold text-deep"
          >
            <Plus size={17} /> Ajoute sèvis pa mwen
          </button>
        </div>
      </section>

      <div className="mt-6 flex gap-3 rounded-2xl border border-[#f0e6c4] bg-[#fff9e8] p-4 text-xs leading-6 text-[#837044]">
        <Info size={18} className="shrink-0" />
        <p>
          Sa se yon demonstrasyon. Pwofil ki deja parèt yo se egzanp, yo pa
          verifye. Nou pa gen sistèm peman oswa rezèvasyon sou sit la.
        </p>
      </div>

      {created && (
        <div className="mt-5 flex items-center gap-2 rounded-xl bg-mint p-4 text-sm font-bold text-forest">
          <CheckCircle2 size={18} /> Sèvis ou sove sou aparèy sa a.
        </div>
      )}

      {showForm && (
        <form onSubmit={add} className="mt-7 rounded-[26px] border border-[#e1ebe2] bg-white p-6 shadow-soft sm:p-8">
          <h2 className="font-display text-2xl font-extrabold">Prezante sèvis ou</h2>
          <p className="mt-2 text-sm text-muted">
            Ou kapab chwazi foto nan galri ou. Enfòmasyon sa yo rete sou navigatè a.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">
              Non sèvis la *
              <input
                required
                maxLength={85}
                className="field mt-2"
                value={form.title}
                onChange={(event) => update('title', event.target.value)}
              />
            </label>

            <label className="text-sm font-bold">
              Non biznis / moun *
              <input
                required
                maxLength={65}
                className="field mt-2"
                value={form.provider}
                onChange={(event) => update('provider', event.target.value)}
              />
            </label>

            <label className="text-sm font-bold">
              Vil *
              <input
                required
                maxLength={60}
                className="field mt-2"
                value={form.city}
                onChange={(event) => update('city', event.target.value)}
              />
            </label>

            <label className="text-sm font-bold">
              Kategori *
              <select
                className="field mt-2"
                value={form.category}
                onChange={(event) =>
                  update('category', event.target.value as ServiceCategory)
                }
              >
                {serviceCategories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-bold sm:col-span-2">
              WhatsApp (ak kòd peyi)
              <input
                className="field mt-2"
                type="tel"
                value={form.whatsapp}
                onChange={(event) => update('whatsapp', event.target.value)}
                placeholder="+509 ..."
              />
            </label>

            <div className="sm:col-span-2">
              <ImageUpload
                file={photo}
                onChange={setPhoto}
                label="Foto sèvis la"
              />
            </div>

            <label className="text-sm font-bold sm:col-span-2">
              Dekri sèvis la *
              <textarea
                required
                maxLength={450}
                rows={4}
                className="field mt-2"
                value={form.detail}
                onChange={(event) => update('detail', event.target.value)}
              />
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-forest px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
            >
              {saving ? 'N ap sove...' : 'Pibliye sèvis la'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border px-6 py-3 text-sm font-bold"
            >
              Anile
            </button>
          </div>
        </form>
      )}

      <div className="mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="text-forest" />
          <h2 className="font-display text-2xl font-extrabold">Eksplore sèvis yo</h2>
          <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-forest">
            {services.length}
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-muted" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="field w-full pl-10 md:w-80"
            placeholder="Chèche sèvis oswa vil..."
          />
        </div>
      </div>

      <div className="my-6 flex gap-2 overflow-x-auto pb-2">
        {['Tout', ...serviceCategories].map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-extrabold ${
              category === item
                ? 'bg-forest text-white'
                : 'border border-[#e4ebe3] bg-white text-forest'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {services.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <p className="rounded-3xl bg-mint p-12 text-center text-sm text-forest">
          Pa gen sèvis ki matche ak rechèch la.
        </p>
      )}
    </main>
  );
}
