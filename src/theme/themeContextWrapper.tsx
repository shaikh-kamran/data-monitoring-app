import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from '../context/themeContext';

export default function ThemeContextWrapper(props: any) {

    const [theme, setTheme] = useState(themes.dark);

    const changeTheme = (theme: any) => {
        setTheme(theme);
    }

    useEffect(() => {
        switch (theme) {
            case themes.light:
                document.body.classList.remove('dark-content');
                document.body.classList.add('white-content');
                break;
            case themes.dark:
                document.body.classList.remove('white-content');
                document.body.classList.add('dark-content');
                break;
            default:
                document.body.classList.remove('white-content');
                break;
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}