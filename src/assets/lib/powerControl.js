export const powerControlLib = function (level, route) {
    let buttonControl = {};
    let B = 'B'; //基地经理
    let E = 'E'; //访销员
    let W = 'W'; //战区经理
    let WF = 'WF'; //战区负责人
    let WE = 'WE'; //战区执行人
    let D = 'D'; //督导组长
    let DE = 'DE'; //督导组员
    let K = 'K'; //KA组长
    let KE = 'KE'; //KA组员
    let T = 'T'; //电商组长
    let TE = 'TE'; //电商组员
    let X = 'X'; //数据组
    switch (route) {
        case 'abnormalScanSuperviseList':
            buttonControl = {
                warAssignShow: false,//战区分派
                superviseAssignShow: false,//督导分派
                operatorAssignShow: false,//指派执行人
                exportDataShow: false,//导出数据
                changeOperatorShow: false,//调整执行人
                checkShow: false,  //核查
                superviseShow: false, //督导
            };
            switch (level) {
                case X:
                    buttonControl.exportDataShow = true;//导出数据
                    break;
                case WF: // 战区负责人
                    buttonControl.operatorAssignShow = true;//指派执行人
                    buttonControl.changeOperatorShow = true;//调整执行人
                    break;
                case D: //督导组长
                    buttonControl.warAssignShow = true;//战区分派
                    buttonControl.superviseAssignShow = true;//督导分派
                    buttonControl.exportDataShow = true;//导出数据
                    break;
                case K: //KA组长
                    buttonControl.operatorAssignShow = true;//指派执行人
                    buttonControl.changeOperatorShow = true;//调整执行人
                    break;
                case T: //电商组长
                    buttonControl.operatorAssignShow = true;//指派执行人
                    buttonControl.changeOperatorShow = true;//调整执行人
                    break;
                case E:
                    buttonControl.checkShow = true;//核查
                    break;
                case B:
                    buttonControl.checkShow = true;//核查
                    break;
                case KE:
                    buttonControl.checkShow = true;//核查
                    break;
                case TE:
                    buttonControl.checkShow = true;//核查
                    break;
                case WE:
                    buttonControl.checkShow = true;//核查
                    break;
                case DE:
                    buttonControl.superviseShow = true;//督导
                    break;
                default :
                    break;
            }
            break;
        default :
            break;
    }
    return buttonControl;
};