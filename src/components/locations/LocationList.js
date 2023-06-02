import { useEffect, useState } from "react"
import "./Location.css"


export const LocationList = () => {
    const [locations, setLocation] = useState([])



    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocation(locationArray)
                })
        },

        []
    )





    
    return <>

                    <h2>List of Location</h2>

                    <article className="locations">
                        {
                            locations.map(
                                (location) => {
                                    return <section className="location" key={(`location--${location.id}`)}>
                                        <header>{location.address}</header>
                                        <footer> Square Footage: {location.squareFootage}</footer>
                                    </section>
                                }
                            )
                        }
                    </article>
                </>

}
