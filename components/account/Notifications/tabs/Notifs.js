import React from 'react'

function Notifs(data) {
    return (
    <div className="clientPage__container_content">
        <div className="notifWrapper">
           {data.data.map(item => {
              return (
                 <div key={item.id} className="notifContainer">
                    <div>{item.date}</div>
                    <div>{item.mess}</div>
                    <div>{item.time}</div>
                 </div>
              )
           })}
        </div>
    </div>
    )
}

export default Notifs
