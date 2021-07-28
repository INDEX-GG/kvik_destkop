import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MobileMenu from '../../UI/icons/MobileMenu';
import { useCategory } from "../../hooks/useCategory"
import { Collapse } from '@material-ui/core';
import BurgerRealEstate from '../../UI/icons/BurgerRealEstate';
import BurgerAuto from '../../UI/icons/BurgerAuto';
import BurgerWork from '../../UI/icons/BurgerWork';
import BurgerElectronic from '../../UI/icons/BurgerElectronic';
import BurgerHome from '../../UI/icons/BurgerHome';
import BurgerAnimal from '../../UI/icons/BurgerAnimal';
import BurgerThing from '../../UI/icons/BurgerThing';
import BurgerBusiness from "../../UI/icons/BurgerBusiness"
import BurgerHobby from "../../UI/icons/BurgerHobby"
import BurgerServices from "../../UI/icons/BurgerServices"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function BurgerCategories() {
  const classes = useStyles();
  const { categoryMainAlias, categoriesByAlias } = useCategory()

  const [state, setState] = useState({left: false});
  const [collapseOpen, setCollapseOpen] = useState(false)
  const [aliasArray, setAliasArray] = useState([])
  const [aliasArray2, setAliasArrayTwo] = useState([])
  const [aliasArray3, setAliasArrayThre] = useState([])

  const aliasIcon = [<BurgerRealEstate/>, <BurgerRealEstate/>, <BurgerAuto/>, <BurgerWork/> , <BurgerElectronic/>, <BurgerHome/>, <BurgerAnimal/>, <BurgerThing/>, <BurgerBusiness/>, <BurgerHobby/>, <BurgerServices/>]


  useEffect(() => {
    if (aliasArray.length == 0) {
      const arr = []

      for (let inner = 0; inner < categoryMainAlias.length; inner++) {
        arr.push(false)
      }

      setAliasArray(arr)
    }

    if (aliasArray2.length == 0) {
      const arr = []
      
      for (let inner = 0; inner < categoryMainAlias.length; inner++) {
        for (let inner2 = 0; inner2 < categoriesByAlias(categoryMainAlias[inner].alias).length; inner2++) {
          arr.push(false)
        }
      }
      setAliasArrayTwo(arr)
    }

    // if (aliasArray3.length == 0) {
    //   const arr = []
      
    //   for (let inner = 0; inner < categoryMainAlias.length; inner++) {
    //     for (let inner2 = 0; inner2 < categoriesByAlias(categoryMainAlias[inner].alias).length; inner2++) {
    //       // for (let inner3 = 0; inner3 < categoriesByAlias(categoryMainAlias[in]))
    //     }
    //   }
    //   setAliasArrayTwo(arr)
    // }

  })


  function generateArray(index, arr, setArr) {
    const newArr = arr.map((item, i) => {
    if (i == index) {
      item = !item
    }
      return item
    })

    setArr(newArr)

  }

  function test(item, item2) {
    console.log(categoriesByAlias(item, item2))
  }



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="burgerTitle" onClick={toggleDrawer("left", false)}>Категории</div>
      <Divider />
      <List>
        {categoryMainAlias.map((item, index) => {
          return (
          <div>
            <ListItem key={index + 1} button onClick={() => generateArray(index, aliasArray, setAliasArray)}>
              <ListItemIcon>
                {aliasIcon[index]}
              </ListItemIcon>
              <ListItemText primary={item.label[0].toUpperCase() + item.label.substring(1,)} />
            </ListItem>
            <Collapse in={aliasArray[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {categoriesByAlias(item.alias).map((item2, index2) => {
                    return (
                      <>
                        <ListItem key={index2 + 1} button onClick={() => generateArray(index2, aliasArray2, setAliasArrayTwo)}>
                          <ListItemText primary={item2.label[0].toUpperCase() + item2.label.substring(1,)} />
                        </ListItem>
                        <Collapse in={aliasArray2[index2]}>
                          {categoriesByAlias(item.alias, item2.alias) == null ? null : 
                          categoriesByAlias(item.alias, item2.alias).map((item3, index3) => {
                            return (
                             <>
                              <ListItem key={index3 + 1} button>
                                <ListItemText primary={item3.label[0].toUpperCase() + item3.label.substring(1,)} />
                              </ListItem>
                              <Collapse in={false}>
                                {categoriesByAlias(item.alias, item2.alias, item3.alias) == null ? null :
                                  categoriesByAlias(item.alias, item2.alias, item3.alias).map((item4, index4) => {
                                    return (
                                      <ListItem key={index4 + 1} button>
                                        <ListItemText primary={item4.label[0].toUpperCase() + item4.label.substring(1,)} />
                                      </ListItem>
                                    )
                                  })
                                }
                              </Collapse>
                             </>
                            )
                          })}
                        </Collapse>
                      </>
                      )
                  })}
                </List>
            </Collapse>
          </div>)
        })}
      </List>
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div>
        <React.Fragment key={"left"}>
          <button style={{backgroundColor: "#00A0AB", width: "32px", height: "32px", borderRadius: "4px"}} onClick={toggleDrawer("left", true)}><MobileMenu/></button>
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
