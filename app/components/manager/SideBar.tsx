import React from 'react';
import { useHistory } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import routes from '../../constants/routes.json';

function SidebarButton({
  feature,
}: {
  feature: { id: string; listFeatures: Array<{ id: string; link: string }> };
}): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const history = useHistory();
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={handleClick}>
        <ListItemIcon />
        <ListItemText primary={feature.id} />
        {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className="ml-3">
          {feature.listFeatures.map((listfeature) => (
            <ListItem
              button
              key={listfeature.id}
              onClick={() => history.push(listfeature.link)}
            >
              <ListItemText primary={listfeature.id} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default function Sidebar(): JSX.Element {
  const features = [
    {
      id: 'Produit',
      listFeatures: [
        {
          id: 'List des Produits',
          link: routes.MANAGER.ProductManagement.List,
        },
        {
          id: 'Liste des Familles',
          link: routes.MANAGER.ProductManagement.FamilleList,
        },
        {
          id: 'Emplacement',
          link: routes.MANAGER.ProductManagement.Station,
        },
      ],
    },
    {
      id: 'Vente',
      listFeatures: [
        {
          id: 'List des ventes',
          link: routes.MANAGER.VenteManagement.List,
        },
      ],
    },
    {
      id: 'Stock',
      listFeatures: [
        {
          id: 'List de Stock',
          link: routes.MANAGER.StockManagement.List,
        },
      ],
    },
  ];
  return (
    <div id="accordion" className="mt-5">
      {features.map((feature) => (
        <SidebarButton key={feature.id} feature={feature} />
      ))}
    </div>
  );
}
