import React, { ReactNode, CSSProperties, RefObject } from "react";
import { getOnEnterPress } from "../../../utils/EventUtils";
import styles from "./NavMenu.module.scss";
import commonStyles from "../CommonStyles.module.scss";

interface Props {
    children: ReactNode;
    header: ReactNode;
    isVisible: boolean;
    onClick(): void;
}

class NavMenuSubsection extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.ref = React.createRef<HTMLDivElement>();
    }

    ref: RefObject<HTMLDivElement>;

    getSlidingStylesForMenus(): CSSProperties {
        const { isVisible } = this.props;
        const { current } = this.ref;
        let actualHeight = 0;

        if (current?.children) {
            for (const child of current.children) {
                if (child instanceof HTMLElement) {
                    actualHeight += child?.offsetHeight || 0;
                }
            }
        }

        return {
            maxHeight: isVisible ? actualHeight : 0
        };
    }

    render(): ReactNode {
        const { children, header, onClick } = this.props;
        return (
            <>
                <div
                    className={`${commonStyles.button} ${styles.menuItemSubheader}`}
                    onClick={onClick}
                    onKeyPress={getOnEnterPress(onClick)}
                    role="button"
                    tabIndex={0}
                >
                    {header}
                </div>
                <div
                    className={styles.menuItemBody}
                    ref={this.ref}
                    style={this.getSlidingStylesForMenus()}
                >
                    {children}
                </div>
            </>
        );
    }
}

export default NavMenuSubsection;
