// @ts-nocheck
import React from 'react';
import Button from 'components/Button';
import SortableTable from 'components/SortableTable';
import { useModal } from 'hooks';
import getTableHeight from 'utils/ui/getTableHeight';
import { useSubstrate } from 'contexts/substrateContext';
import { WithdrawModal } from '../Modals/WithdrawModal';
import { useStakeData } from '../StakeContext/StakeDataContext';
import CancelUnstakeModal from '../Modals/CancelUnstakeModal';
import CollatorDisplayCell from './CollatorDisplayCell';

const UnstakingTable = () => {
  const { apiState } = useSubstrate();
  const { unstakeRequests, setSelectedUnstakeRequest } = useStakeData();

  const nodeIsDisconnected =
    apiState === 'ERROR' || apiState === 'DISCONNECTED';

  const {
    ModalWrapper: WithdrawModalWrapper,
    showModal: showWithdrawModal,
    hideModal: hideWithdrawModal
  } = useModal({ closeCallback: () => setSelectedUnstakeRequest(null) });
  const {
    ModalWrapper: CancelUnstakeModalWrapper,
    showModal: showCancelUnstakeModal,
    hideModal: hideCancelUnstakeModal
  } = useModal({ closeCallback: () => setSelectedUnstakeRequest(null) });

  const rowData = unstakeRequests.map((request) => {
    return {
      Collator: request.collator,
      Amount: request.unstakeAmount,
      'Time remaining': request.timeRemainingString,
      data: request
    };
  });

  const amountTooltip = 'Your balance scheduled for unstaking';
  const timeRemainingTooltip =
    'Time until you can withdraw your unstaking balance';

  const columnDefs: ColDef[] = [
    {
      field: 'Collator',
      sortable: false,
      width: 270,
      suppressMovable: true,
      cellRenderer: (params: any) => {
        return <CollatorDisplayCell collator={params.data.Collator} />;
      }
    },
    {
      field: 'Amount',
      unSortIcon: true,
      headerTooltip: amountTooltip,
      width: 195,
      suppressMovable: true,
      cellRenderer: (params: any) => {
        return params.data['Amount'].toDisplayString(0);
      },
      comparator: (valueA, valueB, nodeA, nodeB, isDescending) =>
        valueA.gt(valueB) ? 1 : -1
    },
    {
      field: 'Time remaining',
      unSortIcon: true,
      headerTooltip: timeRemainingTooltip,
      width: 195,
      suppressMovable: true
    },
    {
      field: '',
      sortable: false,
      width: 600,
      suppressMovable: true,
      cellRenderer: (params) => {
        const unstakeRequest = params.data.data;
        const onClickWithdraw = () => {
          setSelectedUnstakeRequest(unstakeRequest);
          showWithdrawModal();
        };
        const onClickCancelUnstake = () => {
          setSelectedUnstakeRequest(unstakeRequest);
          showCancelUnstakeModal();
        };

        return (
          <div className="flex justify-end w-full gap-6">
            {unstakeRequest.canWithdraw && (
              <Button
                className="btn-secondary flex items-center justify-center h-12"
                onClick={onClickWithdraw}
              >
                Withdraw
              </Button>
            )}
            <Button
              className="btn-thirdry flex items-center justify-center h-12"
              onClick={onClickCancelUnstake}
            >
              Cancel Unstake
            </Button>
          </div>
        );
      }
    }
  ];

  if (!unstakeRequests.length || nodeIsDisconnected) {
    return <div />;
  }
  return (
    <div className="mt-8 mx-auto sortable-table-wrapper">
      <h1 className="text-base font-semibold text-white">
        Unstaking
      </h1>
      <div className="w-full mt-4">
        <SortableTable
          height={getTableHeight(rowData.length, 5)}
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>
      <WithdrawModalWrapper>
        <WithdrawModal hideModal={hideWithdrawModal} />
      </WithdrawModalWrapper>
      <CancelUnstakeModalWrapper>
        <CancelUnstakeModal hideModal={hideCancelUnstakeModal} />
      </CancelUnstakeModalWrapper>
    </div>
  );
};

export default UnstakingTable;
