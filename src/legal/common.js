import { SITE } from '../institutional/siteConfig.js'

// Dados da empresa e do documento, usados em todos os textos legais.
export const UPDATED = '24 de outubro de 2026'
export const COMPANY = {
  name: 'Lemify Tecnologia Ltda.',
  cnpj: SITE.cnpj,
  city: 'São Paulo, SP',
  email: SITE.email,
  app: 'https://app.lemify.com.br',
  site: 'https://lemify.com.br',
}

export const IDENTIFICATION = `${COMPANY.name}, inscrita no CNPJ sob o nº ${COMPANY.cnpj}, com sede em ${COMPANY.city} ("Lemify", "nós")`

// Lista dos documentos legais, usada no menu das páginas e no rodapé.
export const LEGAL_LINKS = [
  ['/termos', 'Termos de uso'],
  ['/privacidade', 'Política de privacidade'],
  ['/reembolso', 'Política de reembolso'],
  ['/termos-ia', 'Termos de IA'],
  ['/google-disclosure', 'Divulgação Google'],
  ['/lgpd', 'Segurança e LGPD'],
]
