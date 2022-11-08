import { saveLocalTravelData, getLocalTravelData, currency } from './global.js';

const formGroup = document.querySelector('.form-group');
const travelContainer = document.querySelector('.travel-container');
const addTicketBtn = document.querySelector('.addTicket-btn');
const travelSelect = document.querySelector('.travel-select');
const selectText = document.querySelector('.select-text');

const formInputData = [
  {
    id: 'name',
    type: 'text',
    title: '套票名稱',
    placeholder: '請填寫套票名稱',
  },
  {
    id: 'imgUrl',
    type: 'text',
    title: '圖片網址',
    placeholder: '請填寫圖片網址',
  },
  {
    id: 'area',
    type: 'select',
    title: '景點地區',
    placeholder: '請選擇景點地區',
    option: ['高雄', '台北', '台中'],
  },
  {
    id: 'price',
    type: 'number',
    title: '套票金額',
    placeholder: '請填寫套票金額',
  },
  {
    id: 'group',
    type: 'number',
    title: '套票組數',
    placeholder: '請填寫套票組數',
  },
  {
    id: 'rate',
    type: 'number',
    title: '套票星級',
    placeholder: '請填寫套票星級',
  },
  {
    id: 'description',
    type: 'textarea',
    title: '套票描述',
    placeholder: '請填寫套票敘述 (限 100 字)',
  },
];

let travelData = [
  {
    id: 0,
    name: '綠島自由行套裝行程',
    imgUrl:
      'https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_1.png?raw=true',
    area: '高雄',
    description: '嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合。',
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: '清境高空觀景步道',
    imgUrl:
      'https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_4.png?raw=true',
    area: '台北',
    description:
      '清境農場青青草原數十公頃碧草，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。',
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: '山林悠遊套票',
    imgUrl:
      'https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_3.png?raw=true',
    area: '台中',
    description: '山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點。',
    group: 20,
    price: 1765,
    rate: 7,
  },
  {
    id: 3,
    name: '肥宅心碎賞櫻3日',
    imgUrl:
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
    area: '高雄',
    description: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 4,
    name: '貓空纜車雙程票',
    imgUrl:
      'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    area: '台北',
    description: '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 5,
    name: '台中谷關溫泉會1日',
    imgUrl:
      'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    area: '台中',
    description:
      '館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
    group: 20,
    price: 1765,
    rate: 7,
  },
];

const selectOption = ['台北', '台中', '高雄'];

const url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';

// render DOM
function renderFormInput(id, type, title, placeholder) {
  const textInput = `
    <div class="addTicket-block">
      <label for="${title}">${title}</label>
      <input
        id="${id}"
        type="text"
        name="${title}"
        placeholder="${placeholder}"
      />
    </div>
  `;

  const numberInput = `
    <div class="addTicket-block">
      <label for="${title}">${title}</label>
      <input
        id="${id}"
        type="number"
        min="1"
        ${id === 'rate' ? 'max="10"' : ''}
        name="${title}"
        placeholder="${placeholder}"
      />
    </div>
  `;

  return type === 'text' ? textInput : numberInput;
}

function renderFormSelect(id, title, placeholder, option) {
  let optionStr = '';

  option.forEach((item) => {
    optionStr += `
      <option value="${item}">
    `;
  });

  return `
    <div class="addTicket-block">
      <label for="${title}">${title}</label>
      <input id="${id}" list="area-list" name="${title}" placeholder="${placeholder}">
      <datalist id="area-list">
        ${optionStr}
      </datalist>
    </div>
  `;
}

function renderFormArea(id, title, placeholder) {
  const textarea = `
    <div class="addTicket-block">
      <label for="${title}">${title}</label>
      <textarea id="${id}" name="${title} maxlength="100" placeholder="${placeholder}"></textarea>
    </div>
  `;

  return textarea;
}

// render Form
function renderForm() {
  let htmlStr = '';
  formInputData.forEach(({ id, type, title, option, placeholder }) => {
    switch (type) {
      case 'text':
      case 'number':
        htmlStr += renderFormInput(id, type, title, placeholder);
        break;
      case 'select':
        htmlStr += renderFormSelect(id, title, placeholder, option);
        break;
      case 'textarea':
        htmlStr += renderFormArea(id, title, placeholder);
        break;
      default:
        break;
    }
  });
  formGroup.innerHTML = htmlStr;
}
renderForm();

// select text
function selectItemNum(data) {
  selectText.textContent = `本次搜尋共 ${data.length} 筆資料`;
}

// render travel Card
function renderTravelCard(item) {
  const { name, imgUrl, description, area, rate, group, price } = item;
  return `
    <li class="travel-card">
      <p class="travel-tag travel-areaTag">${area}</p>
      <div class="travel-imgBox">
        <img class="travel-img" src="${imgUrl}" alt="${name}">
      </div> 
      <div class="travel-content">
        <i name="${name}" class="travel-delete fa-solid fa-trash"></i>
        <div class="travel-tag travel-rateTag">${rate}</div>
        <h2 class="travel-name">${name}</h2>
        <p class="travel-desc">${description}</p>
      </div>
      <div class="travel-footer">
        <div class="travel-group">
          <i class="fas fa-exclamation-circle"></i>
           <p>剩下最後 ${group} 組</p>
        </div>
        <p class="travel-price">
          TWD
          <span>${currency(price, '$')}</span>
        </p>
      </div>
    </li>
  `;
}

