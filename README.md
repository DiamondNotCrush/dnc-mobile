#Project Name
Dnc Media - Mobile App

#Project Overview
DnC Media is an open-source media server solution. This mobile app is part of the DnC Media suite and contains the mobile application necesary to browse and consume the user's media files. This application is built in JavaScript using the Ionic framework.
The hybrid basically acts as a web shell container so it is easier to access your media files than opening the browser and accessing the site manually. However the site is also optimized for mobile support and should work fine even without this app.

##File Composition
All the angular files are in www\js and www\templates with index at the root of www. www\js contains the angular files composed of app, constants, controllers, and service. App contains the states, controllers/services are self-explanatory with constants containing user-defined roles.

Templates is made up of the various html files that create the states, the app consists of. They can be broken into index which is in the root folder and routing all the dependencies, and www\templates which has dashboard, login, main, and signup.

###Installing Dependencies

For development install [Ionic](http://ionicframework.com/docs/overview/#starter) . The link contains instructions to installing all the other dependencies needed including cordova and the Android SDK.

Angular dependencies include:
angular-animate
angular-mocks
angular-resource
angular-sanitize
angular-ui-router
