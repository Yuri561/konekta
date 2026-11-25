import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { products as seedProducts, sellers as seedSellers } from '../data/catalog';
import { saveImage } from '../lib/imageStore';
import { initials } from '../lib/utils';
import type { NewProduct, Product, Seller } from '../types';

interface MarketState {
  products: Product[];
  sellers: Seller[];
  favorites: string[];
  customProducts: Product[];
  toggleFavorite: (id: string) => void;
  addListing: (
    data: Omit<NewProduct, 'image'>,
    sellerName: string,
    sellerLocation: string,
    phone: string,
    photo: File
  ) => Promise<void>;
  removeListing: (id: string) => void;
}

const MarketplaceContext = createContext<MarketState | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [customProducts, setCustomProducts] = useState<Product[]>(() =>
    load('konekta-products', [])
  );
  const [customSellers, setCustomSellers] = useState<Seller[]>(() =>
    load('konekta-sellers', [])
  );
  const [favorites, setFavorites] = useState<string[]>(() =>
    load('konekta-favorites', [])
  );

  useEffect(() => {
    localStorage.setItem('konekta-products', JSON.stringify(customProducts));
  }, [customProducts]);

  useEffect(() => {
    localStorage.setItem('konekta-sellers', JSON.stringify(customSellers));
  }, [customSellers]);

  useEffect(() => {
    localStorage.setItem('konekta-favorites', JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id: string) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  async function addListing(
    data: Omit<NewProduct, 'image'>,
    sellerName: string,
    sellerLocation: string,
    phone: string,
    photo: File
  ) {
    // Save the actual photo first. If this fails, do not publish a broken listing.
    const image = await saveImage(photo);
    const id = `demo-${crypto.randomUUID()}`;
    const sellerId = `seller-${id}`;

    setCustomSellers((previous) => [
      {
        id: sellerId,
        name: sellerName.trim(),
        location: sellerLocation.trim(),
        avatar: initials(sellerName),
        cover: image,
        description: 'Nou kontan pataje pwodwi nou yo sou KONEKTA.',
        verified: false,
        whatsapp: phone.trim(),
        joined: String(new Date().getFullYear()),
      },
      ...previous,
    ]);

    setCustomProducts((previous) => [
      {
        ...data,
        image,
        id,
        name: data.name.trim(),
        sellerId,
        location: sellerLocation.trim(),
        featured: false,
        new: true,
        rating: 0,
        reviews: 0,
      },
      ...previous,
    ]);
  }

  function removeListing(id: string) {
    const listing = customProducts.find((product) => product.id === id);
    if (!listing) return;
    setCustomProducts((previous) => previous.filter((product) => product.id !== id));
    setCustomSellers((previous) =>
      previous.filter((seller) => seller.id !== listing.sellerId)
    );
    setFavorites((previous) => previous.filter((favorite) => favorite !== id));
    // Retained image blobs can be cleaned up when backend storage is introduced.
  }

  return (
    <MarketplaceContext.Provider
      value={{
        products: [...customProducts, ...seedProducts],
        sellers: [...customSellers, ...seedSellers],
        customProducts,
        favorites,
        toggleFavorite,
        addListing,
        removeListing,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used inside MarketplaceProvider');
  }
  return context;
}
