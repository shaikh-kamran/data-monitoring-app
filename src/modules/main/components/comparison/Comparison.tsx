import React, { useState, useEffect } from 'react';
import styles from './comparison.module.scss';
import Graph from '../graph/Graph';
import SelectionBar from '../selection-bar/SelectionBar';
import apis from '../../../../services/api';

const Comparison = () => {

    const [filteredData, setFilteredData] = useState<any>([]);
    const [devices, setDevices] = useState([]);
    const [particles, setParticles] = useState<any>({ "p1": [], "p25": [], "p10": [] });
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [selectedDevices, setSelectedDevices] = useState<any[]>([]);

    useEffect(() => {
        getDeviceList();
    }, []);

    useEffect(() => {
        selectedDevices.forEach(device => {
            addDevice(device);
        });
    }, [selectedDevices, startTime, endTime]);

    const getDeviceList = () => {
        //Get the list of all devices and select first one by default
        apis.getDeviceList()
            .then((response) => {
                const devices = response.data.data;
                setDevices(devices)
            })
            .catch((err) => { console.log(err) });
    }

    const onMultiDeviceChange = (device: any) => {
        //When user add or remove a device from comparison
        let graphdata = filteredData;
        if (graphdata.hasOwnProperty(device)) {
            const p1Index = particles["p1"].indexOf(device + "p1")
            particles["p1"].splice(p1Index, 1);
            const p25Index = particles["p25"].indexOf(device + "p25")
            particles["p25"].splice(p25Index, 1);
            const p10Index = particles["p10"].indexOf(device + "p10")
            particles["p10"].splice(p10Index, 1);
            delete graphdata[device + "p1data"]
            delete graphdata[device + "p25data"]
            delete graphdata[device + "p10data"]
            setParticles({ ...particles });
            setFilteredData({ ...graphdata });
        } else {
            addDevice(device);
        }
    }

    const addDevice = (device: string) => {
        //starttime: startTime, endtime: endTime
        apis.getDeviceData({ device, starttime: startTime, endtime: endTime })
            .then((response) => {
                const readings = response.data;

                let particlesdata = particles;

                particlesdata["p1"].push(device + "p1");
                particlesdata["p25"].push(device + "p25");
                particlesdata["p10"].push(device + "p10");

                let graphdata = filteredData;

                graphdata[device + "p1data"] = readings.p1data
                graphdata[device + "p25data"] = readings.p25data
                graphdata[device + "p10data"] = readings.p10data

                setParticles({ ...particlesdata });
                setFilteredData({ ...graphdata });

            })
            .catch((err) => { console.log(err) });
    }

    const onDateTimeChange = (starttime: number, endtime: number, devices: any) => {
        setStartTime(starttime)
        setEndTime(endtime);
        const defaultParticles = { "p1": [], "p25": [], "p10": [] };
        setParticles({ ...defaultParticles });
        setFilteredData({});
        setSelectedDevices(devices);
    }

    return (
        <div className={styles.comparison}>
            <div className={styles.header}>
                Compare Devices:
            </div>
            <SelectionBar
                devices={devices}
                onDateTimeChange={onDateTimeChange}
                onMultiDeviceChange={onMultiDeviceChange}
            />
            <div className={styles.graphs}>
                {
                    Object.keys(particles).map((particle) => {
                        return (
                            <Graph
                                key={particle}
                                data={filteredData}
                                particles={particles[particle]}
                            />
                        )
                    })
                }
            </div>
        </div>
    )

}

export default Comparison;