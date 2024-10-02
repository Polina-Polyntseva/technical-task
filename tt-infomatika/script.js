let events = [
  { date: '30 МАЯ', time: '16:00', title: 'Стадион 1', button: 'Купить билет' },
  { date: '17 ИЮНЯ', time: '19:00', title: 'Стадион 2', button: 'Купить билет' },
  { date: '26 ИЮНЯ', time: '19:00', title: 'Стадион 3', button: 'Купить билет' },
  { date: '16 ИЮЛЯ', time: '20:00', title: 'Стадион 4', button: 'Купить билет' },
  { date: '30 СЕНТЯБРЯ', time: '18:00', title: 'Стадион 5', button: 'Купить билет' }
];

//Контейнер для отображения билетов
const container = document.getElementById('tickets__container');
let currentIndex = 2;

// Создание гексагонов
function createHexagons() {
  events.forEach((event, index) => {
    let hexagon = document.createElement('li');
    hexagon.classList.add('hexagon');
    hexagon.dataset.index = index;

    let content = document.createElement('div');
    content.classList.add('hexagon__content');

    let hexDate = document.createElement('p');
    hexDate.classList.add('date');
    hexDate.textContent = event.date;

    let hexTime = document.createElement('p');
    hexTime.classList.add('time');
    hexTime.textContent = event.time;

    let hexTitle = document.createElement('p');
    hexTitle.classList.add('title');
    hexTitle.textContent = event.title;

    let hexBtn = document.createElement('button');
    hexBtn.classList.add('btn');
    hexBtn.textContent = event.button;

    let contentInfo = document.createElement('div');
    contentInfo.classList.add('content');
    contentInfo.appendChild(hexTitle);
    contentInfo.appendChild(hexTime);
    contentInfo.appendChild(hexBtn);

    content.appendChild(hexDate);
    content.appendChild(contentInfo);
    hexagon.appendChild(content);

    //Обработчик клика для центрирования гексагона
    hexagon.addEventListener('click', () => centerHexagon(index));

    container.appendChild(hexagon);
  });
}

// Центрирование гексагона
function centerHexagon(index) {
  currentIndex = index;

  //Смещение для центрирования гексагона
  const offset = (currentIndex - 2) * -120;
  container.style.transform = `translateX(${offset}px)`;

  // Обновление размеров и видимости элементов
  const hexagons = document.querySelectorAll('.hexagon');
  hexagons.forEach((hex, i) => {
  let content = hex.querySelector('.hexagon__content');

  if (i === index) {
    hex.style.transform = 'scale(2)';
    content.children[0].style.display = 'block';
    content.children[1].style.display = 'flex';
  } else if (Math.abs(i - index) === 1) {
    hex.style.transform = 'scale(1.5)';
    content.children[0].style.display = 'block';
    content.children[1].style.display = 'none';
  } else if (Math.abs(i - index) <= 2) {
    hex.style.transform = 'scale(1)';
    hex.style.display = 'flex'; 
  }  else if (Math.abs(i - index) > 2) {
    hex.style.display = 'none';
  }

});
}

// Слушатель для события прокрутки страницы
window.addEventListener('wheel', (event) => {
  if (event.deltaY > 0 && currentIndex < events.length - 1) {
      currentIndex++;
      centerHexagon(currentIndex);
  } else if (event.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
      centerHexagon(currentIndex);
  }
});

createHexagons();
centerHexagon(currentIndex);
