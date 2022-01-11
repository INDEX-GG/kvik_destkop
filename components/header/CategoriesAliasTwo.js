import { Collapse, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

const CategoriesAliasTwo = ({alias, label, currentAlias, changeCategories}) => {

	const [open, setOpen] = useState(false);


	return (
		<>
			<ListItem className="burgerList" button onClick={() => setOpen(!open)}>
				<ListItemText className={`burgerItem ${open ? "burgerItemActive" : ""}`} primary={label} />
			</ListItem>
			<Collapse in={open}>
                {Array.isArray(currentAlias) && (
                    currentAlias.map(item => (
                        <ListItem className="burgerList pl-1" key={item.alias}>
                            <ListItemText>
                                <div className="burgerItem burgerLink" onClick={() => changeCategories(`${alias},${item.alias}`)}>
                                    {item.name}
                                </div>
                            </ListItemText>
                        </ListItem>
                    ))
                )}
			</Collapse>
		</>
	)
}

export default CategoriesAliasTwo;