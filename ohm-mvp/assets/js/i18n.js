// Simple i18n strings (MVP)
const I18N = {
  pt: {
    siteTitle: 'OHM MULTI SERVICES LDA - Eficiência e eficácia',
    heroTitle: 'Soluções elétricas e de segurança para sua casa e negócio',
    heroSub: 'Instalação CCTV, alarmes, DSTV, manutenção de AC e muito mais — profissionais em Chimoio',
    reserveCTA: 'Reserve Agora',
    servicesTitle: 'Nossos Serviços'
  },
  en: {
    siteTitle: 'OHM MULTI SERVICES LDA - Efficiency and effectiveness',
    heroTitle: 'Electrical and security solutions for home and business',
    heroSub: 'CCTV installation, alarms, DSTV, AC maintenance and more — professionals in Chimoio',
    reserveCTA: 'Book Now',
    servicesTitle: 'Our Services'
  }
};

function t(lang, key){ return (I18N[lang] && I18N[lang][key]) || I18N['pt'][key] || '' }
