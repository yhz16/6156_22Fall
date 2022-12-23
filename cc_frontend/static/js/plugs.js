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

    var apigClient = apigClientFactory.newClient();
    apigClient.imgFavoriteImgIdPut({'img_id':artId},{'img_id':artId},{})
    console.log("send Fav:"+artId)
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
    console.log(artId+comments)

    var apigClient = apigClientFactory.newClient();
    apigClient.imgCommentImgIdPut({'img_id':artId},{'comments':comments,'img_id':artId},{})
    console.log("send comments:"+comments+",img_id:"+artId)

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
    // alert(artId+email)

    var apigClient = apigClientFactory.newClient();

    apigClient.imgShareImgIdPut({'img_id':artId},{'email':email,'img_id':artId},{})
    console.log("send email:"+email+",img_id:"+artId)
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

function del_comment(obj){
    console.log(obj.id)
    var x = document.getElementById("artwork"+obj.id);
    x.style.display = "none";
}

function github_login(obj)
{
    var client_id = "42537773772d769bf66c";
    var authorize_uri = 'https://github.com/login/oauth/authorize';
    var redirect_uri = 'http://54.167.138.178:8080/oauth/redirect';
    var url = authorize_uri.concat("?client_id=", client_id, "&redirect_uri=", redirect_uri);
    location.replace(url)
}
