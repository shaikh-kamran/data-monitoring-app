import React, { useState, useEffect } from 'react';
import styles from './monitor.module.scss';
import Graph from '../graph/Graph';
import SelectionBar from '../selection-bar/SelectionBar';
import apis from '../../../../services/api';

interface IDeviceData {
    datapoints: number,
    timestamp: number,
    device: string,
}

const Monitor = () => {

    const [filteredData, setFilteredData] = useState<any>([]);
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState("");
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [particles, setParticles] = useState(["p1", "p25", "p10"]);

    useEffect(() => {
        getDeviceList();
    }, []);

    const getDeviceList = () => {
        apis.getDeviceList()
            .then((response) => {
                const devices = response.data.data;
                setDevices(devices)
                onDeviceChange(devices[0]);
            })
            .catch((err) => { console.log(err) });
    }

    const onDeviceChange = (device: string) => {
        setSelectedDevice(device);
        apis.getDeviceData({ device, starttime: startTime, endtime: endTime })
            .then((response) => {
                const readings = response.data;
                setFilteredData({ ...readings });
            })
            .catch((err) => { console.log(err) });
    }

    const onDateTimeChange = (starttime: number, endtime: number) => {
        setStartTime(starttime)
        setEndTime(endtime)
        apis.getDeviceData({ device: selectedDevice, starttime, endtime })
            .then((response) => {
                const readings = response.data;
                setFilteredData({ ...readings });
            })
            .catch((err) => { console.log(err) });
    }

    return (
        <div className={styles.monitor}>
            <div className={styles.header}>
                Monitoring:
            </div>
            <SelectionBar
                devices={devices}
                onDeviceChange={onDeviceChange}
                onDateTimeChange={onDateTimeChange}
            />
            <Graph
                data={filteredData}
                particles={particles}
            />
        </div>
    )

}

export default Monitor;