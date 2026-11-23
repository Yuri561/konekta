export type ServiceCategory = 'Konstriksyon' | 'Kreyasyon & Design' | 'Teknoloji' | 'Evènman' | 'Bote & Byennèt' | 'Biznis & Tradiksyon';
export interface Service { id:string; title:string; category:ServiceCategory; city:string; provider:string; detail:string; image:string; priceFrom?:number; whatsapp?:string; }
export const serviceCategories:ServiceCategory[]=['Konstriksyon','Kreyasyon & Design','Teknoloji','Evènman','Bote & Byennèt','Biznis & Tradiksyon'];
// All entries below are sample content for frontend demonstration, not real verified vendors.
export const seedServices:Service[]=[
{id:'svc1',title:'Fotografi pwodwi & biznis',category:'Kreyasyon & Design',city:'Pòtoprens',provider:'Studio Kreyatif',detail:'Foto pwofesyonèl pou katalòg ou, rezo sosyal ak kanpay.',image:'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=80',priceFrom:45},
{id:'svc2',title:'Sèvis reparasyon kay',category:'Konstriksyon',city:'Jakmèl',provider:'Bòs Lakay',detail:'Ti travay reparasyon ak renovasyon selon bezwen kliyan an.',image:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80'},
{id:'svc3',title:'Kreyasyon sitwèb pou biznis',category:'Teknoloji',city:'Okap',provider:'Tekno Ayiti',detail:'Sit vitrin ak paj pwodwi pou ti antreprenè.',image:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80'},
{id:'svc4',title:'Dekorasyon evènman',category:'Evènman',city:'Okay',provider:'Bèl Fèt',detail:'Dekorasyon pou maryaj, fèt ak selebrasyon.',image:'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80'},
{id:'svc5',title:'Kwafè & swen cheve',category:'Bote & Byennèt',city:'Sen Mak',provider:'Rasin Bote',detail:'Sèvis swen ak kwafaj ak randevou.',image:'https://images.unsplash.com/photo-1560869713-bf165a9cfac1?w=900&q=80'},
{id:'svc6',title:'Tradiksyon kreyòl, fransè & angle',category:'Biznis & Tradiksyon',city:'Pòtoprens',provider:'Lang Nou',detail:'Tradiksyon dokiman ak kontni pou antreprenè ak dyaspora.',image:'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=900&q=80'}
];
