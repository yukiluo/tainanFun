// 1. get data from json
// 2. when select change 
// 3. do title change && 
// 4. get district data && 
// 5. push to list 

// 取得台南市區景點資料 AJAX取JSON資料 
// 公開平台資料暫時不提供跨域存取CORS，因此先載入整個json檔  
var allData = '';
function getSiteData(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET','./data/siteData.json',true);
    xhr.send(null);
    // xhr事件onload 確定資料有回傳後才觸發 function
    xhr.onload = function(){
     if(xhr.status < 400){
      allData = JSON.parse(xhr.responseText);
      // console.log(allData);
    } else {
        siteList.innerHTML = '<h2>資料取得錯誤</h2>';
      }
    };
};
getSiteData();

//又因平台無照片檔 考慮google search api



//選取後觸發 title改變、list新增
var select = document.getElementById('district');
var title = document.querySelector('.title');
var siteList = document.querySelector('.list');


function getDistrict(el){
      var area = el.target.value;
      // console.log(area);
      title.textContent = area + '景點';
      setSiteData(el);
}

select.addEventListener('change',getDistrict,false);

// list 新增
 function setSiteData(el){
  var array = [];
  var area = el.target.value;
  console.log(area);
  for(i=0; i<allData.length; i++){
    if(allData[i].district == area){
      array.push({
        // district: allData[i].district,
        name: allData[i].name,
        OpenTime: allData[i].open_time,
        Address: allData[i].address,
        Tel: allData[i].tel
      });
    } 
  } 
  // console.log(array);

  // bootstrap cards , col RWD 功能
  var str = '';
  for(i=0; i<array.length; i++){
    str +=
    '<div class="col-md-4" id="col">'+
    '<div class="card">'+
      '<img class="card-img-top" src="../img/default.jpg" alt="Card image cap">'+
      '<div class="card-body">'+
        '<h5 class="card-title">'+array[i].name+'</h5>'+
        '<p class="card-text"><i class="fa fa-clock-o"></i> '+array[i].OpenTime+'</p>'+
        '<p class="card-text"><i class="fa fa-map-marker"></i> '+array[i].Address+'</p>'+
        '<p class="card-text"><i class="fa fa-phone"></i> '+array[i].Tel+'</p></div></div></div>';   
  } 
  siteList.innerHTML = str;
 }

 // btn 觸發事件 
var btns = document.querySelectorAll('.btn'); // querySelectorAll !!!! 超重要
// console.log(btns);
btns[0].addEventListener('click',getDistrict,false);
btns[1].addEventListener('click',getDistrict,false);
btns[2].addEventListener('click',getDistrict,false);
btns[3].addEventListener('click',getDistrict,false);
