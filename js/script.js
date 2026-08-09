
// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const panel = document.getElementById('mobile-panel');
menuBtn.addEventListener('click', () => {
  const open = panel.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
});
panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  panel.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
  menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}));

// Contact form — no backend, so confirm locally rather than pretending to submit
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = 'Message don go ✓';
  btn.style.background = '#2F6B4F';
  this.reset();
  setTimeout(() => { btn.textContent = 'Send message'; btn.style.background = ''; }, 2600);
});

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Inventory data — tokunbo cars typical of the Lagos market, priced in Naira
const inventory = [
  { id:'cor-19', img:'image/vehicle-1.png', name:'2019 Toyota Corolla', price:'₦9,800,000', year:'2019', trans:'Automatic', fuel:'Petrol', km:'71,000 km', stamp:'BOARD 01',
    history:{ owners:2, floodCheck:'Passed — no water damage found', bodyStatus:'First body confirmed, no repaint', lastService:'Full service, 6 weeks ago', clearance:'Duty paid, customs papers verified' } },
  { id:'acc-17', img:'image/vehicle-2.png', name:'2017 Honda Accord', price:'₦7,450,000', year:'2017', trans:'Automatic', fuel:'Petrol', km:'88,500 km', stamp:'BOARD 04',
    history:{ owners:3, floodCheck:'Passed — no water damage found', bodyStatus:'Rear bumper repainted after minor scrape, disclosed', lastService:'Oil and brake service, 2 months ago', clearance:'Duty paid, customs papers verified' } },
  { id:'lex-20', img:'image/vehicle-3.png', name:'2020 Lexus RX 350', price:'₦21,500,000', year:'2020', trans:'Automatic', fuel:'Petrol', km:'46,200 km', stamp:'BOARD 06',
    history:{ owners:1, floodCheck:'Passed — no water damage found', bodyStatus:'First body confirmed, no repaint', lastService:'Full service, 3 weeks ago', clearance:'Duty paid, customs papers verified' } },
  { id:'cam-16', img:'image/vehicle-4.png', name:'2016 Toyota Camry', price:'₦6,900,000', year:'2016', trans:'Automatic', fuel:'Petrol', km:'102,300 km', stamp:'BOARD 08',
    history:{ owners:3, floodCheck:'Passed — no water damage found', bodyStatus:'First body confirmed, no repaint', lastService:'Full service, 1 month ago', clearance:'Duty paid, customs papers verified' } },
  { id:'hil-18', img:'image/vehicle-5.png', name:'2018 Toyota Highlander', price:'₦14,200,000', year:'2018', trans:'Automatic', fuel:'Petrol', km:'67,800 km', stamp:'BOARD 10',
    history:{ owners:2, floodCheck:'Passed — no water damage found', bodyStatus:'Front bumper repainted, disclosed', lastService:'Full service, 5 weeks ago', clearance:'Duty paid, customs papers verified' } },
  { id:'gle-21', img:'image/vehicle-6.png', name:'2021 Mercedes-Benz GLE', price:'₦38,900,000', year:'2021', trans:'Automatic', fuel:'Petrol', km:'21,000 km', stamp:'BOARD 12',
    history:{ owners:1, floodCheck:'Passed — no water damage found', bodyStatus:'First body confirmed, no repaint', lastService:'Full service, 2 weeks ago', clearance:'Duty paid, customs papers verified' } },
];

const grid = document.getElementById('inv-grid');
grid.innerHTML = inventory.map(c => `
  <div class="card">
    <div class="imgwrap">
      <span class="stamp mono">${c.stamp}</span>
      <img src="${c.img}" alt="${c.name}, ${c.year}, ${c.km} on the odometer">
    </div>
    <div class="body">
      <h3>${c.name}</h3>
      <div class="price">${c.price}</div>
      <div class="specs">
        <span><b>${c.year}</b>Model year</span>
        <span><b>${c.trans}</b>Transmission</span>
        <span><b>${c.fuel}</b>Fuel type</span>
        <span><b>${c.km}</b>Mileage</span>
      </div>
      <div class="cta-row">
        <button class="link-arrow history-btn" data-id="${c.id}">See full history <i class="fas fa-arrow-right"></i></button>
      </div>
    </div>
  </div>
`).join('');

const modal = document.getElementById('history-modal');
const modalBody = document.getElementById('history-body');

document.querySelectorAll('.history-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const car = inventory.find(c => c.id === btn.dataset.id);
    modalBody.innerHTML = `
      <h3 class="display">${car.name}</h3>
      <div class="hist-row"><span>Previous owners</span><b>${car.history.owners}</b></div>
      <div class="hist-row"><span>Flood check</span><b>${car.history.floodCheck}</b></div>
      <div class="hist-row"><span>Body status</span><b>${car.history.bodyStatus}</b></div>
      <div class="hist-row"><span>Last service</span><b>${car.history.lastService}</b></div>
      <div class="hist-row"><span>Customs clearance</span><b>${car.history.clearance}</b></div>
    `;
    modal.classList.add('open');
  });
});
document.getElementById('modal-close').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });