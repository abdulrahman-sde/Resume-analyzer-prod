import { UploadIcon, FileIcon, ArrowRightIcon } from "@/constants/icons";

interface UploadStepProps {
  file: File | null;
  isDragging: boolean;
  onFileChange: (file: File | null) => void;
  onNext: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function UploadStep({
  file,
  isDragging,
  onFileChange,
  onNext,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
}: UploadStepProps) {
  return (
    <div
      className={`flex-1 rounded-[22px] border-2 border-dashed flex flex-col items-center justify-center p-12 text-center transition-all cursor-pointer relative group ${
        isDragging
          ? "border-indigo-500 bg-indigo-500/10"
          : "border-white/10 hover:border-white/20 hover:bg-white/5"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => e.target.files && onFileChange(e.target.files[0])}
        accept=".pdf,.docx"
      />

      {file ? (
        <div className="animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <FileIcon className="w-10 h-10 text-emerald-400" />
          </div>
          <h3 className="text-xl text-white font-light mb-2">{file.name}</h3>
          <p className="text-sm text-emerald-400/60 font-mono">
            {(file.size / 1024 / 1024).toFixed(2)} MB • READY
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="mt-8 px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2 mx-auto"
          >
            Proceed to Context <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-6 pointer-events-none group-hover:scale-105 transition-transform duration-300">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/5 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-colors">
            <UploadIcon className="w-8 h-8 text-white/40 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div>
            <h3 className="text-xl text-white font-light">Drop Resume Here</h3>
            <p className="text-sm text-white/40 mt-2">
              Supports high-fidelity PDF & DOCX extraction
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
