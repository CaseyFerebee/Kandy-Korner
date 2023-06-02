import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    const [product, update] = useState({
        name: "",
        productType: false,
        price:""
    })
    
    const [productType, setProductType] = useState([])
    
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToApi = {
            name: product.name,
            productTypeId: +product.type,
            pricePerUnit:+product.price
            
        }

    return fetch(`http://localhost:8088/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productToSendToApi)
    })

        .then(response => response.json())
        .then(() => {
            navigate("/products")
        })

}

useEffect(() => {
    fetch(`http://localhost:8088/productTypes`)
        .then((response) => response.json())
        .then((productTypeArray) => {
            setProductType(productTypeArray);
        });
}, []);

return (
    <form className="product-Form">
        <h2 className="productForm__title">New product Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label>Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Name of Kandy"
                    value={product.name}
                    onChange={
                        (evt) => {
                            const copy = { ...product }
                            copy.name = evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        

        <fieldset>
            <div className="product-group">
                <label>ProductType:</label>
                <select 
                        required autoFocus
                        className="form-control"
                        value={product.type}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.type = evt.target.value
                                update(copy)
                            }
                        }>
                    {productType.map(typeObject => (
                        <option value={typeObject.id} key={typeObject.id}>{typeObject.type}</option>
                    ))}
                </select>
            </div>
        </fieldset>

        <fieldset>
        <div className="Price-group">
                <label>Price:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Price for Kandy"
                    value={product.price}
                    onChange={
                        (evt) => {
                            const copy = { ...product }
                            copy.price = evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>

        <button
            onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
            className="btn btn-primary">
            Submit Ticket
        </button>
    </form>
)
}