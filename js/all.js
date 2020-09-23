//匯入ajax
const xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
xhr.send(null);
//建立DOM
const changeArea = document.querySelector('#changeArea');
const list = document.querySelector('.list');
const addres = document.querySelector('.addres');
const hotArea = document.querySelector('.hotArea');

xhr.onload = function () {
  const xhrResponseText = JSON.parse(xhr.responseText);
  const records = xhrResponseText.result.records
  const recordsLen = records.length
  ///select動態加入行政區
  function update_changeArea() {
    let set = new Set();///set重複元素會被過濾
    // =>箭頭函數，item等於records內容(一筆一筆傳入,從第一筆開始)
    let result = records.filter(item => !set.has(item.Zone) ? set.add(item.Zone) : false);
    let resultLen = result.length;
    changeArea.innerHTML = '<option value =" ">--請選擇行政區域--</option>';
    for (let i = 0; i < resultLen; i++) {
      let strOption = document.createElement('option');
      strOption.textContent = result[i].Zone;
      strOption.setAttribute('value', result[i].Zone);
      changeArea.appendChild(strOption);
    }
  }
  update_changeArea();

  /////select切換增加景點
  function updateList(e) {
    let select = e.target.value;
    let str = '';
    addres.textContent = '';
    for (let i = 0; i < recordsLen; i++) {
      if (select === records[i].Zone) {
        str += '<div class="col-md-6 px-2 mb-5 mb-md-8"><div class="list-shadow h-100 bg-white"><div class="list-photo bg-cover d-flex justify-content-between align-items-end" style="background-image: url(' + records[i].Picture1 + ');"><h3 class="px-2">' + records[i].Name + '</h3><span class="mb-2 px-2">' + records[i].Zone + '</span></div><ul class="pl-6 list-content position-relative"><li class="list-openTime">' + records[i].Opentime + '</li><li class="list-addres">' + records[i].Add + '</li><li class="list-tel">' + records[i].Tel + '</li><li class="list-bage">' + records[i].Ticketinfo + '</li></ul></div></div>'
        addres.textContent = records[i].Zone;
      }
    }
    list.innerHTML = str;
  }

  ///hotArea點擊增加景點
  function hotupDateList(e) {
    e.preventDefault();
    let hotArea = e.target.textContent;
    let str = '';
    if (e.target.nodeName !== "A") {
      return;
    } else {
      for (let i = 0; i < recordsLen; i++) {
        if (hotArea === records[i].Zone) {
          str += '<div class="col-md-6 px-2 mb-5 mb-md-8"><div class="list-shadow h-100 bg-white"><div class="list-photo bg-cover d-flex justify-content-between align-items-end" style="background-image: url(' + records[i].Picture1 + ');"><h3 class="px-2">' + records[i].Name + '</h3><span class="mb-2 px-2">' + records[i].Zone + '</span></div><ul class="pl-6 list-content position-relative"><li class="list-openTime">' + records[i].Opentime + '</li><li class="list-addres">' + records[i].Add + '</li><li class="list-tel">' + records[i].Tel + '</li><li class="list-bage">' + records[i].Ticketinfo + '</li></ul></div></div>'
          addres.textContent = records[i].Zone;
        };
      };
      list.innerHTML = str;
    }
  }

  //監聽事件
  changeArea.addEventListener('change', updateList);
  hotArea.addEventListener('click', hotupDateList);
}

///回頂部使用jquery
$(document).ready(function () {
  $('.goTop').on('click', function (e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 800);
  });
});