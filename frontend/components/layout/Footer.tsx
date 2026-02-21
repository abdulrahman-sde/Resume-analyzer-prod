import { FOOTER_LINKS } from "@/constants/landing";

export function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/30 text-sm">
      <p>© 2026 ATS Pro Intelligence. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        {FOOTER_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-white">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
