import React, { useState, useEffect } from "react";
import axios from 'axios';

import atvs_and_buggy from '../public/subcategories/atvs_and_buggy.json';
import atvs_kvadro from '../public/subcategories/atvs_kvadro.json';
import atvs from '../public/subcategories/atvs.json';
import auto from '../public/subcategories/auto.json';
import bicycles from '../public/subcategories/bicycles.json';
import boats_and_yachts from '../public/subcategories/boats_and_yachts.json';
import buses from '../public/subcategories/buses.json';
import car_goods from '../public/subcategories/car_goods.json';
import cats from '../public/subcategories/cats.json';
import chargers_power_supplies from '../public/subcategories/chargers_power_supplies.json';
import climatic_equipment from '../public/subcategories/climatic_equipment.json';
import construction_machinery from '../public/subcategories/construction_machinery.json';
import controllers_adapters_modules_for_servers from '../public/subcategories/controllers_adapters_modules_for_servers.json';
import cooking_food from '../public/subcategories/cooking_food.json';
import desktop_computers from '../public/subcategories/desktop_computers.json';
import dogs from '../public/subcategories/dogs.json';
import electronic_books from '../public/subcategories/electronic_books.json';
import flash_drive from '../public/subcategories/flash_drive.json';
import food_storage from '../public/subcategories/food_storage.json';
import for_home from '../public/subcategories/for_home.json';
import for_kitchen from '../public/subcategories/for_kitchen.json';
import for_personalized_care from '../public/subcategories/for_personalized_care.json';
import garage from '../public/subcategories/garage.json';
import garageabroad from '../public/subcategories/garageabroad.json';
import goods_for_children_toys from '../public/subcategories/goods_for_children_toys.json';
import hdd from '../public/subcategories/hdd.json';
import house_on_wheels from '../public/subcategories/house_on_wheels.json';
import household_goods from '../public/subcategories/household_goods.json';
import housings_corp from '../public/subcategories/housings_corp.json';
import jet_skis from '../public/subcategories/jet_skis.json';
import karting from '../public/subcategories/karting.json';
import laptops from '../public/subcategories/laptops.json';
import memory_card from '../public/subcategories/memory_card.json';
import monitors from '../public/subcategories/monitors.json';
import mopeds_and_scooters from '../public/subcategories/mopeds_and_scooters.json';
import motherboards_perif from '../public/subcategories/motherboards_perif.json';
import motor_boats from '../public/subcategories/motor_boats.json';
import motorcycles_parts_and_accessories from '../public/subcategories/motorcycles_parts_and_accessories.json';
import motorcycles from '../public/subcategories/motorcycles.json';
import new_building_abroad from '../public/subcategories/new_building_abroad.json';
import new_building from '../public/subcategories/new_building.json';
import other_comp from '../public/subcategories/other_comp.json';
import parkingplace from '../public/subcategories/parkingplace.json';
import parkingplaceabroad from '../public/subcategories/parkingplaceabroad.json';
import parts_and_accessories from '../public/subcategories/parts_and_accessories.json';
import personal_computer_accessories from '../public/subcategories/personal_computer_accessories.json';
import plants_and_seeds from '../public/subcategories/plants_and_seeds.json';
import processors_cat from '../public/subcategories/processors_cat.json';
import ram_for_servers from '../public/subcategories/ram_for_servers.json';
import ram from '../public/subcategories/ram.json';
import rent_apartments_abroad from '../public/subcategories/rent_apartments_abroad.json';
import rent_apartments from '../public/subcategories/rent_apartments.json';
import rent_building_abroad from '../public/subcategories/rent_building_abroad.json';
import rent_building from '../public/subcategories/rent_building.json';
import rent_commercial_premises_abroad from '../public/subcategories/rent_commercial_premises_abroad.json';
import rent_commercial_premises from '../public/subcategories/rent_commercial_premises.json';
import rent_free_premises_abroad from '../public/subcategories/rent_free_premises_abroad.json';
import rent_free_premises from '../public/subcategories/rent_free_premises.json';
import rent_houses_and_cottages_abroad from '../public/subcategories/rent_houses_and_cottages_abroad.json';
import rent_houses_and_cottages from '../public/subcategories/rent_houses_and_cottages.json';
import rent_of_boats_and_yachts from '../public/subcategories/rent_of_boats_and_yachts.json';
import rent_office_space_abroad from '../public/subcategories/rent_office_space_abroad.json';
import rent_office_space from '../public/subcategories/rent_office_space.json';
import rent_production_room_abroad from '../public/subcategories/rent_production_room_abroad.json';
import rent_production_room from '../public/subcategories/rent_production_room.json';
import rent_rooms from '../public/subcategories/rent_rooms.json';
import rent_warehouse_space_abroad from '../public/subcategories/rent_warehouse_space_abroad.json';
import rent_warehouse_space from '../public/subcategories/rent_warehouse_space.json';
import secondary_housing_abroad from '../public/subcategories/secondary_housing_abroad.json';
import secondary_housing from '../public/subcategories/secondary_housing.json';
import sell_agriculturalland from '../public/subcategories/sell_agriculturalland.json';
import sell_building_abroad from '../public/subcategories/sell_building_abroad.json';
import sell_building from '../public/subcategories/sell_building.json';
import sell_commercial_premises_abroad from '../public/subcategories/sell_commercial_premises_abroad.json';
import sell_commercial_premises from '../public/subcategories/sell_commercial_premises.json';
import sell_commercialland from '../public/subcategories/sell_commercialland.json';
import sell_free_premises_abroad from '../public/subcategories/sell_free_premises_abroad.json';
import sell_free_premises from '../public/subcategories/sell_free_premises.json';
import sell_houses_and_cottages_abroad from '../public/subcategories/sell_houses_and_cottages_abroad.json';
import sell_houses_and_cottages from '../public/subcategories/sell_houses_and_cottages.json';
import sell_izhs from '../public/subcategories/sell_izhs.json';
import sell_office_space_abroad from '../public/subcategories/sell_office_space_abroad.json';
import sell_office_space from '../public/subcategories/sell_office_space.json';
import sell_production_room_abroad from '../public/subcategories/sell_production_room_abroad.json';
import sell_production_room from '../public/subcategories/sell_production_room.json';
import sell_rooms from '../public/subcategories/sell_rooms.json';
import sell_snt from '../public/subcategories/sell_snt.json';
import sell_warehouse_space_abroad from '../public/subcategories/sell_warehouse_space_abroad.json';
import sell_warehouse_space from '../public/subcategories/sell_warehouse_space.json';
import server_enclosures from '../public/subcategories/server_enclosures.json';
import server_hard_drive from '../public/subcategories/server_hard_drive.json';
import server_motherboards from '../public/subcategories/server_motherboards.json';
import servers from '../public/subcategories/servers.json';
import smart_watches_and_fitness_bracelets from '../public/subcategories/smart_watches_and_fitness_bracelets.json';
import smartphones from '../public/subcategories/smartphones.json';
import snowmobiles from '../public/subcategories/snowmobiles.json';
import steering_wheels_gamepads_joysticks from '../public/subcategories/steering_wheels_gamepads_joysticks.json';
import summary from '../public/subcategories/summary.json';
import table_setting from '../public/subcategories/table_setting.json';
import tablets from '../public/subcategories/tablets.json';
import telephones from '../public/subcategories/telephones.json';
import tires from '../public/subcategories/tires.json';
import tractors_and_agricultural_machinery from '../public/subcategories/tractors_and_agricultural_machinery.json';
import trailers from '../public/subcategories/trailers.json';
import trucks from '../public/subcategories/trucks.json';
import vacancies from '../public/subcategories/vacancies.json';
import video_cards_componentsss from '../public/subcategories/video_cards_componentsss.json';
import video_surveillance from '../public/subcategories/video_surveillance.json';
import wheels from '../public/subcategories/wheels.json';




export const useCategoryPlaceOffer = (/* data */) => {
    let data = 'atvs_kvadro';
    const [zxc, setZxc] = useState([])
    useEffect(() => {
        if (data !== undefined) {
            axios.get(`/subcategories/${data}.json`)
                .then((res) => setZxc(res.data))
        }
    }, [data])
    return { ...zxc }
}
