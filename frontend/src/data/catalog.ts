import type { Category, Product, Seller } from '../types';
export const images = {
  hero:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=85',
  basket:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85',
  craft:'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1000&q=85',
  people:'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1000&q=85',
};
export const categories:{name:Category;emoji:string;subtitle:string}[] = [
  {name:'Atizana',emoji:'🧺',subtitle:'Fèt ak lanmou'},
  {name:'Manje & Bwason',emoji:'🍯',subtitle:'Gou peyi a'},
  {name:'Bote & Swen',emoji:'🌿',subtitle:'Natirèl & lokal'},
  {name:'Mòd & Akseswa',emoji:'👒',subtitle:'Style ayisyen'},
  {name:'Lakay & Dekorasyon',emoji:'🏺',subtitle:'Bèl lakay'},
  {name:'Agrikilti',emoji:'🥑',subtitle:'Dirèk nan jaden'},
];
export const sellers:Seller[] = [
  {id:'s1',name:'Atelye Solèy',location:'Pòtoprens',avatar:'AS',cover:'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1200&q=80',description:'Yon ti atelye k ap kreye bèl atizana ak materyèl lokal, ak anpil pasyon.',verified:true,joined:'2025'},
  {id:'s2',name:'Dousè Lakay',location:'Jakmèl',avatar:'DL',cover:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&q=80',description:'Nou mete gou ak tradisyon Ayiti nan chak pwodwi nou prepare.',verified:true,joined:'2025'},
  {id:'s3',name:'Rasin Natirèl',location:'Okap',avatar:'RN',cover:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80',description:'Pwodwi swen natirèl, enspire pa plant ak konesans tradisyonèl yo.',verified:true,joined:'2026'},
  {id:'s4',name:'Kreyasyon Lakay',location:'Okay',avatar:'KL',cover:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',description:'Akseswa ak atik alamòd ki mete kreyativite ayisyen devan.',verified:false,joined:'2026'},
  {id:'s5',name:'Jaden Vèt',location:'Sen Mak',avatar:'JV',cover:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',description:'Bon pwodwi tè nou an, dirèk nan men kiltivatè yo.',verified:true,joined:'2026'},
];
export const products:Product[] = [
  {id:'p1',name:'Panye atizanal an pay',category:'Atizana',price:38,image:'https://images.unsplash.com/photo-1594224457860-23bdb45f8e3d?w=900&q=85',sellerId:'s1',location:'Pòtoprens',description:'Panye fèt alamen ak yon bèl konsepsyon natirèl. Yon bon chwa pou kado oswa dekorasyon.',featured:true,rating:4.9,reviews:24},
  {id:'p2',name:'Chokola peyi tradisyonèl',category:'Manje & Bwason',price:16,image:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900&q=85',sellerId:'s2',location:'Jakmèl',description:'Yon gou tradisyonèl pou moun ki renmen bon chokola peyi.',featured:true,new:true,rating:4.8,reviews:39},
  {id:'p3',name:'Lwil maskriti natirèl',category:'Bote & Swen',price:22,image:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=85',sellerId:'s3',location:'Okap',description:'Lwil natirèl pou woutin swen cheve ak po.',featured:true,rating:4.9,reviews:16},
  {id:'p4',name:'Sak men kreyasyon lokal',category:'Mòd & Akseswa',price:45,image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85',sellerId:'s4',location:'Okay',description:'Sak elegant pou chak jou, ak style pa nou.',featured:true,rating:4.7,reviews:12},
  {id:'p5',name:'Vaz dekorasyon atizanal',category:'Lakay & Dekorasyon',price:34,image:'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=900&q=85',sellerId:'s1',location:'Pòtoprens',description:'Yon bèl touche senp ak natirèl pou lakay ou.',rating:4.8,reviews:10},
  {id:'p6',name:'Siwo myèl natirèl',category:'Manje & Bwason',price:19,image:'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=900&q=85',sellerId:'s5',location:'Sen Mak',description:'Siwo myèl lokal, bon pou bwason ak manje.',new:true,rating:4.9,reviews:21},
  {id:'p7',name:'Savon fèy ak plant',category:'Bote & Swen',price:12,image:'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=900&q=85',sellerId:'s3',location:'Okap',description:'Savon atizanal pou swen chak jou.',rating:4.6,reviews:8},
  {id:'p8',name:'Kafe lokal griye',category:'Agrikilti',price:24,image:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=85',sellerId:'s5',location:'Sen Mak',description:'Kafe ak bon sant, enspire pa richès tè Ayiti.',new:true,rating:4.9,reviews:32},
];
