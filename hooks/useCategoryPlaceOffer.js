import React, { useState, useEffect } from "react";
import axios from 'axios';

export const useCategoryPlaceOffer = (data) => {

    const [zxc, setZxc] = useState(undefined),
        nameTitile = data?.toLowerCase();

    let newOBJ = [];



    if (zxc?.length != undefined) {

        for (var i = 0; i < zxc?.length; i++) {

            newOBJ?.push(zxc[i])

            switch (zxc[i].alias) {
                case 'type_park':
                case 'marks':
                case 'model':
                case 'modification':
                case 'generation':
                case 'fueltype':
                case 'enginesize':
                case 'power':
                case 'transmission':
                case 'doors':
                case 'drivetype':
                case 'steering_wheel':
                case 'number_doors':
                case 'year':
                case 'documents':
                case 'condition':
                case 'status':
                case 'owners_of_pts':
                    newOBJ[i].type = 'listMain'
                    break;


                case 'complectations':
                    newOBJ[i].type = 'list'
                    break;


                case 'vine':
                case 'mileage':
                    newOBJ[i].type = 'textMain'
                    break;


                case 'tires_and_rims':
                    newOBJ[i].type = 'text'
                    break;


                case 'bodytype':
                    newOBJ[i].type = 'checkboxMain'
                    break;


                case 'colour':
                case 'driving_assistance':
                case 'antitheft_system':
                case 'salon':
                case 'support_systems':
                case 'airbags':
                case 'heating':
                case 'multimedia_and_navigation':
                case 'exchange_is_possible':
                    newOBJ[i].type = 'checkbox'
                    break;


                case 'separate_check_mark_for_hbo':
                case 'winter_tires_and_rims':
                    newOBJ[i].type = 'radio'
                    break;

                default:
                    break;
            }




        }

        // for (var i = 0; i < zxc?.length; i++) {
        //     (newOBJ?.push(JSON.parse(((zxc[i]?.split('"').join(''))?.split("'").join('"')))))

        //     // switch (newOBJ[i].alias) {
        //     //     case value:

        //     //         break;

        //     //     default:
        //     //         break;
        //     // }


        //     newOBJ[i].type = 'qweq'

        // }




    } else {
        newOBJ = undefined
    }

    useEffect(() => {
        if (nameTitile !== undefined && nameTitile !== 'undefined') {
            axios.get(`/subcategories/` + nameTitile + `.json`)
                .then((result) => setZxc(result.data[nameTitile]))
                .catch((e) => {
                    setZxc()
                })
        } else {
            setZxc()
        }
    }, [nameTitile])
    
    return { [nameTitile]: newOBJ }
}
