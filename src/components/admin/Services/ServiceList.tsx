type Props = {
  readonly services: any
  readonly onRemoveConfirmed: (data) => void
  readonly onEditClicked: (data) => void
  readonly onViewClicked: (data) => void
  readonly onSwitchChanged: (e, data) => void
  readonly onCheckedListUpdated: (data) => void
}
import moment from 'moment'
import { ForwardRefRenderFunction, useEffect, useState } from 'react'
import React from 'react'
import Switch from 'react-switch'

import ConfirmDialog from '@/components/atoms/ConfirmDialog'

const MyComponentRenderFn: ForwardRefRenderFunction<any, Props> = (
  props,
  ref,
) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState({})
  const [checkedList, setCheckedList] = useState<String[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const clearCheckedList = () => {
    setCheckedList([])
  }
  const onEditClick = (service) => {
    props.onEditClicked(service)
  }
  const onRemoveClick = (service) => {
    setServiceToDelete(service)
    setConfirmOpen(true)
  }
  const deleteConfirmed = () => {
    props.onRemoveConfirmed(serviceToDelete)
  }
  const onAllCheckClicked = (e) => {
    if (checkedList.length === 0) {
      setCheckedList([
        ...checkedList,
        ...props.services.map((item: { _id: any }) => item._id),
      ])
    } else if (checkedList.length === props.services.length) {
      setCheckedList([])
    } else {
      setCheckedList([])
    }
  }
  const onCheckClicked = (e, service) => {
    if (checkedList.indexOf(service._id) !== -1)
      setCheckedList([...checkedList.filter((item) => item !== service._id)])
    else setCheckedList([...checkedList, service._id])
  }
  const onSwitchChange = async (e, service) => {
    props.onSwitchChanged(e, service)
  }
  useEffect(() => {
    props.onCheckedListUpdated(checkedList)
  }, [checkedList])
  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto">
        <div className="py-0 inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full text-center border-collapse border border-gray-600 border-opacity-50">
              <thead className="border-b bg-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="w-[25px] text-base font-medium text-white px-3 py-3  border border-gray-600 border-opacity-50"
                  >
                    <input
                      className="h-4 w-4"
                      type="checkbox"
                      checked={
                        props.services.length === checkedList.length &&
                        checkedList.length > 0
                          ? true
                          : false
                      }
                      onChange={(e) => onAllCheckClicked(e)}
                    />
                  </th>
                  <th
                    scope="col"
                    className="w-[120px] text-base font-medium text-white px-6 py-3 border border-gray-600 border-opacity-50"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="min-w-[200px] w-[230px] text-base font-medium text-white px-6 py-3 border border-gray-600 border-opacity-50"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="w-[60px] text-base font-medium text-white px-6 py-3 border border-gray-600 border-opacity-50"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="w-[40px] text-base font-medium text-white px-2 py-3 border border-gray-600 border-opacity-50"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="w-[30px] text-base font-medium text-white px-2 py-3 border border-gray-600 border-opacity-50"
                  >
                    Discount
                  </th>
                  <th
                    scope="col"
                    className="min-w-[100px] text-base font-medium text-white px-2 py-3 border border-gray-600 border-opacity-50"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="min-w-[100px] text-base font-medium text-white px-2 py-3 border border-gray-600 border-opacity-50"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="min-w-[80px] text-base font-medium text-white px-0 py-3 border border-gray-600 border-opacity-50"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-base font-medium text-white px-6 py-3 border border-gray-600 border-opacity-50"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.services.map((service, id) => {
                  return (
                    <tr
                      key={service._id}
                      className="bg-white border-b hover:bg-gray-100"
                    >
                      <td className="w-[25px] px-3 py-4 text-base font-medium text-gray-700 border border-slate-300">
                        <input
                          className="h-4 w-4"
                          type="checkbox"
                          checked={
                            checkedList.indexOf(service._id) !== -1
                              ? true
                              : false
                          }
                          onChange={(e) => onCheckClicked(e, service)}
                        />
                      </td>
                      <td className="text-base max-w-[100px] px-1 text-gray-700 border border-slate-300">
                        <span className="w-full break-words">
                          {service._id}
                        </span>
                      </td>
                      <td className="text-base text-gray-900 px-2 py-4 border border-slate-300">
                        {service.name}
                      </td>
                      <td className="text-base text-gray-900 px-2 py-4 whitespace-nowrap border border-slate-300">
                        {service.price}
                      </td>
                      <td className="text-base text-gray-900 px-2 py-4 whitespace-nowrap border border-slate-300">
                        {service.quantity}
                      </td>
                      <td className="text-base text-gray-700 px-2 py-4 whitespace-nowrap border border-slate-300">
                        {service.offer.length > 0
                          ? service.offer[0].discount
                          : ''}
                      </td>
                      <td className="text-base max-w-[100px] text-gray-700 px-1 py-4 border border-slate-300">
                        <span className="w-full break-words">
                          {service.offer.length > 0
                            ? moment
                                .utc(service.offer[0].startDate)
                                .local()
                                .format('Y-MM-DD hh:mm a')
                            : ''}
                        </span>
                      </td>
                      <td className="text-base max-w-[100px] text-gray-700 px-1 py-4 border border-slate-300">
                        <span className="w-full break-words">
                          {service.offer.length > 0
                            ? moment
                                .utc(service.offer[0].endDate)
                                .local()
                                .format('Y-MM-DD hh:mm a')
                            : ''}
                        </span>
                      </td>
                      <td className="text-base text-gray-700 px-0 py-4 whitespace-nowrap border border-slate-300">
                        <Switch
                          height={25}
                          width={50}
                          onChange={(e) => onSwitchChange(e, service)}
                          checked={service.isActive}
                        />
                      </td>
                      <td className="text-base text-gray-700 whitespace-nowrap border border-slate-300 px-3">
                        <div className="flex flex-row flex-nowrap w-full justify-center items-center">
                          <span
                            onClick={() => onEditClick(service)}
                            className="flex w-10 h-full justify-center items-center py-3 border-[1px] border-blue-600 hover:cursor-pointer hover:bg-blue-600 text-blue-600 hover:text-white  transition-all duration-500 delay-100"
                          >
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {' '}
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{' '}
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </span>
                          <span
                            onClick={() => onRemoveClick(service)}
                            className="flex -ml-[1px] w-10 h-full justify-center items-center py-3 border-[1px] border-red-600 hover:cursor-pointer hover:bg-red-600 text-red-600 hover:text-white  transition-all duration-500 delay-100"
                          >
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {' '}
                              <polyline points="3 6 5 6 21 6" />{' '}
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
                              <line x1="10" y1="11" x2="10" y2="17" />{' '}
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div>
              <ConfirmDialog
                title="Delete Service?"
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={deleteConfirmed}
              >
                Are you sure you want to delete this service?
              </ConfirmDialog>
              <div
                ref={ref}
                onClick={() => setCheckedList([])}
                className="hidden"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export const ServiceList = React.forwardRef(MyComponentRenderFn)
