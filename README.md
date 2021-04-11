### This is an example website that you can use to get your own website up and running!

# Let's get started!

----



**On your Local Computer**: in your terminal, type in the following command after the dollar sign ($):

```
$ npm install

$ npm init -y
```

instalar para el backend

```
$ npm i express mongoose morgan multer dotenv cross-env cors

$ npm i fs-extra
```

instalar dependecias frontend
```
npm i webpack webpack-cli html-webpack-plugin css-loader style-loader mini-css-extract-plugin webpack-dev-server-timeago.js -D
```

and then hit ENTER. This will download a number of files. Wait a while for that to finish. Then, type in the command:

```
$ npm start
```

and hit ENTER to start a web server that will serve your webpage! Then you can go to [http://localhost:8080](http://localhost:8080) to see your new website in action!

## Development

Using this template, you can
* write your HTML in `client/index.html`. This is the content of your website.
* write any other `html` pages you want to include inside the `client/` folder.
* create CSS stylesheets in `client/css`
* create Javascript files in `client/js`
* Include your `css` file, `my-file.css` inside your webpage by including
  
  ```
  <link type="text/css" rel="stylesheet" href="css/your-file.css" />
  ``` 

  inside the `<head>...</head>` in `client/index.html`.

* Include your `js` file, `my-file.js` inside your webpage by including

  ```
  <script src="my-file.js" />
  ```

  at the bottom of the `<body>...</body>` in `public/index.html`
  
  Instalar mongoDB https://www.mongodb.com/try/download/community?tck=docs_server

Instalar python 

* dotenv for python
`pip3 install python-dotenv`


## File Structure

```
backend/               Folder you will be working out of
    /controllers
    /models
    /public
    /routes
----app.js        
----database.js
----index.js

frontend/               Folder you will be working out of
    /models
    /services
    /styles
----app.js        
----database.js
----index.js

----
----index.html        Main HTML Page of entire website
----                     includes reference to .js & .css files
----                     that it wants to load as well when this
----                     webpage is loaded
----
----js/               Folder of .js javascript files
--------app.js        Javascript file. Included in index.html
----
----css/              folder of .css stylesheet files
--------style.css     CSS stylesheet. Included in index.html
----
scripts/               folder of python scripts 
----python/
--------readme.md       instruccion to install de enviroment  

         DO NOT TOUCH. Serves up index.html on a web server
package.json          DO NOT TOUCH. Node-js package.json file that
                           recognizes this project as a Node-js app
```


