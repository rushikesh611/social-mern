import React from 'react';
import {Popup} from 'semantic-ui-react';

function Popups({content, children}){
    return <Popup inverted content={content} trigger={children}/>
}

export default Popups;