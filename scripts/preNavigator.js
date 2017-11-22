window.onload = preNav();

function preNav(){
	//在这里设置导航栏的元素
	nav_list = ["Home", "Projects", "Thoughts"];
	url_list = [
	  "index.html",
	  "projects.html",
	  "thoughts.html"
	  ]
	ul=document.getElementById("nav");
	for(var i=0; i<nav_list.length; i++){
		setElement(nav_list[i], url_list[i]);
	}
}

function setElement(x, y){
	//create nodes for <li>,<a>,text
	var ele_text=document.createTextNode(x);
	var ele_Li=document.createElement("li");
	var ele_A=document.createElement("a");
	//set attribute for <li>,<a>
	ele_Li.setAttribute("id", x);
	ele_A.setAttribute("href", y);
	//build the DOM
	ele_A.appendChild(ele_text);
	ele_Li.appendChild(ele_A);
    ul.appendChild(ele_Li);
}
	
	
	