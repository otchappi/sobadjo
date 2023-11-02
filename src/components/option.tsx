import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SavingsIcon from '@mui/icons-material/Savings';
import Path from '../types/path';
import TableOperations from './tableOperations';
import Fee from '../types/fee';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = {
    goodPlan: boolean,
    amountSaved: number,
    data: Path[],
    fees: Fee[]
};

export default function Options({goodPlan, amountSaved, data, fees} : Props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: goodPlan ? green[500] : red[500] }} aria-label="recipe">
                    <SavingsIcon/>
                </Avatar>
                }
                title={goodPlan ? amountSaved.toLocaleString('fr-FR') + " Fcfa" : "Opérateur"}
                subheader={goodPlan ?  "Economisé" : "Un seul retrait"}
            />
            <CardActions disableSpacing>
                <Typography variant="body2" color="text.secondary">
                    Voir le détails
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <TableOperations datas={data} fees={fees}/>
                </CardContent>
            </Collapse>
        </Card>
    );
}
