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
                case 'type_park_auto':
                case 'model':
                case 'power':
                case 'processor_manufacturer':
                case 'choosing_a_gadget':
                case 'material':
                case 'data_storage':
                case 'balcony_or_loggia':
                case 'special':
                case 'owner':
                case 'seasonality':
                case 'profile_width':
                case 'lease_term':
                case 'house_type':
                case 'wall_material':
                case 'land_type':
                case 'class':
                case 'building_type':
                case 'marks':
                case 'modification':
                case 'generation':
                case 'fueltype':
                case 'enginesize':
                case 'transmission':
                case 'doors':
                case 'drivetype':
                case 'steering_wheel':
                case 'number_doors':
                case 'year':
                case 'documents':
                case 'condition':
                case 'status':
                case 'bus_type':
                case 'number_seats':
                case 'type_drive':
                case 'type_box':
                case 'type_fuel':
                case 'diameter':
                case 'room_number':
                    newOBJ[i].type = 'listRec'
                    break;

                case 'type_park':
                case 'manufacturer':
                case 'type':
                case 'display_diagonal':
                case 'display_surface':
                case 'body_material':
                case 'gpu':
                case 'matrix_type':
                case 'discrete_graphics_manufacturer':
                case 'the_weight':
                case 'display_resolution':
                case 'cpu':
                case 'builtin_memory':
                case 'screen_type':
                case 'number_of_cameras':
                case 'front_camera_type':
                case 'main_camera':
                case 'front_camera':
                case 'network_support':
                case 'sim_number':
                case 'battery_capacity':
                case 'operating_system':
                case 'memory_card_slot':
                case 'connectors_and_interfaces':
                case 'aspect_ratio':
                case 'features_of_the':
                case 'form_factor':
                case 'number_of_sim_cards':
                case 'sim_availability':
                case 'battery_life':
                // case 'power':
                case 'certification':
                case 'sim_exist':
                case 'communication':
                case 'materials_edit':
                case 'Smart_speakers':
                case 'elevator':
                case 'layout':
                case 'diagonal':
                case 'connectors':
                case 'bathroom':
                case 'appointment':
                case 'ram_type':
                case 'volume':
                case 'data_storage_type':
                case 'data_storage_form_factor':
                case 'backlight_housing':
                case 'video_memory_size':
                case 'printers':
                case 'printers_color':
                case 'printers_speed':
                case 'two_sided_printing':
                case 'size_page_printers':
                case 'network_printers':
                case 'photo_printers':
                case 'mfps_and_scanners_color':
                case 'mfps_and_scanners_speed':
                case 'two_sided_mfps_and_scanners':
                case 'size_page_mfps_and_scanners':
                case 'network_mfps_and_scanners':
                case 'auto_mfps_and_scanners':
                case 'duplex_mfps_and_scanners':
                case 'brand':
                case 'smartTV':
                case '3dTV':
                case 'screen_resolution':
                case 'curved_screen':
                case 'usbTV':
                case 'wifiTV':
                case 'bluetoothTV':
                case 'sale_type':
                case 'schedule':
                case 'willingness_to_travel':
                case 'moving':
                case 'deadline':
                case 'car_goods':
                case 'brake_type':
                // case 'model':
                case 'suspension_type':
                case 'series_home':
                case 'trailer_type':
                // case 'model':
                case 'repairs':
                case 'tenure':
                case 'furniture':
                case 'communal_payments':
                case 'prepayment':
                case 'bathrooms_number':
                case 'balcony_number':
                case 'garage':
                case 'electricity':
                case 'heating':
                case 'gas':
                case 'water_supply':
                case 'entrance':
                case 'access':
                case 'parking':
                case 'crane':
                case 'road':
                case 'project_availability':
                case 'availability_buildings':
                case 'type_law':
                case 'finishing':
                case 'complectations':
                case 'rim_width':
                case 'disk_departure':
                case 'bolt_distance':
                case 'number_of_mounting_holes':
                    newOBJ[i].type = 'list'
                    break;

                case 'model_name':
                case 'area':
                case 'vacancy_title':
                case 'position':
                case 'storey':
                case 'floor_home':
                case 'profile_height':
                case 'pledge':
                case 'commission':
                case 'room_count':
                case 'home_area':
                case 'land_area':
                case 'number_of_storeys':
                case 'security_payment':
                case 'count_floor':
                case 'vine':
                case 'mileage':
                case 'engine_volume':
                case 'owners_of_pts':
                    newOBJ[i].type = 'textRec'
                    break;

                case 'cadastral_number':
                case 'ceiling_height':
                case 'build_year':
                case 'number_beds':
                case 'electric_power':
                case 'distance_to_city':
                case 'tires_and_rims':
                case 'breed':
                case 'features':
                case 'discrete_graphics_series':
                case 'total_ram':
                case 'hard_drives_and_ssd':
                case 'processor':
                case 'processor_family':
                case 'wage':
                case 'mark':
                case 'year_of_issue':
                case 'full_mass':
                case 'number_of_axles':
                case 'number_of_tires':
                case 'tire_year':
                case 'marking':
                case 'disc_model':
                case 'disc_type':
                case 'number_of_discs_included':
                    newOBJ[i].type = 'text'
                    break;

                case 'runflat':
                case 'bodytype':
                case 'product_condition':
                    newOBJ[i].type = 'checkboxRec'
                    break;

                case 'colour':// НЕТ В ТЗ
                case 'airbags': // НЕТ В ТЗ
                case 'the_presence_of_a_discrete_video_card':
                case 'motherboard_manufacturer':
                case 'number_of_memory_slots':
                case 'socket':
                case 'memory_type':
                case 'power_supply_power':
                case 'chipset':
                case 'features_of_the_body':
                case 'chip_manufacturer':
                case 'infrastructure':
                case 'floor':
                case 'accommodations':
                case 'facilities':
                case 'communications':
                case 'additionally':
                case 'multimedia':
                case 'type_sale':
                case 'included':
                case 'type_transaction':
                case 'possible_appointment':
                case 'communications_checkbox':
                case 'driving_assistance':
                case 'heating_auto':
                case 'antitheft_system':
                case 'salon':
                case 'support_systems':
                case 'multimedia_and_navigation':
                case 'exchange_is_possible':
                    newOBJ[i].type = 'checkbox'
                    break;

                case 'ram_size':
                case 'work_experience':
                case 'age':
                case 'experience':
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
