import { createContext,useContext,useEffect,useState,type ReactNode } from 'react';
import { products as seedProducts,sellers as seedSellers } from '../data/catalog';
import type {NewProduct,Product,Seller} from '../types';
import {initials} from '../lib/utils';
interface MarketState {products:Product[];sellers:Seller[];favorites:string[];toggleFavorite:(id:string)=>void;addListing:(data:NewProduct,sellerName:string,sellerLocation:string,phone:string)=>void;}
const Context=createContext<MarketState|null>(null);
const load=<T,>(key:string, fallback:T):T=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw) as T:fallback;}catch{return fallback;}};
export function MarketplaceProvider({children}:{children:ReactNode}){
  const [customProducts,setCustomProducts]=useState<Product[]>(()=>load('konekta-products',[]));
  const [customSellers,setCustomSellers]=useState<Seller[]>(()=>load('konekta-sellers',[]));
  const [favorites,setFavorites]=useState<string[]>(()=>load('konekta-favorites',[]));
  useEffect(()=>{localStorage.setItem('konekta-products',JSON.stringify(customProducts))},[customProducts]);
  useEffect(()=>{localStorage.setItem('konekta-sellers',JSON.stringify(customSellers))},[customSellers]);
  useEffect(()=>{localStorage.setItem('konekta-favorites',JSON.stringify(favorites))},[favorites]);
  const toggleFavorite=(id:string)=>setFavorites(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const addListing=(data:NewProduct,sellerName:string,sellerLocation:string,phone:string)=>{
    const id=`demo-${Date.now()}`;const sellerId=`seller-${id}`;
    setCustomSellers(prev=>[{id:sellerId,name:sellerName,location:sellerLocation,avatar:initials(sellerName),cover:data.image,description:'Nou kontan pataje pwodwi nou yo sou KONEKTA.',verified:false,whatsapp:phone,joined:String(new Date().getFullYear())},...prev]);
    setCustomProducts(prev=>[{...data,id,name:data.name.trim(),sellerId,location:sellerLocation,featured:false,new:true,rating:0,reviews:0},...prev]);
  };
  return <Context.Provider value={{products:[...customProducts,...seedProducts],sellers:[...customSellers,...seedSellers],favorites,toggleFavorite,addListing}}>{children}</Context.Provider>;
}
export function useMarketplace(){const ctx=useContext(Context);if(!ctx)throw new Error('useMarketplace needs MarketplaceProvider');return ctx;}
