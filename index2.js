function func(){
  var name = document.querySelector(".name").value;
  if (name.length==0){
    window.alert("Enter Name First Kiddo!");
    return;
  }
  if (name.length<4){
    window.alert("Name too short");
  }
  else{
    localStorage.setItem("Name", name);
    window.open('./index2.html',"_self");
  }
}

