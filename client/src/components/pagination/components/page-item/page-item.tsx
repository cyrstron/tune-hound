import React, { FC, useCallback } from "react";
import classNames from "classnames/bind";

import styles from "./page-item.scss";

const cx = classNames.bind(styles);

export interface PageItemProps {
  pageIndex: number;
  isActive?: boolean;
  setPage: (page: number) => void;
  isDisabled?: boolean;
}

const PageItemComponent: FC<PageItemProps> = ({
  pageIndex,
  isActive,
  setPage,
  children,
  isDisabled,
}) => {
  const onClick = useCallback(() => {
    setPage(pageIndex);
  }, [setPage, pageIndex]);

  const label = children || pageIndex + 1;

  return (
    <li
      className={cx("page", {
        active: isActive,
      })}
    >
      {isActive && <span className={cx("page-button")}>{label}</span>}
      {!isActive && (
        <button
          onClick={onClick}
          className={cx("page-button")}
          disabled={isDisabled}
        >
          {label}
        </button>
      )}
    </li>
  );
};

export { PageItemComponent };
