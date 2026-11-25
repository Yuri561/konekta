import { useEffect, useId, useState, type ChangeEvent } from 'react';
import { Camera, ImagePlus, RefreshCcw, Trash2, UploadCloud } from 'lucide-react';

interface ImageUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  label?: string;
  required?: boolean;
}

const MAX_BYTES = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function ImageUpload({
  file,
  onChange,
  label = 'Foto pwodwi a',
  required = false,
}: ImageUploadProps) {
  const id = useId();
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!file) {
      setPreview('');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError('Chwazi yon foto JPG, PNG oswa WebP.');
      event.target.value = '';
      return;
    }

    if (selected.size > MAX_BYTES) {
      setError('Foto a twò gwo. Limit la se 8 MB.');
      event.target.value = '';
      return;
    }

    setError('');
    onChange(selected);
    event.target.value = '';
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-bold text-[#405A4B]">
          {label} {required ? '*' : '(opsyonèl)'}
        </label>
        <span className="text-xs text-muted">JPG, PNG, WebP · max 8 MB</span>
      </div>

      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={selectPhoto}
        className="sr-only"
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {preview ? (
        <div className="relative overflow-hidden rounded-3xl border border-[#dde8dc] bg-mint">
          <img
            src={preview}
            alt="Foto ou chwazi a"
            className="h-64 w-full object-cover sm:h-72"
          />
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2">
            <label
              htmlFor={id}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-extrabold text-forest shadow-md"
            >
              <RefreshCcw size={15} /> Chanje foto
            </label>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-extrabold text-red-700 shadow-md"
            >
              <Trash2 size={15} /> Retire foto
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="group flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#9fbfa7] bg-[#f5f9f2] px-6 py-10 text-center transition hover:border-forest hover:bg-mint focus-within:ring-2 focus-within:ring-forest"
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-forest shadow-sm">
            <ImagePlus size={28} />
          </span>
          <span className="mt-4 text-base font-extrabold text-forest">
            Peze isit la pou chwazi yon foto
          </span>
          <span className="mt-2 max-w-xs text-sm leading-6 text-muted">
            Chwazi yon foto nan galri telefòn ou oswa nan òdinatè ou.
          </span>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-bold text-white">
            <UploadCloud size={16} /> Chwazi nan galri
          </span>
        </label>
      )}

      {file && (
        <p className="flex items-center gap-2 text-xs text-muted">
          <Camera size={15} /> {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
