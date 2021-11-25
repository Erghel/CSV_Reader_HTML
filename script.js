// Функция чтения csv файлов 
document.addEventListener('DOMContentLoaded', function(event) {
  fetch('test.csv')
    .then(function(response) {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Не удалось загрузить файл.');
    }).then(function(text) {
      renderTable(text);
    })
    .catch(function(error) {
      console.error('Произошла ошибка при попытке отобразить файл: ' + error.message);
    });
});

// Элемент для выбора файлов.
const INPUT = document.querySelector('input[name="readable"]');
// Элемент для вывода сгенерированной таблицы.
const PREVIEW = document.querySelector('#preview');
// Регулярное выражение для проверки расширения файла.
const REGEX = new RegExp('(.*?)\.(csv)$', 'i');

// Функция, отрабатывающая при выборе файла.
function handleFile(event) {
  // Выбираем первый файл из списка файлов.
  const file = event.target.files[0];

  // Если файл выбран и его расширение допустимо,
  // то читаем его содержимое и отправляем
  // в функцию отрисовки таблицы.
  if (file && REGEX.test(file.name)) {
    // Создаем экземпляр объекта.
    const reader = new FileReader();

    // Чтение файла асинхронное, поэтому
    // создание таблицы привязываем к событию `load`,
    // которое срабатывает при успешном завершении операции чтения.
    reader.onload = (e) => renderTable(e.target.result);

    // Читаем содержимое как текстовый файл.
    reader.readAsText(file);
  } else {
    // Мизерная обработка ошибок.
    alert('Файл не выбран либо его формат не поддерживается.');
    event.target.value = '';
  }
}

function renderTable(data) {
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  table.classList.add('table');

  data.split(/\r\n|\r|\n/)
    .forEach(function(row, index) {
      let trow = document.createElement('tr');

      row.split(/;/).forEach(function(cell) {

        let tcell = document.createElement(index > 0 ? 'td' : 'th');

        tcell.textContent = cell;

        trow.appendChild(tcell);
      });

      index > 0 ? tbody.appendChild(trow) : thead.appendChild(trow);
    });


  table.appendChild(thead);

  table.appendChild(tbody);


  PREVIEW.innerHTML = '';

  PREVIEW.appendChild(table);
}


INPUT.addEventListener('change', handleFile);

