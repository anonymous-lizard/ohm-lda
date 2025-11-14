// Simple date + time validation for reservations (MVP)
function allowedHour(hour){ return hour >= 8 && hour <= 18 }
function createHourOptions(selectEl){
  selectEl.innerHTML = '';
  for(let h=8; h<=18; h++){
    const opt = document.createElement('option');
    const hh = h.toString().padStart(2,'0')+':00';
    opt.value = hh; opt.textContent = hh;
    selectEl.appendChild(opt);
  }
}
function initCalendar(){
  const dateInput = document.querySelector('#res-date');
  const timeSelect = document.querySelector('#res-time');
  if(timeSelect) createHourOptions(timeSelect);
  if(dateInput){
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}
window.addEventListener('DOMContentLoaded', initCalendar);
