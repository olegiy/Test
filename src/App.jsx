import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    Search,
    FileText,
    Settings,
    History,
    Database,
    Sparkles,
    Command,
    Loader2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { generateVariants } from './lib/image-processing/utils';
import { analyzeManuscript } from './lib/gemini/api';

// Preliminary Header Component
const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                Paleograph
            </span>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Analyzer</a>
            <a href="#" className="hover:text-white transition-colors">Archive</a>
            <button onClick={() => window.location.reload()} className="hover:text-white transition-colors">Reset</button>
        </div>

        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full border border-white/10 transition-all">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
        </button>
    </nav>
);

const Hero = ({ onUpload }) => {
    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => onUpload(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                    <Sparkles className="w-3 h-3" />
                    Gemini 3.0 Pro Powered
                </div>
                <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
                    History, <span className="text-zinc-500">Deciphered.</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
                    Harness the power of double-pass ensemble OCR to transcribe historical manuscripts
                    with unprecedented precision.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <label className="group relative flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer">
                        <Upload className="w-5 h-5" />
                        Upload Manuscript
                        <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
                        <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl group-hover:blur-2xl transition-all -z-10" />
                    </label>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <Command className="w-3 h-3" />
                        <span>Drag and drop image or paste link</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

const Workspace = ({ image, variants, result, status }) => (
    <section className="pt-24 pb-20 px-6 max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex gap-6">
        {/* Image Viewer */}
        <div className="flex-1 glass rounded-3xl overflow-hidden relative border border-white/5 bg-zinc-900/50">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                    Manuscript Viewer
                </div>
            </div>
            <img src={image} className="w-full h-full object-contain" alt="Manuscript" />

            {/* Variant Preview Rail */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
                {variants && Object.entries(variants).map(([name, url]) => (
                    url && (
                        <div key={name} className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 hover:border-indigo-500 transition-colors cursor-pointer group relative">
                            <img src={url} className="w-full h-full object-cover" alt={name} />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] font-bold uppercase">
                                {name}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>

        {/* Transcription Panel */}
        <div className="w-[450px] flex flex-col gap-4">
            <div className="glass rounded-3xl p-6 border border-white/5 flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-400" />
                        Transcription
                    </h2>
                    {status === 'loading' && <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />}
                    {status === 'done' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {status === 'loading' && (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                            <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                            <p className="text-sm font-medium animate-pulse">Gemini is analyzing variants...</p>
                        </div>
                    )}

                    {result ? (
                        <div className="prose prose-invert prose-sm max-w-none">
                            <pre className="text-xs font-mono bg-black/30 p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                                {result}
                            </pre>
                        </div>
                    ) : status !== 'loading' && (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-600 text-center px-10">
                            <AlertCircle className="w-10 h-10 mb-4 opacity-20" />
                            <p className="text-sm">Upload a document to start the intelligent analysis process.</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex gap-2">
                    <button className="flex-1 bg-white/5 hover:bg-white/10 h-10 rounded-xl text-xs font-bold transition-all border border-white/5">
                        Export Markdown
                    </button>
                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 h-10 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20">
                        Copy Text
                    </button>
                </div>
            </div>
        </div>
    </section>
);

function App() {
    const [image, setImage] = useState(null);
    const [variants, setVariants] = useState(null);
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, loading, done, error

    const handleUpload = async (imgData) => {
        setImage(imgData);
        setStatus('loading');

        try {
            // 1. Generate ensemble variants
            const vars = await generateVariants(imgData);
            setVariants(vars);

            // 2. Analyze with Gemini
            const analysis = await analyzeManuscript(vars);
            setResult(analysis);
            setStatus('done');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="fixed inset-0 manuscript-overlay" />
            <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />

            <Navbar />

            <main>
                <AnimatePresence mode="wait">
                    {!image ? (
                        <motion.div
                            key="hero"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Hero onUpload={handleUpload} />

                            <section className="px-6 py-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { icon: Search, title: "Double Pass OCR", desc: "Analyzes original and enhanced image variants for maximal accuracy." },
                                    { icon: FileText, title: "Structure Preservation", desc: "Reconstructs tables, registers, and marginalia in clean Markdown." },
                                    { icon: History, title: "Historical Tuning", desc: "Fine-tuned prompts for medieval, early modern, and cursive styles." }
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        className="glass p-8 rounded-3xl group hover:border-white/20 transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <feature.icon className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                                    </motion.div>
                                ))}
                            </section>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="workspace"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Workspace image={image} variants={variants} result={result} status={status} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {!image && (
                <footer className="border-t border-white/5 py-10 px-6 text-center text-zinc-500 text-sm">
                    <p>&copy; 2026 Paleograph Analyzer. Experimental Historical Tool.</p>
                </footer>
            )}
        </div>
    );
}

export default App;
