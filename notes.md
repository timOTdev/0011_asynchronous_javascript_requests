# Asynchronous JavaScript Requests
By Richard Kalehoff and co
Started 9-30-2017

# Lesson 1: Ajax with XHR ✔
## Course Intro
- You make a request for data and do something else
- You deal with the data when it comes back
- Asynchronous javascript and XML refers to many formats now, not just those 2
- We will look at XHR object, jQuery, and fetch API

## Client Server Demonstration
- The internet is a world of communication between clients, the internet, and servers
- Clients makes a "GET" request and wait for a "RESPONSE" from the server
- Synchronously, we have to wait for data to arrive IE to render a website
- With async, you can "get" request data and the process will run in the background
- When the response returns, you can use a "callback" to apply special instructions to the response
- Async allows us to make other requests or do other things without having to wait for the response to return
- The website renders just updates the current page as response return

## Ajax Definition & Examples
- AJAX stands for asynchronous JavaScript and XML
- XML use to be the dominant format, now most use JSON format
- So more correctly, AJAJ is a better name but doesn't sound as nice
- So the AJAX response can return as XML, JSON, or HTML
- The return formats as follows:
1. XML
```
<entry></entry>
```
2. JSON
```
{ property: data }
```
3. HTML
```
<div></div>
```

## APIs
- We use APIs (Application Programming Interface) to interact with various data sources
- There are millions out there from Google, Youtube, etc.
[Google APIs](https://developers.google.com/apis-explorer/)
[Giant Database of APIs](http://www.programmableweb.com/apis/directory)
[Udacity API](https://www.udacity.com/public-api/v1/catalog)

## Create An Async Request with XHR
- We have to do a lot of the initial setup of a "GET" request
- XHR is provided by the javascript environment and used to make AJAX requests

## The XHR Object
- XHR is short for XMLHttpReqequest
- Provided by javascript just like the document object
- Run this command on Unsplash:
```
const asyncRequestObject = new XMLHttpRequest()
```
- Even though it has XML in it, it is not limited to only XML documents
- XML was just the dominant format in the past
  
**More reading**
- MDN's docs - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
- WHATWG Spec - https://xhr.spec.whatwg.org/
- W3C Spec - https://www.w3.org/TR/XMLHttpRequest/

## XHR's.open() method
- One popular method from setting up an XHR opject is:
```
asyncRequestObject.open();
// Takes (method, url, async, user, password)
```
- Methods are GET (to retrieve data) and POST(to send data)
- Remember about [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) and [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
- Now we try on 
```
asyncRequestObject.open('GET', 'https://unsplash.com');
```

## XHR's.send() method
- It's not enough just to get a request but we also need to send it with .send();
```
const asyncRequestObject = new XMLHttpRequest();
asyncRequestObject.open('GET', 'https://unsplash.com');
asyncRequestObject.send();
```
  
**Handling Success**
- Even though the request was sent, we have to determine what to do with the response
- We need to use the .onload to run the handleSuccess() function
```
function handleSuccess () {
    // in the function, the `this` value is the XHR object
    // this.responseText holds the response from the server

    console.log( this.responseText ); // the HTML of https://unsplash.com/
}

asyncRequestObject.onload = handleSuccess;
```
  
**Handling Errors**
- We need a way to handle if we get any errors also
```
function handleError () {
    // in the function, the `this` value is the XHR object
    console.log( 'An error occurred 😞' );
}

asyncRequestObject.onerror = handleError;
```

## A Full Request
- The full code we have:
```
function handleSuccess () { 
  console.log( this.responseText ); 
// the HTML of https://unsplash.com/}
function handleError () { 
  console.log( 'An error occurred \uD83D\uDE1E' );
}
const asyncRequestObject = new XMLHttpRequest();
asyncRequestObject.open('GET', 'https://unsplash.com');
asyncRequestObject.onload = handleSuccess;
asyncRequestObject.onerror = handleError;
asyncRequestObject.send();
```
**APIs and JSONs**
- What we receive in a JSON can be difficult to read?
- We can use `JSON.parse()` to output it into a javascript object
```
function handleSuccess () {
const data = JSON.parse( this.responseText ); // convert data from JSON to a JavaScript object
console.log( data );
}

asyncRequestObject.onload = handleSuccess;
```

## Project Initial Walkthrough
- We are going to be making a search form to generate some picture and results
**Clone the repo**
- I've cloned the repo from the course with git clone https://github.com/udacity/course-ajax.git4  
  
**Unsplash API**
- Create a developer account here - https://unsplash.com/developers
- Next, create an application here - https://unsplash.com/oauth/applications
- this will give you an "Application ID" that you'll need to make requests  
  
**The New York Times API**
- Create a developer account here - https://developer.nytimes.com/
- They'll email you your api-key (you'll need this to make requests)  
  
**Unsplash Request**
- Now we have code to send the header request:
```
function addImage(){}
const searchedForText = 'hippos';
const unsplashRequest = new XMLHttpRequest();

unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
unsplashRequest.onload = addImage;

unsplashRequest.send()
```
- Note that Unsplash requires an HTTP header
- We use XMLHttpRequest.setRequestHeader() as the method to set this
- You must call this method after "open" but before "send"

## Setting a Request Header
- Now we need to set the request header before we send to unsplash
```
const searchedForText = 'hippos';
const unsplashRequest = new XMLHttpRequest();

unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
unsplashRequest.onload = addImage;
unsplashRequest.setRequestHeader('Authorization', 'Client-ID <your-client-id>');
unsplashRequest.send();

function addImage(){
}
```  
- We also want to send to NY Times for articles 
- It doesn't require a header so we don't have to set one
```
function addArticles () {}
const articleRequest = new XMLHttpRequest();
articleRequest.onload = addArticles;
articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=<your-API-key-goes-here>`);
articleRequest.send();
```

## Project Final Walkthrough
- Now we have all the code to send to Unsplash and NY Times

## XHR Recap
**To Send An Async Request**
- create an XHR object with the XMLHttpRequest constructor function
- use the .open() method - set the HTTP method and the URL of the resource to be fetched
- set the .onload property - set this to a function that will run upon a successful fetch
- set the .onerror property - set this to a function that will run when an error occurs
- use the .send() method - send the request
  
**To Use The Response**
- use the .responseText property - holds the text of the async request's response

## XHR Outro
- You do have to write all that code if you want to do an XHR request
- But let's check out jQuery to see how they do it

# Lesson 2: Ajax with jQuery
## The jQuery Library & Ajax
- jQuery is a pre-built system to make async requests behind the scenes
- You can download the current version or just use the CDN in your software
- jQuery was introduced to because browsers were not standardized on functionality yet
- Now that they have, jQuery is not need but does offer the ajax() method which is very powerful

## jQuery's `ajax()` Method
- This is the main method for the jQuery library to make async requests
- You can call by 2 ways:
  - ```$.ajax(<url-to-fetch>, <a-configuration-object>);```
  - ```$.ajax(<just a configuration object>);```
  
- The most common way is to use the configuration object
- So you can pass in the object via variable or directly into the ajax method
- It is basically a javascript object
```
var settings = {
   frosting: 'buttercream',
   colors: ['orange', 'blue'],
   layers: 2,
   isRound: true
};
```
  
- So try it with jquery.com's website
```
$.ajax({
    url: 'http://swapi.co/api/people/1/'
});
```

## Handling The Returned Data
- AJAX handles the response with the .done() function
```
function handleResponse(data) {
    console.log('the ajax request has finished!');
    console.log(data);
}

$.ajax({
    url: 'https://swapi.co/api/people/1/'
}).done(handleResponse);
```

**The XHR method conversion to jQuery**
- Before we had with the XHR method:
```
const imgRequest = new XMLHttpRequest();
imgRequest.onload = addImage;
imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
imgRequest.setRequestHeader('Authorization', 'Client-ID <your-client-id-here>');
imgRequest.send();
```
- But now the jQUery method is much quicker:
```
$.ajax({
    url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`
}).done(addImage);
```
- With the jQuery code:
  - we do not need to create an XHR object
  - instead of specifying that the request is a GET request, it defaults to that and we just provide the URL of the resource we're requesting
  - instead of setting onload, we use the .done() method
  
**Adding authorization and API keys**
- We can use the built-in .header() method in jQuery
```
$.ajax({
  url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`
  headers: {
    Authorization: 'Client-ID 123abc456def'
  }
}).done(addImage);
```

## Clean up the Success Callback
- jQuery automatically returns JavaScript if the respone is a JSON file
- There for we need to clean up our code to remove some things
- Old code:
```
function addImage() {
    const data = JSON.parse(this.responseText);
    const firstImage = data.results[0];

    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
    );
}
```
- New code:
```
function addImage(images) {
    const firstImage = images.results[0];

    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
    );
}
```
**The elements that have changed**
- the function now has one parameter images
- this parameter has already been converted from JSON to a JavaScript object, so * the line that had JSON.parse() is no longer needed.
- the firstImage variable is set to the images.results first item

**My conversion of the NY Times code to AJAX**
- Old Code:
```
function addArticles () {}
  const data = JSON.parse(this.responseText);
  const firstArticle = data.results[0];

  responseContainer.insertAdjacentHTML('afterbegin', `<figure>
          <img src="${firstArticle.urls.small}" alt="${searchedForText}">
          <figcaption>${searchedForText} by ${firstArticle.user.name}</figcaption>
      </figure>`
  );
