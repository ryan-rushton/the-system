import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
    CSSProperties,
    ReactNodeArray,
    FC,
    useState,
    useRef,
    useCallback,
    Children,
} from "react";
import { getDistanceToTop } from "../../../utils/DomUtil";
import { getOnEnterPress } from "../../../utils/EventUtils";
import NavMenuSubsection from "./NavMenuSubsection";
import styles from "./NavMenu.module.scss";
import commonStyles from "../CommonStyles.module.scss";

interface Props {
    titles: ReactNodeArray;
}

interface State {
    menuVisible: boolean;
    openMenuIndex?: number;
}

const NavMenu: FC<Props> = ({ children, titles }) => {
    const [{ menuVisible, openMenuIndex }, setState] = useState<State>({ menuVisible: false });
    const menuRef = useRef<HTMLDivElement>(null);

    const onMenuClick = useCallback(() => {
        setState(
            (prevState: State): State => ({
                ...prevState,
                menuVisible: !prevState.menuVisible,
            })
        );
    }, [setState]);

    const onSubsectionClick = useCallback(
        (openMenuIndex: number) => {
            setState(
                (prevState: State): State => ({
                    ...prevState,
                    openMenuIndex:
                        openMenuIndex === prevState.openMenuIndex ? undefined : openMenuIndex,
                })
            );
        },
        [setState]
    );

    const transformStyles: CSSProperties = {};

    if (Children.count(children) !== titles.length) {
        console.error("NavMenu: children and titles props must equal length.");
        return null;
    }

    if (menuRef.current) {
        const maxHeight = `calc(100vh - ${getDistanceToTop(menuRef.current)}px)`;
        const visibleTransform = `translateX(calc(-8vw - ${menuRef.current.offsetWidth}px))`;
        transformStyles.maxHeight = maxHeight;
        transformStyles.transform = menuVisible ? visibleTransform : "translateX(0px)";
    }

    return (
        <div className={styles.nav}>
            <div className={styles.header}>
                <div
                    className={`${commonStyles.button} ${styles.headerButton}`}
                    onClick={onMenuClick}
                    onKeyPress={getOnEnterPress(onMenuClick)}
                    role="button"
                    tabIndex={0}
                >
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
            <div className={styles.menu} ref={menuRef} style={transformStyles}>
                {
                    // using indexes as keys is bad but these items are static in the lifetime of the app
                    Children.map(children, (child, index) => (
                        <NavMenuSubsection
                            key={index}
                            onClick={(): void => onSubsectionClick(index)}
                            header={titles[index]}
                            isVisible={index === openMenuIndex}
                        >
                            {child}
                        </NavMenuSubsection>
                    ))
                }
            </div>
        </div>
    );
};

export default NavMenu;
