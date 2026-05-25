import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import WaveBackground from '../components/WaveBackground'
import AnimatedNumber from '../components/AnimatedNumber'
import Footer from '../components/Footer'
import { LayoutDashboard, Gem } from 'lucide-react'

const features = [
  {
    icon: <LayoutDashboard className="w-12 h-12 text-electric-teal" />,
    title: 'Every Chain. One View.',
    desc: 'Ethereum, Solana, Base, Arbitrum, Polygon, Sui. All your wallets, all your chains — unified into a single comprehensive dashboard.',
  },
  {
    icon: '⚡',
    title: 'Live. Not Lagging.',
    desc: 'Real-time prices, balances, and portfolio values streaming direct from chain. No refresh button needed.',
  },
  {
    icon: '🔒',
    title: 'Self-Custody First.',
    desc: 'We never touch your keys. No accounts, no sign-ups, no custodial risk. Just pure, read-only transparency.',
  },
]

const chainLogos = ['⟠', '◎', '⬡', '⟡', '◈', '◉']
const chainNames = ['ETH', 'SOL', 'MATIC', 'ARB', 'BASE', 'SUI']

export default function Landing() {
  return (
    <div className="relative min-h-screen">
      <WaveBackground />

      <div className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6 sm:mb-8"
            >
              <Gem className="w-12 sm:w-14 h-12 sm:h-14 text-electric-teal" style={{ animation: 'float 6s ease-in-out infinite' }} />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tight mb-4 sm:mb-6">
              <span className="text-gradient">Your portfolio.</span>
              <br />
              <span className="text-wave-white">Every chain.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              Stop hopping between six explorers. Linn connects every wallet, 
              on every chain, into one beautiful dashboard — so you can see 
              everything you own, instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-electric-teal text-deep-navy rounded-full text-base font-bold hover:bg-electric-teal/90 transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] text-center"
              >
                Connect Wallet
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 border border-white/10 text-wave-white rounded-full text-base font-medium hover:bg-white/5 transition-all">
                See the Dashboard →
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 sm:mt-10 flex items-center justify-center gap-2 text-sm text-muted flex-wrap"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-seafoam animate-pulse" />
              Tracking <span className="text-wave-white font-semibold"><AnimatedNumber value={125} prefix="$" suffix="M+" /></span> across{' '}
              <span className="text-wave-white font-semibold"><AnimatedNumber value={48000} suffix="+" /> </span>wallets on 6 chains
            </motion.div>
          </motion.div>

          {/* Chain logos floating */}
          <div className="hidden md:block absolute bottom-32 left-0 right-0">
            <div className="flex justify-center gap-6 lg:gap-8">
              {chainLogos.map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  className="flex flex-col items-center gap-2"
                  style={{ animation: `float ${5 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
                >
                  <span className="text-2xl lg:text-3xl">{logo}</span>
                  <span className="text-xs text-muted">{chainNames[i]}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-wave-white mb-10 sm:mb-16"
            >
              Your portfolio,<br className="sm:hidden" />{' '}
              <span className="text-gradient">reimagined.</span>
            </motion.h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass rounded-[40px] p-8 sm:p-10 text-center hover:border-electric-teal/20 transition-all duration-500 group"
                >
                  <span className="text-4xl sm:text-5xl block mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300">{feat.icon}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-wave-white mb-2 sm:mb-3">{feat.title}</h3>
                  <p className="text-sm sm:text-base text-muted leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview / Dashboard mockup */}
        <section className="py-16 sm:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-[40px] p-6 sm:p-8 lg:p-12 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-wave-white mb-3 sm:mb-4">
                    See <span className="text-gradient">everything</span> at a glance.
                  </h2>
                  <p className="text-sm sm:text-base text-muted mb-5 sm:mb-6 leading-relaxed">
                    Total net worth, chain-by-chain breakdown, recent transactions, and 
                    performance analytics — all in one place. No more context-switching 
                    between six different block explorers.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-sm">
                    <div className="flex -space-x-2">
                      {['⟠', '◎', '⬡', '⟡'].map((l, i) => (
                        <span key={i} className="w-8 h-8 rounded-full bg-deep-navy border-2 border-deep-navy-light flex items-center justify-center text-xs">
                          {l}
                        </span>
                      ))}
                    </div>
                    <span className="text-muted text-xs sm:text-sm">Seamlessly connects with 6+ chains</span>
                  </div>
                </div>
                <div className="flex-1 w-full max-w-sm mx-auto lg:max-w-none">
                  <div className="glass-light rounded-[30px] p-4 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted text-xs sm:text-sm">Net Worth</span>
                      <span className="text-xs text-seafoam">+2.97%</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-wave-white">$149,250</div>
                    <div className="h-16 sm:h-20 flex items-end gap-1.5 sm:gap-2">
                      {[60, 70, 55, 80, 75, 90, 85, 95, 88, 92, 100].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-electric-teal to-seafoam rounded-t-sm opacity-60"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
