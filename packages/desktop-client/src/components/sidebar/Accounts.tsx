// @ts-strict-ignore
import React, { useState } from 'react';

import * as queries from 'loot-core/src/client/queries';

import { useBudgetedAccounts } from '../../hooks/useBudgetedAccounts';
import { useClosedAccounts } from '../../hooks/useClosedAccounts';
import { useFailedAccounts } from '../../hooks/useFailedAccounts';
import { useLocalPref } from '../../hooks/useLocalPref';
import { useOffBudgetAccounts } from '../../hooks/useOffBudgetAccounts';
import { useUpdatedAccounts } from '../../hooks/useUpdatedAccounts';
import { SvgAdd } from '../../icons/v1';
import { View } from '../common/View';
import { type OnDropCallback } from '../sort';

import { Account } from './Account';
import { SecondaryItem } from './SecondaryItem';

const fontWeight = 600;

type AccountsProps = {
  onAddAccount: () => void;
  onToggleClosedAccounts: () => void;
  onReorder: OnDropCallback;
};

export function Accounts({
  onAddAccount,
  onToggleClosedAccounts,
  onReorder,
}: AccountsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const failedAccounts = useFailedAccounts();
  const updatedAccounts = useUpdatedAccounts();
  const offbudgetAccounts = useOffBudgetAccounts();
  const budgetedAccounts = useBudgetedAccounts();
  const closedAccounts = useClosedAccounts();

  const getAccountPath = account => `/accounts/${account.id}`;

  const [showClosedAccounts] = useLocalPref('ui.showClosedAccounts');

  function onDragChange(drag) {
    setIsDragging(drag.state === 'start');
  }

  const makeDropPadding = i => {
    if (i === 0) {
      return {
        paddingTop: isDragging ? 15 : 0,
        marginTop: isDragging ? -15 : 0,
      };
    }
    return null;
  };

  return (
    <View>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        <li>
          <Account
            name="All accounts"
            to="/accounts"
            query={queries.allAccountBalance()}
            style={{ fontWeight, marginTop: 15 }}
          />
        </li>
        {budgetedAccounts.length > 0 && (
          <li>
            <Account
              name="For budget"
              to="/accounts/budgeted"
              query={queries.budgetedAccountBalance()}
              style={{ fontWeight, marginTop: 13 }}
            />
          </li>
        )}

        {budgetedAccounts.map((account, i) => (
          <li key={account.id}>
            <Account
              name={account.name}
              account={account}
              connected={!!account.bank}
              failed={failedAccounts && failedAccounts.has(account.id)}
              updated={updatedAccounts && updatedAccounts.includes(account.id)}
              to={getAccountPath(account)}
              query={queries.accountBalance(account)}
              onDragChange={onDragChange}
              onDrop={onReorder}
              outerStyle={makeDropPadding(i)}
            />
          </li>
        ))}

        {offbudgetAccounts.length > 0 && (
          <li>
            <Account
              name="Off budget"
              to="/accounts/offbudget"
              query={queries.offbudgetAccountBalance()}
              style={{ fontWeight, marginTop: 13 }}
            />
          </li>
        )}

        {offbudgetAccounts.map((account, i) => (
          <li key={account.id}>
            <Account
              name={account.name}
              account={account}
              connected={!!account.bank}
              failed={failedAccounts && failedAccounts.has(account.id)}
              updated={updatedAccounts && updatedAccounts.includes(account.id)}
              to={getAccountPath(account)}
              query={queries.accountBalance(account)}
              onDragChange={onDragChange}
              onDrop={onReorder}
              outerStyle={makeDropPadding(i)}
            />
          </li>
        ))}

        {closedAccounts.length > 0 && (
          <li>
            <SecondaryItem
              style={{ marginTop: 15 }}
              title={'Closed accounts' + (showClosedAccounts ? '' : '...')}
              onClick={onToggleClosedAccounts}
              bold
            />
          </li>
        )}

        {showClosedAccounts &&
          closedAccounts.map(account => (
            <li key={account.id}>
              <Account
                name={account.name}
                account={account}
                to={getAccountPath(account)}
                query={queries.accountBalance(account)}
                onDragChange={onDragChange}
                onDrop={onReorder}
              />
            </li>
          ))}

        <li>
          <SecondaryItem
            style={{
              marginTop: 15,
              marginBottom: 9,
            }}
            onClick={onAddAccount}
            onKeyUp={evt => {
              if (evt.key === 'Enter') onAddAccount();
            }}
            Icon={SvgAdd}
            title="Add account"
          />
        </li>
      </ul>
    </View>
  );
}
