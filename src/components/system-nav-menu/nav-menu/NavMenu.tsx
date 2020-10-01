import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties, ReactNode, RefObject, ReactNodeArray } from "react";
import { getDistanceToTop } from "../../../utils/DomUtil";
import { getOnEnterPress } from "../../../utils/EventUtils";
import NavMenuSubsection from "./NavMenuSubsection";
import { CallbackFunction } from "../../../types";
import styles from "./NavMenu.module.scss";
import commonStyles from "../CommonStyles.module.scss";

interface Props {
    children: ReactNodeArray;
    titles: ReactNodeArray;
}

interface State {
    menuVisible: boolean;
    openMenuIndex?: number;
}

class NavMenu extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            menuVisible: false,
        };

        this.menuRef = React.createRef<HTMLDivElement>();
    }

    menuRef: RefObject<HTMLDivElement>;

    onMenuClick: CallbackFunction = () => {
        this.setState(
            (prevState: State): State => ({
                ...prevState,
                menuVisible: !prevState.menuVisible,
            })
        );
    };

    onSubsectionClick = (openMenuIndex?: number): void => {
        this.setState(
            (prevState: State): State => ({
                ...prevState,
                openMenuIndex:
                    openMenuIndex === prevState.openMenuIndex ? undefined : openMenuIndex,
            })
        );
    };

    getTransformStyle(): CSSProperties | undefined {
        const { menuVisible } = this.state;
        const { current } = this.menuRef;

        if (current) {
            const maxHeight = `calc(100vh - ${getDistanceToTop(current)}px)`;
            const visibleTransform = `translateX(calc(-8vw - ${current.offsetWidth}px))`;
            return {
                maxHeight,
                transform: menuVisible ? visibleTransform : "translateX(0px)",
            };
        }
    }

    renderSubsection = (item: ReactNode, index: number): ReactNode => {
        const { titles } = this.props;
        const { openMenuIndex } = this.state;
        return (
            <NavMenuSubsection
                key={index}
                onClick={(): void => this.onSubsectionClick(index)}
                header={titles[index]}
                isVisible={index === openMenuIndex}
            >
                {item}
            </NavMenuSubsection>
        );
    };

    render(): ReactNode {
        const { children, titles } = this.props;
        if (children.length !== titles.length) {
            console.error("NavMenu: children and titles props must equal length.");
            return null;
        }
        return (
            <div className={styles.nav}>
                <div className={styles.header}>
                    <div
                        className={`${commonStyles.button} ${styles.headerButton}`}
                        onClick={this.onMenuClick}
                        onKeyPress={getOnEnterPress(this.onMenuClick)}
                        role="button"
                        tabIndex={0}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className={styles.menu} ref={this.menuRef} style={this.getTransformStyle()}>
                    {children.map(this.renderSubsection)}
                </div>
            </div>
        );
    }
}

export default NavMenu;
