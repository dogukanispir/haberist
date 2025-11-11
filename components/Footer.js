import { FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-[var(--haberist-dark)] text-white py-6 mt-10 border-t border-zinc-800">
      <div className="container flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
        {/* Sol kısım */}
        <div>
          <h3 className="font-bold text-lg text-[var(--haberist-red)]">Haberist</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            © {new Date().getFullYear()} Haberist — Tüm hakları saklıdır. <br />
            Kaynaklar: CNN Türk, NTV, Sözcü, Hürriyet, TRT Haber
          </p>
        </div>

        {/* Sosyal medya ikonları */}
        <div className="flex gap-5 text-2xl">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--haberist-red)] transition"
            title="Twitter"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--haberist-red)] transition"
            title="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--haberist-red)] transition"
            title="YouTube"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  )
}
