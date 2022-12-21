// let icon = document.querySelector('.heart-button');
// icon.onclick = function(){
//     icon.classList.toggle('active');
// }

// var apigClient = apigClientFactory.newClient();

function like_item(obj)
{
    obj.classList.toggle('active');
    var artId = obj.getAttribute('data-id');
    console.log(artId)
    //发一个put/post
    // apigClient.likePut({},{'id':id},{});
}


function comment(obj)
{
    var artId = obj.getAttribute('data-id');
    // alert(artId)
    var comm_div = document.getElementById("exampleModalLabel")
    comm_div.innerHTML = "Comment for "+artId
    comm_div.name = artId

}

function comment_submit(obj)
{
    var comments = document.getElementById("exampleFormControlTextarea1").value;
    var artId = document.getElementById("exampleModalLabel").name;
    alert(artId+comments)
    //发一个put/post
    document.getElementById("exampleFormControlTextarea1").value="";
    $("#commentModal").modal('hide');

}

function sending(obj)
{
    var artId = obj.getAttribute('data-id');
    var email_div = document.getElementById("emailModalLabel");
    email_div.innerHTML = "share "+artId+" to email";
    email_div.name= artId;
}

function send_email(obj)
{
    var email = document.getElementById("inputEmail").value;
    var artId = document.getElementById("emailModalLabel").name;
    alert(artId+email)
    document.getElementById("inputEmail").value="";
    $("#snsModal").modal('hide');
}

// $(document).on("click", ".open-commentModal", function () {
//     var artId = $(this).data('id');
//     alert(artId)
//     $(".modal-body #exampleModalLabel").innerHTML("Comment for "+artId);
// });

function log(obj){
    window.location.href = "home.html";
}

function github_login(obj)
{
    var client_id = "5b8837fe0d2ccb36fb64";
    var authorize_uri = 'https://github.com/login/oauth/authorize';
    var redirect_uri = 'http://localhost:8080/oauth/redirect';
    var url = authorize_uri.concat("?client_id=", client_id, "&redirect_uri=", redirect_uri);
    location.replace(url)
}

