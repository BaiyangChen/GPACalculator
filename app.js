// let hero = document.querySelector(".hero");
// let slider = document.querySelector(".slider");
// let animation = document.querySelector("section.animation-wrapper");

// const time_line = new TimelineMax();

// //parameter1 指明哪些元素会被动画影响
// //parameter2 是duration
// //parameter3 包含动画开始时元素的CSS属性及其值
// //parameter4 包含动画结束时元素的CSS属性及其值
// time_line
// .fromTo(hero, 1 , {height: "0%"}, {height: "100%", ease: Power2.easeInOut})
// .fromTo(hero, 1.2 , {width: "80%"}, {width: "100%", ease: Power2.easeInOut})
// .fromTo(slider, 1, {x: "-100%"}, {x: "0%", ease: Power2.easeInOut}, "-=1.2")
// .fromTo(animation, 0.3, {opacity: 1}, {opacity: 0});

// setTimeout(() => {
//     animation.style.pointerEvents = "none";
// }, 2500);

//让整个网站的enter都无响应，当按下任意键的时候，keypress是一个事件，浏览器会把这个事件打包然后传递给（e），再用preventDefault函数去控制这个事件的行为
window.addEventListener("keypress", (e) => {
    if(e.key == "Enter"){
        e.preventDefault();
    }
});

//prevent all buttons interact with backend
let allButtons = document.querySelectorAll("button"); //this return a node list
allButtons.forEach(button  =>{
    button.addEventListener("click",(e)=>{
        e.preventDefault();
    })
});

//change color after selecting grade
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
    select.addEventListener("change",(e)=>{
        setGPA();
        changerColor(e.target);
    })
})

let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
    credit.addEventListener("change", ()=>{
        setGPA();
    });
});

function changerColor(target){
    if(target.value == "A" || target.value == "A-"){
        console.log(target.value);
        target.style.backgroundColor = "lightgreen";
        target.style.color = "black";
    }

    if(target.value.includes("B")){
        target.style.backgroundColor = "yellow";
        target.style.color = "black";
    }else if(target.value.includes("C")){
        target.style.backgroundColor = "orange";
        target.style.color = "black";
    }else if(target.value.includes("D")){
        target.style.backgroundColor = "red";
        target.style.color = "black";
    }else if(target.value == "F"){
        target.style.backgroundColor = "grey";
        target.style.color = "white";
    }
}

function convertor(grade) {
    switch (grade) {
      case "A":
        return 4.0;
      case "A-":
        return 3.7;
      case "B+":
        return 3.4;
      case "B":
        return 3.0;
      case "B-":
        return 2.7;
      case "C+":
        return 2.4;
      case "C":
        return 2.0;
      case "C-":
        return 1.7;
      case "D+":
        return 1.4;
      case "D":
        return 1.0;
      case "D-":
        return 0.7;
      case "F":
        return 0.0;
      default:
        return 0;
    }
  }

function setGPA(){
    let formLength = document.querySelectorAll("form").length;
    let credits = document.querySelectorAll(".class-credit");
    let select = document.querySelectorAll("select");
    let sum = 0;//molecular
    let creditSum = 0;//denominator

    for(let i = 0; i< credits.length; i++){
        if(!isNaN(credits[i].valueAsNumber)){
            creditSum += credits[i].valueAsNumber;
        }
    }

    for(let i = 0; i< formLength; i++){
        if(!isNaN(credits[i].valueAsNumber)){
            sum += credits[i].valueAsNumber * convertor(select[i].value);
        }
    }

    let result;
    if(creditSum == 0){
        result = (0.0).toFixed(2);
    }else{
        result = (sum / creditSum).toFixed(2);
    }
    document.getElementById("result-gpa").innerText = result;
}