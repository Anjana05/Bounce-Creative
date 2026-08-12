import { createContext, useContext, useMemo, useState } from 'react'

// The header VAT toggle drives every price on the page, exactly as it does on
// the live storefront. 20% UK standard rate.
const VAT_RATE = 0.2
const VatContext = createContext({ incVat: false, setIncVat: () => {} })

export function VatProvider({ children }) {
  const [incVat, setIncVat] = useState(false)
  const value = useMemo(
    () => ({ incVat, setIncVat, withVat: (n) => (incVat ? n * (1 + VAT_RATE) : n) }),
    [incVat]
  )
  return <VatContext.Provider value={value}>{children}</VatContext.Provider>
}

export const useVat = () => useContext(VatContext)
export default VatContext
