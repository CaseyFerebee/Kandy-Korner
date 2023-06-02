import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./Product.css";

export const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [expensive, setExpensive] = useState(false);
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(() => {
        if (expensive) {
            const expensiveKandy = products.filter(
                (product) => product.pricePerUnit >= 2
            );
            setFilteredProducts(expensiveKandy);
        } else {
            setFilteredProducts(products);
        }
    }, [expensive]);

    useEffect(() => {
        const sortedProducts = products.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        setFilteredProducts(sortedProducts);
    }, [products]);

    useEffect(() => {
        fetch(`http://localhost:8088/products?_expand=productType`)
            .then((response) => response.json())
            .then((productsArray) => {
                setProducts(productsArray);
            });
    }, []);

    return (
        <>
            {
                kandyUserObject.staff
                ? <>
                    <button onClick={() => { setExpensive(true) }} > Top Priced</button>
                    <button onClick={() => { setExpensive(false) }} > Show All</button>
                    <button onClick={() => navigate("/product/create")}>Create Ticket</button>
                </>
                : <>
                
                    <button onClick={() => { setExpensive(true) }} > Top Priced</button>
                    <button onClick={() => { setExpensive(false) }} > Show All</button>
                </>
                
                
            }

            <h2>List of Products</h2>

            <article className="products">
                {filteredProducts.map((product) => {
                    return (
                        <section className="product" key={`product--${product.id}`}>
                            <header>{product.name}</header>
                            <footer> Kandy Price: $ {product.pricePerUnit}</footer>
                            <footer> Product Type: {product.productType.type}</footer>
                        </section>
                    );
                })}
            </article>
        </>
    );
};
