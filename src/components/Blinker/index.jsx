import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { getOffset } from "../utils";
const Blinker = (props) => {
    const {id} = props;
    // const onClick = () => {

    // }
  return (
      <AnchorLink offset={getOffset} href={id}>
          <i className="fa fa-chevron-down fa-5x blink bottom" aria-hidden="true" /*onClick={onClick}*//>
      </AnchorLink>
  );
};

Blinker.defaultProps = {
    id: "#post"
}

export default Blinker;
