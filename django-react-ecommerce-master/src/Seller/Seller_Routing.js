import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

const S_SideBar=React.lazy(()=>(import('./Seller_Sidebar')))
const S_Product=React.lazy(()=>(import('./components/Seller_Products')))
const S_Dash=React.lazy(()=>(import('./components/Seller_Dashboard')))
const S_header=React.lazy(()=>(import('./Seller_header')))
const S_order=React.lazy(()=>(import('./components/Seller_Orders')))

function Seller_Routing() {
    return (
        <div>
            <Router>
                <S_header/>
                {/* <S_order/> */}
                <React.Suspense fallback={<p>Loading</p>}>
                    <Switch>
                        <Route path='/seller' exact component={S_Dash}/>
                        <Route path="/seller_product" exact component={S_Product}/>
                        <Route path="/seller_dashboard" exact component={S_Dash}/>
                        <Route path="/seller_Home" exact component={S_SideBar}/>
                        <Route path="/seller_Order" exact component={S_order}/>
                    </Switch>
                </React.Suspense>
                
            </Router>
        </div>
    )
}

export default Seller_Routing
