import React, {
  useState,
  useCallback,
  useEffect,
  type KeyboardEvent,
} from 'react';
import { useLocation } from 'react-router-dom';

import {
  SvgCheveronDown,
  SvgCheveronRight,
  SvgCog,
  SvgStoreFront,
  SvgTuning,
} from '../../icons/v1';
import { View } from '../common/View';

import { Item } from './Item';
import { SecondaryItem } from './SecondaryItem';

export function Tools() {
  const [isOpen, setOpen] = useState(false);
  const onToggle = useCallback(() => setOpen(open => !open), []);
  const onKeyUp = useCallback((evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Enter') setOpen(open => !open);
  }, []);
  const location = useLocation();

  const isActive = ['/payees', '/rules', '/settings', '/tools'].some(route =>
    location.pathname.startsWith(route),
  );

  useEffect(() => {
    if (isActive) {
      setOpen(true);
    }
  }, [location.pathname]);

  return (
    <View style={{ flexShrink: 0 }}>
      <Item
        title="More"
        Icon={isOpen ? SvgCheveronDown : SvgCheveronRight}
        onClick={onToggle}
        onKeyUp={onKeyUp}
        style={{ marginBottom: isOpen ? 8 : 0 }}
        forceActive={!isOpen && isActive}
      />
      {isOpen && (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          <li>
            <SecondaryItem
              title="Payees"
              Icon={SvgStoreFront}
              to="/payees"
              indent={15}
            />
          </li>
          <li>
            <SecondaryItem
              title="Rules"
              Icon={SvgTuning}
              to="/rules"
              indent={15}
            />
          </li>
          <li>
            <SecondaryItem
              title="Settings"
              Icon={SvgCog}
              to="/settings"
              indent={15}
            />
          </li>
        </ul>
      )}
    </View>
  );
}
