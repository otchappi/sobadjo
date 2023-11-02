import { Grid } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fee from "../types/fee";
import { economiser, findInterval, sumFee } from "../utils/utils";
import Option from "./option.tsx";
import Result from "../types/result.tsx";

type Props = {
  feeRanges: Fee[],
  amount: number
}

let result: Result;
let normalFees: number = 0;
let indexAmount: number = 0;
let realAmount: number = 0;

export default function Results({feeRanges, amount} : Props) {
  if (typeof feeRanges === 'undefined' || typeof amount === 'undefined')
    return null;
  loadResult(feeRanges, amount);
  return (
    <Grid container columnSpacing={2} justifyContent={"center"}>
      <Grid item xs={12} sm={11} md={11} lg={10}>
        <Grid container columnSpacing={2} rowSpacing={2} justifyContent={"center"}>
          {
            result && result.erreur.trim() != '' && 
            <Grid key={-3} item xs={12}>
              <Alert severity="error">
                <AlertTitle>Erreur</AlertTitle>
                {result.erreur} — <strong>Changez de montant et ressayez !</strong>
              </Alert>
            </Grid>
          }
          {
            result && result.pathHeader.length > 0 &&
            <Grid key={-2} item xs={12}>
              <Alert severity="info">
                <AlertTitle>Note</AlertTitle>
                Votre opérateur autorise un retrait maximum de {feeRanges[feeRanges.length - 1].max.toLocaleString('fr-FR') + " Fcfa"}.
                Effectuez donc <strong>{result.pathHeader.length}</strong> fois le retrait de {feeRanges[feeRanges.length - 1].max.toLocaleString('fr-FR') + " Fcfa"}.
                <br/>
                <strong>
                  Pour le reste soit : {(amount - feeRanges[feeRanges.length - 1].max * result.pathHeader.length).toLocaleString('fr-FR') + " Fcfa"} choississez votre option.
                </strong>
              </Alert>
            </Grid>
          }
          {
            result && result.path.map((item, index) => (
              normalFees - sumFee(item, feeRanges) > 0 && 
              <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
                <Option goodPlan={true} data={item} amountSaved={normalFees - sumFee(item, feeRanges)} fees={feeRanges}/>
              </Grid>
            ))
          }
          {
            result && result.erreur.trim() === '' && 
            <Grid key={-1} item xs={12} sm={12} md={6} lg={4}>
              <Option goodPlan={false} data={[{index: indexAmount, amount: realAmount}]} amountSaved={0} fees={feeRanges}/>
            </Grid>
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

function loadResult (feeRanges: Fee[], amount: number): boolean {
  result = economiser(amount, feeRanges);
  realAmount = amount - result.pathHeader.length * feeRanges[feeRanges.length - 1].max;
  if (findInterval(realAmount, feeRanges) >= 0) {
    indexAmount = findInterval(realAmount, feeRanges);
    normalFees = feeRanges[indexAmount].fee;
  }   
  
  if (result.erreur.trim() === '' && result.path.length == 0)
    return false;
   
  return true;
}
