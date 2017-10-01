# Asynchronous JavaScript Requests
By Richard Kalehoff and co
Started 9-30-2017

# Lesson 1: Ajax with XHR
## Course Intro
- You make a request for data and do something else
- You deal with the data when it comes back
- Asynchronous javascript and XML refers to many formats now, not just those 2
- We will look at XHR object, jQuery, and fetch API

## Client Server Demonstration
- The internet is a world of communication between clients, the internet, and servers
- Clients makes a "GET" request and wait for a "RESPONSE" from the server
- Synchronously, we have to wait for data to arrive to render a website as an example
- With async, you can "get" data and the process will run in the background
- When the response returns, you can use a "callback" to apply special instructions to the response
- Async allows us to make other requests or do othe things without having to wait for the response to return
- The website renders just updates the current page as responses return

## Ajax Definition & Examples
- AJAX stands for asynchronous JavaScript and XML
- XML use to be the dominant format, now most is JSON format
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

## Project Final Walkthrough

## XHR Recap

## XHR Outro