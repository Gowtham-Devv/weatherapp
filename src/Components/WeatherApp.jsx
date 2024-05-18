import React from 'react'
import "../Styles/WeatherApp.css"

function WeatherApp() {
  return (
    <main className='Weather'>
        <div className='container-fluid'>
            <div className='container'>
                <div className='inputContainer'>
                    <input type="text" className='cityInput' />
                </div>
            </div>
        </div>
    </main>
  )
}

export default WeatherApp