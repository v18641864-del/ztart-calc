// script.js — логика калькулятора ZT.ART
function formatKZT(n){
  return n.toLocaleString('ru-RU') + ' ₸';
}

function roundToThousand(x){
  return Math.round(x / 1000) * 1000;
}

function calculate(){
  const w = parseFloat(document.getElementById('width').value);
  const h = parseFloat(document.getElementById('height').value);
  const result = document.getElementById('result');

  if(!w || !h || w <= 0 || h <= 0){
    result.innerHTML = '<div class="err">Введите корректные размеры (см).</div>';
    return;
  }

  // размеры в сантиметрах -> перевод в метры
  const w_m = w / 100;
  const h_m = h / 100;
  const area_m2 = w_m * h_m;

  // Базовая ставка (можно менять)
  const baseRatePerM2 = 170000; // тенге за м²

  // подсчёт цены
  let price = area_m2 * baseRatePerM2;
  if(price < 10000) price = 10000; // минимальная цена
  price = roundToThousand(price);

  // Расход материалов
  // краска: ориентир 8 мл на м² (можно менять в будущем)
  const ink_ml = Math.round(area_m2 * 8);

  // бумага: кол-во A4. Площадь A4 = 0.21 * 0.30 = 0.063 m²
  const areaA4 = 0.21 * 0.30;
  const paperA4 = Math.ceil(area_m2 / areaA4);

  // стандартный лист хромолюкс принят 60x80 см = 0.48 m²
  const sheetArea = 0.6 * 0.8;
  const chromeSheets = Math.ceil(area_m2 / sheetArea);

  // округления и заметки
  const areaCm2 = Math.round(area_m2 * 10000); // см²

  // Подробный вывод
  result.innerHTML = `
    <div class="box">
      <div class="row"><b>Площадь:</b> ${area_m2.toFixed(4)} м²  — ${areaCm2.toLocaleString('ru-RU')} см²</div>
      <div class="row"><b>Цена расчётная:</b> <span class="price">${formatKZT(price)}</span></div>
      <div class="row"><b>Расход краски:</b> ~ ${ink_ml.toLocaleString('ru-RU')} мл</div>
      <div class="row"><b>Листы бумаги A4 (ориентир):</b> ${paperA4} шт</div>
      <div class="row"><b>Хромолюкс (60×80 см) — листов:</b> ${chromeSheets} шт</div>
      <div class="note">Ставка: ${baseRatePerM2.toLocaleString('ru-RU')} ₸ / м². Минимум ${formatKZT(10000)}. Результат округлён до 1 000 ₸.</div>
    </div>
  `;
}
