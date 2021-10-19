import React from 'react'
import { Button, Grid,Paper} from '@material-ui/core'


function Buyer_Seller_Modal({Image,Name,Email,PhoneNo,Role}) {
    const paperStyle = { padding: '0 10px 40px 25px', width: 400, }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                
            <form>
                
                <Grid container spacing={4}>
                    <Grid item xs={3}/>

                    <Grid item xs={9}>
                        <img src={Image} style={{height:"150px",width:"150px"}}/>
                    </Grid>

                    <Grid item xs={5}>
                        <label>Name</label>
                    </Grid>
                    <Grid item xs={7}>
                        <label>{Name}</label>
                    </Grid>

                    <Grid item xs={5}>
                        <label>Email</label>
                    </Grid>
                    <Grid item xs={7}>
                        <label>{Email}</label>
                    </Grid>
                    
                    <Grid item xs={5}>
                        <label>Phone Number</label>
                    </Grid>
                    <Grid item xs={7}>
                        <label>{PhoneNo}</label>
                    </Grid>

                    <Grid item xs={4}></Grid>
                    <Grid item xs={6}>
                        <Button type="submit" style={{background:"red",color:"white",fontWeight:"bold"}}>Remove User</Button>
                    </Grid>
                </Grid>
                    
                
        </form>
            </Paper>
        </Grid>
    )
}

export default Buyer_Seller_Modal
