import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

import { FAQService } from '@/services/FAQ'

import EditDialog from './EditDialog'
import { FAQList } from './FAQList'
import Header from './Header'
export type FAQProps = {
  readonly isMobile: boolean
  readonly showOverlay: (b) => void
}
import AlertDialog from '@/components/atoms/AlertDialog'
import { Loading } from '@/components/atoms/Loading'
import {
  activeFAQs,
  addFAQ,
  deactiveFAQs,
  removeFAQ,
  removeFAQs,
  setFAQs,
  updateFAQ,
} from '@/redux/reducers/admin/FAQs'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
const FAQs: React.VFC<FAQProps> = (props) => {
  const dispatch = useAppDispatch()
  const { FAQs } = useAppSelector((state) => state.adminFAQ)
  const [checkedList, setCheckedList] = useState([''])
  const [collapse, setCollapse] = useState(false)
  const [editDlgShow, setEditDlgShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [FAQToEdit, setFAQToEdit] = useState({})
  const [dropdownActionVisible, setDropdownActionVisible] = useState(false)
  const [dropdownSortbyVisible, setDropdownSortbyVisible] = useState(false)
  const [alertDescription, setAlertDescription] = useState('')
  const [providers, setProviders] = useState([])
  const refClearCheckedList = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (FAQs.length === 0) setLoading(true)
    getFAQs()
  }, [])

  const getFAQs = async () => {
    const resp = await FAQService.search('')
    dispatch(setFAQs(resp.data))
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }
  const toggleCollapse = () => {
    setCollapse(!collapse)
  }
  const onAddNewClicked = () => {
    props.showOverlay(true)
    setFAQToEdit({})
    setEditDlgShow(true)
  }
  const onCloseEditDialog = () => {
    props.showOverlay(false)
    setEditDlgShow(false)
  }
  const onFAQCreated = (FAQ) => {
    dispatch(addFAQ(FAQ))
  }
  const onFAQUpdated = (FAQ) => {
    dispatch(updateFAQ(FAQ))
  }
  const onRemoveConfirmed = async (FAQ) => {
    setLoading(true)
    const resp = await FAQService._delete(FAQ._id)
    if (resp) {
      setLoading(false)
      if (resp.status === 'success') dispatch(removeFAQ(FAQ))
    } else {
      setLoading(false)
    }
  }
  const onCheckedListUpdated = (data) => {
    setCheckedList(data)
  }
  const onSwitchChanged = async (e, data) => {
    const FAQ = { ...data }
    FAQ.isActive = e
    const updatedFAQ = await FAQService.update({
      ...FAQ,
    })
    if (updatedFAQ) {
      dispatch(updateFAQ(updatedFAQ.data))
    } else {
    }
  }
  const onEditClicked = (FAQ) => {
    props.showOverlay(true)
    setFAQToEdit(FAQ)
    setEditDlgShow(true)
  }
  const onViewClicked = (category) => {
    window.open(category.urlSlug)
  }

  const onActivateClick = async () => {
    if (!isActionAvailable()) {
      setAlertDescription('Please select any FAQs to do action.')
      setShowAlert(true)
    }
    setLoading(true)
    const resp = await FAQService.setStatus(checkedList, true)
    if (resp) {
      setLoading(false)
      if (resp.status === 'success') {
        dispatch(activeFAQs(resp.data))
        refClearCheckedList.current!.click()
      }
    } else {
      setLoading(false)
    }
  }
  const onDeleteAllDeactivedClick = async () => {
    setLoading(true)
    const resp = await FAQService.deleteInactive()
    if (resp) {
      setLoading(false)
      if (resp.status === 'success') {
        dispatch(removeFAQs(JSON.stringify(resp.data)))
        setAlertDescription(
          `You have removed ${resp.data.length} deactivated FAQs.`,
        )
        setShowAlert(true)
      }
    } else {
      setLoading(false)
    }
  }
  const onDeactiveClick = async () => {
    if (!isActionAvailable()) {
      setAlertDescription('Please select any FAQs to do action.')
      setShowAlert(true)
    }
    setLoading(true)
    const resp = await FAQService.setStatus(checkedList, false)
    if (resp) {
      setLoading(false)
      if (resp.status === 'success') {
        dispatch(deactiveFAQs(resp.data))
        refClearCheckedList.current!.click()
      }
    } else {
      setLoading(false)
    }
  }
  const onDeleteClick = async () => {
    if (!isActionAvailable()) {
      setAlertDescription('Please select any packages to do action.')
      setShowAlert(true)
    }
    setLoading(true)
    const resp = await FAQService.deleteMany(checkedList)
    if (resp) {
      setLoading(false)
      if (resp.status === 'success') dispatch(removeFAQs(checkedList))
    } else {
      setLoading(false)
    }
  }
  const isActionAvailable = () => {
    if (checkedList!.length <= 0) return false
    return true
  }
  return (
    <>
      <Head>
        <title>Admin AutoLiketh Plan</title>
      </Head>
      <div className="admin-panel flex flex-col flex-wrap w-full min-h-screen bg-gray-100">
        {/* <Header /> */}
        <div className="lg:top-16 h-[56px] flex items-center flex-row flex-nowrap bg-gray-100">
          <div className="fixed w-full h-[56px] p-3 ss:p-8 z-10 bg-gray-100 rounded-b-lg shadow-lg shadow-gray-200 border-b-[1px] border-gray-300"></div>
          <div className="fixed w-full h-[56px] z-[11] flex items-center p-3 ss:p-8 hover:cursor-pointer">
            <div
              className="flex items-center -ml-5 px-5 py-2 rounded-full bg-gray-100 bg-opacity-100"
              onClick={onAddNewClicked}
            >
              <span className="h-6 w-6 rounded-full flex items-center justify-center bg-gray-500 hover:bg-blue-500">
                <svg
                  className="h-5 w-5 text-white "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {' '}
                  <line x1="12" y1="5" x2="12" y2="19" />{' '}
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
              <span className="text-black text-xl ml-1 hidden ss:block">
                Add new
              </span>
            </div>
          </div>
          <div className="fixed  z-[11] bg-gray-100 bg-opacity-100 right-3 ss:right-8 flex flex-row flex-nowrap ls:space-x-3">
            <div
              tabIndex={0}
              onClick={() => setDropdownActionVisible(!dropdownActionVisible)}
              onBlur={() => {
                setDropdownActionVisible(false)
              }}
              className="dropdown mt-auto"
            >
              <div
                className={
                  dropdownActionVisible
                    ? 'flex px-2 ls:px-3 py-2 flex-row flex-nowrap space-x-2 ls:space-x-3 items-center text-black border-[1px] border-gray-300 bg-gray-200 hover:cursor-pointer hover:bg-gray-200 transition-all duration-500'
                    : 'flex px-2 ls:px-3 py-2 flex-row flex-nowrap space-x-2 ls:space-x-3 items-center text-black border-[1px] border-gray-300 hover:cursor-pointer hover:bg-gray-200 transition-all duration-500'
                }
              >
                <span>
                  <svg
                    className={
                      dropdownActionVisible
                        ? 'h-4 w-4 text-black'
                        : 'h-4 w-4 text-gray-700'
                    }
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </span>
                <span className="text-sm">Action</span>
                <span>
                  <svg
                    className="h-4 w-4 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {' '}
                    <path stroke="none" d="M0 0h24v24H0z" />{' '}
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
              {dropdownActionVisible ? (
                <div className="dropdown-content hover:cursor-pointer !bg-gray-200 right-0">
                  <div className="flex flex-col flex-wrap w-60 text-sm ">
                    <a
                      onClick={onDeleteClick}
                      className="flex flex-row flex-nowrap w-full !text-black hover:!bg-gray-300"
                    >
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 text-red-500"
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
                        <span className="ml-3">Delete</span>
                      </span>
                    </a>
                    <a
                      onClick={onDeleteAllDeactivedClick}
                      className="w-full !text-black hover:!bg-gray-300"
                    >
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 text-red-500"
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
                        <span className="ml-3">All deactived Services</span>
                      </span>
                    </a>
                    <a
                      onClick={onDeactiveClick}
                      className="w-full !text-black hover:!bg-gray-300"
                    >
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 text-red-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {' '}
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />{' '}
                          <line x1="9" y1="9" x2="15" y2="15" />{' '}
                          <line x1="15" y1="9" x2="9" y2="15" />
                        </svg>
                        <span className="ml-3">Deactive</span>
                      </span>
                    </a>
                    <a
                      onClick={onActivateClick}
                      className="w-full !text-black hover:!bg-gray-300"
                    >
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 text-green-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {' '}
                          <path stroke="none" d="M0 0h24v24H0z" />{' '}
                          <polyline points="9 11 12 14 20 6" />{' '}
                          <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                        </svg>
                        <span className="ml-3 font-semibold">Active</span>
                      </span>
                    </a>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="admin-panel-content mt-8 w-full p-3 md:p-3">
          <div
            className={
              !collapse
                ? 'flex-col flex-wrap w-full bg-gray-300 bg-opacity-30 shadow-lg shadow-slate-400'
                : 'flex-col flex-wrap w-full bg-gray-300 bg-opacity-30 h-16 shadow-lg shadow-slate-400'
            }
          >
            <div className="w-full flex flex-row flex-nowrap pt-5 px-5 pb-0">
              <div className="flex">
                <span>
                  <span className="text-black text-xl">FAQs</span>
                </span>
              </div>
              <div className="flex ml-auto">
                <span
                  onClick={toggleCollapse}
                  className="p-2 hover:cursor-pointer"
                >
                  {!collapse ? (
                    <svg
                      className="h-4 w-4 text-gray-500 hover:text-gray-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {' '}
                      <path stroke="none" d="M0 0h24v24H0z" />{' '}
                      <polyline points="6 15 12 9 18 15" />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4 text-gray-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {' '}
                      <path stroke="none" d="M0 0h24v24H0z" />{' '}
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </span>
                <span className="p-2 hover:cursor-pointer">
                  <svg
                    className="h-4 w-4 text-gray-500 hover:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {!collapse && FAQs ? (
              <FAQList
                ref={refClearCheckedList}
                FAQs={FAQs}
                onEditClicked={(data) => onEditClicked(data)}
                onViewClicked={(data) => onViewClicked(data)}
                onRemoveConfirmed={(data) => onRemoveConfirmed(data)}
                onSwitchChanged={(e, data) => onSwitchChanged(e, data)}
                onCheckedListUpdated={(data) => onCheckedListUpdated(data)}
              />
            ) : (
              <></>
            )}
          </div>
        </div>

        {editDlgShow ? (
          <EditDialog
            FAQ={FAQToEdit}
            providers={providers}
            onClose={onCloseEditDialog}
            onFAQCreated={(d) => onFAQCreated(d)}
            onFAQUpdated={(d) => onFAQUpdated(d)}
          />
        ) : (
          <></>
        )}
      </div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-opacity-0 bg-black">
          <Loading />
        </div>
      ) : (
        <></>
      )}
      <div>
        <AlertDialog
          title="AutoLike Plan"
          open={showAlert}
          onClose={() => setShowAlert(false)}
        >
          {alertDescription}
        </AlertDialog>
      </div>
    </>
  )
}
export default FAQs
