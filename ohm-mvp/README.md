# OHM MULTI SERVICES LDA — MVP

Conteúdo gerado automaticamente: estrutura mínima do site estático com layout e assets placeholders.

## Estrutura
```
/ohm-mvp/
  /en/
  /pt/
  /assets/
    /css/style.css
    /js/i18n.js
    /js/calendar.js
    /js/forms.js
    /img/*.svg (placeholders)
  sitemap.xml
  robots.txt
  manifest.json
  README.md
```

## Como testar localmente
Apenas abra `pt/index.html` no browser ou use um servidor local (recomendado):

```bash
# Python 3
python3 -m http.server 8000
# depois abrir http://localhost:8000/ohm-mvp/pt/index.html
```

## Próximos passos (prioridade)
- Implementar `services.html`, `service-detail.html`, `reservations.html` (form funcional)
- Criar Google Form + Apps Script para gravar reservas no Google Sheet e enviar confirmação por email; substituir `APPS_SCRIPT_URL` em `assets/js/forms.js`.
- Gerar cópia final em PT e EN e adicionar mais imagens WebP otimizadas.
- Configurar deploy em Netlify/Vercel e atualizar `sitemap.xml` e `robots.txt` com URL final.

## Apps Script (reservas)

Criei um exemplo de `Apps Script` em `apps_script.md` com um `doPost(e)` que grava os dados na Google Sheet e envia e-mails de notificação/confirmacao. Procedimento:

1. Criar Google Sheet com cabeçalhos: Timestamp, service, date, time, name, phone, email, message, source
2. Copiar o código de `apps_script.md` para um novo projeto Apps Script e substituir `YOUR_SHEET_ID`.
3. Deploy como Web App e colar a URL no `assets/js/forms.js` em `APPS_SCRIPT_URL`.

Ver `apps_script.md` para o snippet completo e instruções.

## Notas técnicas
- Tipografia: Google Fonts importado em `style.css`.
- Botão WhatsApp flutuante já incluído.
- Schema `LocalBusiness` adicionado em `pt/index.html`.

Se concordar, prossigo criando as páginas restantes e o formulário de reservas (cliente + Apps Script).