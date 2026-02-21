export function CTASection() {
  return (
    <section className="max-w-3xl mx-auto px-6 text-center mt-40">
      <h2 className="text-4xl font-bold mb-6 text-white">
        Ready to modernize your hiring?
      </h2>
      <p className="text-white/50 mb-10 text-lg">
        Join 500+ forward-thinking teams using ATS Pro to build better
        companies.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="h-14 px-10 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
          Start Free Trial
        </button>
        <button className="h-14 px-10 rounded-full border border-white/10 hover:bg-white/5 text-white font-medium transition-colors">
          Book Demo
        </button>
      </div>
    </section>
  );
}
