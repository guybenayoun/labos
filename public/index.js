 function loadUsers(){
     fetch("/getAllUsers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) =>{
        return res.json()
    }).then((data) =>{
        var usersList = document.getElementById("usersList")
        usersList.innerHTML = "<ul>"
        const users =data
        users.forEach((user)=>{
        usersList.innerHTML+= "<li>" + user.FirstName + " " + user.LastName + "</li>"
        })  
              usersList.innerHTML += "</ul>"

        //document.getElementById("usersList").innerHTML = JSON.stringify(data)
    })

   
        
    
  
    
}


function sendDesiredDatesForReport() {
    var stDt = document.querySelector("#strtDtInpt").Value;
    var endDt = document.querySelector("#endDtInpt").Value;

    console.log(stDt, endDt);

    var myBody = {
        "startDate": stDt,
        "endDate": endDt
    };

    fetch("/registrationsByDatesRange", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(myBody)
    })
        .then((dataFromServer) => {
            return dataFromServer.json();
        })
        .then((dataAsObject) => {
            console.log(dataAsObject);
            var theArr = dataAsObject;

            for (let i = 0; i < theArr.length; i++) {
                var theUser = theArr[i];
                console.log(theUser);
                document.querySelector("#displayDataFromDatabase").innerHTML +=
                    `
 <div class="oneRowUsers">
     <div> ${theUser.toHowManyAppIsRegistered} </div>
     <div> ${theUser.userEmail} </div>
 </div>
 `
            }
        })




}

