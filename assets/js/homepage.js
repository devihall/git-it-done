
var userFormEl = document.querySelector("#user-form")
var nameInputEl = document.querySelector("#username")
var repoContainerEl = document.querySelector("#reposcontainer")
var repoSearchTerm = document.querySelector("#repo-search-term")

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
  console.log(event);
};
var getUserRepos = function (user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  //send request to get data
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert('Error: GitHub User Not Found');
    }
  })
  .catch(function(error) {
    
    alert("Unable to connect to GitHub");
  });
}

//display data
var displayRepos = function(repos, searchTerm) {
  console.log(repos);
  console.log(searchTerm);

  //check if api returned any repos
  if (repos.length ===0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  // clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  //loop over repos
  for (var i = 0; i < repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    //create a span element to hold the repo's name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append the span element to parent div container
    repoEl.appendChild(titleEl);

    //append parent div container to dom element
    repoContainerEl.appendChild(repoEl);
  }
}
//add event listener to form

userFormEl.addEventListener('submit', formSubmitHandler);