import React from 'react';
import { useHistory } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { Icon } from '@material-ui/core';
import routes from '../../constants/routes.json';
import {
  ProduitSvg,
  sellSvg,
  buySvg,
  financeSvg,
  stockSvg,
  grhSvg,
  userSvg,
} from '../../assets/svgs';

function SidebarButton({
  feature,
}: {
  feature: {
    id: string;
    icon: any;
    listFeatures: Array<{ id: string; link: string }>;
  };
}): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const history = useHistory();
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Icon fontSize="large">
            <img className="pb-5" alt="edit" src={feature.icon} />
          </Icon>
        </ListItemIcon>
        <ListItemText disableTypography className="text-white ">
          <h5 className="pt-2">{feature.id}</h5>
        </ListItemText>
        {open ? (
          <KeyboardArrowDownIcon className="text-white" />
        ) : (
          <KeyboardArrowRightIcon className="text-white" />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className="ml-3">
          {feature.listFeatures.map((listfeature) => (
            <ListItem
              button
              key={listfeature.id}
              onClick={() => history.push(listfeature.link)}
            >
              <ListItemText
                disableTypography
                className="text-white"
                primary={listfeature.id}
              />
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
      icon: ProduitSvg,
      listFeatures: [
        {
          id: 'List des Produits',
          link: routes.MANAGER.ProductManagement.ProductList,
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
      icon: sellSvg,
      listFeatures: [
        {
          id: 'List des ventes',
          link: routes.MANAGER.VenteManagement.root,
        },
      ],
    },
    {
      id: 'Achat',
      icon: buySvg,
      listFeatures: [
        {
          id: 'Dépenses',
          link: routes.MANAGER.Achat.Expense,
        },
        {
          id: 'Facture',
          link: routes.MANAGER.Achat.Facture,
        },
      ],
    },
    {
      id: 'Finance',
      icon: financeSvg,
      listFeatures: [
        {
          id: 'Finance',
          link: routes.MANAGER.FinanceManagement.Account,
        },
      ],
    },
    {
      id: 'Stock',
      icon: stockSvg,
      listFeatures: [
        {
          id: 'List de Stock',
          link: routes.MANAGER.StockManagement.List,
        },
        {
          id: 'Facture',
          link: routes.MANAGER.StockManagement.Facture,
        },
        {
          id: 'Stock Endommager',
          link: routes.MANAGER.StockManagement.Damaged,
        },
      ],
    },
    {
      id: 'Personnes',
      icon: userSvg,
      listFeatures: [
        {
          id: 'Utilisateurs',
          link: routes.MANAGER.PersonnesManagement.Users,
        },
        {
          id: 'Clients',
          link: routes.MANAGER.PersonnesManagement.Clients,
        },
        {
          id: 'Fournisseurs',
          link: routes.MANAGER.PersonnesManagement.Fournisseurs,
        },
      ],
    },
    {
      id: 'GRH',
      icon: grhSvg,
      listFeatures: [
        {
          id: 'Employés',
          link: routes.MANAGER.HumanResourceManagement.Employee,
        },
        {
          id: 'Paie',
          link: routes.MANAGER.HumanResourceManagement.Payroll,
        },
        {
          id: 'Présence',
          link: routes.MANAGER.HumanResourceManagement.Attendance,
        },
      ],
    },
    {
      id: 'Rapport',
      icon: ProduitSvg,
      listFeatures: [
        {
          id: 'Rapport sommaire',
          link: '',
        },
        {
          id: 'Rapport des Produits',
          link: '',
        },
        {
          id: 'Rapport des Ventes',
          link: '',
        },
        {
          id: 'Rapport des Achats',
          link: '',
        },
        {
          id: 'Rapport des Fournisseur',
          link: '',
        },
        {
          id: 'Rapport de Finance',
          link: '',
        },
      ],
    },
  ];
  return (
    <div>
      {features.map((feature) => (
        <SidebarButton key={feature.id} feature={feature} />
      ))}
    </div>
  );
}
