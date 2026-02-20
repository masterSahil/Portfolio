import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, ChevronRight, Cpu, Wifi, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SUGGESTIONS = ["Show Projects 🚀", "Contact Me 📞", "Skills ⚡", "Hire Me 💼"];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "System Online.", sender: "system" },
        { id: 2, text: "Hello! I am Sahil's AI Assistant. How can I help you today?", sender: "bot" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

    const handleSendMessage = async (text) => {
        const messageText = text || inputValue;
        if (!messageText.trim()) return;

        const userMsg = { id: Date.now(), text: messageText, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsLoading(true);

        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/chat`, {message: userMsg.text});
            const botResponse = data.reply;

            setMessages((prev) => [...prev,{ id: Date.now() + 1, text: botResponse, sender: "bot" }]);
        } catch (error) {
            console.error("Chat Error:", error);

            const errorText =
                error.code === "ERR_NETWORK"
                    ? "Connection Error: Backend unreachable (CORS / server offline)."
                    : error.response?.data?.message || "Server error occurred.";

            setMessages((prev) => [...prev, { id: Date.now() + 1, text: errorText, sender: "bot" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-4 md:right-8 z-999 flex flex-col items-end font-sans">
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="
                            mb-4 flex flex-col overflow-hidden relative
                            w-[calc(100vw-40px)] 
                            h-[65vh] 
                            md:w-95 md:h-150 
                            rounded-[10px] 
                            bg-[#050505] 
                            shadow-[0_0_50px_-10px_rgba(0,0,0,0.8)]
                            border border-white/10 ring-1 ring-green-500/20
                        "
                    >
                        {/* Header */}
                        <div className="relative z-10 p-0 overflow-hidden bg-black/50 backdrop-blur-xl border-b border-white/5 shrink-0">
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-size-[16px_16px]"></div>

                            <div className="flex justify-between items-center px-5 py-4 relative z-20">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-green-900/80 to-black border border-green-500/30 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(34,197,94,0.3)]">
                                        <Cpu size={20} className="text-green-400" />
                                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <h3 className="text-transparent bg-clip-text bg-linear-to-r from-white via-green-100 to-green-400 font-bold text-[16px] tracking-wide">
                                            SAHIL.AI
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <Wifi size={10} className="text-green-500" />
                                            <span className="text-[10px] font-mono text-green-600 tracking-wider">SYSTEM ONLINE</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all border border-transparent hover:border-red-500/30"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="h-px w-full bg-linear-to-r from-transparent via-green-500/50 to-transparent opacity-50"></div>
                        </div>

                        {/* Chat Area - flex-1 ensures it takes remaining height */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-6 custom-scrollbar bg-black/20 relative">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.sender === "bot" && (
                                        <div className="w-8 h-8 rounded-full bg-black border border-green-500/30 flex items-center justify-center mr-3 mt-1 shadow-lg shrink-0">
                                            <Terminal size={14} className="text-green-400" />
                                        </div>
                                    )}

                                    {msg.sender === "system" ? (
                                        <div className="w-full text-center">
                                            <span className="text-[10px] text-green-500/30 font-mono tracking-[0.2em] uppercase">
                                                — {msg.text} —
                                            </span>
                                        </div>
                                    ) : (
                                        <div
                                            className={`max-w-[85%] md:max-w-[80%] p-3 md:p-3.5 text-[14px] leading-6 shadow-md backdrop-blur-md ${msg.sender === "user"
                                                    ? "bg-green-600 text-white rounded-2xl rounded-tr-sm shadow-green-900/20"
                                                    : "bg-[#111] text-gray-300 border border-white/10 rounded-2xl rounded-tl-sm shadow-black/50"
                                                }`}
                                        >
                                            {msg.sender === "bot" ? (
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ node, ...props }) => (
                                                            <p className="mb-2 leading-relaxed" {...props} />
                                                        ),
                                                        strong: ({ node, ...props }) => (
                                                            <strong className="text-green-400 font-semibold" {...props} />
                                                        ),
                                                    }}
                                                >
                                                    {msg.text}
                                                </ReactMarkdown>
                                            ) : (
                                                msg.text
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start ml-11">
                                    <div className="bg-[#111] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        {!isLoading && (
                            <div className="px-5 pb-2 flex gap-2 overflow-x-auto scrollbar-hide z-20 shrink-0">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSendMessage(s)}
                                        className="whitespace-nowrap px-3 py-1.5 bg-[#111] hover:bg-green-900/20 border border-white/10 hover:border-green-500/40 rounded-full text-[11px] md:text-[12px] text-gray-400 hover:text-green-400 transition-all active:scale-95 shadow-sm"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-3 md:p-4 bg-black/80 backdrop-blur-md border-t border-white/10 z-20 shrink-0">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 focus-within:border-green-500/50 rounded-[20px] px-2 py-2 transition-all shadow-inner"
                            >
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="Execute command..."
                                    className="flex-1 bg-transparent text-sm text-gray-200 
                                              placeholder-gray-600 focus:outline-none 
                                              px-3 py-2 resize-none custom-scrollbar 
                                              min-h-10 max-h-20 
                                              overflow-y-auto overflow-x-hidden 
                                              wrap-break-words whitespace-pre-wrap"
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="w-10 h-10 rounded-full bg-linear-to-br from-green-500 to-green-700 flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale shadow-[0_4px_10px_rgba(34,197,94,0.3)] shrink-0"
                                >
                                    <ChevronRight size={22} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LAUNCHER BUTTON */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 md:w-16 md:h-16 relative flex items-center justify-center rounded-full bg-[#050505] shadow-[0_0_40px_-5px_rgba(34,197,94,0.5)] z-50 overflow-hidden"
            >
                {/* 1. Orbiting Ring */}
                <div
                    className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-green-500 animate-spin"
                    style={{ animationDuration: '3s' }}
                ></div>

                {/* 2. Inner Glow */}
                <div className="absolute inset-1 rounded-full bg-green-500/10 backdrop-blur-sm border border-white/10"></div>

                {/* 3. Icon */}
                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                <X size={24} className="text-gray-300" />
                            </motion.div>
                        ) : (
                            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                                <Zap size={24} className="text-green-400 fill-green-400" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.button>
        </div>
    );
}