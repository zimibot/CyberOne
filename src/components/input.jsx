import { Segmented, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../helpers/contex';
import moment from 'moment/moment';


export const Input = ({ placeholder, label, type, icon, register }) => {
  return <div className="text-left flex flex-col gap-3 text-[#262626] dark:!text-white">
    {label && <label>{label}</label>}
    <div className="relative flex items-center">
      <input type={type} {...register} className={`w-full py-2 ${icon ? "indent-11 " : "px-3"} shadow backdrop-blur focus-within:outline-none focus-visible:outline-none text-black dark:!text-white placeholder:text-black dark:!placeholder:text-white dark:!bg-dark_input bg-white_input`} placeholder={placeholder} ></input>
      {icon &&
        <div className="absolute flex px-3">
          <img height={20} src={icon}></img>
        </div>
      }
    </div>
  </div>
}

export const SelectItem = ({ loading = false, user = false, selectUser = false }) => {

  const [previousCount, setpreviousCount] = useState(1);
  const [previousDate, setpreviousDate] = useState();
  const [CurrentDate, setCurrentDate] = useState();
  const [CurrentDatePrev, setCurrentDatePrev] = useState();
  const [fullDay, setfullDay] = useState({
    label: "Previous 24 Hours",
    value: 1
  });
  const dOp = useContext(MyContext)

  const option = dOp.option
  const setOpt = option.setOptions

  const optionItems = selectUser ? [
    {
      label: "Previous 24 Hours",
      value: 1
    },
    {
      label: "Previous 2 Days",
      value: 2
    },
    {
      label: "Previous 3 Days",
      value: 3
    },
  ] : [
    {
      value: 1,
      label: 'Previous 24 Hours',
    },
    {
      value: 7,
      label: 'Previous 1 Week',
    },
    {
      value: 14,
      label: 'Previous 2 Week',
    },

  ]

  const DateItems = (days, date) => {

    const time = (cstm) => {
      let fullDate = cstm[0]
      let time = cstm[1].replace("Z", "")
      let timeSplit = time.split(":")
      let timeFinish = `${fullDate}T${timeSplit[0]}:${timeSplit[1]}:00Z`

      return timeFinish
    }

    let currentDate
    if (date) {
      currentDate = moment(date).utcOffset('+0000')
    } else {
      currentDate = moment(new Date()).utcOffset('+0000')
    }

    if (days) {
      let cstm = currentDate.subtract(days, "days").toJSON().replace(/\.\d+/, "").split("T")


      return time(cstm)
    } {
      let cstm = currentDate.toJSON().replace(/\.\d+/, "").split("T")

      return time(cstm)
    }
  }

  useEffect(() => {
    setpreviousDate(DateItems(1))
  }, [])

  useEffect(() => {
    setCurrentDate(DateItems())
  }, [])

  useEffect(() => {
    setCurrentDatePrev(DateItems(previousCount, previousDate))
  }, [previousCount, previousDate])

  useEffect(() => {
    setOpt(d => ({
      ...d,
      previousDate: previousDate,
      currentDate: CurrentDate,
      previousPeriodFilter: {
        currentDatePrev: CurrentDatePrev
      },
      fullDay
    }))
  }, [previousDate, CurrentDate, CurrentDatePrev, fullDay])


  const onChange = (d) => {
    setpreviousDate(DateItems(d))
    setpreviousCount(d)

    let der = optionItems.filter(a => a.value === d)

    setfullDay({
      ...der[0]
    })

  }


  return !user ? <div className="bg-[#EBEBEB] dark:bg-border_primary h-14 px-4 flex items-center ">
    <Select className="text-lg" onChange={onChange} disabled={loading} loading={loading} defaultValue={1} style={{ width: 200 }} bordered={false}
      options={optionItems}>

    </Select>
  </div> : <Segmented options={selectUser ? [
    {
      label: "24 Hours",
      value: 1
    },
    {
      label: "2 Days",
      value: 2
    },
    {
      label: "3 Days",
      value: 3
    },
  ] : [
    {
      label: "24 Hours",
      value: 1
    },
    {
      label: "1 Week",
      value: 7
    },
    {
      label: "2 Week",
      value: 14
    },
  ]} onChange={onChange} />

}