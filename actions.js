let MOUSE_ACTION = 1, KEYBOARD_ACTION =2, EVENT_ACTION =3

class MouseAction{
    constructor(x, y) {
        this.x = x
        this.y =y
    }
}

class KeyBoardAction{
    constructor(key){
        this.key = key
    }
}


function makeAction(typeOfAction, action){
    if(typeOfAction === MOUSE_ACTION ){
        return {
            x : action.x , y : action.y
        }
    }else if(typeOfAction == KEYBOARD_ACTION){
        return {
            key : action.key
        }
    }else if(typeOfAction === EVENT_ACTION) return {action : action}
    
}


