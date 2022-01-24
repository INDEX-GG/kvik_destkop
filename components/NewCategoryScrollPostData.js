import React, {useEffect, useState} from 'react';
import {useCity} from "../lib/Context/CityCTX";
import {getDataByPost} from "../lib/fetch";
import {modifyGetPostsData} from "../lib/services";
import { makeStyles } from '@material-ui/core';
import { useProduct } from '#hooks/useProduct';
import { useRouter } from 'next/router';
import Union from '../UI/icons/Union';
import AdCard_component from './AdCard';
import OffersRenderGridIcon from '#UI/icons/OffersRenderGridIcon';
import OffersRenderListIcon from '#UI/icons/OffersRenderListIcon';
import {useAuth} from "../lib/Context/AuthCTX";
import { useMedia } from '../hooks/useMedia';
import { Typography } from '@material-ui/core';



// const json = [
//     {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      },
//      {
//         "user_photo" : "images/av/d6/2e/ce/33/df54275d294247056c6561c349f3320211124160358884799.webp",
//         "reviewed" : 0,
//         "delivery" : false,
//         "photo" : "{\"photos\":[\"images/po/6d/19/f0/6f/d002fe60d0899e27fdd6546d1877220220110141601800810.webp\"]}",
//         "rating" : 0,
//         "email" : null,
//         "created_at" : "2022-01-10T04:16:01.000Z",
//         "category_id" : "transport,auto",
//         "verify" : 0,
//         "address" : "г Челябинск, ул Асфальтная станция, д 3",
//         "user_phone" : "+7123",
//         "id" : 2366,
//         "user_raiting" : null,
//         "secure_transaction" : false,
//         "verify_moderator" : {
//            "verify" : []
//         },
//         "active" : 0,
//         "trade" : false,
//         "phone" : null,
//         "archived" : false,
//         "description" : "12r413f2g23g",
//         "user_name" : "sergey sergey",
//         "title" : "Audi A4 1994 ",
//         "price" : "90000.00"
//      }


// ]

const useStyles = makeStyles(() => ({
	button: {
		display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
		cursor: 'pointer',
		marginRight: 'auto',
		marginLeft: 'auto',
        marginTop: '30px',
		width: '336px',
		height: '45px',
		backgroundColor: 'transparent',
		border: '1px solid #00A0AB',
		borderRadius: '5px',
		fontSize: '18px',
		fontWeight: '500px',
		color: '#00A0AB'
	},
    buttonText: {
        marginLeft: '10px'
    },
    categoryCardsWrapper: {
        display:'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '12px',

    },
    categoryCardsWrapperActive: {
        display:'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridGap: '12px',
    },
    offersGridSwitcher: {
		display: 'flex',
        justifyContent: 'space-between',
        height: '36px',
        alignItems: 'center',
        // marginBottom: '7px',
		'& svg:first-child': {
			marginRight: '15px'
		},
		'& svg': {
			// display: 'inline-block'
		}
	},


}));

// {"post_id": 2366, "region": "", "model": "A4", "brand": "Audi"}
// POST        /api/similarPosts

const CategoryScrollPostData = ({url}) => {
    const [similarData, setSimilarData] = useState([])
    const [renderCards, setRenderCards] = useState([]);
    const [endPage, setEndPage] = useState(8)
    const [stashNubmer, setStashNumber] = useState(null)
    const [gridView, setGridView] = useState(true)

    const classes = useStyles();
    const router = useRouter()
    const product = useProduct(router.query.id)
    const {searchCity} = useCity()
    const {id} = useAuth()
    const {matchesMobile, matchesTablet} = useMedia()
    const mobile = matchesMobile || matchesTablet

    // useEffect(async ()=>{
    //     if(!product.id || !searchCity) {
    //         return
    //     }
    //     const data = {
    //         post_id: product.id,
    //         region: searchCity,
    //     }   
    //     const responce = await getDataByPost('/api/similarPosts', data)
    //     setSimilarData(modifyGetPostsData(responce))

    // }, [similarData]) 
    
    useEffect(() => {
        setRenderCards([...similarData.slice(0, endPage)])
    }, [endPage, similarData])

    useEffect(() => {
        const stashNum = similarData.length - renderCards.length
        setStashNumber(stashNum > 8 ? 8 : stashNum)
    }, [renderCards, similarData.length])

    useEffect(()=> {
        if(mobile){
        document.addEventListener('scroll', scrollHandler)
        return ()=>{
            document.removeEventListener('scroll', scrollHandler)
        }
    }
    }, [mobile])

    
    function scrollHandler (e) {
        const pixelsFromBottom = (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop)-window.innerHeight;
        // const pixelsFromTop = e.target.documentElement.scrollTop        
            if(pixelsFromBottom < 200){
                setEndPage((prevState)=>prevState + 8)
            }
    }
    
    function loaderHandler() {
        setEndPage(endPage + 8)
    }

    async function fetchSimilar() {
        if(!product.id || !searchCity) {
            return
        }
        if(similarData.length === 0) {
            const data = {
                post_id: product.id,
                region: searchCity,
            }   
            const response = await getDataByPost(url, data)
            if(!response.length) {
                return
            }

            if(response.includes('ошибка')) {
                return
            }
                
            setSimilarData(modifyGetPostsData(response))
        }
        return
    }
    fetchSimilar()
    

    const classSwitcher = () => {
		// if(gridView) return classes.categoryCardsWrapper
		// if((!gridView && mobile) ) return `${classes.categoryCardsWrapperActive}`
		// else return classes.categoryCardsWrapper
        if(gridView) return 'scrollableOffersHome'
		if(!gridView && mobile) return 'scrollableOffersHome scrollableOffersHomeV2'
		else return 'scrollableOffersHome'
	}

   

    return (
    <>  
        {renderCards.length > 0 && <div className={classes.offersGridSwitcher}>
             <Typography  variant='h2'>{'Похожие объявления'}</Typography>

            {mobile && 
            <div>
                <OffersRenderGridIcon clickHandler={()=>setGridView(true)} color={gridView ? '#5a5a5a' : '#8f8f8f'} />
                <OffersRenderListIcon clickHandler={()=>setGridView(false)} color={gridView ? '#8f8f8f' : '#5a5a5a'}/>
            </div>}
        </div>}

        <div className={classSwitcher()}>
            {renderCards.map((it, index)=> <AdCard_component id={id} isGrid={gridView} key={index} offer={it}/>)}
        </div>
        {stashNubmer > 0 
        &&
        !mobile
        &&
        <button 
            className={classes.button}
            onClick={loaderHandler}
        >
           <Union/> 
           <span className={classes.buttonText}>загрузить еще {stashNubmer} объявлений</span>
        </button>}
    </>
        
    );
};

export default CategoryScrollPostData;