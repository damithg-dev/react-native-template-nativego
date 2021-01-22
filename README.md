nativego is react native template to simplify start a react native project. 

Dependencies 
    @gorhom/bottom-sheet
    @react-native-community/async-storage
    @react-native-community/datetimepicker
    @react-native-community/hooks
    @react-native-community/masked-view
    @react-navigation/native
    @react-navigation/stack
    moment
    prop-types
    react-native-animated-number
    react-native-config
    react-native-easy-toast
    react-native-file-logger
    react-native-gesture-handler
    react-native-keyboard-aware-scroll-view
    react-native-masked-text
    react-native-modal-datetime-picker
    react-native-progress
    react-native-reanimated
    react-native-safe-area-context
    react-native-screens
    react-native-vector-icons

File Structure

src/
All the files are inside this base component.

api/
This folder contains logic related to external API communications, it includes:
endpoints.js - where all required static values are stored.
helper.js - for storing reusable logic.
individual feature files — Each feature file contains api communication logic for a particular feature.

assets/
Just as the name implies, this houses static files (e.g images) used in the application.
assets/fonts : contains the custom fonts that are using
assets/images : contains the images that are using
assets/json : contains the json that are using
assets/lottie : contains the lottie that are using

redux/
This holds all the redux files if you are using react-redux for managing state. Inside redux folder you have actions, reducers, store which can easily manage your redux files

redux/actions
All the action files which are using around redux goes here.

redux/reducers
All the reducers which are using around redux goes here.

redux/store
You can put your store inside this redux store folder.

components/
Shared components used across features are placed in this directory. An example of such (as shown above) is the layout component, which is used to wrap the application components and determine its overall layout.
components/alert: this contains the Alert and ConfirmationAlert
components/background: base class and custom keyboard aware view for screens.
components/button: common button.
components/enum: contain  enums.
components/flatListItem: contain the List items.
components/input: contain the several type of TextInputs.
components/modal: contain the dropdown modal for InputDropDown and modal container .
components/preloader: contain the progress indicator and loading indicator.


screens/
You can put you all screen-based components inside here (Eg - SplashScreen, HomeScreen).

navigation/
You project base navigation goes here. You can create stack navigator and export it to your application.

styles/
If you have global styles defined in your project you can put it over here like colors, font styles like things.

utilities/
You can put utils files over here.
utilities/context/theme: this include dark and light theme context.
utilities/functions/format : this folder include three most useful function currencyFormat, decimalFormat, dateFormat.
utilities/functions/logs: this include log function which you can use to log the message either as console.log or write to a file.
utilities/functions/validation: this folder include three most useful function validateEmail, validatePassword.

