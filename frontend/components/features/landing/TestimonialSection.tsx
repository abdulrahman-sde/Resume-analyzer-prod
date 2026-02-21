import { BrainIcon } from "@/constants/icons";
import { TESTIMONIAL } from "@/constants/landing";

export function TestimonialSection() {
  return (
    <section className="mt-40 bg-white/5 border-y border-white/5 py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <BrainIcon className="w-12 h-12 text-white/20 mx-auto mb-8" />
        <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
          "{TESTIMONIAL.quote.split("understands")[0]}
          <span className="text-italic text-indigo-300">understands</span>
          {TESTIMONIAL.quote.split("understands")[1]}"
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="text-right">
            <p className="text-white font-bold">{TESTIMONIAL.author}</p>
            <p className="text-white/40 text-sm">{TESTIMONIAL.role}</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-left">
            <p className="text-emerald-400 font-bold font-mono">
              {TESTIMONIAL.metric}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
