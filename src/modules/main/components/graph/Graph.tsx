import moment from "moment";
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Graph = (props: any) => {

    const colors = ['#ff6f61', '#6B5B95', '#88B04B', '#B565A7', '#DD4124',
        '#45B8AC', '#EFC050', '#5B5EA6', '#9B2335', '#DFCFBE']

    return (
        <ResponsiveContainer width='100%' height={500} >
            <ScatterChart>
                <XAxis
                    dataKey='timestamp'
                    domain={['auto', 'auto']}
                    name='Time'
                    tickFormatter={(unixTime) => moment(unixTime).format('HH:mm')}
                    type='number'
                />
                <YAxis dataKey='datapoints' name={'Value'} />
                {props.particles.map((particle: string, index: number) => {
                    return (
                        <Scatter
                            key={particle}
                            data={props.data[particle + 'data']}
                            line={{ stroke: colors[index] }}
                            lineJointType='monotoneX'
                            lineType='joint'
                            name={particle + ' values'}
                            fill={colors[index]}
                        />
                    )
                })}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <CartesianGrid strokeDasharray="1 1" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default Graph