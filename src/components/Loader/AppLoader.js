import React from 'react'
import Loader from './Loader'
import './loader.css'

export default function AppLoader({show}) {

    if (show) {
        return (
            <div className='loader-container'
                >
                <div style={{ marginBottom: "50px" }}>Очікуємо на зв'язок з сервером</div>
                
                <Loader
                    size="lg"
                />
            </div>
        )
    }

    return null

}
