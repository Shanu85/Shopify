import React from 'react'
import { Button, Grid, Paper } from '@material-ui/core'


function SellerProductView({ sellerProduct, handleRemove }) {
    const paperStyle = { padding: '0 10px 40px 25px', width: 400, }
    const {
        title,
        photo_1,
        photo_2,
        description,
        price,
        discount_price,
        sale_count,
    } = sellerProduct;

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <form>

                    <Grid container spacing={4}>

                        <Grid item xs={6}>
                            <img src={photo_1} style={{ height: "150px", width: "150px" }} />
                        </Grid>
                        <Grid item xs={6}>
                            <img src={photo_2} style={{ height: "150px", width: "150px" }} />
                        </Grid>

                        <Grid item xs={5}>
                            <label>Name</label>
                        </Grid>
                        <Grid item xs={7}>
                            <label>{title}</label>
                        </Grid>

                        <Grid item xs={5}>
                            <label>Stock</label>
                        </Grid>
                        <Grid item xs={7}>
                            <label>{sale_count}</label>
                        </Grid>

                        <Grid item xs={5}>
                            <label>Price</label>
                        </Grid>
                        <Grid item xs={7}>
                            <label>{price}</label>
                        </Grid>

                        <Grid item xs={5}>
                            <label>Discount Price</label>
                        </Grid>
                        <Grid item xs={7}>
                            <label>{discount_price}</label>
                        </Grid>


                        <Grid item xs={5}>
                            <label>Description</label>
                        </Grid>
                        <Grid item xs={7}>
                            <label>{description}</label>
                        </Grid>

                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" onClick={()=>handleRemove(sellerProduct)} style={{ background: "red", color: "white", fontWeight: "bold" }}>Remove Product</Button>
                        </Grid>

                    </Grid>


                </form>
            </Paper>
        </Grid>
    )
}

export default SellerProductView