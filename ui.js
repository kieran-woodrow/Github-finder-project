/**
 * This file is used for all of the UI interactions and insertions once it gets all the info from the api call
 * Has 5 main functions. showProfile(), showAlert(), clearAlertMessages(), showRepos(), clearProfile()
 * showProfile and showRepos dynamically insert htlm into the div
 * Make and use a UI object in app.js to use these functions
 */

class UI {
   constructor() {

      this.profile = document.querySelector('.profile');
   }

   //This function handles all of the dynamic creation in the ui of all the users info if a user exists
   showProfile(user) {

      this.profile.innerHTML = 
      `
         <div class="card card-body mb-3">
            <div class="row">
               <div class="col-md-3">
                  <img class="img-fluid mb-2" src="${user.avatar_url}">
                  <a href"${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
               </div>
               <div class="col md-9">
                  <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                  <span class="badge badge-secondary">Public Gists: ${user.gists}</span>
                  <span class="badge badge-success">Followers: ${user.followers}</span>
                  <span class="badge badge-info">Following: ${user.following}</span>
                  <br><br>
                  <ul class="list-group">
                     <li class="list-group-item">Company: ${user.company}</li>
                     <li class="list-group-item">Website/Blog: ${user.blog}</li>
                     <li class="list-group-item">Location: ${user.location}</li>
                     <li class="list-group-item">Member Since: ${user.created_at}</li>
                  </ul>
               </div>
            </div>
         </div>
         <h3 class="page-heading mb-3"> Latest Repos</h3>
         <div id="repos"></div>
      `
      ;
   }

   //This function handles the error message if a username is not found
   showAlert(message, className) {

      //call the clear function to clear all previous messages. Hence only one error message shows instead of multiple 
      this.clearAlertMessage();

      //create the div
      const div = document.createElement( 'div' );
      //give it a classname from the function arguments
      div.className = className;
      //create a text node with the message from the function argument and put it into the div
      div.appendChild( document.createTextNode(message) );

      //get parent
      const parent_Container = document.querySelector('.searchContainer');
      //get searchbox
      const search = document.querySelector('.search');
      //insert the div with the error message after the parent but before the search div
      parent_Container.insertBefore(div, search);

      //set a timeout to disappear after 3 seconds
      setTimeout(() => {

         this.clearAlertMessage();

      }, 3000);
   }

   //This function handles the use of multiple error messages. If there is already an error message, don't show another one 
   clearAlertMessage() {

      //get the current alert
      const currentAlert = document.querySelector('.alert');

      if( currentAlert ){
         currentAlert.remove();
      }
   }

   //This function dynamically creates and adds to the Ui the top/current 5 repos from the found user
   showRepos( reposArray ) { //NOTE: the passed in variable is an array of JSON repos

      let output = '';

      reposArray.forEach( function (repo) {

            output += 
            `
               <div class="card card-body mb-2">
                  <div class="row">
                     <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                     </div
                     <div class="col-md-6">
                        <span class="badge badge-primary">Stars: ${repos.stargazers_count}</span>
                        <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                     </div
                  </div>
               </div>
            `
      });

      //output the reposotories
      document.getElementById( 'repos' ).innerHTML = output;
   }

  //This function clears the whole UI if you delete the entered username
   clearProfile() {

      this.profile.innerHTML = '';
   }
}