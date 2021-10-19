import React from 'react'
import { Button, Grid,Paper} from '@material-ui/core'

// ProductName,ProductImage,SellerName,SellerPhoneNo,Stock, Price,description


function AllProduct_Modal({ProductName,ProductImage1,ProductImage2,SellerName,SellerPhoneNo,Stock, Price,description}) {
    const paperStyle = { padding: '0 10px 40px 25px', width: 400, }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                
            <form>
                
                <Grid container spacing={4}>

                    <Grid item xs={6}>
                        <img src={ProductImage1} style={{height:"150px",width:"150px"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={ProductImage2} style={{height:"150px",width:"150px"}}/>
                    </Grid>

                    <Grid item xs={5}>
                        <label>Product Name</label>
                    </Grid>
                    <Grid item xs={7}>
                        <label>{ProductName}</label>
                    </Grid>
                    
                    <Grid item xs={5}>
                        <label>Seller Name</label>
                    </Grid>
                    <Grid item xs={7}>
                        <label>{SellerName}</label>
                    </Grid>

                    <Grid item xs={5}>
                        <label>Seller Phone Number</label>
                    </Grid>
                    <Grid item xs={7}>
                        <label>{SellerPhoneNo}</label>
                    </Grid>


                    <Grid item xs={5}>
                        <label>Product Stock</label>
                    </Grid>
                    <Grid item xs={7}>
                        <label>{Stock}</label>
                    </Grid>


                    <Grid item xs={5}>
                        <label>Price</label>
                    </Grid>
                    <Grid item xs={7}>
                        <label>{Price}</label>
                    </Grid>

                    <Grid item xs={5}>
                        <label>Description</label>
                    </Grid>
                    <Grid item xs={7}>
                        <label>{description}</label>
                    </Grid>


                    <Grid item xs={4}></Grid>
                    <Grid item xs={6}>
                        <Button type="submit" style={{background:"red",color:"white",fontWeight:"bold"}}>Remove Product</Button>
                    </Grid>
                </Grid>
                    
                
        </form>
            </Paper>
        </Grid>
    )
}

export default AllProduct_Modal
