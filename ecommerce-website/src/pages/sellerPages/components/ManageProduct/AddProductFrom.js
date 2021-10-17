import React from 'react'
import { Button, Grid,Paper} from '@material-ui/core'
import { useState } from 'react'

function AddProductFrom() {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 20 }
    

    const[ProductImage,setProductImage]=useState('');
    const[ProductProposal,setProductProposal]=useState('');
    const [ProductName,setProudctName]=useState('');
    const [Stock,setStock]=useState(0);
    const [ProductPrice,setProudctPrice]=useState(0);
    const [ProductDes,setProductDes]=useState('');


    function handleSubmit(){
        if(ProductImage==='')
        {
            alert("Please upload your product Image");
            return;
        }
        if(ProductProposal==='')
        {
            alert("Please upload your product proposal");
            return;
        }
        if(ProductName.length<2)
        {
            alert("Product Name is too short");
            return;
        }
        if(Stock<2)
        {
            alert("Product stock should be atleast 2");
            return;
        }
        if(ProductPrice<10)
        {
            alert("Product price should be atleast 10");
            return;
        }
        if(ProductDes.length<10)
        {
            alert("Product description should be aleast 10 characters long");
            return;
        }
        alert(`${ProductImage.name} ${ProductProposal.name}`)
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <label>Product Image</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type="file" accept=".png,.jpg"
                        onChange={(e) => setProductImage(e.target.files[0])} required/>
                    </Grid>

                    <Grid item xs={5}>
                        <label>Product Proposal</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type='file' accept=".pdf" style={{margin:"10px"}}
                        onChange={(event)=>{setProductProposal(event.target.files[0])}} required/>
                    </Grid>

                    <Grid item xs={5}>
                        <label>ProductName</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type="text" value={ProductName} onChange={(event) =>{
                    setProudctName(event.target.value);}} required/>
                    </Grid>

                    <Grid item xs={5}>
                        <label>Product Stock</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type="number" value={Stock} onChange={(event) =>{
                                setStock(event.target.value);
                              }} required/>
                    </Grid>

                    <Grid item xs={5}>
                    <label>Product Price</label>
                    </Grid>
                    <Grid item xs={7}>
                    <input type="number" value={ProductPrice} onChange={
                    (event)=>{
                        setProudctPrice(event.target.value)
                    }} required/>
                    </Grid>

                    <Grid item xs={5}>
                    <label>Product Description</label>
                    </Grid>
                    <Grid item xs={7}>
                    <textarea value={ProductDes} onChange={
                    (event)=>{
                        setProductDes(event.target.value)
                    }} required style={{height:"200px",width:"250px"}}/>
                    </Grid>
                    
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                        <Button type="submit" onClick={handleSubmit} style={{background:"green",color:"white",fontWeight:"bold"}}>Submit</Button>
                    </Grid>
                </Grid>
                    
                
        </form>
            </Paper>
        </Grid>
    )
}

export default AddProductFrom
