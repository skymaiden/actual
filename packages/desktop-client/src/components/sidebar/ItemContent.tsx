import React, {
  type MouseEventHandler,
  type KeyboardEventHandler,
  type ReactNode,
} from 'react';

import { type CSSProperties } from '../../style';
import { AnchorLink } from '../common/AnchorLink';
import { View } from '../common/View';

type ItemContentProps = {
  style: CSSProperties;
  to: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  onKeyUp: KeyboardEventHandler<HTMLDivElement>;
  activeStyle: CSSProperties;
  children: ReactNode;
  forceActive?: boolean;
};

export function ItemContent({
  style,
  to,
  onClick,
  onKeyUp,
  activeStyle,
  forceActive,
  children,
}: ItemContentProps) {
  return onClick ? (
    <View
      role="button"
      tabIndex={0}
      style={{
        ...style,
        touchAction: 'auto',
        userSelect: 'none',
        userDrag: 'none',
        cursor: 'pointer',
        outlineOffset: -2,
        ...(forceActive ? activeStyle : {}),
      }}
      onClick={onClick}
      onKeyUp={onKeyUp}
    >
      {children}
    </View>
  ) : (
    <AnchorLink
      to={to}
      style={{
        ...style,
        outlineOffset: -2,
      }}
      activeStyle={activeStyle}
    >
      {children}
    </AnchorLink>
  );
}
