import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList.js"
import { ProductsList } from "../products/ProductLists.js"
import { ProductForm } from "../products/ProductForm.js"


export const ApplicationViews = () => {
	return <>

        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner Shop</h1>
                    <div>Your one-stop-shop to get all your Candies</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList/> } />
				<Route path="products" element={ <ProductsList/> } />
                <Route path="product/create" element={ <ProductForm /> } />

            </Route>
        </Routes>
    

	</>
}

