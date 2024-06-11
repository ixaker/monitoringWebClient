import React from 'react'
import ChartUI from './ChartUI'

const GraphicContainer = ({ data, name }) => {
    return (
        data.load !== null ? (
            <div>
                <div className='row align-items-center mb-2'>
                    <div className='col-2 text-center'>
                        <h3 className="h6">{name}</h3>
                    </div>
                    <div className='col-10'>
                        <div className='container bg-dark rounded'>
                            <ChartUI
                                style={{ height: '500px' }}
                                data={data.history}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    )
}

export default GraphicContainer
