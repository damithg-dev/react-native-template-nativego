import React , {useEffect, useState, useContext , createContext} from 'react';
import { Appearance } from 'react-native';
import { lightPalette , darkPalette} from '../../../styles/palette';

export const ThemeContext = createContext({
    isDark: false,
    palette: lightPalette,
    setScheme: () => {},
});

export const ThemeProvider = (props) => {
    // Getting the device color theme, this will also work with react-native-web
    const colorScheme = Appearance.getColorScheme(); // Can be dark | light | no-preference

    /*x
    * To enable changing the app theme dynamicly in the app (run-time)
    * we're gonna use useState so we can override the default device theme
    */
    const [isDark, setIsDark] = useState(colorScheme === "dark");

    // Listening to changes of device appearance while in run-time
    useEffect(() => {
        setIsDark(colorScheme === "dark");
    }, [colorScheme]);

    const defaultTheme = {
        isDark,
        // Changing palette schemes according to theme
        palette: isDark ? darkPalette : lightPalette,
        // Overrides the isDark value will cause re-render inside the context.  
        setScheme: (scheme) => setIsDark(scheme === "dark"),
    };

  return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, palette, setScheme}
export const useTheme = () => useContext(ThemeContext);
