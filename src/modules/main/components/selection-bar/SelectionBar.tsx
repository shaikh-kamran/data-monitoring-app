import React, { useState, useEffect } from 'react';
import styles from './selectionbar.module.scss';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { useLocation } from "react-router-dom";

const SelectionBar = (props: any) => {

    const location = useLocation();
    const [timeRange, setTimeRange] = useState(['00:00', '23:59']);
    const [options, setOptions] = useState(props.devices);
    const [value, setValue] = useState("");
    const [selectedDevices, setSelectedDevices] = useState<any[]>([]);
    const [date, setDate] = useState("");

    useEffect(() => {
        if (props.devices.length) {
            setSelectedDevices([props.devices[0]]);
            setOptions(props.devices);
            setDate(getTodayDate())
        }
    }, [props.devices])

    const getTodayDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    const changeMultiSelect = (device: string) => {
        if (!selectedDevices.includes(device)) {
            selectedDevices.push(device);
            setSelectedDevices([...selectedDevices]);
        } else {
            const index = selectedDevices.indexOf(device);
            selectedDevices.splice(index, 1);
            setSelectedDevices([...selectedDevices]);
        }
        if (props.onMultiDeviceChange)
            props.onMultiDeviceChange(device);
    }

    const change = (value: string) => {
        setValue(value);
        props.onDeviceChange(value);
    }

    const onTimeChange = (value: any) => {
        setTimeRange(value);
    }

    const onDateChange = (value: any) => {
        setTimeRange(['00:00', '23:59']);
        setDate(value);
    }

    useEffect(() => {
        setTimeStamp();
    }, [date, timeRange])

    const setTimeStamp = () => {
        const startdatetimestring = new Date(date + " " + timeRange[0]);
        const enddatetimestring = new Date(date + " " + timeRange[1]);
        const starttime = startdatetimestring.getTime();
        const endtime = enddatetimestring.getTime();
        if (starttime && endtime)
            props.onDateTimeChange(starttime, endtime, selectedDevices)
    }

    return (
        <div className={styles.selectionbar}>
            {location.pathname === "/" ?
                <select className={styles.device} id="device" onChange={(e) => change(e.target.value)} value={value}>
                    {options.map((option: any) => { return (<option key={option} value={option}>{option}</option>) })}
                </select>
                :
                <div className={styles.selecteddevices}>
                    {selectedDevices.map((device: any) => { return (<div className={styles.selecteddevice} key={device}>{device}</div>) })}
                    <select className={styles.device} id="device" onChange={(e) => changeMultiSelect(e.target.value)}>
                        {options.map((option: any) => { return (<option key={option} value={option}>{option}</option>) })}
                    </select>
                </div>
            }
            <input className={styles.date} type="date" id="date-selection" name="date-selection"
                onChange={(e: any) => onDateChange(e.target.value)} value={date} />
            <TimeRangePicker className={styles.time} onChange={(e: any) => onTimeChange(e)} value={timeRange} />
        </div>
    )
}

export default SelectionBar