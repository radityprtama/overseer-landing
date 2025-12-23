'use client';

import { useState, useEffect } from 'react';
import { Waypoints, ArrowRight, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Platform', id: 'features' },
    { name: 'Governance', id: 'governance' },
    { name: 'Enterprise', id: 'enterprise' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (!isHome) {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled || isOpen
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/50 h-16 shadow-sm'
            : 'bg-transparent border-transparent h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 group relative z-[101]"
          >
            <div className="p-1.5 bg-brand-500 rounded-lg text-white group-hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20">
              <Waypoints size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-ink-900">
              Overseer
            </span>
          </Link>

          {/* Desktop Nav - Centered horizontally in the remaining space */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Link
               href="/pricing"
               className={`text-sm font-medium hover:text-brand-600 transition-colors relative group ${pathname === '/pricing' ? 'text-brand-600' : 'text-slate-600'}`}
            >
               Pricing
               <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-500 transition-all duration-300 ${pathname === '/pricing' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          </div>

          {/* Desktop Actions - Balanced and centered vertically */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-ink-900 transition-colors mr-2">
              Sign In
            </a>
            <button className="bg-brand-500 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-brand-600 transition-all transform hover:scale-105 shadow-lg shadow-brand-500/20 border border-transparent flex items-center justify-center gap-2">
               <Rocket size={16} />
               <span>Deploy ProxyGate</span>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[101] p-2 text-slate-600 hover:text-ink-900 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-end gap-1.5">
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-white/95 backdrop-blur-xl md:hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Decorative Background Blob */}
        <div className={`absolute top-[-10%] right-[-30%] w-[80vw] h-[80vw] bg-brand-50 rounded-full blur-[100px] transition-transform duration-1000 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`} />

        <div className="h-full flex flex-col justify-center px-8 pt-20 pb-8 relative z-10">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <a 
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-3xl font-display font-bold text-ink-900 flex items-center justify-between group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${100 + i * 50}ms` }}
              >
                {link.name}
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </a>
            ))}
            <Link
              href="/pricing"
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-display font-bold text-ink-900 flex items-center justify-between group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${100 + navLinks.length * 50}ms` }}
            >
              Pricing
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </Link>
          </div>

          <div className={`mt-auto border-t border-slate-100 pt-8 transition-all duration-700 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex flex-col gap-4">
              <a href="#" className="text-center text-slate-500 font-medium py-3 hover:text-ink-900 transition-colors">Sign In</a>
              <div className="flex flex-col gap-3">
                 <button className="w-full bg-brand-500 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-brand-500/20 active:scale-95 transition-all hover:bg-brand-600 flex items-center justify-center gap-2">
                    <Rocket size={20} />
                    <span>Deploy ProxyGate</span>
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
