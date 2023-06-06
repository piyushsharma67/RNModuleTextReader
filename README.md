# RNModuleTextReader

Hi folks,

The following repository is an example of how to parse text from image in a React Native Project.


The project use Google MLKit for this purpose.
Following are the steps used:

1. Dependency for the Mlkit was added in project build.gradle file.
2. created a module and package file inside project.
3. in module we create a variable of type TextRecognizer provided by Mlkit.
4. We initiize the variable inside the module constructor.
5. we expose a method called 'detectFromUri' from the module which expects image Uri(String) and a default promise object.
6. Inside the method we process the image using the textRecognizer object and on successfully processing the image promise resolves with the parsed data else promise is rejected with error.
7. On The JS side we import this RNTextDetector nativeModule using NativeModules provided by React-native
8. after clicking the image we pass the image uri to the 'detectfromUri' method exposed by the RNTextDetector module and use it however we want.


#StayHungryForNewThings
Happy Coding!!
