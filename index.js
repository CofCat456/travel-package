const formGroup = document.querySelector(".form-group");
const addTicketBtn = document.querySelector(".addTicket-btn");

const formInputData = [
  {
    id: "name",
    type: "text",
    title: "套票名稱",
    placeholder: "請填寫套票名稱",
  },
  {
    id: "imgUrl",
    type: "text",
    title: "圖片網址",
    placeholder: "請填寫圖片網址",
  },
  {
    id: "area",
    type: "select",
    title: "景點地區",
    placeholder: "請選擇景點地區",
    option: ["高雄", "台北", "台中"],
  },
  {
    id: "price",
    type: "number",
    title: "套票金額",
    placeholder: "請填寫套票金額",
  },
  {
    id: "group",
    type: "number",
    title: "套票組數",
    placeholder: "請填寫套票組數",
  },
  {
    id: "rate",
    type: "number",
    title: "套票星級",
    placeholder: "請填寫套票星級",
  },
  {
    id: "desc",
    type: "textarea",
    title: "套票描述",
    placeholder: "請填寫套票敘述 (限 100 字)",
  },
];

const data = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    desc: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    desc: "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    desc: "��館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
];

function renderForm() {
  let htmlStr = "";

  formInputData.forEach(({ id, type, title, option, placeholder }) => {
    switch (type) {
      case "text":
      case "number":
        htmlStr += renderFormInput(id, type, title, placeholder);
        break;
      case "select":
        htmlStr += renderFormSelect(id, title, placeholder, option);
        break;
      case "textarea":
        htmlStr += renderFormArea(id, title, placeholder);
        break;
    }
  });
  formGroup.innerHTML = htmlStr;
}

renderForm();

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
        name="${title}"
        placeholder="${placeholder}"
      />
    </div>
  `;

  return type === "text" ? textInput : numberInput;
}

function renderFormSelect(id, title, placeholder, option) {
  let optionStr = "";

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

addTicketBtn.addEventListener("click", addData);

function addData() {
  const tempObj = {};

  formInputData.forEach(({ id }) => {
    tempDom = document.querySelector(`#${id}`);
    if (tempDom.value === "") return;

    tempObj[id] = tempDom.value;
  });

  if (Object.values(tempObj).length !== formInputData.length) {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      icon: "error",
      title: "不得輸入空白!",
    });
  } else {
    console.log(tempObj);

    data.push(tempObj);
  }
}
