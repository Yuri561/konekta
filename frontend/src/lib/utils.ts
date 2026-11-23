export const money = (value:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(value);
export const normalizePhone=(value:string)=>value.replace(/\D/g,'');
export const productMessage=(name:string,seller:string)=>`Bonjou ${seller}! Mwen wè "${name}" sou KONEKTA. Èske pwodwi sa a disponib? Mwen ta renmen konnen plis sou pri ak livrezon an. Mèsi!`;
export const whatsappUrl=(message:string,phone?:string)=>`https://wa.me/${phone ? normalizePhone(phone):''}?text=${encodeURIComponent(message)}`;
export const initials=(name:string)=>name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
