import {Outlet,ScrollRestoration} from 'react-router-dom';
import {Header} from './Header';import {Footer} from './Footer';
export function Layout(){return <div className="min-h-screen bg-cream font-sans text-ink"><Header/><main><Outlet/></main><Footer/><ScrollRestoration/></div>}
