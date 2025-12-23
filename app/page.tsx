 import { Hero } from '@/components/Hero';
 import { Integrations } from '@/components/Integrations';
 import { CodeComparison } from '@/components/CodeComparison';
 import { Features } from '@/components/Features';
 import { UseCases } from '@/components/UseCases';
 import { Deployment } from '@/components/Deployment';
 import { CTA } from '@/components/CTA';
 import { FAQ } from '@/components/FAQ';
 
 export default function HomePage() {
   return (
     <>
       <Hero />
       <Integrations />
       <CodeComparison />
       <Features />
       <UseCases />
       <Deployment />
       <CTA />
       <FAQ />
     </>
   );
 }
