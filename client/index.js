
var global_count = 0 

window.addEventListener("load", function(){
    fetch("/getComments")
    .then(res => res.json())
    .then(data => {
        let commentsContent = data["content"].split("\n")
        let tempContent = []
        for(let i = 0; i < commentsContent.length; i++){
            tempContent.push(JSON.parse(commentsContent[i]))
        }
        for(let i = 0; i < tempContent.length; i++){
            let post = '<li class="list-group-item my-1" id="comment'+i+'"><b>'+tempContent[i]["username"]+': </b><span>'+tempContent[i]["comment"]+'</span></li>'
            document.getElementById("commentList").innerHTML += post
        }
    })
    .catch(err => {
        console.log(err)
    })
})

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        document.getElementById("commentSection").style.display = "block";
    } 
    else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight/2) {
        if (global_count < 1){
            document.getElementById("popUpFrame").style.display = "block";
            global_count++;
        }
    }
}

document.addEventListener("click", function(event){
    let popUpBox = document.getElementById("popUpBox")
    if(!popUpBox.contains(event.target)){
        document.getElementById("popUpFrame").style.display = "none";
    }
}) 

document.getElementById("commentForm").addEventListener("submit", function(event){
    event.stopPropagation()
    event.preventDefault()

    let request = {
        "username":document.getElementById("unameInput").value,
        "comment":document.getElementById("textInput").value
    }

    fetch("/addComment", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(request)
    })
    .then(res => res.json())
    .then(data => {
        let post = '<li class="list-group-item my-1" id="comment'+data["commentNumber"]+'"><b>'+document.getElementById("unameInput").value+': </b><span>'+document.getElementById("textInput").value+'</span></li>'
        document.getElementById("commentList").innerHTML += post
    })
    .catch(err => {
        console.log(err)
    })
})

// eslint-disable-next-line no-unused-vars
function  scrollSquat() {
    document.getElementById("squatDesc").scrollIntoView()
}

// eslint-disable-next-line no-unused-vars
function  scrollBench() {
    document.getElementById("benchDesc").scrollIntoView()
}

// eslint-disable-next-line no-unused-vars
function  scrollDeadlift() {
    document.getElementById("deadliftDesc").scrollIntoView()
}
