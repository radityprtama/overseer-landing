 import type { Metadata } from 'next';
 import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
 import './globals.css';
 import { Navbar } from '@/components/Navbar';
 import { Footer } from '@/components/Footer';
 
 const inter = Inter({
   subsets: ['latin'],
   variable: '--font-inter',
   display: 'swap',
 });
 
 const interTight = Inter({
   subsets: ['latin'],
   variable: '--font-inter-tight',
   weight: ['500', '600', '700'],
   display: 'swap',
 });
 
 const spaceGrotesk = Space_Grotesk({
   subsets: ['latin'],
   variable: '--font-space-grotesk',
   display: 'swap',
 });
 
 const jetbrainsMono = JetBrains_Mono({
   subsets: ['latin'],
   variable: '--font-jetbrains-mono',
   display: 'swap',
 });
 
 export const metadata: Metadata = {
   title: 'Overseer - One API. Any Model.',
   description: 'Overseer - One API. Any Model.',
 };
 
 export default function RootLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
   return (
     <html
       lang="en"
       className={`${inter.variable} ${interTight.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
     >
       <body className="bg-surface-subtle text-ink antialiased selection:bg-brand-500 selection:text-white">
         <div className="min-h-screen flex flex-col font-sans">
           <Navbar />
           <main className="flex-grow">{children}</main>
           <Footer />
         </div>
       </body>
     </html>
   );
 }