```
- New Code:
```
function addArticles(articles) {
  const firstArticle = articles.results[0];

  responseContainer.insertAdjacentHTML('afterbegin', `<figure>
      <img src="${firstArticle.urls.small}" alt="${searchedForText}">
      <figcaption>${searchedForText} by ${firstArticle.user.name}</figcaption>
  </figure>`
  );
}  
```

## Code Walkthrough
- Looking at the complete code

## Peek inside $.ajax()
- We look into the source code of jQuery's AJAX method to see how it forms the XHR call
- use the debugger in chrome helps also
- See 
  - [Pause Your Code With Breakpoints](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints)
  - [JavaScript Debugging Reference](https://developers.google.com/web/tools/chrome-devtools/javascript/reference)

## Review the Call Stack
- You can use the chrome dev tools to go through the call stack
- It checks the calls starting at he bottom of the stack first

## Walkthrough of .ajaxTransport
- Under the hood, jQuery's ajax method does all of these things for us
  - creates a new XHR object each time it's called
  - sets all of the XHR properties and methods
  - sends the XHR request

## jQuery's Other Async Methods
- jQuery also has some convenience methods but not recommended that we use them
- There are:
  - .get()
  - .getJSON()
  - .getScript()
  - .post()
  - .load()

## Async with jQuery Outro
- Now that we looked at jQuery's AJAX method, there's another one
- There's fetch API which is even more powerful