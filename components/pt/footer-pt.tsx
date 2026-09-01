import Image from 'next/image'

export default function FooterPT() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <div className="mb-2">
              <Image
                src="/logo-lockup-negativo.svg"
                alt="Marketing for Contractors"
                width={500}
                height={128}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-white/30">
              Marketing de Crescimento para Construtoras Residenciais
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/20">
            &copy; {new Date().getFullYear()} Marketing for Contractors. Todos os direitos reservados.
          </p>
          <a
            href="#"
            className="text-[11px] text-white/20 hover:text-white/40 transition-colors"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  )
}
