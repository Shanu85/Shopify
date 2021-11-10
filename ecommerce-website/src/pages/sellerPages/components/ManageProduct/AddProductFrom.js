import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import { useState } from 'react';

function AddProductFrom({ onClose, forceClose }) {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }

    const [ProductMainImage, setProductMainImage] = useState(null);
    const [ProductImage1, setProductImage1] = useState(null);
    const [ProductImage2, setProductImage2] = useState(null);
    const [ProductProposal, setProductProposal] = useState(null);
    const [ProductName, setProductName] = useState('');
    const [Stock, setStock] = useState(0);
    const [ProductPrice, setProductPrice] = useState(0);
    const [DiscountPrice, setDiscountPrice] = useState(0);
    const [ProductDes, setProductDes] = useState('');
    const [Size, setSize] = useState('NA');
    const [Category, setCategory] = useState('topwear');

    const handleSubmit = async () => {

        if (ProductMainImage === null) {
            alert("Please upload your product main image");
        }
        else if (ProductImage1 === null) {
            alert("Please upload your product image 1");
        }
        else if (ProductImage2 === null) {
            alert("Please upload your product image 2");
        }
        else if (ProductProposal === null) {
            alert("Please upload your product proposal");
        }
        else if(ProductMainImage.size>524288)
        {
            alert("Main image file size should be less than 0.5 MB")
        }
        else if(ProductImage1.size>524288)
        {
            alert("Image1 file size should be less than 0.5 MB")
        }
        else if(ProductImage2.size>524288)
        {
            alert("Image2 file size should be less than 0.5 MB")
        }
        else if(ProductProposal.size>1048576)
        {
            alert("Proposal file size should be less than 1 MB")
        }
        else if (ProductName.length < 2) {
            alert("Product name is too short");
        }
        else if (parseFloat(Stock) < 10) {
            alert("Product stock should be greater or equal to 10");
        }
        else if (parseFloat(Stock) % 1 !== 0) {
            alert("Product stock should be integer only");
        }
        else if (parseFloat(ProductPrice) < 50) {
            alert("Product price should be greater or equal to 50");
        }
        else if (parseFloat(DiscountPrice) > parseFloat(ProductPrice)) {
            alert("Discount price should be less or equal to product price");
        }
        else if (parseFloat(DiscountPrice) < 50) {
            alert("Discount price should be greater or equal to 50");
        }
        else if (ProductDes.length < 10) {
            alert("Product description should be aleast 10 characters long");
        }
        else {
            let form_data = new FormData();
            form_data.append('title', ProductName+" "+Category);
            form_data.append('sale_count', Stock);
            form_data.append('price', ProductPrice);
            form_data.append('discount_price', DiscountPrice);
            form_data.append('proposal', ProductProposal);
            form_data.append('description', ProductDes);
            form_data.append('photo_main', ProductMainImage);
            form_data.append('photo_1', ProductImage1);
            form_data.append('photo_2', ProductImage2);
            form_data.append('size', Size);
            onClose(form_data);
        }
        
        forceClose();
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>

                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <label>Product Main Image</label>
                        </Grid>
                        <Grid item xs={7}>
                            <input type="file" accept=".png,.jpg" multiple
                                onChange={(e) => setProductMainImage(e.target.files[0])} required />
                        </Grid>

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
                                onChange={(e) => {setProductImage2(e.target.files[0])}} required />
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
                            <label>Category</label>
                        </Grid>
                        <Grid item xs={7}>
                            <select onChange={
                                (event) => {
                                    setCategory(event.target.value)
                                }}>
                                <option selected value="topwear">Topwear</option>
                                <option value="bottomwear">Bottomwear</option>
                                <option value="footwear">Footwear</option>
                            </select>
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
                                <option value="4XL">4XL</option>
                                <option value="FREE SIZE">FREE SIZE</option>
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
