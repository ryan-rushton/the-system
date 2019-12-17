import React from "react";
import PropTypes from "prop-types";

const getSlidingStylesForMenus = (ref, isVisible) => {
    const { current } = ref;
    let actualHeight = 0;

    if (current?.childNodes?.length) {
        for (const child of current.childNodes) {
            actualHeight += child.offsetHeight;
        }
    }

    return {
        maxHeight: isVisible ? actualHeight : 0
    };
};

const NavMenuSubsection = ({ onClick, headerText, bodyRef, isVisible, content }) => (
    <>
        <div
            className="the-system-nav-button the-system-nav-dropdown-item-subheader"
            onClick={onClick}
            role="button"
            tabIndex="0"
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

NavMenuSubsection.propTypes = {
    onClick: PropTypes.func.isRequired,
    headerText: PropTypes.string.isRequired,
    bodyRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]).isRequired,
    isVisible: PropTypes.bool,
    content: PropTypes.node.isRequired
};

export default NavMenuSubsection;
