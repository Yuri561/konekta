export type Category = 'Atizana' | 'Manje & Bwason' | 'Bote & Swen' | 'Mòd & Akseswa' | 'Lakay & Dekorasyon' | 'Agrikilti';
export interface Seller { id:string; name:string; location:string; avatar:string; cover:string; description:string; verified:boolean; whatsapp?:string; joined:string; }
export interface Product {id:string; name:string; category:Category; price:number; image:string; sellerId:string; location:string; description:string; featured?:boolean; new?:boolean; rating:number; reviews:number; }
export type NewProduct = Pick<Product,'name'|'category'|'price'|'image'|'description'>;
