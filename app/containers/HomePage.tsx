import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Icon, Button, List, ListItem } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import staticService from '../services/statics.service';
import Sidebar from '../components/sidebar/Sidebar';
// import SuppDropdown from '../components/home/SuppDropdown';
// import CommentDropdown from '../components/home/CommentDropdown';
import Cart from '../components/cart/Cart';
import { selectFamily, selectSelectedFamily } from '../reducers/homePageSlice';
import MenuArticles from '../components/article/MenuArticles';
import Header from '../components/header/Header';
import { OrderSvg, MenuSvg } from '../assets/svgs';
import { updateData, selectData } from '../reducers/data.reducer';
import loadImages from '../helpers/data-helper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#f4f6fa',
      position: 'fixed',
    },
    paper: {
      color: theme.palette.text.secondary,
    },
    button: {
      height: 120,
      width: 100,
    },
    label: {
      flexDirection: 'column',
    },
    icon: {
      fontSize: '60px !important',
    },
  })
);
export default function HomePage(): JSX.Element {
  const dispatch = useDispatch();
  const selectedFam = useSelector(selectSelectedFamily);
  const famSelect = (familyId: string) => dispatch(selectFamily(familyId));
  useEffect(() => {
    staticService
      .getFamilies(true, false, true)
      .then((d) => {
        dispatch(updateData(d));
        dispatch(selectFamily(d[0]?.id));
        return loadImages(d);
      })
      .catch(console.error);
  }, [dispatch]);

  // const classes = useStyles();
  return (
    <Box className="d-flex p-0 flex-row container-fluid h-100">
      <Box
        style={{
          boxShadow: ' 0 0 20px 0 rgba(0, 0, 0, 0.1)',
          flexBasis: '6 em',
          flexShrink: 1,
          minWidth: 'fit-content',
        }}
        className="overflow-auto customScrollBar h-100 theme-gradient-y"
      >
        <List>
          <ListItem className="p-0">
            <Button
              className="text-white"
              classes={{
                root: useStyles().button,
                label: useStyles().label,
              }}
              variant="text"
              size="small"
            >
              <Icon fontSize="large" className={useStyles().icon}>
                <img className="pb-5" alt="edit" src={OrderSvg} />
              </Icon>
              <span>New Order</span>
            </Button>
          </ListItem>
          <ListItem className="p-0">
            <Button
              style={{
                opacity: '0.7',
              }}
              className="text-white"
              classes={{
                root: useStyles().button,
                label: useStyles().label,
              }}
            >
              <Icon fontSize="large" className={useStyles().icon}>
                <img className="pb-5" alt="edit" src={MenuSvg} />
              </Icon>
              <span>Orders</span>
            </Button>
          </ListItem>
        </List>
      </Box>
      <Box
        style={{
          flex: '1 1 auto',
          position: 'relative' /* need this to position inner content */,
          overflowX: 'hidden',
        }}
        className="h-100 d-flex px-3 flex-column"
      >
        <Box className="pt-3">
          <Header />
        </Box>
        <Box className="w-100 of-x-auto flex-shrink-0 py-3 noScrollBar">
          <Sidebar callback={famSelect} selectedFam={selectedFam} />
        </Box>
        <Box className="flex-shrink-1 of-x-hidden customScrollBar">
          <MenuArticles />
        </Box>
      </Box>
      <Box
        style={{
          backgroundColor: 'white',
          boxShadow: ' 0 0 20px 0 rgba(0, 0, 0, 0.1)',
          width: '20 em',
        }}
        className="h-100 flex-shrink-0"
      >
        <Cart />
      </Box>
      {/* <div className="col-4 p-0 h-100">
      </div> */}
    </Box>

    // <div>
    //   <Grid className={classes.root} container>
    //     <Grid item xs={1}>
    //       <Box
    //         style={{
    //           boxShadow: ' 0 0 20px 0 rgba(0, 0, 0, 0.1)',
    //         }}
    //         className="sidebarWrapper overflow-auto customScrollBar h-100 theme-gradient-y"
    //       >
    //         <List>
    //           <ListItem className="my-3">
    //             <Button
    //               className="text-white"
    //               classes={{
    //                 root: useStyles().button,
    //                 label: useStyles().label,
    //               }}
    //               variant="text"
    //               size="small"
    //             >
    //               <Icon fontSize="large" className={useStyles().icon}>
    //                 <img className="pb-5" alt="edit" src={OrderSvg} />
    //               </Icon>
    //               <span>New Order</span>
    //             </Button>
    //           </ListItem>
    //           <ListItem>
    //             <Button
    //               style={{
    //                 opacity: '0.7',
    //               }}
    //               className="text-white"
    //               classes={{
    //                 root: useStyles().button,
    //                 label: useStyles().label,
    //               }}
    //             >
    //               <Icon fontSize="large" className={useStyles().icon}>
    //                 <img className="pb-5" alt="edit" src={MenuSvg} />
    //               </Icon>
    //               <span>Orders</span>
    //             </Button>
    //           </ListItem>
    //         </List>
    //       </Box>
    //     </Grid>
    //     <Grid item xs alignItems="center" className="m-2">
    //       <Header />
    //       <Sidebar callback={famSelect} selectedFam={selectedFam} />
    //       <div className="p-0 h-100 overflow-auto of-x-hidden customScrollBar">
    //         <MenuArticles />
    //       </div>
    //     </Grid>
    //     <Grid
    //       item
    //       xs={3}
    //       alignItems="center"
    //       style={{
    //         maxHeight: '100vh',
    //         minHeight: '100vh',
    //         backgroundColor: 'white',
    //         boxShadow: ' 0 0 20px 0 rgba(0, 0, 0, 0.1)',
    //       }}
    //       className="ml-2"
    //     >
    //       <Cart />
    //     </Grid>
    //   </Grid>
    // </div>

    /** VERYOLD * */
    // <div className="d-flex h-100">
    //   <Box
    //     boxShadow={2}
    //     className="sidebarWrapper overflow-auto customScrollBar h-80 theme-gradient-y">

    //     {/* <Sidebar callback={famSelect} selectedFam={selectedFam} /> */}
    //   </Box>
    //   <div className="pageContentWrapper">
    //     <div className="d-flex flex-column h-100">
    //       <div className="mt-3 ">
    //         {/* <p> suppliments here</p> */}
    //         <Sidebar callback={famSelect} selectedFam={selectedFam} />

    //         {/* <SuppDropdown />
    //         <CommentDropdown /> */}
    //       </div>
    //       <div className="flex-grow-1 h-100 of-hidden">
    //         <div className="d-flex h-100 flex-row align-items-stretch mt-3">
    //           <div className="w-100 pl-3">
    //             <div className="p-0 h-100 overflow-auto customScrollBar">
    //               <MenuArticles />
    //             </div>
    //             {/* menuarticles here */}
    //           </div>
    //           <div className="p-0 cartWidth">
    //             <Cart />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
