import {Grid, Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from "@mui/material";
import { useState } from "react";
import TableFees from "../components/tableFees";
import OrangeFeeRanges from "../datas/orangeFees";
import MTNFeeRanges from "../datas/mtnFees";
import Results from "../components/results";

export default function Home(){

    const [operator, setOperator] = useState('1');
    const [amount, setAmount] = useState(-1);

    const handleChangeOperator = (event: SelectChangeEvent) => {
        setOperator(event.target.value as string);
        console.log(operator);
    };

    return(
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={10} md={10} lg={9}>
                <Paper elevation={3} sx={{ padding:5, borderRadius:'15px' }}>
                    <Typography 
                        variant="h3"
                        sx={{
                            //fontSize: '24px',
                            fontFamily: 'Arial',
                            color: '#1976D2',
                            fontWeight: 'bold',
                            textTransform: 'uppercase', 
                            textAlign: 'center',
                            mt: 1,
                            mb: 1
                        }}
                    >
                        Sobadjo
                    </Typography>
                    <Grid container direction="column" alignItems="center" sx={{gap: 2}}>
                        <FormControl fullWidth variant="outlined" sx={{ m: 1,}}>
                            <InputLabel id="op">Opérateur</InputLabel>
                            <Select
                                labelId="op"
                                value={operator}
                                onChange={handleChangeOperator}
                                label="Opérateur"
                            >
                                <MenuItem value={'1'}>OrangeMoney</MenuItem>
                                <MenuItem value={'2'}>MobileMoney</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth variant="outlined" sx={{ m: 1}}>
                            <TextField
                                label="Montant"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => e.target.value != '' ? setAmount(parseInt(e.target.value)) : setAmount(-1)}
                            />
                        </FormControl>
                        <br/>
                        {
                            amount > -1 &&
                            <Results feeRanges={operator == '1' ? OrangeFeeRanges : MTNFeeRanges} amount={amount}/>
                        }                        
                        <br/>
                        <Typography 
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                mt: 1,
                                mb: 1
                            }}
                        >
                            Frais associés à l'opérateur choisis
                        </Typography>
                        <TableFees data={operator == '1' ? OrangeFeeRanges : MTNFeeRanges}/>
                    </Grid>
                    <br/><br/>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Développé par TCHAPPI Osée Brayan (brayan.tchappi@gmail.com) Copyright 2023 - Tous droits réservés
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}