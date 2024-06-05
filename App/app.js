/**
 * This the main file. 
 * Create a github object and ui object in this class. It will enable you to use those class functions
 * Uses object oriented programming
 * Uses es7 technology to handle http requests(fetch, then, promises)
 */

//Create the github and Ui objects
const github = new Github();
const ui = new UI();

//Get the search input div
const searchUser = document.querySelector("#searchUser");

//use the div to add an event listner of type 'keyup' to get the username the user types in to search for
searchUser.addEventListener('keyup', function(e){

   //this stores the user input
   const userText = e.target.value;

   //if there is content, enter the if statement
   if(userText !== '')
   {
      //make the http call to github with the username that the user typed in
      github.getUser(userText) //returns a promise
         .then( data => {

            //data.profile explained. The data is made up of profile and repos because I return both. But i only want the profile part for now
            if(data.profile.message === 'Not Found') 
            {
               //if not found, display the error message
               ui.showAlert('User not found', 'alert alert-danger');

            } 

            else
            {
               //Else if it is found, display the repos and the profile information
               ui.showProfile(data.profile);
               ui.showRepos(data.repos);
            }

         })
   } 

   //else clear the ui of any profile
   else
     ui.clearProfile();
   
});