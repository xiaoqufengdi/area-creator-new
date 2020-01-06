/**
 * Created by Administrator on 2020/1/6.
 */

import request  from "../../utils/request";
import {mutations_const} from "../StoreConstant";


const state = {
    navMenus: [
        "TeachersManagement", "StudentManagement"
        ,"ReaderMonitoring" , "ResultsQuery"
        , "CentralizedReader", "OrganizationExam", "SetReviewTask"

    ],
    currentMenus:[
    ]
};

const mutations = {
    [mutations_const.GET_NAV_MENUS] ()
    {
        this.currentMenus = [];
    }

};

const actions = {

};

export default {
    state,
    mutations,
    actions
}