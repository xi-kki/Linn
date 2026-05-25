import { Gem } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gem className="w-5 h-5 text-electric-teal" />
              <span className="text-lg font-bold text-gradient">LINN</span>
            </div>
            <p className="text-sm text-muted">Your portfolio. Every chain. Unified.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-wave-white mb-3">Product</h4>
            <div className="space-y-2">
              {['Dashboard', 'Assets', 'NFTs', 'History'].map((item) => (
                <p key={item} className="text-sm text-muted hover:text-electric-teal cursor-pointer transition-colors">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-wave-white mb-3">Chains</h4>
            <div className="space-y-2">
              {['Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Base', 'Sui'].map((item) => (
                <p key={item} className="text-sm text-muted hover:text-electric-teal cursor-pointer transition-colors">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-wave-white mb-3">Legal</h4>
            <div className="space-y-2">
              {['Privacy', 'Terms', 'Security'].map((item) => (
                <p key={item} className="text-sm text-muted hover:text-electric-teal cursor-pointer transition-colors">{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted">© 2026 Linn. All rights reserved.</p>
          <div className="flex gap-4">
            {['Twitter', 'Discord', 'GitHub'].map((s) => (
              <span key={s} className="text-sm text-muted hover:text-electric-teal cursor-pointer transition-colors">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
