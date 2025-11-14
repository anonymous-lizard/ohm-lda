Google Apps Script — endpoint para gravação de reservas no Google Sheet e envio de e-mail (MVP)

1) Crie uma Google Sheet com cabeçalhos: Timestamp, service, date, time, name, phone, email, message, source
2) No menu "Extensões" -> "Apps Script" crie um novo script e cole este código:

```javascript
function doPost(e){
  try{
    var ss = SpreadsheetApp.openById('YOUR_SHEET_ID'); // substituir
    var sheet = ss.getSheetByName('Sheet1');
    var data = JSON.parse(e.postData.contents);
    var row = [new Date(), data.service || '', data.date || '', data.time || '', data.name || '', data.phone || '', data.email || '', data.message || '', data.source || ''];
    sheet.appendRow(row);

    // enviar e-mail de notificação para a empresa
    var subject = 'Nova reserva OHM: ' + (data.service || 'Servico');
    var body = 'Nova reserva recebida:\n\n' + JSON.stringify(data, null, 2);
    MailApp.sendEmail('ohm.service.lda@gmail.com', subject, body);

    // enviar confirmação ao cliente (se email fornecido)
    if(data.email){
      var clientSubject = 'Confirmação de pedido — OHM';
      var clientBody = 'Obrigado, recebemos seu pedido. Entraremos em contacto em breve.\n\nResumo:\n' + JSON.stringify(data, null, 2);
      MailApp.sendEmail(data.email, clientSubject, clientBody);
    }

    return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({status:'error', message:err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3) Substitua `YOUR_SHEET_ID` pelo ID da sua Google Sheet (parte da URL).
4) Em `Deploy` -> `New deployment`, escolha `Web app`, execute como `Me`, permissões `Anyone` (ou restrinja conforme necessidade). Copie a URL do Web App e cole em `assets/js/forms.js` no `APPS_SCRIPT_URL`.

Notas:
- O Apps Script enviará e-mails usando a conta do deploy (ver permissões).
- Teste com um formulário simples antes de abrir ao público.
