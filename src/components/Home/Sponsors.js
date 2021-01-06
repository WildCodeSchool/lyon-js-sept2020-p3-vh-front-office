import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getCollection } from '../../services/API';
import './Sponsors.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
    borderRadius: '50%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Sponsors = () => {
  const classes = useStyles();

  const [sponsors, setSponsors] = useState();

  useEffect(() => {
    const request = getCollection('sponsors').then((data) => setSponsors(data));
    return () => {
      request.cancel();
    };
  }, []);

  return (
    <div className="cards">
      {sponsors &&
        sponsors.map((sponsor) => {
          return (
            <Card key={sponsor.id} className={classes.root}>
              <CardHeader title="One of the best software ever" />
              <CardMedia
                className={classes.media}
                image={sponsor.image}
                title="Do you want use this fucking software ?"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Do you want use this fucking software ?
                </Typography>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};

export default Sponsors;
