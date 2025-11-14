// Minimal form submission: sends data to a Google Apps Script endpoint (replace URL)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

async function submitReservation(formEl){
  const data = new FormData(formEl);
  const payload = {};
  for(const [k,v] of data.entries()) payload[k]=v;
  try{
    const res = await fetch(APPS_SCRIPT_URL, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    if(res.ok){ window.location.href = '../thankyou.html' }
    else alert('Erro ao enviar. Tente novamente.');
  }catch(e){ console.error(e); alert('Erro na conexão.'); }
}

document.addEventListener('submit', function(e){
  const form = e.target;
  if(form && form.matches('.reservation-form')){
    e.preventDefault();
    // basic validation
    const date = form.querySelector('#res-date').value;
    const time = form.querySelector('#res-time').value;
    if(!date || !time){ alert('Preencha data e hora'); return }
    const hour = parseInt(time.split(':')[0],10);
    if(hour < 8 || hour > 18){ alert('Selecione horário entre 08:00 e 18:00'); return }
    submitReservation(form);
  }
});
