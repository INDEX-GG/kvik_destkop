import React from "react";

/**
 * @typedef EmptyPlaceholderProps
 * @property {string} title
 * @property {string} subtitle
 * @property {string} img
 * @property {string} imgAlt
 * @property {string} [className] `className` заголовка
 * @property {string} [customClass] Класс картинки.
 */

/**
 * @param {EmptyPlaceholderProps} props
 */
const EmptyPlaceholder = ({
  title,
  subtitle,
  img,
  imgAlt,
  className = undefined,
  customClass = "",
}) => {
  const titleClass = ["notInf__title", className && className].join(" ");

  return (
    <div className="clientPage__container_bottom">
      <div className="clientPage__container_content">
        <div className="notInfContainer">
          {title && <div className={titleClass}>{title}</div>}
          {subtitle && <p className="notInf__subtitle">{subtitle}</p>}
          {img && (
            <img
              className={`notInf__img-${customClass}`}
              style={{ maxWidth: "650px" }}
              src={img}
              alt={imgAlt}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyPlaceholder;
