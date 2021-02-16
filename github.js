/**
 * This file is used to for all the github api functions. It has one main function getUsers()
 * It uses es7 technology to make the http request to the github api (uses fetch, await and promises)
 * Has a client id and client secret as well that inserted in the url. This allows more requests per minute
 * Make and use a Github object in the app.js class to access these functions
 */
class Github {

   //All Github objects will have these attributes
   constructor() {

      this.client_id = 'ccc7c539c7ade26419f5';
      this.client_secret = '55b15e235a0b693ee7830de15391b5a784c0208a';
      this.reposCount = 5;
      this.reposSort = 'created: asc'
   }

   //asynchronous function that makes the http request to github api
   async getUser(user) {

      const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

      const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.reposCount}&sort=${this.reposSort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

      const profile = await profileResponse.json();

      const repos = await repoResponse.json();

      return {
         //return both the repos and the profile info in the promise(used in app.js)
         profile, repos
      } 
   }
}