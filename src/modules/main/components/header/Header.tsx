import React, { useState } from 'react';
import styles from './header.module.scss';
import { Link } from "react-router-dom";
import { ThemeContext, themes } from '../../../../context/themeContext';
import { useLocation } from "react-router-dom";

interface IMainRoute {
    label: string,
    link: string,
    active: boolean
}

const Header = (props: any) => {

    const location = useLocation();
    const [darkMode, setDarkMode] = React.useState(true);
    const [routes, setRoutes] = useState<IMainRoute[]>([
        {
            label: 'Monitor',
            link: '/',
            active: location.pathname === "/"
        },
        {
            label: 'Compare',
            link: '/comparison',
            active: location.pathname === "/comparison"
        }
    ]);

    const changeRoute = (index: number) => {
        routes.forEach(route => { route['active'] = false });
        routes[index]['active'] = true;
        setRoutes([...routes]);
    }

    return (
        <div className={styles.header}>
            <div className={styles.routes}>
                {routes.map((route: IMainRoute, index: number) => {
                    return (
                        <Link to={route.link} className={styles.route} key={route.label}
                            onClick={() => changeRoute(index)}
                            style={{
                                'fontWeight': route.active ? 'bold' : 'lighter',
                                'color': route.active ? '#fff' : '#ccc'
                            }}>
                            {route.label}
                        </Link>
                    )
                })}
            </div>
            <ThemeContext.Consumer>
                {({ changeTheme }) => (
                    <button
                        color="link"
                        onClick={() => {
                            setDarkMode(!darkMode);
                            changeTheme(darkMode ? themes.light : themes.dark);
                        }}
                    >
                        <span className="d-lg-none d-md-block">{darkMode ? 'Dark' : 'Light'}</span>
                    </button>
                )}
            </ThemeContext.Consumer>
        </div>
    );
}

export default Header