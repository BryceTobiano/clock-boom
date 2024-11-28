"use client"

// import styles from './activity_analysis.module.css';
// import '../../globals.css';
// import global from '../../global.module.css';

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
const Collapsible = CollapsiblePrimitive.Root
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent
import {Checkbox} from "@nextui-org/checkbox";
export { Collapsible, CollapsibleTrigger, CollapsibleContent }

  export default function NotStartedDropdown(){

    return (  
        <Collapsible>
        <CollapsibleTrigger style={{border:"0", backgroundColor:"#fee2e2", color:"#991b1b", fontFamily:"Saira", fontSize:"16px"}}>Not Started: 4</CollapsibleTrigger>
        <CollapsibleContent>
        <ul style={{marginLeft:"20px"}}>
            <li>Project 1</li>
            <li>Project 2</li>
        </ul>
          
        </CollapsibleContent>
      </Collapsible>
    )
}