import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

type Language = 'typescript' | 'python' | 'curl';

const CODE_DATA = {
  typescript: {
    before: `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'sk-proj-...',
  // Locked to provider
});

const chat = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
});`,
    after: `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OVERSEER_KEY,
  baseURL: 'https://gateway.overseer.ai/v1' // 👈 The only change
});

const chat = await client.chat.completions.create({
  model: 'gpt-4', // Routes to best provider based on policy
  messages: [{ role: 'user', content: 'Hello!' }]
});`
  },
  python: {
    before: `from openai import OpenAI

client = OpenAI(
    api_key="sk-proj-...",
    # Locked to provider
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)`,
    after: `from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OVERSEER_KEY"),
    base_url="https://gateway.overseer.ai/v1" # 👈 The only change
)

response = client.chat.completions.create(
    model="gpt-4", # Routes to best provider based on policy
    messages=[{"role": "user", "content": "Hello!"}]
)`
  },
  curl: {
    before: `curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
    after: `curl https://gateway.overseer.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OVERSEER_KEY" \\
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`
  }
};

const SimpleHighlighter = ({ code, language, isAfter }: { code: string; language: Language; isAfter: boolean }) => {
  // Very basic syntax highlighting for demo purposes
  const lines = code.split('\n');
  
  return (
    <div className="font-mono text-[13px] md:text-sm leading-relaxed">
      {lines.map((line, i) => {
        // Highlight changed lines in the 'After' block
        const isChangedLine = isAfter && (line.includes('gateway.overseer.ai') || line.includes('OVERSEER_KEY'));
        
        let content: React.ReactNode = line;

        // Naive tokenization for colors
        const colorize = (text: string) => {
          if (text.startsWith('//') || text.startsWith('#')) return <span className="text-slate-500 italic">{text}</span>;
          
          const parts = text.split(/('.*?'|".*?"|\bimport\b|\bfrom\b|\bconst\b|\bawait\b|\bnew\b|\bcurl\b)/g);
          return parts.map((part, idx) => {
            if (part === 'import' || part === 'from' || part === 'const' || part === 'await' || part === 'new' || part === 'curl') {
              return <span key={idx} className="text-purple-400">{part}</span>;
            }
            if (part.startsWith("'") || part.startsWith('"')) {
              // Highlight the specific URL heavily if it's the changed line
              if (isChangedLine && part.includes('gateway.overseer.ai')) {
                 return <span key={idx} className="text-brand-300 font-bold bg-brand-500/20 rounded px-1 -mx-1">{part}</span>;
              }
              return <span key={idx} className="text-green-400">{part}</span>;
            }
            return <span key={idx} className="text-slate-300">{part}</span>;
          });
        };

        return (
          <div key={i} className={`relative ${isChangedLine ? 'bg-brand-500/10 -mx-6 px-6 border-l-2 border-brand-500' : ''}`}>
             {colorize(line)}
          </div>
        );
      })}
    </div>
  );
};

export const CodeComparison: React.FC = () => {
  const [activeLang, setActiveLang] = useState<Language>('typescript');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="integration" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-ink-900 mb-4">
              Drop-in compatible. <br/>
              <span className="text-brand-500">Zero refactoring required.</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Overseer implements the standard OpenAI API signature. Just change your base URL and API key to gain instant observability and control.
            </p>
          </div>
          
          {/* Language Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200 self-start md:self-auto">
            {(['typescript', 'python', 'curl'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeLang === lang
                    ? 'bg-white text-ink-900 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Block */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Before */}
          <div className="group relative rounded-2xl bg-ink-900 ring-1 ring-slate-800 shadow-xl overflow-hidden flex flex-col opacity-90 hover:opacity-100 transition-opacity">
            <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 Standard SDK
              </span>
            </div>
            
            <div className="p-6 pt-16 flex-grow overflow-x-auto no-scrollbar">
              <SimpleHighlighter code={CODE_DATA[activeLang].before} language={activeLang} isAfter={false} />
            </div>
          </div>

          {/* After */}
          <div className="group relative rounded-2xl bg-ink-900 shadow-2xl shadow-brand-500/20 overflow-hidden flex flex-col ring-1 ring-brand-500/50">
             <div className="absolute inset-0 bg-brand-500/5 pointer-events-none group-hover:bg-brand-500/10 transition-colors"></div>
             
             {/* Header */}
             <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                <span className="text-xs font-mono text-brand-400 font-bold uppercase tracking-widest">
                  Overseer Enabled
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-16 flex-grow overflow-x-auto relative z-10 no-scrollbar">
               <button 
                  onClick={() => handleCopy(CODE_DATA[activeLang].after, 'after')}
                  className="absolute top-14 right-4 p-2 text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  title="Copy Code"
                >
                  {copied === 'after' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
               </button>

              <SimpleHighlighter code={CODE_DATA[activeLang].after} language={activeLang} isAfter={true} />
            </div>
          </div>

        </div>

        {/* Benefits underneath */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
           <div className="flex items-start gap-3 text-slate-600">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              <p className="text-sm font-medium">Compatible with Vercel AI SDK, LangChain, & LlamaIndex.</p>
           </div>
           <div className="flex items-start gap-3 text-slate-600">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              <p className="text-sm font-medium">No new dependencies. Keep using official provider SDKs.</p>
           </div>
           <div className="flex items-start gap-3 text-slate-600">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              <p className="text-sm font-medium">Instant fallback routing & caching without code changes.</p>
           </div>
        </div>
      </div>
    </section>
  );
};