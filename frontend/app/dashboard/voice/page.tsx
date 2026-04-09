"use client";

import { useState, useCallback } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  BarVisualizer,
  useVoiceAssistant,
} from "@livekit/components-react";
import { MediaDeviceFailure } from "livekit-client";
import { cn } from "@/lib/utils";
import { Mic, MicOff, Loader2 } from "lucide-react";

type VoiceStatus = "idle" | "connecting" | "connected" | "error";

export default function VoicePage() {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const [connectionDetails, setConnectionDetails] = useState<{
    token: string;
    url: string;
  } | null>(null);

  const connect = useCallback(async () => {
    setStatus("connecting");
    setError(null);

    try {
      const res = await fetch("/api/voice/token");
      if (!res.ok) throw new Error("Failed to get voice token");
      const data = await res.json();
      setConnectionDetails({ token: data.token, url: data.url });
    } catch (e: any) {
      setError(e.message || "Connection failed");
      setStatus("error");
    }
  }, []);

  const disconnect = useCallback(() => {
    setConnectionDetails(null);
    setStatus("idle");
  }, []);

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <div className="flex flex-col h-full bg-[#09090b]">
      {/* Header */}
      <div className="p-8 pb-0 text-center relative z-10">
        <h1 className="text-2xl font-bold text-white/90 tracking-tight">
          Voice Assistant
        </h1>
        <p className="text-sm text-white/50 mt-2 max-w-md mx-auto">
          Speak with Synapse AI about your resumes, analyses, and candidates.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-8">
        {connectionDetails ? (
          <LiveKitRoom
            serverUrl={connectionDetails.url}
            token={connectionDetails.token}
            connect={true}
            audio={true}
            video={false}
            onConnected={() => setStatus("connected")}
            onDisconnected={() => disconnect()}
            onError={(err) => {
              setError(err?.message || "Connection error");
              setStatus("error");
            }}
            onMediaDeviceFailure={(failure?: MediaDeviceFailure) => {
              setError(
                "Microphone access failed. Please check your browser permissions.",
              );
              setStatus("error");
            }}
            className="w-full flex flex-col items-center justify-center flex-1"
          >
            <ActiveVoiceSession onDisconnect={disconnect} />
            <RoomAudioRenderer />
          </LiveKitRoom>
        ) : (
          <div className="flex flex-col items-center justify-center gap-8">
            <button
              onClick={connect}
              disabled={isConnecting}
              className={cn(
                "relative flex items-center justify-center w-32 h-32 rounded-full",
                "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300",
                "border border-indigo-500/20 hover:border-indigo-500/40",
                "transition-all duration-300 shadow-[0_0_30px_rgba(99,102,241,0.15)]",
                isConnecting && "opacity-50 cursor-not-allowed scale-95",
              )}
            >
              {isConnecting ? (
                <Loader2 className="w-10 h-10 animate-spin" />
              ) : (
                <Mic className="w-10 h-10" strokeWidth={1.5} />
              )}

              {isConnecting && (
                <span className="absolute -bottom-10 text-xs font-medium text-indigo-400/80 uppercase tracking-widest whitespace-nowrap">
                  Initializing...
                </span>
              )}
            </button>

            <p className="text-sm text-white/30 font-medium">
              Click to start a conversation
            </p>
          </div>
        )}

        {error && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl max-w-sm text-center shadow-lg backdrop-blur-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component that runs INSIDE the LiveKitRoom context
function ActiveVoiceSession({ onDisconnect }: { onDisconnect: () => void }) {
  const { state, audioTrack } = useVoiceAssistant();

  // state can be: "disconnected", "initializing", "listening", "thinking", "speaking"

  const getStatusText = (state: string) => {
    switch (state) {
      case "listening":
        return "Connected & Listening";
      case "thinking":
        return "Thinking...";
      case "speaking":
        return "Speaking";
      case "initializing":
      case "disconnected":
        return "Agent Loading...";
      default:
        return "";
    }
  };

  const getThemeColor = (state: string) => {
    switch (state) {
      case "listening":
        return "bg-emerald-500";
      case "thinking":
        return "bg-amber-400";
      case "speaking":
        return "bg-indigo-500";
      case "initializing":
      case "disconnected":
        return "bg-white/30";
      default:
        return "bg-white/20";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-16">
      {/* Agent Visualizer */}
      <div className="relative h-48 w-full flex items-center justify-center">
        {/* Glow effect based on state */}
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-[100px] opacity-20 transition-colors duration-1000",
            getThemeColor(state),
          )}
        />

        <div className="relative z-10 w-full px-12 flex justify-center">
          {audioTrack ? (
            <div className="h-32 w-full max-w-100">
              <BarVisualizer
                state={state}
                trackRef={audioTrack}
                barCount={7}
                options={{ minHeight: 12 }}
                className="w-full h-full flex items-center justify-between gap-2"
              />
            </div>
          ) : (
            <div className="flex gap-3 h-24 items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-3 bg-white/10 rounded-full h-3 animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status Text */}
      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            "flex items-center gap-3 px-6 py-2.5 rounded-full border transition-all duration-300",
            state === "initializing" || state === "disconnected"
              ? "bg-white/5 border-white/10 opacity-70"
              : "bg-white/10 border-white/20",
          )}
        >
          {state === "initializing" || state === "disconnected" ? (
            <Loader2 className="w-4 h-4 text-white/70 animate-spin" />
          ) : (
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors duration-300",
                getThemeColor(state),
                (state === "listening" || state === "speaking") &&
                  "animate-pulse shadow-[0_0_10px_currentColor]",
              )}
            />
          )}
          <span className="text-sm font-medium text-white/90 tracking-wide">
            {getStatusText(state) || "Connecting..."}
          </span>
        </div>
      </div>

      {/* Disconnect Button */}
      <button
        onClick={onDisconnect}
        className={cn(
          "mt-8 flex items-center justify-center gap-2 px-6 py-3 rounded-full group transition-all duration-300",
          "bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]",
        )}
      >
        <MicOff className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="font-semibold tracking-wide">Disconnect</span>
      </button>

      {/* Global styles for the LiveKit BarVisualizer SVG */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .lk-bar-visualizer {
          height: 100%;
          width: 100%;
        }
        .lk-bar-visualizer > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          gap: 12px;
        }
        .lk-bar-visualizer > div > div {
          background-color: var(--color-indigo-500);
          border-radius: 9999px;
          transition: height 75ms ease-out, background-color 300ms;
        }
        .lk-bar-visualizer[data-lk-state="listening"] > div > div {
          background-color: var(--color-emerald-400);
          opacity: 0.5;
        }
        .lk-bar-visualizer[data-lk-state="thinking"] > div > div {
          background-color: var(--color-amber-400);
          animation: pulse 1s infinite alternate;
        }
        .lk-bar-visualizer[data-lk-state="speaking"] > div > div {
          background-color: var(--color-indigo-400);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }
      `,
        }}
      />
    </div>
  );
}
