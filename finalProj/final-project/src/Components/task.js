import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

async function fetchData() {
    console.log('be4');
    
    try{

        const res = await fetch('http://localhost:3030/Help4U/task/getTasksByUID?userID=305171159');
        const data = await res.json();
        console.log( 'full data\n',data)
    }
    catch(e) {
        
        console.log(e);
        
    }

    // res.then(data => {
    //     console.log('data!\n',data);
        
    // })
    // res.catch(e => {
    //     console.log(e);
        
    // }) 
    console.log('after');
    

}




// let res = (fetch('http://localhost:3030/Help4U/task/getTasksByUID?userID=305171159' ,{
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         "X-Powered-By": "Express",
//         "Content-Length": "603",
//         "ETag": 'W/"25b-C7Z/Qt1KYe3R1Qw904ZginYJ4Uc"',
//         "Date": "Tue, 14 Jan 2020 15:23:35 GMT",
//         "Connection": "keep-alive",
//     }
// }));


// res.then((data) => {
    
//     console.log(data.json);
    
// }).catch(e => {
//     console.log(e);
    
// })



const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard() {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    fetchData();

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                    {/* {res.then((data) => {
                        console.log(data);
                        
                    })} */}
        </Typography>
                <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
        </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
        </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
          <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}