function renderTravelContainer(data) {
  let htmlStr = '';

  if (data.length === 0) {
    travelContainer.innerHTML = '<img src="images/no_found.png" class="travel_noFoundImg" />';
    selectItemNum(data);
    return;
  }

  data.forEach((item) => {
    htmlStr += renderTravelCard(item);
  });

  travelContainer.innerHTML = htmlStr;
  selectItemNum(data);
}

function renderTravelCardContent(item) {
  const { name, imgUrl, description, area, rate, group, price } = item;
  return `
    <p class="travel-tag travel-areaTag">${area}</p>
    <div class="travel-imgBox">
      <img class="travel-img" src="${imgUrl}" alt="${name}">
    </div> 
    <div class="travel-content">
      <i name=${name} class="travel-delete fa-solid fa-trash"></i>
      <div class="travel-tag travel-rateTag">${rate}</div>
      <h2 class="travel-name">${name}</h2>
      <p class="travel-desc">${description}</p>
    </div>
    <div class="travel-footer">
      <div class="travel-group">
        <i class="fas fa-exclamation-circle"></i>
         <p>剩下最後 ${group} 組</p>
      </div>
      <p class="travel-price">
        TWD
        <span>${currency(price, '$')}</span>
      </p>
    </div>
  `;
}

function renderAddTravelCardChild(item) {
  const li = document.createElement('li');
  li.classList.add('travel-card');
  li.innerHTML = renderTravelCardContent(item);
  travelContainer.appendChild(li);
}

function renderTravelSelectOption(option) {
  return `
    <option value="${option}">${option}</option>
  `;
}

function renderTravelSelect() {
  let htmlStr = `
    <option value="地區搜尋" selected disabled hidden>地區搜尋</option>
    <option value="全部地區">全部地區</option>
  `;
  selectOption.forEach((option) => {
    htmlStr += renderTravelSelectOption(option);
  });
  travelSelect.innerHTML = htmlStr;
}
renderTravelSelect();

function addData() {
  const tempObj = {};
  let errorMsg = [];
  const numRegex = new RegExp(/^([1-9][0-9]*)+(.[0-9]{1,2})?$/);

  formInputData.forEach(({ id, type, title }) => {
    const tempDom = document.querySelector(`#${id}`);
    if (type === 'number' && !numRegex.test(tempDom.value)) {
      errorMsg.push(`${title}欄位請輸入數字`);
      tempDom.style.borderColor = 'red';
      return;
    }

    if (tempDom.value === '') {
      errorMsg.push(`${title}輸入不得為空`);
      tempDom.style.borderColor = 'red';
      return;
    }

    if (id === 'imgUrl' && tempDom.value.indexOf('https') === -1) {
      errorMsg.push(`${title}請輸入有效圖片網址`);
      tempDom.style.borderColor = 'red';
      return;
    }

    if (id === 'area' && !selectOption.includes(tempDom.value)) {
      errorMsg.push(`${title}限輸入選項內的地區`);
      tempDom.style.borderColor = 'red';
      return;
    }

    document.querySelector(`#${id}`).style.borderColor = 'transparent';
    document.querySelector(`#${id}`).style.borderBottomColor = 'var(--parimary)';
    tempObj[id] = tempDom.value;
  });

  if (errorMsg.length === formInputData.length) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      icon: 'error',
      title: '表單是空的唷!',
    });
    errorMsg = [];
  } else if (errorMsg.length > 0) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: 'error',
      title: '輸入錯誤!',
      text: errorMsg.join(', '),
    });
    errorMsg = [];
  } else {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      icon: 'success',
      title: '新增資料成功!',
    });

    formInputData.forEach(({ id }) => {
      document.querySelector(`#${id}`).value = '';
    });
    travelData.push(tempObj);
    renderAddTravelCardChild(tempObj);
    saveLocalTravelData(travelData);
  }
}

function selectData() {
  if (travelSelect.classList.contains('default')) {
    travelSelect.classList.remove('default');
  }

  const filterData = travelData.filter(({ area }) => area === travelSelect.value);

  if (selectOption.includes(travelSelect.value)) {
    renderTravelContainer(filterData);
  } else {
    renderTravelContainer(travelData);
  }
}

function deleteData(e) {
  if (!e.target.classList.contains('travel-delete')) return;
  const deleteName = e.target.getAttribute('name');
  Swal.fire({
    title: `確定要刪除 ${deleteName} 嗎?`,
    text: '你將再也看不到他...',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '是的 刪除他',
    cancelButtonText: '再想想',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
        title: '他正飄向宇宙的盡頭...',
      });
      travelData = travelData.filter(({ name }) => name !== deleteName);
      renderTravelContainer(travelData);
      saveLocalTravelData(travelData);
    }
  });
}

// 事件 event
addTicketBtn.addEventListener('click', addData);
travelSelect.addEventListener('change', selectData);
travelContainer.addEventListener('click', deleteData);

// fetchData
async function fetchData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
  }
  return null;
}

(async () => {
  const data = await fetchData();
  travelData = getLocalTravelData(data);
  renderTravelContainer(travelData);
})();
