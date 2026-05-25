import { createContext, useContext, useState, type ReactNode } from 'react'

interface PrivacyCtx {
  privacy: boolean
  toggle: () => void
  blurClass: string
}

const PrivacyContext = createContext<PrivacyCtx>({
  privacy: false,
  toggle: () => {},
  blurClass: '',
})

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [privacy, setPrivacy] = useState(false)
  const toggle = () => setPrivacy((p) => !p)
  const blurClass = privacy ? 'blur-sm select-none' : ''

  return (
    <PrivacyContext.Provider value={{ privacy, toggle, blurClass }}>
      {children}
    </PrivacyContext.Provider>
  )
}

export const usePrivacy = () => useContext(PrivacyContext)
