import React from "react";
import Link from "next/link";
import { useCustomLinkUIStyles } from "./style";

const CustomLinkUI = ({
  href = "#",
  defaultColor = true,
  customRoot = null,
  children,
}) => {
  const classes = useCustomLinkUIStyles();

  const defaultStyle = defaultColor
    ? `${customRoot} ${classes.link}`
    : `${customRoot}`;

  const classesLink = customRoot ? defaultStyle : classes.link;

  return (
    <Link href={href}>
      <a className={classesLink}>{children}</a>
    </Link>
  );
};

export default React.memo(CustomLinkUI);
