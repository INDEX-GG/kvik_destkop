import React, { useEffect, useRef, useState } from 'react';
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
import Link from "next/link"

const useStyles = makeStyles({
  list: {
    width: "384px"
  },
  fullList: {
    width: 'auto',
  }
});

export default function BurgerCategories() {
  const classes = useStyles();
  const { categoryMainAlias, categoriesByAlias } = useCategory()

  const [state, setState] = useState({left: false});
  const [aliasArray, setAliasArray] = useState([])
  const [aliasArray2, setAliasArrayTwo] = useState([])
  const [aliasArray3, setAliasArrayThree] = useState([])
  let aliasItemId = -1
  let aliasItemIdTwo = -1

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

    if (aliasArray3.length == 0) {
      const arr = []
      
      for (let inner = 0; inner < categoryMainAlias.length; inner++) {
        for (let inner2 = 0; inner2 < categoriesByAlias(categoryMainAlias[inner].alias).length; inner2++) {

          const queryData3 = categoriesByAlias(categoryMainAlias[inner].alias, categoriesByAlias(categoryMainAlias[inner].alias)[inner2].alias)
          
          if (queryData3 != null) {
            arr.push(false)
          }
        }
      }
      setAliasArrayThree(arr)
    }

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

  function generateID(e, id, arr, setArr) {
    if (e.target.tagName === "SPAN") {
      id = +e.target.parentNode.getAttribute("id")
    } else {
      id = +e.target.childNodes[0].getAttribute("id")
    }
    generateArray(id, arr, setArr)                         
  }

  function generateStr(str) {
    return str[0].toUpperCase() + str.substring(1,)
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
      <List className="burgerContainer">
        {categoryMainAlias.map((item, index) => {
          return (
          <div>
            <ListItem key={index + 1} className="burgerList" style={{backgroundColor: aliasArray[index] ? "#E9E9E9" : "#fff"}} button onClick={() => generateArray(index, aliasArray, setAliasArray)}>
              <ListItemIcon>
                {aliasIcon[index]}
              </ListItemIcon>
              <ListItemText className="burgerItem" primary={generateStr(item.label)} />
            </ListItem>
            <Collapse in={aliasArray[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {categoriesByAlias(item.alias).map((item2, index2) => {
                    {aliasItemId += 1}
                    if (categoriesByAlias(item.alias, item2.alias) == null) {
                      return (
                        <ListItem className="burgerList" onClick={toggleDrawer("left", false)}>
                          <Link href={`/search/${item2.alias}`}><a className="burgerItem burgerLink">{item2.label}</a></Link>
                        </ListItem>
                      )
                    }
                    return (
                      <>
                        <ListItem className="burgerList" key={index2 + 1} button onClick={(e) => generateID(e, aliasItemId, aliasArray2, setAliasArrayTwo)}>
                          <ListItemText id={aliasItemId} className={`burgerItem ${aliasArray2[aliasItemId]? "burgerItemActive" : ""}`} primary={generateStr(item2.label)} />
                        </ListItem>
                        <Collapse in={aliasArray2[aliasItemId]}>
                          {categoriesByAlias(item.alias, item2.alias) == null ? null : 
                          categoriesByAlias(item.alias, item2.alias).map((item3, index3) => {
                            {aliasItemIdTwo += 1}

                            if (categoriesByAlias(item.alias, item2.alias, item3.alias) == null) {
                               return (
                                  <ListItem className="burgerList pl-1" onClick={toggleDrawer("left", false)}>
                                    <Link href={`/search/${item3.alias}`}><a className="burgerItem burgerLink">{generateStr(item3.label)}</a></Link>
                                  </ListItem>
                                )
                            }

                            return (
                             <>
                              <ListItem className="burgerList pl-1" key={index3 + 1} button onClick={(e) => generateID(e, aliasItemIdTwo, aliasArray3, setAliasArrayThree)}>
                                <ListItemText className="burgerItem" id={aliasItemIdTwo} style={{color: "orange"}} primary={generateStr(item3.label)} />
                              </ListItem>
                              <Collapse in={aliasArray3[aliasItemIdTwo]}>
                                {categoriesByAlias(item.alias, item2.alias, item3.alias) == null ? null :
                                  categoriesByAlias(item.alias, item2.alias, item3.alias).map((item4, index4) => {
                                    return (
                                      <ListItem className="burgerList pl-2" key={index4 + 1} onClick={toggleDrawer("left", false)}>
                                        <Link href={`/search/${item4.alias}`}><a className="burgerItem burgerLink">{generateStr(item4.label)}</a></Link>
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
