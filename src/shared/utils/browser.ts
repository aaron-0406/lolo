const safeWindow = typeof window !== 'undefined' ? window : null

const safeDocument = safeWindow?.document

export { safeWindow as window, safeDocument as document }
