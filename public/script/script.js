const CHECK_BOX = document.querySelectorAll('.list li .checkbox');
const LIST_SPAN = document.querySelectorAll('.list li span');
const addEventclick = (element, fn) => {
    for(let i=0;i<element.length;i++){
        element[i].onclick = fn;
    }
}
window.addEventListener("DOMContentLoaded",(e) => {
    addEventclick(CHECK_BOX,check_box_test);
});
function check_box_test(){
    let checked = this.checked;
    let next = this.nextElementSibling;
    console.log(next);
    if(checked == true){
        next.classList.add('active');
    }else{
        next.classList.remove('active');
    }
}