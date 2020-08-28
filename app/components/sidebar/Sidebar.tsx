import React from 'react';
import { Grid } from '@material-ui/core';
import data from '../../services/api';
import SideBarButton from './sideBarButton';
// TODO: redisign this shit is ugly
type Props = {
  callback: (familyId: string) => unknown;
  selectedFam: string;
};
export default function Sidebar({ callback, selectedFam }: Props): JSX.Element {
  const families = data.families.map((family) => family.id);

  return (
    <Grid container justify="start" className="my-3">
      {families.map((fam) => (
        <Grid item key={fam} className="mr-3">
          <SideBarButton
            famId={fam}
            selected={fam === selectedFam}
            callback={callback}
          />
        </Grid>
      ))}
    </Grid>
  );
}
