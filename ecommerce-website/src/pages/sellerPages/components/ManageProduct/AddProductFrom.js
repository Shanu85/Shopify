import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import { useState } from 'react';

function AddProductFrom({ onClose, forceClose }) {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }

    const [ProductImage1, setProductImage1] = useState(null);
    const [ProductImage2, setProductImage2] = useState(null);
    const [ProductProposal, setProductProposal] = useState(null);
    const [ProductName, setProductName] = useState('');
    const [Stock, setStock] = useState(0);
    const [ProductPrice, setProductPrice] = useState(0);
    const [DiscountPrice, setDiscountPrice] = useState(0);
    const [ProductDes, setProductDes] = useState('');
    const [Size, setSize] = useState('NA');

    const handleSubmit = async () => {

        if (ProductImage1 === null) {
            alert("Please upload your product image 1");
        }
        else if (ProductImage2 === null) {
            alert("Please upload your product image 2");
        }
        else if (ProductProposal === null) {
            alert("Please upload your product proposal");
        }
        else if (ProductName.length < 2) {
            alert("Product name is too short");
        }
        else if (Stock < 5) {
            alert("Product stock should be atleast 5");
        }
        else if (ProductPrice < 10) {
            alert("Product price should be atleast 10");
        }
        else if (DiscountPrice > ProductPrice) {
            alert("Discount price should be less or equal to product price");
        }
        else if (ProductDes.length < 10) {
            alert("Product description should be aleast 10 characters long");
        }
        else {
            const newSellerProduct = {
                title: ProductName,
                sale_count: Stock,
                price: ProductPrice,
                discount_price: DiscountPrice,
                proposal: ProductProposal,
                description: ProductDes,
                photo_main: ProductImage1,
                photo_1: ProductImage1,
                photo_2: ProductImage2,
                size: Size
            };

            onClose(newSellerProduct);
        }

        forceClose();
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>

                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <label>Product Image 1</label>
                        </Grid>
                        <Grid item xs={7}>
                            <input type="file" accept=".png,.jpg" multiple
                                onChange={(e) => setProductImage1(e.target.files[0])} required />
                        </Grid>

                        <Grid item xs={5}>
                            <label>Product Image 2</label>
                        </Grid>
                        <Grid item xs={7}>
                            <input type="file" accept=".png,.jpg" multiple
                                onChange={(e) => setProductImage2(e.target.files[0])} required />
                        </Grid>

                        <Grid item xs={5}>
                            <label>Product Proposal</label>
                        </Grid>
                        <Grid item xs={7}>
                            <input type='file' accept=".pdf" style={{ margin: "10px" }}
                                onChange={(event) => { setProductProposal(event.target.files[0]) }} required />
                        </Grid>

                        <Grid item xs={5}>
                            <label>ProductName</label>
                        </Grid>
                        <Grid item xs={7}>
                            <input type="text" value={ProductName} onChange={(event) => {
                                setProductName(event.target.value);
                            }} required />
                        </Grid>

                        <Grid item xs={5}>
                            <label>Product Stock</label>
                        </Grid>
                        <Grid item xs={7}>
                            <input type="number" value={Stock} onChange={(event) => {
                                setStock(event.target.value);
                            }} required />
                        </Grid>

                        <Grid item xs={5}>
                            <label>Product Price</label>
                        </Grid>
                        <Grid item xs={7}>
                            <input type="number" value={ProductPrice} onChange={
                                (event) => {
                                    setProductPrice(event.target.value)
                                }} required />
                        </Grid>

                        <Grid item xs={5}>
                            <label>Discount Price</label>
                        </Grid>
                        <Grid item xs={7}>
                            <input type="number" value={DiscountPrice} onChange={
                                (event) => {
                                    setDiscountPrice(event.target.value)
                                }} required />
                        </Grid>

                        <Grid item xs={5}>
                            <label>Product Description</label>
                        </Grid>
                        <Grid item xs={7}>
                            <textarea value={ProductDes} onChange={
                                (event) => {
                                    setProductDes(event.target.value)
                                }} required style={{ height: "200px", width: "250px" }} />
                        </Grid>

                        <Grid item xs={5}>
                            <label>Size</label>
                        </Grid>
                        <Grid item xs={7}>
                            <select onChange={
                                (event) => {
                                    setSize(event.target.value)
                                }}>
                                <option selected value="NA">NA</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="XXXL">XXXL</option>
                                <option value="FREE">FREE</option>
                            </select>
                        </Grid>

                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Button type="submit" onClick={handleSubmit} style={{ background: "green", color: "white", fontWeight: "bold" }}>Submit</Button>
                        </Grid>
                    </Grid>


                </form>
            </Paper>
        </Grid>
    )
}

export default AddProductFrom
