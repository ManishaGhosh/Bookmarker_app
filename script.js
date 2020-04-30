
function saveBookmark(e){
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }
  var bookmark = {
    "name": siteName,
    "url": siteUrl
  }

  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  document.getElementById('myfrom').reset();

  fetchBookmarks();
  e.preventDefault();
}
function deleteBookmark(url){

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
    console.log(url);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksResults = document.getElementById('bookmark-holder');
  bookmarksResults.innerHTML = '';
  var count=0;
if(localStorage.getItem('bookmarks') === null){
  console.log("empty");}
  else{
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    count= count+1;
    var html='<div class="well"><h3 class="nameweb">'+name+
                                     ' <a class="btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                     ' <a onclick="deleteBookmark(\''+url+'\')" class="btn-danger" id="btn'+count+'" href="#">Delete</a> ' +
                                     '</h3></div>';
          $("#bookmark-holder").append(html);
            var myid=$(".btn-danger").attr("id");
  }
  console.log("fetch");
}
}
function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

$(document).ready(function() {
document.getElementById('myfrom').addEventListener('submit', saveBookmark);
fetchBookmarks();
});
