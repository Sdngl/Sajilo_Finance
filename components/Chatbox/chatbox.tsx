"use client";

import { useRef, useState } from "react";

// ========================================
// SPEECH RECOGNITION TYPES
// ========================================

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;

  start: () => void;
  stop: () => void;

  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

// ========================================
// TYPES
// ========================================

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatMode = "text" | "voice";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>("voice");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const voiceMessageRef = useRef(false);

  // Initialized with no pre-filled text
  const [messages, setMessages] = useState<Message[]>([]);

  // ========================================
  // CHANGE CHAT MODE
  // ========================================

  const changeChatMode = (mode: ChatMode) => {
    setChatMode(mode);
    setVoiceError("");

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsListening(false);
    voiceMessageRef.current = false;
  };

  // ========================================
  // VOICE INPUT
  // ========================================

  const startListening = () => {
    if (typeof window === "undefined") return;

    setVoiceError("");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError("Voice input isn't supported here. Try Google Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      voiceMessageRef.current = true;
    };

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      voiceMessageRef.current = false;

      if (event.error === "not-allowed") {
        setVoiceError("Microphone access denied. Please allow microphone permissions.");
        return;
      }
      if (event.error === "no-speech") {
        setVoiceError("I couldn't hear anything. Try speaking again.");
        return;
      }
      setVoiceError("Voice input error. Please try again.");
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      setIsListening(false);
      voiceMessageRef.current = false;
      setVoiceError("Voice input couldn't start.");
    }
  };

  // ========================================
  // TEXT TO SPEECH
  // ========================================

  const speakResponse = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // ========================================
  // SEND MESSAGE
  // ========================================

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const shouldSpeak = chatMode === "voice" && voiceMessageRef.current;

    voiceMessageRef.current = false;
    setInput("");
    setVoiceError("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

      if (shouldSpeak && data.reply) {
        speakResponse(data.reply);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    if (recognitionRef.current) recognitionRef.current.stop();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsListening(false);
    voiceMessageRef.current = false;
  };

  return (
    <>
      {/* ====================================
          CHAT WINDOW
      ==================================== */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 flex h-[630px] w-[360px] flex-col overflow-hidden rounded-[40px] border border-white/10 bg-[#070b14] text-white shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-3xl font-sans sm:right-6">
          
          {/* TOP NAV BAR */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <button
              onClick={closeChat}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-white/10"
            >
              ←
            </button>

            {/* Mode Switch Pills */}
            <div className="flex items-center gap-1 rounded-full bg-black/40 p-1 border border-white/10">
              <button
                onClick={() => changeChatMode("voice")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  chatMode === "voice"
                    ? "bg-white/20 text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Voice
              </button>
              <button
                onClick={() => changeChatMode("text")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  chatMode === "text"
                    ? "bg-white/20 text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Text
              </button>
            </div>

            <button 
              onClick={() => changeChatMode(chatMode === "voice" ? "text" : "voice")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10"
            >
              💬
            </button>
          </div>

          {/* ERROR ALERT */}
          {voiceError && (
            <div className="mx-6 mt-2 rounded-2xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-center text-xs text-red-300">
              {voiceError}
            </div>
          )}

          {/* ====================================
              VOICE MODE SCREEN
          ==================================== */}
          {chatMode === "voice" ? (
            <div className="flex flex-1 flex-col items-center justify-between p-6">
              
              {/* Header Status */}
              <div className="text-center">
                <span className="text-xs font-medium tracking-wide text-white/50">
                  {isListening ? "Listening..." : loading ? "Thinking..." : "Tap orb to speak"}
                </span>
              </div>

              {/* Glowing Iridescent AI Orb */}
              <div 
                onClick={startListening}
                className="relative flex cursor-pointer items-center justify-center"
              >
                {/* Glow rings */}
                <div className={`absolute h-48 w-48 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 blur-2xl opacity-50 transition-all duration-700 ${
                  isListening ? "scale-125 opacity-80 animate-pulse" : "scale-100"
                }`} />
                
                <div className={`absolute h-40 w-40 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 blur-xl opacity-40 transition-transform duration-500 ${
                  isListening ? "rotate-180 scale-110" : "rotate-0"
                }`} />

                {/* Inner Metallic Glass Sphere */}
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-tr from-[#131b2e] via-[#2c1d47] to-[#0d3b66] shadow-[inset_0_2px_15px_rgba(255,255,255,0.4),0_10px_30px_rgba(0,0,0,0.8)] border border-white/20">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400/30 via-indigo-500/20 to-pink-500/40 blur-md" />
                  <div className="absolute top-4 left-6 h-10 w-16 rounded-full bg-white/20 blur-sm transform -rotate-45" />
                  
                  {/* Waveform indicator when listening */}
                  {isListening && (
                    <div className="flex items-center gap-1 z-10">
                      <span className="h-6 w-1 rounded-full bg-white animate-bounce [animation-delay:0ms]" />
                      <span className="h-10 w-1 rounded-full bg-white animate-bounce [animation-delay:150ms]" />
                      <span className="h-4 w-1 rounded-full bg-white animate-bounce [animation-delay:300ms]" />
                      <span className="h-8 w-1 rounded-full bg-white animate-bounce [animation-delay:100ms]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Live Transcript Display */}
              <div className="w-full text-center px-4">
                <p className="text-sm leading-relaxed text-white/90 font-light max-h-20 overflow-y-auto">
                  {input || (isListening ? "Listening to your voice..." : "Tap the microphone to ask anything")}
                </p>
              </div>

              {/* Voice Action Controls */}
              <div className="flex w-full items-center justify-between px-6 pt-2 pb-2">
                <button 
                  onClick={() => setInput("")}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                >
                  🔍
                </button>

                <button
                  onClick={startListening}
                  className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg border transition-all duration-300 ${
                    isListening
                      ? "bg-red-500 border-red-400 text-white scale-110 shadow-red-500/50"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  🎙️
                </button>

                <button
                  onClick={closeChat}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

            </div>
          ) : (
            
            /* ====================================
                TEXT CHAT MODE SCREEN
            ==================================== */
            <div className="flex flex-1 flex-col justify-between overflow-hidden">
              
              {/* Messages Container */}
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-white/30 text-xs">
                    <span>No messages yet. Ask something below!</span>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-end gap-2 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* Assistant Avatar */}
                      {message.role === "assistant" && (
                        <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-0.5 shadow-md">
                          <div className="h-full w-full rounded-full bg-[#0d1322]" />
                        </div>
                      )}

                      <div className="flex flex-col gap-1 max-w-[80%]">
                        <div
                          className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white border border-cyan-400/20 shadow-lg rounded-br-xs"
                              : "bg-[#131b2e]/80 text-white/90 border border-white/10 backdrop-blur-md rounded-bl-xs"
                          }`}
                        >
                          {message.content}
                        </div>

                        {/* Action icons for assistant responses */}
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-3 px-1 pt-1 text-[11px] text-white/30">
                            <button className="hover:text-white transition">👍</button>
                            <button className="hover:text-white transition">👎</button>
                            <button 
                              onClick={() => speakResponse(message.content)} 
                              className="hover:text-white transition"
                            >
                              🔊
                            </button>
                            <button className="hover:text-white transition">🔄</button>
                          </div>
                        )}
                      </div>

                      {/* User Avatar */}
                      {message.role === "user" && (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-[10px] font-bold text-white shadow-md">
                          U
                        </div>
                      )}
                    </div>
                  ))
                )}

                {/* Thinking Indicator */}
                {loading && (
                  <div className="flex items-center gap-2 text-xs text-white/40 pl-8">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:300ms]" />
                    </span>
                  </div>
                )}
              </div>

              {/* Input Capsule */}
              <div className="p-4">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#131b2e]/90 px-4 py-2 shadow-inner focus-within:border-cyan-500/40">
                  <span className="text-white/30 text-sm">+</span>
                  
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent text-xs text-white placeholder-white/30 outline-none"
                  />

                  <button
                    onClick={startListening}
                    className="text-white/40 hover:text-white text-xs transition"
                  >
                    🎙️
                  </button>

                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-black text-xs font-bold transition disabled:opacity-30 hover:scale-105"
                  >
                    ➤
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* FLOATING LAUNCH BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#070b14] text-xl text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition duration-300 hover:scale-110"
      >
        {isOpen ? "✕" : "✦"}
      </button>
    </>
  );
}




// How i build it
// voice Capabilities: Uses native browser Web Speech API (webkitSpeechRecognition for real-time speech-to-text transcription and SpeechSynthesisUtterance for text-to-speech audio responses).

// State & Lifecycle: Uses React useState to manage live messages and UI modes (Text vs. Voice), alongside useRef to maintain non-re-rendering speech recognition instances.

// Backend API: Communicates with a serverless Next.js route (/api/chat) via fetch to process prompts securely through the AI model endpoint.