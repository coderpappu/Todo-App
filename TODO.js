//Post Add input and button 

const titleInput = document.querySelector("input#title");
const titleDes = document.querySelector("input#desc");
const buttonAdd = document.querySelector("button#addBtn");
const tblBody = document.querySelector("#tableBody");

document.querySelector("#calcel").addEventListener("click", function () {
    document.querySelector("#editForm input").value = "";
    document.querySelector("#editForm textarea").value = "";
    document.querySelector("#editForm").style.display= "none";
    
})

// Delete Edit Button



// first step but no use it 
// const todo = [{
//     title : "Hlw Bangladesh",
//     desc :"Whataver "
//     },
//     {
//     title : "Hlw Bangladesh",
//     desc :"Whataver "
//     },
//     {
//     title : "Hlw Bangladesh",
//     desc :"Whataver "
//     },
// ];
// // Json.stringfy use for array to string 
// const mkJSON = JSON.stringify(todo)

// // setItem use for data pass on localstorage  
// localStorage.setItem("Todo", mkJSON)

// // getItem use for data get from localstorage
// //Json.parse use for string to array
// const currentData = JSON.parse(localStorage.getItem("Todo"))
// console.log(currentData);

if (!localStorage.getItem("Todo")) {
    let mkJson = new Array()
    localStorage.setItem("Todo", JSON.stringify(mkJson))
}




const loopToods =()=>{
    tblBody.innerHTML = " ";
    
    let currentData = JSON.parse(localStorage.getItem("Todo"))
    // loop through localStorage
    let serial = 1;
    currentData.forEach( (value, index) =>{
        tblBody.innerHTML += `<tr id="singleTodo" data-itemid = "${index}" >
            <td>${serial}</td>
            <td>${value.title}</td>
            <td>${value.desc}</td>
            <td>
                <button id="editBtn" class="btn btn-edit">Edit</button>
                <button id="dltBtn" class="btn btn-dlt">Delate</button>
            </td>
        </tr>
    `;
        serial++;
    });
    deleteTodo()
    modifyTodo()

}


const addTODO = () =>{
    buttonAdd.addEventListener("click", function() {
        let todoInput = titleInput.value.trim();
        let todoDesc = titleDes.value.trim();


    let newTodo = {
        title : todoInput,
        desc: todoDesc,
    };

    // Get current Items
    let currentTodos = JSON.parse(localStorage.getItem("Todo"));
    currentTodos.push(newTodo);

    localStorage.clear();
    //setItem again
    localStorage.setItem("Todo", JSON.stringify(currentTodos));
    
    titleInput.value =" ";
    titleDes.value = " ";

    loopToods();

});
};
loopToods();



function deleteTodo() {
    const allTodos = document.querySelectorAll("#singleTodo");
    allTodos.forEach((Todo)=>{
    
    Todo.querySelector("#dltBtn").addEventListener("click", function () {
        let currenttems = JSON.parse(localStorage.getItem("Todo"));
        let clickedIndex  = Number(Todo.getAttribute("data-itemid"));
        let remainingItems = currenttems.filter((item,index)  => {
            return index !== clickedIndex;
        });
        localStorage.clear();
        localStorage.setItem("Todo" , JSON.stringify(remainingItems))
        loopToods();

    });
    
});
}


function modifyTodo() {
    const allTodos = document.querySelectorAll("#singleTodo");

    allTodos.forEach((Todo)=>{
    
    Todo.querySelector("#editBtn").addEventListener("click", function () {
        let currenttems = JSON.parse(localStorage.getItem("Todo"));
        let clickedIndex  = Number(Todo.getAttribute("data-itemid"));
       
        document.querySelector("#Edittitle").value = currenttems[clickedIndex].title;
        document.querySelector("#Editdesc").value = currenttems[clickedIndex].desc;
        
        document.querySelector("#editForm").style.display = "block";

        document.querySelector("#arrayIndex").value = clickedIndex

    });
    
});
}
modifyTodo()

function updateTodo() {
    document.querySelector("#update").addEventListener("click", function () {
        let currenttems = JSON.parse(localStorage.getItem("Todo"));
        let editTitle = document.querySelector("#Edittitle").value;
        let editDesc = document.querySelector("#Editdesc") .value; 

        let editObject = {
            title:editTitle,
            desc : editDesc,
        }

        let updateIndex = Number(document.querySelector("#arrayIndex").value);
        currenttems[updateIndex] = editObject;
         localStorage.clear();
        localStorage.setItem("Todo" , JSON.stringify(currenttems))

       document.querySelector("#Edittitle").value = "";
        document.querySelector("#Editdesc") .value = "";
        document.querySelector("#editForm").style.display = "none"; 

        loopToods();
        })

       
        
    
}
updateTodo();
deleteTodo();
addTODO();