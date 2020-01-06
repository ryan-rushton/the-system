import React, { ReactNode, CSSProperties, RefObject, ReactElement } from "react";
import { getOnEnterPress } from "../../utils/EventUtils";

function getSlidingStylesForMenus(
    ref: RefObject<HTMLDivElement>,
    isVisible: boolean
): CSSProperties {
    const { current } = ref;
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

interface Props {
    bodyRef: RefObject<HTMLDivElement>;
    content: ReactNode;
    headerText: string;
    isVisible: boolean;
    onClick(): void;
}

function NavMenuSubsection({
    onClick,
    headerText,
    bodyRef,
    isVisible,
    content
}: Props): ReactElement {
    return (
        <>
            <div
                className="the-system-nav-button the-system-nav-dropdown-item-subheader"
                onClick={onClick}
                onKeyPress={getOnEnterPress(onClick)}
                role="button"
                tabIndex={0}
            >
                {headerText}
            </div>
            <div
                className="the-system-nav-dropdown-item-body"
                ref={bodyRef}
                style={getSlidingStylesForMenus(bodyRef, isVisible)}
            >
                {content}
            </div>
        </>
    );
}

export default React.memo(NavMenuSubsection);
